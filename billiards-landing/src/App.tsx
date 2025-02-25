
import './App.css'
import {
  Text,
  Flex,
  Box,
  Spacer,
  Button,
  IconButton,
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  DrawerActionTrigger,
  DrawerCloseTrigger,
  VStack,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      {/* Regular Navbar for larger screens */}
      <Flex
        as="nav"
        p={4}
        bg="black"
        color="white"
        width="100%"
        position="sticky"
        top={0}
        margin={0}
        zIndex={1}
        gap={4}
        align="center"
      >
        {/* Hamburger Menu for Mobile */}
        <Box display={{ base: "block", md: "none" }} ml="auto">
          <DrawerRoot>
            <DrawerTrigger asChild>
              <IconButton
                aria-label="Open Menu"
                variant="ghost"
                color="white"
                >
                {/* Insert icon here */}
              </IconButton>
            </DrawerTrigger>
            <DrawerBackdrop />
            <DrawerContent bg="black" color="white">
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <VStack align="start">
                  <Link to="/">
                    <Button variant="ghost" color="white" width="100%" justifyContent="start">
                      Home
                    </Button>
                  </Link>
                  <Link to="/tutorials">
                    <Button variant="ghost" color="white" width="100%" justifyContent="start">
                      Tutorials
                    </Button>
                  </Link>
                  <Link to="/info">
                    <Button variant="ghost" color="white" width="100%" justifyContent="start">
                      Info
                    </Button>
                  </Link>
                  <Link to="/billing">
                    <Button variant="ghost" color="white" width="100%" justifyContent="start">
                      Billing Plan
                    </Button>
                  </Link>
                </VStack>
              </DrawerBody>
              <DrawerFooter>
                <DrawerActionTrigger asChild>
                  <Button variant="outline" colorScheme="whiteAlpha">
                    Close
                  </Button>
                </DrawerActionTrigger>
              </DrawerFooter>
              <DrawerCloseTrigger />
            </DrawerContent>
          </DrawerRoot>
        </Box>

        {/* Regular Navbar Links (Hidden on Mobile) */}
        <Flex display={{ base: "none", md: "flex" }} gap={4} align="center">
          <Link to="/">
            <Button variant="ghost" color="white">
              Home
            </Button>
          </Link>
          <Link to="/tutorials">
            <Button variant="ghost" color="white">
              Tutorials
            </Button>
          </Link>
          <Link to="/info">
            <Button variant="ghost" color="white">
              Info
            </Button>
          </Link>
          <Link to="/billing">
            <Button variant="ghost" color="white">
              Billing Plan
            </Button>
          </Link>
          <Spacer />
          <Link to="/login">
            <Button variant="ghost" colorScheme="whiteAlpha">
              Login
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

function Footer() {
  return (
    <Box as="footer" bg="black" color="white" py={4} width="100%" textAlign="center">
      <Text>&copy; {new Date().getFullYear()} Billiards Landing. All rights reserved.</Text>
      <Text>Follow us on social media</Text>
    </Box>
  );
}

function App() {
  return (
    <>
      <Router>
      <Box minH="100vh" display="flex" flexDirection="column" pt={16} width="100%" maxW="100%" overflowX="hidden" margin={0} padding={0}>
        <Navbar />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
    </>
  )
}

export default App
