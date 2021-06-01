import React from "react";
import Navbar from "../../Components/Navbar";
import { useHistory } from "react-router-dom";
import { Flex, Text, Button, Stack } from "@chakra-ui/react";
const LoadingPage = () => {
  const history = useHistory();
  function handleOnClickTakeMeHome() {
    history.push("/");
  }
  return (
    <>
      <Flex
        minH="90vh"
        bg="mainColor.bg"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDirection="column"
          h="60vh"
          alignItems="center"
          justifyContent="center"
          spacing="5"
        >
          <Text
            color="mainColor.fontColor"
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing="widest"
          >
            Your Page is Loading
          </Text>
          <Text>Please Wait ...</Text>
        </Stack>
      </Flex>
    </>
  );
};

export default LoadingPage;
