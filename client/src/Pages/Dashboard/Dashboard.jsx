import React, { useEffect, useState } from "react";
import EditModal from "./Components/EditModal";
import NotificationModal from "./Components/NotificationModal";
import {
  Box,
  Text,
  Flex,
  Grid,
  GridItem,
  Avatar,
  Table,
  Tr,
  Tbody,
  Td,
  Th,
  Button,
  Badge,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, fetchTransactions, fetchMessages } from '../../Stores/action'
import RentedProductCard from './Components/RentedProductCard'
import CurrentlyRentingCard from './Components/CurrentlyRentingCard'
import LoadingPage from '../LoadingPage/LoadingPage'

const Dashboard = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isNotifOpen,
    onClose: onCloseNotif,
    onOpen: onOpenNotif,
  } = useDisclosure();

  const history = useHistory();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const transactions = useSelector(state => state.transactions)
  const messages = useSelector(state => state.messages)

  useEffect(() => {
    dispatch(fetchUserData())
    dispatch(fetchTransactions())
    dispatch(fetchMessages())
  }, [dispatch]);

  function handleOnClickTransHistory() {
    history.push("/history-transaction");
  }

  if (!transactions.rentedProducts || !transactions.currentlyRenting || !messages.msgAsUser || !messages.msgAsSeller) {
    return <LoadingPage />
  }

  return (
    <>
      <Box
        minH="100vh"
        bg="mainColor.bg"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box bg="white" h="95vh" w="90%">
          <Flex justifyContent="center" alignItems="center" mt="4">
            <Text
              color="mainColor.fontColor"
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="widest"
            >
              My Profile
            </Text>
            <Tooltip label="Settings">
              <Flex alignSelf="end" cursor="pointer" ml="2" onClick={onOpen}>
                <EditIcon color="mainColor.fontColor" />
              </Flex>
            </Tooltip>
            {(messages.msgAsUser.length !== 0 || messages.msgAsSeller.length !== 0) && (
              <Button
                size="sm"
                variant="outline"
                alignSelf="end"
                ml="4"
                borderRadius="0"
                colorScheme="blackAlpha"
                onClick={onOpenNotif}
              >
                Notifications
                <Badge colorScheme="purple" fontSize="xs" ml="1">
                  {messages.msgAsUser.length + messages.msgAsSeller.length}
                </Badge>
              </Button>
            )}
          </Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="4">
            <GridItem d="flex" justifyContent="center">
              <Avatar
                size="2xl"
                src="https://image.flaticon.com/icons/png/512/482/482636.png"
                bg="white"
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Table variant="unstyled" size="sm">
                <Tbody>
                  <Tr>
                    <Th>Name</Th>
                    <Td>{user.username}</Td>
                  </Tr>
                  <Tr>
                    <Th>Email</Th>
                    <Td>{user.email}</Td>
                  </Tr>
                  <Tr>
                    <Th>Phone Number</Th>
                    <Td>{user.phone}</Td>
                  </Tr>
                  <Tr>
                    <Th>Account Number</Th>
                    <Td>{user.bankAccount}</Td>
                  </Tr>
                  <Tr>
                    <Th>Address</Th>
                    <Td>{user.address}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </GridItem>
          </Grid>
          <Flex justifyContent="center" mt="2">
            <Button
              borderRadius={null}
              bg="black"
              color="white"
              colorScheme="black"
              onClick={handleOnClickTransHistory}
            >
              Transaction History
            </Button>
          </Flex>
          <Grid templateColumns="repeat(4, 1fr)" gap={6} mt="4">
            <GridItem
              d="flex"
              alignItems="center"
              colSpan="2"
              flexDirection="column"
            >
              <Text fontWeight="bold" letterSpacing="widest" fontSize="lg">
                Products I Lend
              </Text>
              <Box w="100%" h="45vh" p="4" overflow="auto" overflowX="hidden">
                {transactions.rentedProducts.map(transaction => {
                  return (
                    <RentedProductCard key={transaction.id} transaction={transaction} />
                  )
                })}
              </Box>
            </GridItem>
            <GridItem
              d="flex"
              alignItems="center"
              colSpan="2"
              flexDirection="column"
            >
              <Text fontWeight="bold" letterSpacing="widest" fontSize="lg">
                Products I Rent
              </Text>
              <Box w="100%" h="45vh" p="4" overflow="auto" overflowX="hidden">
                {transactions.currentlyRenting.map(transaction => {
                  return (
                    <CurrentlyRentingCard key={transaction.id} transaction={transaction} />
                  )
                })}
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <EditModal isOpen={isOpen} onClose={onClose} user={user} />
      <NotificationModal isOpen={isNotifOpen} onClose={onCloseNotif} />
    </>
  );
};

export default Dashboard;
