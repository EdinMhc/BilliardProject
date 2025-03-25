import { useState } from "react";
import "./App.css";
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Home from "./pages/Home";
import { Link } from "react-router-dom";
import TutorialsPage from "./pages/TutorialsPage";
import BillingPlanPage from "./pages/BillingPlanPage";
import RegisterPage from "./pages/RegisterPage";
import LoginModal from "./components/LoginModal";
import AdminTestPage from "./pages/AdminTestPage";
import MyStatsPage from "./pages/MyStatsPage";
import MyTutorialsPage from "./pages/MyTutorialsPage";
import { AuthProvider } from './components/Utilities/authContext';
import { useAuth } from './components/Utilities/authContext';
import { ProtectedRoute } from './components/Utilities/ProtectedRoute';

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { token } = useAuth(); // Add this line to access auth state

  return (
    <>
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
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <IconButton aria-label="Open Menu" variant="ghost" color="white">
                <FaBars />
              </IconButton>
            </DrawerTrigger>
            <DrawerContent bg="black" color="white">
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
                <DrawerCloseTrigger asChild>
                  <IconButton
                    aria-label="Close Menu"
                    variant="ghost"
                    color="white"
                    position="absolute"
                    top={2}
                    right={2}
                  >
                    <FaTimes />
                  </IconButton>
                </DrawerCloseTrigger>
              </DrawerHeader>
              <DrawerBody>
                <VStack align="start" gap={4}>
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
                  {token && (
                    <>
                      <Link to="/my-tutorials">
                        <Button variant="ghost" color="white" width="100%" justifyContent="start">
                          My Tutorials
                        </Button>
                      </Link>
                      <Link to="/my-stats">
                        <Button variant="ghost" color="white" width="100%" justifyContent="start">
                          My Stats
                        </Button>
                      </Link>
                    </>
                  )}
                  <Link to="/billing">
                    <Button variant="ghost" color="white" width="100%" justifyContent="start">
                      Billing Plan
                    </Button>
                  </Link>
                  {!token ? (
                    <>
                      <Button 
                        variant="ghost" 
                        color="white" 
                        width="100%" 
                        justifyContent="start" 
                        onClick={() => setIsLoginOpen(true)}
                      >
                        Login
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="ghost" 
                      color="white" 
                      width="100%" 
                      justifyContent="start"
                      onClick={() => {
                        localStorage.removeItem('authToken');
                        window.location.href = '/';
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </VStack>
              </DrawerBody>
              <DrawerFooter>
                <DrawerActionTrigger asChild>
                  <Button variant="outline" colorScheme="whiteAlpha">
                    Close
                  </Button>
                </DrawerActionTrigger>
              </DrawerFooter>
            </DrawerContent>
          </DrawerRoot>
        </Box>

        {/* Regular Navbar Links (Hidden on Mobile) */}
        <Flex display={{ base: "none", md: "flex" }} gap={4} align="center" flex="1">
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
          {token && (
            <>
              <Link to="/my-tutorials">
                <Button variant="ghost" color="white">
                  My Tutorials
                </Button>
              </Link>
              <Link to="/my-stats">
                <Button variant="ghost" color="white">
                  My Stats
                </Button>
              </Link>
            </>
          )}
          <Link to="/billing">
            <Button variant="ghost" color="white">
              Billing Plan
            </Button>
          </Link>
          <Spacer />
          {!token ? (
            <>
              <Button variant="ghost" colorScheme="whiteAlpha" onClick={() => setIsLoginOpen(true)}>
                Login
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              colorScheme="whiteAlpha"
              onClick={() => {
                localStorage.removeItem('authToken');
                window.location.href = '/';
              }}
            >
              Logout
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
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
    <Router>
      <AuthProvider>
      <Box minH="100vh" display="flex" flexDirection="column" pt={16} width="100%" maxW="100%" overflowX="hidden" margin={0} padding={0}>
        <Navbar />
        <Box flex="1" width="100%">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/billing" element={<BillingPlanPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin-test" element={<AdminTestPage />} />
            <Route path="/my-tutorials" element={
            <ProtectedRoute>
              <MyTutorialsPage />
            </ProtectedRoute>
          } />
          <Route path="/my-stats" element={
            <ProtectedRoute>
              <MyStatsPage />
            </ProtectedRoute>
          } />
          </Routes>
        </Box>
        <Footer />
      </Box>
      </AuthProvider>
    </Router>
  );
}

export default App;
