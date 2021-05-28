import React from "react";
import {
  Box,
  Button,
  Text,
  Image,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
const Login = () => {
  return (
    <Flex
      h="90vh"
      bg="mainColor.bg"
      alignItems="center"
      justifyContent="center"
    >
      <Flex bg="white" h="70vh" w="60%">
        <HStack>
          <Image
            src="https://images.unsplash.com/photo-1583846782968-4ebf5c76cc02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80"
            alt="login-img"
            h="100%"
          />
          <Flex
            justifyContent="center"
            alignItems="center"
            w="100vh"
            flexDirection="column"
          >
            <Text
              textAlign="center"
              fontWeight="bold"
              fontSize="2xl"
              color="mainColor.fontColor"
            >
              Welcome Back !
            </Text>
            <Text textAlign="center" fontSize="xs" color="gray.400">
              Please fill your Email and Password.
            </Text>
            <InputGroup justifyContent="center" mt="4">
              <InputLeftElement
                pointerEvents="none"
                children={<AtSignIcon color="gray.500" />}
                ml="8"
              />
              <Input
                w="85%"
                borderWidth="1px"
                borderRadius={null}
                borderColor="mainColor.fontColor"
                placeholder="Email"
                type="email"
              />
            </InputGroup>
            <InputGroup justifyContent="center" mt="4">
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color="gray.500" />}
                ml="8"
              />
              <Input
                w="85%"
                borderWidth="1px"
                borderRadius={null}
                borderColor="mainColor.fontColor"
                placeholder="Password"
                type="password"
              />
            </InputGroup>
            <Button
              w="85%"
              mt="4"
              colorScheme="black"
              bg="mainColor.fontColor"
              borderRadius={null}
            >
              Login
            </Button>
            <Text fontSize="xs" mt="4" fontWeight="bold">
              Don't have an account yet ?{" "}
              <span style={{ color: "blue", cursor: "pointer" }}>Register</span>
            </Text>
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
