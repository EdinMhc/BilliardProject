import '../App.css'
import { Box } from "@chakra-ui/react"
import {  Flex, Card, Heading, Image, Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CardBar() {
  return (
    <Flex
      as="nav"
      p={4}
      bg="transparent"
      color="white"
      width="100%"
      position="sticky"
      top={0}
      margin={0}
      zIndex={1}
      gap={4}
      justify="center"
      wrap="wrap"
    >
      {/* Trainer Card */}
      <TrainerCard />
    </Flex>
  );
}

function BackgroundImage() {
  return (
    <Box
      bgImage="url('/otherBackground.png')"
      bgRepeat="no-repeat"
      bgSize="cover"
      width="100vw"
      height="400px"
      position="relative"
      mt={0}
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
  );
}

function TrainerCard() {
  return (
    <Box
      maxW="800px"
      mx="auto"
      mt={8}
      boxShadow="lg"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
    >
      <Image
        src="JusoHasanovic.jpg"
        alt="Trainer"
        objectFit="cover"
        width="100%"
        height="400px"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
        p={4}
      >
        <Heading color="white" fontSize="4xl" mb={4}>
          Juso Hasanovic
        </Heading>
        <Text color="white" fontSize="xl">
          Professional Billiards Trainer with over 20 years of experience.
        </Text>
      </Box>
    </Box>
  );
}

function CareerHighlights() {
  return (
    <Box
      bg="blue.600"
      color="white"
      py={12}
      textAlign="center"
      mt={8}
      height={{ base: "auto", md: "400px" }}
      minH="300px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
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
  );
}

function ProgramsSection() {
  return (
    <Box bg="gray.100" py={12} textAlign="center">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        gap={8}
        maxW="1200px"
        mx="auto"
        px={4}
      >
        {/* Beginner Program */}
        <Box
          position="relative"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          flex="1"
          maxW={{ base: "100%", md: "45%" }}
          transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "xl",
          }}
        >
          <Image
            src="/BeginnerProgram.jpg"
            alt="Beginner Program"
            objectFit="cover"
            width="100%"
            height="300px"
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0, 0, 0, 0.5)"
            transition="background-color 0.3s ease-in-out"
            _hover={{
              bg: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <Link to="/beginner-program">
              <Heading
                color="white"
                fontSize="3xl"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.8)"
                cursor="pointer"
              >
                Beginner Program
              </Heading>
            </Link>
          </Box>
        </Box>

        {/* Expert Program */}
        <Box
          position="relative"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          flex="1"
          maxW={{ base: "100%", md: "45%" }}
          transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "xl",
          }}
        >
          <Image
            src="/ExpertProgram.jpg"
            alt="Expert Program"
            objectFit="cover"
            width="100%"
            height="300px"
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0, 0, 0, 0.5)"
            transition="background-color 0.3s ease-in-out"
            _hover={{
              bg: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <Link to="/expert-program">
              <Heading
                color="white"
                fontSize="3xl"
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.8)"
                cursor="pointer"
              >
                Expert Program
              </Heading>
            </Link>
          </Box>
        </Box>
      </Flex>
      <Button mt={8} colorScheme="blue" size="lg">
        Explore Programs
      </Button>
    </Box>
  );
}

function HomePage() {
    console.log("Home component rendered!");
  return (
    <div>
        <BackgroundImage />
        <CardBar />
        <CareerHighlights />
        <ProgramsSection />
    </div>
  );
}

export default HomePage;