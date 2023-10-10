import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from "./AppConfig";

/* Public Components */
import Website from "../views/website/Website";
import Login from "../views/auth-views/Login/Login";
import Register from "../views/auth-views/Register/Register";
import ForgotPassword from "../views/auth-views/ForgotPassword/ForgotPassword";

/* Protected Components -> Protein Analyzer */
import ProteinAnalyzerDashboard from "../views/app-views/ProteinAnalyzer/ProteinAnalyzerDashboard/ProteinAnalyzerDashboard";
import CreateProjectForm from "../views/app-views/ProteinAnalyzer/CreateProject/CreateProjectForm";
import UpdateProjectForm from "../views/app-views/ProteinAnalyzer/CreateProject/UpdateProjectForm";
import ProjectOverview from "../views/app-views/ProteinAnalyzer/ProjectOverview/ProjectOverview";
import ProjectMembers from "../views/app-views/ProteinAnalyzer/ProjectMembers/ProjectMembers";
import SequenceMap from "../views/app-views/ProteinAnalyzer/ProjectOverview/components/SequenceMap/SequenceMap";


/* Protected Components -> DNA Sequence */
import DNASequenceDashboard from "../views/app-views/DNASequence/DNASeqDashboard/DNASequenceDashboard";

interface IRoute {
  [x: string]: any;
  key: string;
  path: string;
  component: () => JSX.Element
}

export const publicRoute: IRoute[] = [
  {
    key: "website",
    path: `/website`,
    component: Website
  },

  {
    key: "login",
    path: `${AUTH_PREFIX_PATH}/login`,
    component: Login
  },

  {
    key: "register",
    path: `${AUTH_PREFIX_PATH}/register`,
    component: Register
  },

  {
    key: "forgot-password",
    path: `${AUTH_PREFIX_PATH}/forgot-password`,
    component: ForgotPassword
  },
]

export const protectedRoute: IRoute[] = [
  /* Protein Analyzer */
  {
    key: "dashboard",
    path: `${APP_PREFIX_PATH}/protein-analyzer/dashboard`,
    component: ProteinAnalyzerDashboard
  },

  {
    key: "create-projects",
    path: `${APP_PREFIX_PATH}/create-project`,
    component: CreateProjectForm
  },

  {
    key: "update-projects",
    path: `${APP_PREFIX_PATH}/project/update/:projectId`,
    component: UpdateProjectForm
  },

  {
    key: "project-overview",
    path: `${APP_PREFIX_PATH}/project-overview/:projectId`,
    component: ProjectOverview
  },

  {
    key: "sequence-map",
    path: `${APP_PREFIX_PATH}/project-overview/:projectId/sequence-map`,
    component: SequenceMap
  },

  /* DNA Sequence */
  {
    key: "project-members",
    path: `${APP_PREFIX_PATH}/dna-sequence/dashboard`,
    component: DNASequenceDashboard
  },
]