import React, { useState } from "react";
import {
  Flex,
  Text,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import { FiUsers, FiPhone } from "react-icons/fi";
import { register } from '../../Stores/action'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

const Register = () => {
  let history = useHistory();
  const dispatch = useDispatch()
  const toast = useToast()
  const initialFormState = { name: '', email: '', password: '', phone: '' }
  const [data, setData] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
    // console.log(data);
  }

  function handleSubmit(event) {
    event.preventDefault()
    // console.log(data);
    dispatch(register(data, toast))
    history.push("/login")
  }

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
            name="name"
            value={data.name}
            onChange={handleInputChange}
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
            name="email"
            value={data.email}
            onChange={handleInputChange}
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
            name="password"
            value={data.password}
            onChange={handleInputChange}
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
            name="phone"
            value={data.phone}
            onChange={handleInputChange}
          />
        </InputGroup>
        <Button colorScheme="blackAlpha" w="85%" borderRadius="0" mt="4" onClick={(event) => handleSubmit(event)}>
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Register;
