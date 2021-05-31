import React, { useEffect } from "react";
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
import { fetchProductsByLoggedUser, deleteProduct } from '../../../Stores/action'
import { useDispatch, useSelector } from 'react-redux'

const ProductsTable = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    dispatch(fetchProductsByLoggedUser())
  }, [dispatch, products]);

  function handleOnClickDetails(id) {
    history.push("/details/" + id);
  }

  function handleDelete(id) {
    dispatch(deleteProduct(id))
  }

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Availability</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(product => {
            return (
              <Tr>
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
                  <Badge colorScheme={product.availability ? "green" : "red"}>{product.availability ? "Available" : "Rented"}</Badge>
                </Td>
                <Td>
                  <IconButton
                    colorScheme="teal"
                    icon={<InfoIcon />}
                    onClick={() => handleOnClickDetails(product.id)}
                  />
                  <IconButton
                    colorScheme="yellow"
                    icon={<EditIcon />}
                    ml="2"
                    onClick={onOpen}
                  />
                  {product.availability && <IconButton ml="2" icon={<DeleteIcon />} onClick={() => handleDelete(product.id)} />}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <EditProductModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ProductsTable;
