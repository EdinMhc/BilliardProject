import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  IconButton,
  Icon,
  Badge,
  Circle,
} from "@chakra-ui/react";
import { useAuth } from "../components/Utilities/authContext";
import {
  FaUpload,
  FaEllipsisV,
  FaArrowsAlt,
  FaUsers,
  FaFolder,
  FaTrash,
  FaShare,
} from "react-icons/fa";

function MyVideosPage() {
  const { userRoles } = useAuth();
  const [openMenu, setOpenMenu] = useState<{ type: "group" | "video"; id: number } | null>(null);

  // Mock data for prototyping
  const videoGroups = [
    {
      id: 1,
      name: "My Tutorials",
      videos: [
        { id: 101, title: "Basic Cue Techniques", duration: "12:34", views: 245 },
        { id: 102, title: "Advanced Position Play", duration: "18:22", views: 189 },
      ],
    },
    {
      id: 2,
      name: "Private Videos",
      videos: [
        { id: 201, title: "Personal Coaching - John", duration: "32:15", views: 1 },
        { id: 202, title: "Special Technique - Sarah", duration: "15:40", views: 1 },
      ],
    },
  ];

  const allVideos = [
    { id: 301, title: "Beginner's Guide", duration: "25:10", views: 532 },
    { id: 302, title: "Bank Shots Explained", duration: "14:45", views: 321 },
    { id: 303, title: "English Spin Techniques", duration: "19:30", views: 278 },
  ];

  // Utility to extract initials
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");

  return (
    <Box p={4} h="100vh">
      <Heading mb={6}>My Videos</Heading>

      {userRoles.includes("SuperAdmin") ? (
        <Flex h="90%" gap={6}>
          {/* Sidebar */}
          <Box w="300px" borderRight="1px solid" borderColor="gray.300" p={4} overflowY="auto">
            <VStack align="stretch" gap={4}>
              {videoGroups.map((group) => (
                <Box key={group.id} bg="gray.600" p={3} borderRadius="md" position="relative">
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="bold" fontSize="lg">{group.name}</Text>
                    <IconButton
                      aria-label="Group options"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setOpenMenu(
                          openMenu?.type === "group" && openMenu.id === group.id
                            ? null
                            : { type: "group", id: group.id }
                        )
                      }
                    >
                      <FaEllipsisV />
                    </IconButton>
                  </Flex>

                  {/* Group dropdown */}
                  {openMenu?.type === "group" && openMenu.id === group.id && (
                    <VStack
                      position="absolute"
                      right={4}
                      top="40px"
                      bg="white"
                      shadow="md"
                      borderRadius="md"
                      zIndex={1}
                      gap={0}
                    >
                      <Button variant="ghost" size="sm" onClick={() => {}}>
                        <Icon as={FaShare} mr={2} />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon as={FaFolder} mr={2} />
                        Move to group
                      </Button>
                      <Button variant="ghost" size="sm" color="red.500">
                        <Icon as={FaTrash} mr={2} />
                        Delete
                      </Button>
                    </VStack>
                  )}

                  <VStack align="stretch" gap={2}>
                    {group.videos.map((video) => (
                      <Flex
                        key={video.id}
                        p={2}
                        borderRadius="md"
                        bg="gray.800"
                        align="center"
                        _hover={{ bg: "gray.700" }}
                        cursor="pointer"
                        position="relative"
                      >
                        <IconButton aria-label="Drag" variant="ghost" size="sm" mr={2}>
                          <FaArrowsAlt />
                        </IconButton>
                        <Box flex={1}>
                          <Text fontWeight="medium">{video.title}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {video.duration} • {video.views} views
                          </Text>
                        </Box>
                        <IconButton
                          aria-label="Video options"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setOpenMenu(
                              openMenu?.type === "video" && openMenu.id === video.id
                                ? null
                                : { type: "video", id: video.id }
                            )
                          }
                        >
                          <FaEllipsisV />
                        </IconButton>

                        {/* Video dropdown */}
                        {openMenu?.type === "video" && openMenu.id === video.id && (
                          <VStack
                            position="absolute"
                            right={2}
                            top="40px"
                            bg="white"
                            shadow="md"
                            borderRadius="md"
                            zIndex={1}
                            gap={0}
                          >
                            <Button variant="ghost" size="sm">
                              <Icon as={FaShare} mr={2} />
                              Share privately
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon as={FaFolder} mr={2} />
                              Move to group
                            </Button>
                            <Button variant="ghost" size="sm" color="red.500">
                              <Icon as={FaTrash} mr={2} />
                              Delete
                            </Button>
                          </VStack>
                        )}
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              ))}

              {/* Separator */}
              <Box borderBottom="1px solid" borderColor="gray.200" my={2} />

              <Text fontWeight="bold" fontSize="lg" mb={2}>
                All Videos
              </Text>
              <VStack align="stretch" gap={2}>
                {allVideos.map((video) => (
                  <Flex
                    key={video.id}
                    p={2}
                    borderRadius="md"
                    bg="gray.600"
                    align="center"
                    _hover={{ bg: "gray.500" }}
                    cursor="pointer"
                    position="relative"
                  >
                    <IconButton aria-label="Drag" variant="ghost" size="sm" mr={2}>
                      <FaArrowsAlt />
                    </IconButton>
                    <Box flex={1}>
                      <Text fontWeight="medium">{video.title}</Text>
                      <Text fontSize="sm" color="gray.300">
                        {video.duration} • {video.views} views
                      </Text>
                    </Box>
                    <IconButton
                      aria-label="Video options"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setOpenMenu(
                          openMenu?.type === "video" && openMenu.id === video.id
                            ? null
                            : { type: "video", id: video.id }
                        )
                      }
                    >
                      <FaEllipsisV />
                    </IconButton>

                    {openMenu?.type === "video" && openMenu.id === video.id && (
                      <VStack
                        position="absolute"
                        right={2}
                        top="40px"
                        bg="white"
                        shadow="md"
                        borderRadius="md"
                        zIndex={1}
                        gap={0}
                      >
                        <Button variant="ghost" size="sm">
                          <Icon as={FaShare} mr={2} />
                          Share privately
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon as={FaFolder} mr={2} />
                          Add to group
                        </Button>
                        <Button variant="ghost" size="sm" color="red.500">
                          <Icon as={FaTrash} mr={2} />
                          Delete
                        </Button>
                      </VStack>
                    )}
                  </Flex>
                ))}
              </VStack>
            </VStack>
          </Box>

          {/* Main Content */}
          <Box flex={1} p={4}>
            <Box
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="lg"
              p={8}
              textAlign="center"
              _hover={{ borderColor: "blue.400" }}
              cursor="pointer"
            >
              <VStack gap={4}>
                <Box fontSize="4xl" color="blue.500">
                  <FaUpload />
                </Box>
                <Heading size="md">Upload New Video</Heading>
                <Text color="gray.500">Drag and drop files here or click to browse</Text>
                <Button colorScheme="blue" mt={4}>
                  Select Files
                </Button>
              </VStack>
            </Box>

            <Box flex={1} bg="gray.700" borderRadius="lg" p={6} mt={6}>
              <Heading size="md" mb={4}>Video Details</Heading>
              <Text color="gray.300">Select a video from the list to view and edit details</Text>

              <Box mt={6} bg="black" borderRadius="md" h="300px" display="flex" alignItems="center" justifyContent="center">
                <Text color="white">Video Preview </Text>
              </Box>

              <Box mt={6}>
                <Text fontWeight="bold" mb={2}>Shared with:</Text>
                <HStack gap={2}>
                  {['John Doe', 'Sarah Smith'].map((name) => (
                    <Circle key={name} size="32px" bg="red.300" fontSize="xs" fontWeight="bold">
                      {getInitials(name)}
                    </Circle>
                  ))}
                  <Button size="sm" variant="outline">
                    <Icon as={FaUsers} mr={2} />
                    Share Privately
                  </Button>
                </HStack>
              </Box>

              <Box mt={6}>
                <Text fontWeight="bold" mb={2}>Groups:</Text>
                <HStack gap={2}>
                  <Badge px={2} py={1} borderRadius="full" colorScheme="blue">My Tutorials</Badge>
                  <Button size="sm" variant="outline">
                    <Icon as={FaFolder} mr={2} />
                    Add to Group
                  </Button>
                </HStack>
              </Box>
            </Box>
          </Box>
        </Flex>
      ) : (
        <Text>You don't have permission to view this page</Text>
      )}
    </Box>
  );
}

export default MyVideosPage;
