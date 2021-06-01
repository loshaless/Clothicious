import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Stack,
  Skeleton, Text
} from "@chakra-ui/react";
import { fetchProductsByLoggedUser } from '../../../Stores/action'
import { useDispatch, useSelector } from 'react-redux'
import ProductTableData from './ProductTableData'

const ProductsTable = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    dispatch(fetchProductsByLoggedUser())
  }, [dispatch]);

  useEffect(() => {
    if (refresh) {
      dispatch(fetchProductsByLoggedUser())
      setRefresh(false)
    }
  }, [dispatch, refresh]);

  if (!products) {
    return (
      <Stack spacing="5" w="100%">
        <Skeleton h="33vh" w="100%" />
        <Skeleton h="33vh" w="100%" />
        <Skeleton h="33vh" w="100%" />
      </Stack>
    )
  }

  return (
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
            <ProductTableData key={product.id} product={product} setRefresh={setRefresh} />
          )
        })}
      </Tbody>
    </Table>
  );
};

export default ProductsTable;
