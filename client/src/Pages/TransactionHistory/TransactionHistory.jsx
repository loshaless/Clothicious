import React, { useEffect, useState } from "react";
import TransactionHistoryTable from "./Components/TransactionHistoryTable";
import { Box, Flex, Text, Stack, StackDivider } from "@chakra-ui/react";
import { fetchHistoryTransactions } from '../../Stores/action'
import { useDispatch, useSelector } from 'react-redux'
import LoadingPage from '../LoadingPage/LoadingPage'

const TransactionHistory = () => {
  const dispatch = useDispatch()
  const transactions = useSelector(state => state.transactions)

  useEffect(() => {
    dispatch(fetchHistoryTransactions())
  }, [dispatch]);

  if (!transactions.currentlyRenting || !transactions.rentedProducts) {
    return <LoadingPage />
  }

  return (
    <Box
      minH="90vh"
      bg="mainColor.bg"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        justifyContent="center"
        spacing={5}
        bg="white"
        h="80vh"
        w="90%"
        p="8"
        direction="row"
        divider={<StackDivider />}
      >
        <Stack
        direction="column"
        overflow="auto"
        overflowX="hidden"
        h="460px"
        w="100%"
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
        </Stack>
        <Stack
          direction="column"
          overflow="auto"
          overflowX="hidden"
          h="460px"
          w="100%"
        >
        <Text
          color="mainColor.fontColor"
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="widest"
          textAlign="center"
          mb="2"
        >
          Accepted Rent History
        </Text>
        <TransactionHistoryTable transactions={transactions.rentedProducts} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default TransactionHistory;
