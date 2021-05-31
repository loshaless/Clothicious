import React from 'react'
import {
  Text,
  SimpleGrid,
  Image,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function CurrentlyRentingCard({ transaction }) {
  const history = useHistory();

  function handleOnClickDetails() {
    history.push(`details-transaction/${transaction.Product.id}`);
  }

  return (
    <SimpleGrid
      columns={4}
      gap={5}
      alignItems="center"
      border="1px"
      p="4"
      borderColor="mainColor.fontColor"
      mb="4"
    >
      <Image
        boxSize="100px"
        src={transaction.Product.frontImg}
        alt="product img"
      />
      <Text textAlign="center">{transaction.Product.name}</Text>
      <Badge colorScheme={transaction.period === null ? "green" : "purple"} textAlign="center">
        {transaction.period === null ? "Confirmation" : `${transaction.period} Days`}
      </Badge>
      <Button borderRadius={null}>Details</Button>
    </SimpleGrid>
  )
}

export default CurrentlyRentingCard
