import React from 'react'
import EditProductModal from "../Components/EditProductModal";
import { useHistory } from "react-router-dom";
import {
  Tr,
  Td,
  IconButton,
  Badge,
  Image,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteProduct } from '../../../Stores/action'
import { DeleteIcon, InfoIcon, EditIcon } from "@chakra-ui/icons";
import { useDispatch } from 'react-redux'

function ProductTableData({ product, setRefresh }) {
  const dispatch = useDispatch()
  const history = useHistory();
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleOnClickDetails(id) {
    history.push("/details/" + id);
  }

  function handleDelete(id) {
    dispatch(deleteProduct(id))
  }

  return (
    <Tr key={product.id}>
      <EditProductModal isOpen={isOpen} product={product} onClose={onClose} setRefresh={setRefresh} />
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
}

export default ProductTableData
