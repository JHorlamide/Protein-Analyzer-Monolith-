/* Libraries */
import { BsArrowLeft } from "react-icons/bs";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import ProjectForm from './ProjectForm';
import { useNavigate } from "react-router-dom";
import { useCreateDNASeqProject } from '../../../../hooks/DNASequence/useCreateDNASeqProject';

/* Chakra UI */
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Text,
} from "@chakra-ui/react";
import DocumentUpload from "../../../../components/DocumentUpload/DocumentUpload";

const CreateProject = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const tabStyle = {
    variant: "soft-rounded",
    colorScheme: "gray",
    marginTop: "-5%"
  }

  return (
    <Tabs {...tabStyle}>
      <TabList
        width="full"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <HStack spacing={1} display="flex" alignItems="center" alignSelf="flex-start">
          <Button
            color="white"
            bg="brand_blue.300"
            leftIcon={<BsArrowLeft />}
            onClick={handleGoBack}
            marginRight={40}
            _hover={{ bg: "brand_blue.200" }}
          >
            Back
          </Button>

          <Tab _selected={{ bg: "brand_blue.300" }} color="white">CREATE NEW</Tab>
          <Tab _selected={{ bg: "brand_blue.300" }} color="white">UPLOAD FILES</Tab>
          <Tab _selected={{ bg: "brand_blue.300" }} color="white">IMPORT FROM DATABASE</Tab>
        </HStack>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ProjectForm {...useCreateDNASeqProject()} />
        </TabPanel>

        <TabPanel>
          <DocumentUpload
            uploadDescription="Upload any DNA file (Genbank, FASTA, ApE, Geneious, SnapGene, SeqBuilder v15 or below, etc.)"
            projectId=""
            projectType="DNA"
          />
        </TabPanel>

        <TabPanel>
          <Text
            color="white"
            textAlign="center"
            fontSize={26}
            fontWeight="bold"
            fontStyle="italic"
            marginTop={20}
          >
            Importing data from database is not currently supported <br />
            Coming soon!
          </Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default CreateProject