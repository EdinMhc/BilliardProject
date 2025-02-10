
import './App.css'
import { Box } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { Link } from "react-router-dom";
import { Button, Flex, Spacer } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex as="nav" p={4} bg="black" color="white" width="100%" position="sticky" top={0} margin={0} zIndex={1} gap={4}>
      <Link to="/">
        <Button variant="ghost" padding-right={5} color="white">Home</Button>
      </Link>
      <Link to="/tutorials">
        <Button variant="ghost" color="white">Tutorials</Button>
      </Link>
      <Link to="/info">
        <Button variant="ghost" color="white">Info</Button>
      </Link>
      <Link to="/billing">
        <Button variant="ghost">Billing Plan</Button>
      </Link>
      <Spacer />
      <Link to="/login">
        <Button variant="ghost" colorScheme="whiteAlpha">Login</Button>
      </Link>
    </Flex>
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
