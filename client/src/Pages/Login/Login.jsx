import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Text,
  Image,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import { login } from '../../Stores/action'
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const toast = useToast()
  const isLoading = useSelector(state => state.isLoading)
  const initialFormState = { email: '', password: '' }
  const [data, setData] = useState(initialFormState)
  const isLogin = useSelector(state => state.isLogin)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(login(data, toast))
    toast({
      title: "Attempting Login.",
      status: "info",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top"
    })
  }

  function handleOnClickRegister() {
    history.push("/register");
  }

  if (isLogin || localStorage.getItem('access_token')) {
    history.push("/");
  }

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
            src="https://images.unsplash.com/photo-1615222443417-6d76586644a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=949&q=80"
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
                name="email"
                value={data.email}
                onChange={handleInputChange}
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
                name="password"
                value={data.password}
                onChange={handleInputChange}
              />
            </InputGroup>
            <Button
              w="85%"
              mt="4"
              colorScheme="black"
              bg="mainColor.fontColor"
              borderRadius={null}
              onClick={(event) => handleSubmit(event)}
            >
              SIGN IN
            </Button>
            <Text fontSize="xs" mt="4" fontWeight="bold">
              Don't have an account yet ?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={handleOnClickRegister}
              >
                Register
              </span>
            </Text>
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
