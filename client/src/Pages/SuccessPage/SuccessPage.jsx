import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Text, Button, Stack } from "@chakra-ui/react";
const SuccessPage = () => {
  const history = useHistory();

  function handleOnClickBrowseMore() {
    history.push("/browse");
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
          Transaction Success
        </Text>
        <Text>Kata kata here</Text>
        <Button
          w="100%"
          borderRadius="0"
          bg="black"
          color="white"
          colorScheme="black"
          onClick={handleOnClickBrowseMore}
        >
          Browse More
        </Button>
      </Stack>
    </Flex>
  );
};

export default SuccessPage;
