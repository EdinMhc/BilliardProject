import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  Fieldset,
  Field,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from './Utilities/authContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth(); // Moved useAuth to top level
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://localhost:7044/api/Account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password. Login failed");
      }

      const data = await response.json();
      login(data.token);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
        animate={{ backdropFilter: "blur(8px)", opacity: 1 }}
        exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ zIndex: 11 }}
        >
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            width="100%"
            maxW="400px"
            position="relative"
          >
            <Button
              aria-label="Close Login"
              position="absolute"
              top={2}
              right={2}
              onClick={onClose}
              variant="ghost"
            >
              <AiOutlineClose size={20} color="black" />
            </Button>
            <Heading color="black" as="h2" fontSize="2xl" mb={4} textAlign="center">
              Login
            </Heading>

            {error && <Text color="red.500" mb={4} textAlign="center">{error}</Text>}

            <form onSubmit={handleSubmit}>
              <Fieldset.Root size="lg" maxW="md">
                <Stack>
                  <Field.Root>
                    <Field.Label color="black">Email</Field.Label>
                    <Input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      color="black" 
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label color="black">Password</Field.Label>
                    <Input 
                      type="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                      color="black"
                    />
                  </Field.Root>
                </Stack>
              </Fieldset.Root>

              <Button 
                type="submit" 
                colorScheme="blue" 
                width="100%" 
                mt={4}
                loading={isLoading}
              >
                Login
              </Button>
            </form>

            <Text mt={4} textAlign="center" color="black">
              Don't have an account? {" "}
              <RouterLink to="/register" color="blue.500" onClick={onClose}>
                Register here
              </RouterLink>
            </Text>
          </Box>
        </motion.div>
      </motion.div>
    </>
  );
}

export default LoginModal;