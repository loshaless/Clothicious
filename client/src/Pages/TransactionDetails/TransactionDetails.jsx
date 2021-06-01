import React from "react";
import Breadcrumb from "./Components/BreadcrumbTransactions";
import {
  Flex,
  Box,
  Text,
  SimpleGrid,
  Image,
  Spacer,
  Button,
  HStack,
  VStack,
  StackDivider,
  Badge,
} from "@chakra-ui/react";
const TransactionDetails = () => {
  return (
    <Flex minH="90vh" bg="mainColor.bg" flexDirection="column">
      <Breadcrumb />
      <Flex w="75%" justifyContent="center" alignSelf="center" mt="8">
        <SimpleGrid columns={2} spacing={10} bg="white">
          <Box h="65vh" w="80%" p="8" ml="16">
            <Image
              src="https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              alt="tr details img"
              h="100%"
            />
          </Box>
          <Flex
            bg="white"
            py="8"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Text fontWeight="bold" fontSize="2xl" letterSpacing="widest">
              Transaction Details
            </Text>
            <VStack divider={<StackDivider />} mt="2">
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">Product Name</Text>
                <Spacer />
                <Text>Cloth 1</Text>
              </HStack>
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">Due Period</Text>
                <Spacer />
                <Badge colorScheme="purple">1 Day</Badge>
              </HStack>
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">Owner Name</Text>
                <Spacer />
                <Text>Jessica Wang</Text>
              </HStack>
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">Rent Price</Text>
                <Spacer />
                <Text>Rp.100.000</Text>
              </HStack>
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">Deposit</Text>
                <Spacer />
                <Text>Rp.200.000</Text>
              </HStack>
            </VStack>
            <Spacer />
            <Button
              borderRadius={null}
              w="40vh"
              bg="black"
              color="white"
              colorScheme="black"
            >
              Request Return
            </Button>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default TransactionDetails;
