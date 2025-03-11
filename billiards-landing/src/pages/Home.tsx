import { Box, Flex, Heading, Image, Text, Button, Link, Grid } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgImage="url('/otherBackground.png')"
        bgRepeat="no-repeat"
        bgSize="cover"
        width="100vw"
        height="400px"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Logo in the Hero Section */}
        <Box position="absolute" top={4} left={4}>
          <Image src="Logo.jpg" alt="Logo" width="100px" />
        </Box>

        <Box textAlign="center">
          <Heading color="white" fontSize="5xl" textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
            Juso Billiards
          </Heading>
          <Heading color="white" fontSize="xl" textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" mt={2}>
            Master Billiards with a Professional
          </Heading>
        </Box>
      </Box>

      {/* Trainer Card */}
      <Flex
        maxW="1200px"
        mx="auto"
        mt={12}
        p={6}
        align="center"
        gap={8}
        direction={{ base: "column", md: "row" }}
      >
        {/* Circular Trainer Image */}
        <Box
          borderRadius="full"
          overflow="hidden"
          width="500px"
          height="500px"
          flexShrink={0}
          boxShadow="lg"
        >
          <Image
            src="JusoHasanovic.jpg"
            alt="Trainer"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>

        {/* Trainer Description */}
        <Box>
          <Heading fontSize="3xl" mb={4}>
            Juso Hasanovic
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>
            Professional Billiards Trainer with over 20 years of experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Button colorScheme="blue" size="lg">
            Learn More
          </Button>
        </Box>
      </Flex>

      {/* Career Highlights */}
      <Box
        bg="blue.600"
        color="white"
        py={12}
        textAlign="center"
        mt={12}
      >
        <Heading size="3xl" mb={8}>
          Career Highlights
        </Heading>
        <Flex justify="center" wrap="wrap" gap={8}>
          {[
            { value: "20+", label: "Years of Billiards Experience" },
            { value: "5", label: "Times National Billiards Champion" },
            { value: "3", label: "Times International Billiards Champion" },
            { value: "2", label: "Times World Billiards Champion" },
          ].map((item, index) => (
            <Box key={index} textAlign="center">
              <Heading size="2xl">{item.value}</Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} mt={2}>
                {item.label}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Featured Courses Section */}
      <Box py={16} px={4} maxW="1200px" mx="auto">
        <Heading as="h2" fontSize="3xl" fontWeight="bold" textAlign="center" mb={8} color="gray.300">
          Featured Courses
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={8}
        >
          {courses.map((course) => (
            <Box
              key={course.id}
              bg="white"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              transition="all 0.2s"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "lg",
              }}
            >
              <Image
                src={course.thumbnail}
                alt={course.title}
                objectFit="cover"
                width="100%"
                height="200px"
              />
              <Box p={6}>
                <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2} color="gray.800">
                  {course.title}
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  {course.description}
                </Text>
                <Link as={RouterLink}>
                  <Button colorScheme="blue" size="sm" width="100%">
                    Enroll Now
                  </Button>
                </Link>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}


const courses = [
  {
    id: 1,
    title: "Beginner Billiards Techniques",
    description: "Learn the basics of billiards with professional tips.",
    thumbnail: "/public/BeginnerTipsVideo.jpg",
    link: "/courses/beginner-billiards",
  },
  {
    id: 2,
    title: "Advanced Cue Control",
    description: "Master advanced cue control techniques.",
    thumbnail: "/public/AdvancedCueControl.jpg",
    link: "/courses/advanced-cue-control",
  },
  {
    id: 3,
    title: "Bank Shots Explained",
    description: "Understand the mechanics of bank shots.",
    thumbnail: "/public/BankShotsExplained.jpg",
    link: "/courses/bank-shots",
  },
  {
    id: 4,
    title: "Position Play Strategies",
    description: "Improve your position play with these strategies.",
    thumbnail: "/public/PositionPlayStrategies.png",
    link: "/courses/position-play",
  },
  {
    id: 5,
    title: "Breaking Techniques",
    description: "Learn how to break like a pro.",
    thumbnail: "/public/BreakingStrategies.jpg",
    link: "/courses/breaking-techniques",
  },
  {
    id: 6,
    title: "Spin and English",
    description: "Master spin and English for better control.",
    thumbnail: "/public/SpinAndEnglish.jpg",
    link: "/courses/spin-and-english",
  },
];

export default HomePage;