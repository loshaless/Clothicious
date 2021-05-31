import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Text, Flex, SimpleGrid, Image } from "@chakra-ui/react";
const ExploreProducts = () => {
  const history = useHistory();
  function handleOnClickCategory(category) {
    history.push(`browse/${category}`);
  }
  return (
    <Box h="90vh" bg="mainColor.bg" p={4}>
      <Flex justifyContent="center">
        <Text fontSize="2xl" color="mainColor.fontColor" fontWeight="bold">
          Pick Your Style
        </Text>
      </Flex>
      <SimpleGrid
        columns={2}
        spacing={20}
        d="flex"
        justifyContent="center"
        mt="4"
      >
        <Box
          h="65vh"
          w="245px"
          pb="12"
          bg="mainColor.lightGreen"
          transition="200ms"
          _hover={{
            w: "275px",
            pb: "0",
            transition: "200ms",
          }}
          cursor="pointer"
          onClick={() => handleOnClickCategory("man")}
        >
          <Image
            src="https://images.unsplash.com/photo-1604073536770-8a33e332f830?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=324&q=80"
            h="100%"
          ></Image>
          <Text
            color="mainColor.hardGreen"
            textAlign="center"
            fontWeight="bold"
            mt="4"
          >
            A COOL AND STYLISH MAN
          </Text>
        </Box>
        <Box
          h="65vh"
          w="245px"
          pb="12"
          bg="mainColor.lightGreen"
          transition="200ms"
          _hover={{
            w: "275px",
            pb: "0",
            transition: "200ms",
          }}
          cursor="pointer"
          onClick={() => handleOnClickCategory("woman")}
        >
          <Image
            src="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            h="100%"
          ></Image>
          <Text
            color="mainColor.hardGreen"
            textAlign="center"
            fontWeight="bold"
            mt="4"
          >
            AN ELEGANT WOMAN
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ExploreProducts;
