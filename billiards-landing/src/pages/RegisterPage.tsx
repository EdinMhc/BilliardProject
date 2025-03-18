import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    Text,
    Field,
    Fieldset,
    Stack,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  function RegisterPage() {
    const [formData, setFormData] = useState({
      userName: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");
    
      try {
        const response = await fetch("https://localhost:7044/api/Account/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        
        const contentType = response.headers.get("content-type");
        let data;
    
        if (contentType && contentType.includes("application/json")) {
          
          data = await response.json();
        } else {
          
          const text = await response.text();
          data = text; 
        }
    
        if (response.ok) {
          setSuccess("User registered successfully!");
        } else if (response.status === 400) {
          
          if (typeof data === "string") {
            
            setError(data);
          } else if (data.errors && Array.isArray(data.errors)) {
            
            setError(data.errors[0]); 
          } else if (data[""] && Array.isArray(data[""])) {
            
            setError(data[""][0]); 
          } else {
            
            setError("Registration failed. Please check your input.");
          }
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };
  
    return (
      <Flex minH="100vh" align="center" justify="center" p={4}>
        <Box bg="black" p={8} borderRadius="lg" boxShadow="md" width="100%" maxW="400px">
          <Heading as="h1" fontSize="2xl" mb={6} textAlign="center">
            Register
          </Heading>
  
          {error && <Text color="red.500" mb={4} textAlign="center">{error}</Text>}
          {success && <Text color="green.500" mb={4} textAlign="center">{success}</Text>}
  
          <form onSubmit={handleSubmit}>
            <Fieldset.Root size="lg" maxW="md">
              <Stack>
                <Fieldset.Legend>Registration Details</Fieldset.Legend>
                <Fieldset.HelperText>Fill in the details below to create an account.</Fieldset.HelperText>
              </Stack>
  
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Username</Field.Label>
                  <Input name="userName" value={formData.userName} onChange={handleChange} required />
                </Field.Root>
  
                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </Field.Root>
  
                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
                </Field.Root>
  
                <Field.Root>
                  <Field.Label>First Name</Field.Label>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </Field.Root>
  
                <Field.Root>
                  <Field.Label>Last Name</Field.Label>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root>
  
            <Button type="submit" colorScheme="blue" width="100%" mt={4}>
              Register
            </Button>
          </form>
  
          {/* <Text mt={4} textAlign="center">
            Already have an account? <Link as={RouterLink} to="/login" color="blue.500">Login</Link>
          </Text> */}
        </Box>
      </Flex>
    );
  }
  
  export default RegisterPage;