import React, { useEffect, useState } from "react";
import TransactionHistoryTable from "./Components/TransactionHistoryTable";
import { Box, Flex, Text } from "@chakra-ui/react";
import { fetchHistoryTransactions } from '../../Stores/action'
import { useDispatch, useSelector } from 'react-redux'

const TransactionHistory = () => {
  const dispatch = useDispatch()
  const transactions = useSelector(state => state.transactions)

  useEffect(() => {
    dispatch(fetchHistoryTransactions())
  }, [dispatch]);

  if (!transactions.currentlyRenting || !transactions.rentedProducts) {
    return <Text>Loading</Text>
  }

  return (
    <Box
      minH="90vh"
      bg="mainColor.bg"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        justifyContent="center"
        bg="white"
        h="80vh"
        w="90%"
        p="8"
        flexDirection="column"
        overflow="auto"
        overflowX="hidden"
      >
        <Text
          color="mainColor.fontColor"
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="widest"
          textAlign="center"
          mb="2"
        >
          My Rent History
        </Text>
        <TransactionHistoryTable transactions={transactions.currentlyRenting} />
        <Text
          color="mainColor.fontColor"
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="widest"
          textAlign="center"
          mb="2"
        >
          My Rented Product History
        </Text>
        <TransactionHistoryTable transactions={transactions.rentedProducts} />
      </Flex>
    </Box>
  );
};

export default TransactionHistory;
