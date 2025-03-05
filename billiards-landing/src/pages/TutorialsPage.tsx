import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Grid,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react";

function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Placeholder data for videos
  const videos = [
    {
      id: 1,
      title: "Beginner Billiards Techniques",
      description: "Learn the basics of billiards with professional tips.",
      thumbnail: "https://via.placeholder.com/320x180", // Placeholder image
    },
    {
      id: 2,
      title: "Advanced Cue Control",
      description: "Master advanced cue control techniques.",
      thumbnail: "https://via.placeholder.com/320x180",
    },
    {
      id: 3,
      title: "Bank Shots Explained",
      description: "Understand the mechanics of bank shots.",
      thumbnail: "https://via.placeholder.com/320x180",
    },
    {
      id: 4,
      title: "Position Play Strategies",
      description: "Improve your position play with these strategies.",
      thumbnail: "https://via.placeholder.com/320x180",
    },
    {
      id: 5,
      title: "Breaking Techniques",
      description: "Learn how to break like a pro.",
      thumbnail: "https://via.placeholder.com/320x180",
    },
    {
      id: 6,
      title: "Spin and English",
      description: "Master spin and English for better control.",
      thumbnail: "https://via.placeholder.com/320x180",
    },
  ];

  // Filter videos based on search query
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100%" p={4}>
      {/* Search Bar */}
      <Flex mb={8} gap={4} maxW="1200px" mx="auto">
        <Input
          placeholder="Search tutorials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="lg"
          flex="1"
        />
        <Button colorScheme="blue" size="lg">
          Search
        </Button>
      </Flex>

      {/* Video Grid */}
      <Grid
        templateColumns={{
          base: "1fr", // 1 column on mobile
          md: "repeat(2, 1fr)", // 2 columns on tablets
          lg: "repeat(3, 1fr)", // 3 columns on desktops
        }}
        gap={6}
        maxW="1200px"
        mx="auto"
      >
        {filteredVideos.map((video) => (
          <Box
            key={video.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="transform 0.2s, box-shadow 0.2s"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
          >
            {/* Video Thumbnail */}
            <Image
              src={video.thumbnail}
              alt={video.title}
              objectFit="cover"
              width="100%"
              height="180px"
            />

            {/* Video Details */}
            <Box p={4}>
              <Heading size="md" mb={2}>
                {video.title}
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {video.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default TutorialsPage;