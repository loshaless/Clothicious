import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Text, Button, Stack } from "@chakra-ui/react";
const NoMatch = () => {
  const history = useHistory();
  function handleOnClickTakeMeHome() {
    history.push("/");
  }
  return (
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
          Are You Lost ?
        </Text>
        <Text>There is nothing to do here ...</Text>
        <Button
          w="100%"
          borderRadius="0"
          bg="black"
          color="white"
          colorScheme="black"
          onClick={handleOnClickTakeMeHome}
        >
          Take Me Home
        </Button>
      </Stack>
    </Flex>
  );
};

export default NoMatch;
