import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import TransactionHistoryTableData from './TransactionHistoryTableData'

const TransactionHistoryTable = ({ transactions }) => {
  console.log(transactions);
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>No</Th>
          <Th>Name</Th>
          <Th>Image</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction, key) => {
          return <TransactionHistoryTableData product={transaction.Product} number={key} transactionId={transaction.id} key={key} />
        })}
      </Tbody>
    </Table>
  );
};

export default TransactionHistoryTable;
