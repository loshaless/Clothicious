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
import {
  fetchTransactionDetail,
  rupiah, fetchUserData,
  buyerConfirmation,
  sellerConfirmation,
  deleteUserMessage,
  deleteSellerMessage
}
  from '../../Stores/action'
import LoadingPage from '../LoadingPage/LoadingPage'

const TransactionDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch()
  const transactionDetail = useSelector(state => state.transactionDetail)
  const user = useSelector(state => state.user)

  let rentedProductPage = false
  let message = transactionDetail.msgForUser
  let period = transactionDetail.period

  useEffect(() => {
    dispatch(fetchTransactionDetail(id))
    dispatch(fetchUserData())
  }, [dispatch]);

  if (!transactionDetail.Product) {
    return <LoadingPage />
  }

  if (user.id === transactionDetail.seller.id) {
    rentedProductPage = true
    message = transactionDetail.msgForSeller
    period = transactionDetail.confirmationPeriod
  }

  function handleReturnPackage() {
    dispatch(buyerConfirmation(transactionDetail.id))
  }

  function handleConfirmAndDelete() {
    if (message === "have you received back your package?") {
      dispatch(sellerConfirmation(transactionDetail.id, transactionDetail.Product.id))
    }
    else if (message === "your deposit will be returned to you in 3 days") {
      dispatch(deleteUserMessage(transactionDetail.id))
    }
    else if (message === "your money will be sent to you in 3 days") {
      dispatch(deleteSellerMessage(transactionDetail.id))
    }
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
                <Text fontWeight="bold">{rentedProductPage ? "Customer Name" : "Owner Name"}</Text>
                <Spacer />
                <Text>{rentedProductPage ? transactionDetail.user.username : transactionDetail.seller.username}</Text>
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
              {period !== null && (
                <HStack p="1" w="45vh">
                  <Text fontWeight="bold">{rentedProductPage ? "You should confirm in" : "You should return package in"}</Text>
                  <Spacer />
                  <Text>{period} days</Text>
                </HStack>
              )}
              {message !== null && <HStack p="1" w="45vh">
                <Text fontWeight="bold">Notes</Text>
                <Spacer />
                <Badge colorScheme="purple">{message}</Badge>
              </HStack>}
            </VStack>
            <Spacer />
            {message !== null && (
              <Button borderRadius={null} w="40vh" bg="black" color="white" colorScheme="black" onClick={handleConfirmAndDelete}>
                {message === "have you received back your package?" && "Confirm Received My Package"}
                {message === "your deposit will be returned to you in 3 days" && "Delete Message"}
                {message === "your money will be sent to you in 3 days" && "Delete Message"}
              </Button>
            )}
            {((message === null && !rentedProductPage && period !== null) || message === "please return the item you borrowed") && (
              <Button borderRadius={null} w="40vh" bg="black" color="white" colorScheme="black" onClick={handleReturnPackage}>
                Return Package to Owner
              </Button>
            )}
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default TransactionDetails;
