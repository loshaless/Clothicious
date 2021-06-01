import React from 'react'
import {
  Text,
  SimpleGrid,
  Image,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function RentedProductCard({ transaction }) {
  const history = useHistory();

  function handleOnClickDetails() {
    history.push(`details-transaction/${transaction.id}`);
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
      <Badge colorScheme="twitter" textAlign="center">
        {transaction.user.username}
      </Badge>
      <Button borderRadius={null} onClick={handleOnClickDetails}>Details</Button>
    </SimpleGrid>
  )
}

export default RentedProductCard
