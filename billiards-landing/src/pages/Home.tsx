import '../App.css'
import { Box } from "@chakra-ui/react"
import {  Flex, Card, Heading, Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

function CardBar() {
  return (
    <Flex as="nav" p={4} bg="transparent" color="white" width="100%" position="sticky" top={0} margin={0} zIndex={1} gap={4} justify="center" wrap="wrap">
         <Box display={{ base: "none", md: "block" }}>
            <LogoCard />
          </Box>
        <TrainerCard />
          <Box display={{ base: "none", md: "block" }}>
            <AdCard />
          </Box>
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
    <Card.Root maxW="sm" mx="auto" mt={8} boxShadow="lg" borderRadius="lg" overflow="hidden">
        <Image src="HoroSponsor.png" alt="Trainer" objectFit="cover" width="100%" height="300px" />
      <Card.Body textAlign="center" p={4}>
        <Heading size="md">Juso Hasanovic</Heading>
        <Text mt={2}>
          Juso is a professional billiards trainer with over 20 years of experience. He has coached players of all skill levels and is passionate about helping others master the game.
        </Text>
      </Card.Body>
    </Card.Root>
  );
}

function AdCard() {
  return (
    <Card.Root maxW="sm" mx="auto" mt={8} boxShadow="lg" borderRadius="lg" overflow="hidden" display="flex" flexDirection="column" alignItems="center">
      <Image src="TreninziReklama.jpg" alt="Ad" objectFit="cover" width="100%" height="350px" />
    </Card.Root>
  );
}

function LogoCard() {
  return (
    <Card.Root maxW="sm" mx="auto" mt={8} boxShadow="lg" borderRadius="lg" overflow="hidden" display="flex" flexDirection="column" alignItems="center">
        <Image src="Logo.jpg" alt="Logo" objectFit="cover" width="100%" height="350px" />
    </Card.Root>
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
        <Box textAlign="center">
          <Heading size="2xl">20+</Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} mt={2}>
            Years of Billiards Experience
          </Text>
        </Box>
        <Box textAlign="center">
          <Heading size="2xl">5</Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} mt={2}>
            Times National Billiards Champion
          </Text>
        </Box>
        <Box textAlign="center">
          <Heading size="2xl">3</Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} mt={2}> 
            Times International Billiards Champion
          </Text>
        </Box>
        <Box textAlign="center">
          <Heading size="2xl">2</Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} mt={2}> 
            Times World Billiards Champion
          </Text>
        </Box>
      </Flex>
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
    </div>
  );
}

export default HomePage;