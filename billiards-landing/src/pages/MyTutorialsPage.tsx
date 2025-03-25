import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../components/Utilities/authContext";

function MyTutorialsPage() {
  const { token } = useAuth();

  return (
    <Box p={4}>
      <Heading mb={4}>My Tutorials</Heading>
      {token ? (
        <Text>Your purchased tutorials will appear here</Text>
      ) : (
        <Text>Please login to view your tutorials</Text>
      )}
    </Box>
  );
}

export default MyTutorialsPage;