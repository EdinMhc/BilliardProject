import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../components/Utilities/authContext";

function MyStudentsPage() {
  const { userRoles } = useAuth();

  return (
    <Box p={4}>
      <Heading mb={4}>My Students</Heading>
      {userRoles.includes('SuperAdmin') ? (
        <Text>Student management interface will appear here</Text>
      ) : (
        <Text>You don't have permission to view this page</Text>
      )}
    </Box>
  );
}

export default MyStudentsPage;