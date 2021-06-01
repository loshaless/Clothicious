import React from 'react'
import {
  Tr,
  Td,
  IconButton,
  Image,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

function TransactionHistoryTableData({ product, number, transactionId }) {
  const history = useHistory();

  function handleDetail() {
    history.push(`details-transaction/${transactionId}`);
  }

  return (
    <Tr>
      <Td>{number + 1}</Td>
      <Td>{product.name}</Td>
      <Td>
        <Box h="150px" w="150px">
          <Image
            src={product.frontImg}
            h="100%"
          />
        </Box>
      </Td>
      <Td>
        <IconButton
          borderRadius={null}
          colorScheme="teal"
          icon={<InfoIcon />}
          onClick={handleDetail}
        />
      </Td>
    </Tr>
  )
}

export default TransactionHistoryTableData
