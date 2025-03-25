import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../components/Utilities/authContext";

function AdminSettingsPage() {
  const { userRoles } = useAuth();

  return (
    <Box p={4}>
      <Heading mb={4}>Admin Settings</Heading>
      {userRoles.includes('SuperAdmin') ? (
        <Text>System configuration options will appear here</Text>
      ) : (
        <Text>You don't have permission to view this page</Text>
      )}
    </Box>
  );
}

export default AdminSettingsPage;