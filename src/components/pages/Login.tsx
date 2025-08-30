import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  VStack,
  Card,
  CardBody,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const cardBg = useColorModeValue("white", "gray.800");
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login({ email, password });
      if (success) {
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description:
          error instanceof Error ? error.message : "Invalid credentials",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Card bg={cardBg} boxShadow="xl" borderRadius="lg" w="100%" maxW="md">
        <CardBody p={8}>
          <VStack spacing={6}>
            <Box textAlign="center">
              <Heading as="h1" size="xl" color="blue.600" mb={2}>
                e-Vikao
              </Heading>
              <Text color="gray.600">Meeting Management Dashboard</Text>
            </Box>

            <Box as="form" onSubmit={handleSubmit} w="100%">
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="100%"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>
              </VStack>
            </Box>

            {/* Demo credentials */}
            <Box bg="blue.50" p={4} borderRadius="md" w="100%">
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Demo Credentials:
              </Text>
              <Text fontSize="sm">Admin: admin@evikao.com / password</Text>
              <Text fontSize="sm">User: user@evikao.com / password</Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Login;
