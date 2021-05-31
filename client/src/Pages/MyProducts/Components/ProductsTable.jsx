import React from "react";
import { useHistory } from "react-router-dom";
import EditProductModal from "../Components/EditProductModal";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Badge,
  Image,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, InfoIcon, EditIcon } from "@chakra-ui/icons";
const ProductsTable = () => {
  const history = useHistory();
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleOnClickDetails(id) {
    history.push("/details/" + id);
  }

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Message</Th>
            <Th>Availability</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Clothes 1</Td>
            <Td>
              <Box h="150px" w="150px">
                <Image
                  src="https://images.unsplash.com/photo-1485527691629-8e370684924c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80"
                  h="100%"
                />
              </Box>
            </Td>
            <Td>
              <Badge colorScheme="green">Available</Badge>
            </Td>
            <Td>
              <IconButton
                colorScheme="teal"
                icon={<InfoIcon />}
                onClick={() => handleOnClickDetails(1)}
              />
              <IconButton
                colorScheme="yellow"
                icon={<EditIcon />}
                ml="2"
                onClick={onOpen}
              />
              <IconButton ml="2" icon={<DeleteIcon />} />
            </Td>
          </Tr>
          <Tr>
            <Td>Clothes 2</Td>
            <Td>
              <Box h="150px" w="150px">
                <Image
                  src="https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80"
                  alt="product img"
                  h="100%"
                />
              </Box>
            </Td>
            <Td>
              <Badge colorScheme="red">Rented</Badge>
            </Td>
            <Td>
              <IconButton
                colorScheme="teal"
                icon={<InfoIcon />}
                onClick={() => handleOnClickDetails(2)}
              />
              <IconButton
                colorScheme="yellow"
                icon={<EditIcon />}
                ml="2"
                onClick={onOpen}
              />
              <IconButton ml="2" icon={<DeleteIcon />} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <EditProductModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ProductsTable;
