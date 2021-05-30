import React from "react";
import TransactionHistoryTable from "./Components/TransactionHistoryTable";
import { Box, Flex, Text } from "@chakra-ui/react";
const TransactionHistory = () => {
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
          Transaction History
        </Text>
        <TransactionHistoryTable />
      </Flex>
    </Box>
  );
};

export default TransactionHistory;
