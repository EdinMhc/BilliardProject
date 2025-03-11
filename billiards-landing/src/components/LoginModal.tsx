import { useState } from "react";
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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://localhost:7044/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login failed. Please try again.");
        return;
      }
      alert("Login Successful!");
      onClose();
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      align="center"
      justify="center"
      bg="rgba(0, 0, 0, 0.4)"
      backdropFilter="blur(5px)"
      zIndex={10}
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
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Field.Root>

              <Field.Root>
                <Field.Label color="black">Password</Field.Label>
                <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Field.Root>
            </Stack>
          </Fieldset.Root>

          <Button variant="surface" type="submit" colorScheme="blue" width="100%" mt={4}>
            Login
          </Button>
        </form>

        <Text mt={4} textAlign="center" color="black">
          Don't have an account? {" "}
          <RouterLink to="/register" color="blue.500">
            Register here
          </RouterLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default LoginModal;
