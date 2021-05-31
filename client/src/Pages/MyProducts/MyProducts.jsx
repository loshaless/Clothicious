import React from "react";
import ProductsTable from "./Components/ProductsTable";
import { useHistory } from "react-router-dom";
import { Flex, Text, Box, Button, useDisclosure } from "@chakra-ui/react";
const MyProducts = () => {
  const history = useHistory();
  function handleOnClickUploadProduct() {
    history.push("/upload");
  }
  return (
    <>
      <Flex
        minH="90vh"
        bg="mainColor.bg"
        justifyContent="center"
        alignItems="center"
      >
        <Box h="85vh" w="90%" bg="white">
          <Flex justifyContent="center" alignItems="center" mt="4">
            <Text
              color="mainColor.fontColor"
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="widest"
            >
              My Products
            </Text>
          </Flex>
          <Flex
            mt="4"
            px="8"
            py="4"
            overflow="auto"
            overflowX="hidden"
            h="65vh"
          >
            <ProductsTable />
          </Flex>
          <Flex justifyContent="center">
            <Button
              w="30%"
              borderRadius={null}
              colorScheme="black"
              bg="blue.100"
              color="blue.700"
              onClick={handleOnClickUploadProduct}
            >
              Add Product to Rent
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default MyProducts;
