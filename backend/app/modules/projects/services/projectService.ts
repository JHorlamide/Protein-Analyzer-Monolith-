import { PDB_BASE_URL } from "../../../config/environmentConfig";
import projectRepository from "../repository/repository";
import uniprotService from "./uniprot.service";
import { IProject } from "../types/types";
import { ERROR_MESSAGES } from "../types/constants";
import { AppError } from "../../../common/middleware/appError";
import { GENERAL_ERROR } from "../../../config/appConstants";

const { name, statusCode } = GENERAL_ERROR.ERROR_MSG;

class ProjectService {
  /**
  * Creates a project using the given project data. If uniprotId is provided, retrieves the protein sequence
  * and adds it to the project data. If proteinPDBID is provided, adds the PDB URL to the project data.
  * @param projectData The data for the project to be created.
  * @returns The created project.
  */
  public async createProject(projectData: IProject) {
    // Ensure that the necessary data is provided to create the project
    if (Object.keys(projectData).length === 0) {
      const { REQUIRED_PROJECT_DATA } = ERROR_MESSAGES;

      throw new AppError(
        REQUIRED_PROJECT_DATA.name,
        REQUIRED_PROJECT_DATA.statusCode,
        REQUIRED_PROJECT_DATA.message, true);
    }

    const { uniprotId, proteinPDBID, user } = projectData;

    if (!user) {
      const { REQUIRED_USER_ID } = ERROR_MESSAGES;

      throw new AppError(
        REQUIRED_USER_ID.name,
        REQUIRED_USER_ID.statusCode,
        REQUIRED_USER_ID.message, true);
    }

    if (uniprotId) {
      // If uniprotId is provided, retrieve the protein sequence
      const proteinSequence = await uniprotService.getProteinSequence(uniprotId);

      // Add the protein sequence to the project data and create the project
      const projectWithSequence = {
        ...projectData,
        proteinAminoAcidSequence: proteinSequence
      };

      return await this.createProteinProject(projectWithSequence);
    }

    if (proteinPDBID) {
      // If proteinPDBID is provided, add the PDB URL to the project data and create the project
      const PDBID = `${PDB_BASE_URL}/${proteinPDBID}`;

      const projectWithPDBID = {
        ...projectData,
        proteinPDBID: PDBID
      };

      return await this.createProteinProject(projectWithPDBID);
    }

    // If neither uniprotId nor proteinPDBID is provided, create the project as-is
    return projectRepository.createProject(projectData);
  }

  // Fetch all the create project from the DB
  public async getAllProjects(page: number, limit: number, search: string) {
    try {
      const query: any = {};

      // Apply search filter if provided
      if (search) {
        query.$or = [
          { projectTitle: { $regex: search, $options: "i" } },
          { measuredProperty: { $regex: search, $options: "i" } },
          { projectGoal: { $regex: search, $options: "i" } },
        ];
      }

      const totalCount = await projectRepository.countProjects(query);
      const totalPages = Math.ceil(totalCount / limit);
      const projects = await projectRepository.getAllProjects(query, page, limit);
      
      return {
        projects,
        totalPages,
        totalCount,
      };
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }

  // Get a single project by the given projectId
  public async getProjectById(projectId: string) {
    if (!projectId) {
      const { REQUIRED_PROJECT_ID } = ERROR_MESSAGES;

      throw new AppError(
        REQUIRED_PROJECT_ID.name,
        REQUIRED_PROJECT_ID.statusCode,
        REQUIRED_PROJECT_ID.message, true);
    }

    try {
      const project = await projectRepository.getProjectById(projectId);

      if (!project) {
        const { PROJECT_NOT_FOUND } = ERROR_MESSAGES;

        throw new AppError(
          PROJECT_NOT_FOUND.name,
          PROJECT_NOT_FOUND.statusCode,
          PROJECT_NOT_FOUND.message, true)
      }

      return project;
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }

  private async createProteinProject(projectData: IProject) {
    try {
      return await projectRepository.createProject(projectData);
    } catch (error: any) {
      throw new AppError(name, statusCode, error.message, true);
    }
  }
}

export default new ProjectService();
