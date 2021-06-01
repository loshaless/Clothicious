import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactionDetail, rupiah, fetchUserData } from '../../Stores/action'

const TransactionDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch()
  const transactionDetail = useSelector(state => state.transactionDetail)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchTransactionDetail(id))
    dispatch(fetchUserData())
  }, [dispatch]);

  if (!transactionDetail.Product) {
    return <Text> Loading</Text>
  }

  return (
    <Flex minH="90vh" bg="mainColor.bg" flexDirection="column">
      <Breadcrumb />
      <Flex w="75%" justifyContent="center" alignSelf="center" mt="8">
        <SimpleGrid columns={2} spacing={10} bg="white">
          <Box h="65vh" w="80%" p="8" ml="16">
            <Image
              src={transactionDetail.Product.frontImg}
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
              Transaction Detail
            </Text>
            <VStack divider={<StackDivider />} mt="2">
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">Product Name</Text>
                <Spacer />
                <Text>{transactionDetail.Product.name}</Text>
              </HStack>
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">Notes</Text>
                <Spacer />
                <Badge colorScheme="purple">1 Days</Badge>
              </HStack>
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">{user.id === transactionDetail.seller.id ? "Customer Name" : "Owner Name"}</Text>
                <Spacer />
                <Text>{user.id === transactionDetail.seller.id ? transactionDetail.user.username : transactionDetail.seller.username}</Text>
              </HStack>
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">Rent Price</Text>
                <Spacer />
                <Text>{rupiah(transactionDetail.Product.rentPrice)}</Text>
              </HStack>
              <HStack p="1" w="45vh">
                <Text fontWeight="bold">Deposit Price</Text>
                <Spacer />
                <Text>{rupiah(transactionDetail.Product.guaranteePrice)}</Text>
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
              Proceed Return
            </Button>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default TransactionDetails;
