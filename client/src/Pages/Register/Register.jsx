import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import { FiUsers, FiPhone } from "react-icons/fi";
const Register = () => {
  return (
    <Flex
      bg="mainColor.bg"
      minH="90vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="white"
        h="70vh"
        w="50%"
      >
        <Text fontSize="2xl" color="mainColor.fontColor" fontWeight="bold">
          Hey, There !
        </Text>
        <Text textAlign="center" fontSize="xs" color="gray.400">
          Please fill with your Correct Credentials
        </Text>
        <InputGroup justifyContent="center" mt="4">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FiUsers} color="gray.500" />}
            ml="14"
          />
          <Input
            w="85%"
            borderWidth="1px"
            borderRadius={null}
            borderColor="mainColor.fontColor"
            placeholder="Full Name"
            type="text"
          />
        </InputGroup>
        <InputGroup justifyContent="center" mt="4">
          <InputLeftElement
            pointerEvents="none"
            children={<AtSignIcon color="gray.500" />}
            ml="14"
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
            ml="14"
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
        <InputGroup justifyContent="center" mt="4">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FiPhone} color="gray.500" />}
            ml="14"
          />
          <Input
            w="85%"
            borderWidth="1px"
            borderRadius={null}
            borderColor="mainColor.fontColor"
            placeholder="Phone Number"
            type="number"
          />
        </InputGroup>
        <Button colorScheme="blackAlpha" w="85%" borderRadius="0" mt="4">
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Register;
