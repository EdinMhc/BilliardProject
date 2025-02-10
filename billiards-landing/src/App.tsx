import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { Link } from "react-router-dom";
import { Button, Flex, Spacer, Box, Text, Drawer, DrawerOverlay, DrawerBody, VStack, useDisclosure } from "@chakra-ui/react";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook to manage the drawer state

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
          <IconButton
            aria-label="Open Menu"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            color="white"
          />
        </Box>

        {/* Regular Navbar Links (Hidden on Mobile) */}
        <Flex display={{ base: "none", md: "flex" }} gap={4} align="center">
          <Link to="/">
            <Button variant="ghost" color="white">Home</Button>
          </Link>
          <Link to="/tutorials">
            <Button variant="ghost" color="white">Tutorials</Button>
          </Link>
          <Link to="/info">
            <Button variant="ghost" color="white">Info</Button>
          </Link>
          <Link to="/billing">
            <Button variant="ghost" color="white">Billing Plan</Button>
          </Link>
        </Flex>

        {/* Spacer and Login Button (Always Visible) */}
        <Spacer />
        <Link to="/login">
          <Button variant="ghost" colorScheme="whiteAlpha">Login</Button>
        </Link>
      </Flex>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="black" color="white">
          <DrawerBody>
            <VStack align="start" spacing={4} mt={8}>
              <Link to="/" onClick={onClose}>
                <Button variant="ghost" color="white" width="100%" justifyContent="start">Home</Button>
              </Link>
              <Link to="/tutorials" onClick={onClose}>
                <Button variant="ghost" color="white" width="100%" justifyContent="start">Tutorials</Button>
              </Link>
              <Link to="/info" onClick={onClose}>
                <Button variant="ghost" color="white" width="100%" justifyContent="start">Info</Button>
              </Link>
              <Link to="/billing" onClick={onClose}>
                <Button variant="ghost" color="white" width="100%" justifyContent="start">Billing Plan</Button>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
