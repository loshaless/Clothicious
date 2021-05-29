import React from "react";
import EditModal from "./Components/EditModal";
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Grid,
  GridItem,
  Image,
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
import { EditIcon } from "@chakra-ui/icons";
const Dashboard = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Box
        minH="100vh"
        bg="mainColor.bg"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box bg="white" h="90vh" w="90%">
          <Flex justifyContent="center" alignItems="center" mt="4">
            <Text
              color="mainColor.fontColor"
              fontSize="2xl"
              fontWeight="bold"
              letterSpacing="widest"
            >
              User Dashboard
            </Text>
            <Tooltip label="Settings">
              <Flex alignSelf="end" cursor="pointer" ml="2" onClick={onOpen}>
                <EditIcon color="mainColor.fontColor" />
              </Flex>
            </Tooltip>
          </Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="4">
            <GridItem d="flex" justifyContent="center">
              <Avatar
                size="2xl"
                src="https://images.unsplash.com/photo-1554229897-d34a3f03ed4c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Table variant="unstyled" size="sm">
                <Tbody>
                  <Tr>
                    <Th>Name</Th>
                    <Td>Alexa Yu</Td>
                  </Tr>
                  <Tr>
                    <Th>Email</Th>
                    <Td>AlexaYu@mail.com</Td>
                  </Tr>
                  <Tr>
                    <Th>Phone Number</Th>
                    <Td>0182401934</Td>
                  </Tr>
                  <Tr>
                    <Th>Account Number</Th>
                    <Td>00009999</Td>
                  </Tr>
                  <Tr>
                    <Th>Address</Th>
                    <Td>
                      Theodore Lowe Ap #867-859 Sit Rd. Azusa New York 39531
                      (793) 151-6230
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(4, 1fr)" gap={6} mt="8">
            <GridItem
              d="flex"
              alignItems="center"
              colSpan="2"
              flexDirection="column"
            >
              <Text fontWeight="bold" letterSpacing="widest" fontSize="lg">
                My Rented Products
              </Text>
              <Box w="100%" h="45vh" p="4" overflow="auto" overflowX="hidden">
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
                    src="https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                    alt="product img"
                  />
                  <Text textAlign="center">Products Name</Text>
                  <Badge colorScheme="twitter" textAlign="center">
                    Renter Name
                  </Badge>
                  <Button borderRadius={null}>Details</Button>
                </SimpleGrid>
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
                    src="https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                    alt="product img"
                  />
                  <Text textAlign="center">Products Name</Text>
                  <Badge colorScheme="twitter" textAlign="center">
                    Renter Name
                  </Badge>
                  <Button borderRadius={null}>Details</Button>
                </SimpleGrid>
              </Box>
            </GridItem>
            <GridItem
              d="flex"
              alignItems="center"
              colSpan="2"
              flexDirection="column"
            >
              <Text fontWeight="bold" letterSpacing="widest" fontSize="lg">
                Currently Renting
              </Text>
              <Box w="100%" h="45vh" p="4" overflow="auto" overflowX="hidden">
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
                    src="https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                    alt="product img"
                  />
                  <Text textAlign="center">Products Name</Text>
                  <Badge colorScheme="green" textAlign="center">
                    Returned
                  </Badge>
                  <Button borderRadius={null}>Details</Button>
                </SimpleGrid>
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
                    src="https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                    alt="product img"
                  />
                  <Text textAlign="center">Products Name</Text>
                  <Badge colorScheme="purple" textAlign="center">
                    3 Days
                  </Badge>
                  <Button borderRadius={null}>Details</Button>
                </SimpleGrid>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <EditModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Dashboard;
