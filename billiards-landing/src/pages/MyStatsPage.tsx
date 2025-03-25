import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../components/Utilities/authContext";

function MyStatsPage() {
  const { token } = useAuth();

  return (
    <Box p={4}>
      <Heading mb={4}>My Stats</Heading>
      {token ? (
        <Text>Your performance statistics will appear here</Text>
      ) : (
        <Text>Please login to view your stats</Text>
      )}
    </Box>
  );
}

export default MyStatsPage;