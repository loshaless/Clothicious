import React from 'react'
import {
  Button,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function ModalData({ message }) {
  const history = useHistory();

  function handleTransactionDetail() {
    history.push(`details-transaction/${message.transactionId}`);
  }

  return (
    <SimpleGrid
      columns={2}
      spacing="5"
      py="2"
      px="4"
      bg="gray.100"
      my="2"
    >
      <Text letterSpacing="widest" fontSize="sm"> {message.message}</Text>
      <Button
        colorScheme="black"
        bg="blue.100"
        color="blue.600"
        size="sm"
        onClick={handleTransactionDetail}
      >
        Details Transaction
      </Button>
    </SimpleGrid>
  )
}

export default ModalData
