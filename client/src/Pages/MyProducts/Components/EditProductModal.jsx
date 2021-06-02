import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  Button,
  Textarea,
  useToast
} from "@chakra-ui/react";
import { editProduct } from '../../../Stores/action'
import { useDispatch, useSelector } from 'react-redux'

const EditProductModal = ({ isOpen, onClose, product }) => {
  const toast = useToast()
  const dispatch = useDispatch()
  const [Product, setProduct] = useState(product)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setProduct({ ...Product, [name]: value })
  }

  function handleSave() {
    dispatch(editProduct(Product, toast))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              placeholder="Product Name..."
              name="name"
              value={Product.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              placeholder="Description..."
              name="description"
              value={Product.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rent Price</FormLabel>
            <Input
              type="number"
              placeholder="Rent Price..."
              name="rentPrice"
              value={Product.rentPrice}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Guarantee Price</FormLabel>
            <Input
              type="number"
              placeholder="Guarantee Price"
              name="rentPrice"
              value={Product.rentPrice}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Thickness</FormLabel>
            <Input
              type="number"
              placeholder="1 to 100"
              name="thickness"
              value={Product.thickness}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Strechability</FormLabel>
            <Input
              type="number"
              placeholder="1 to 100"
              name="stretchability"
              value={Product.stretchability}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Fit</FormLabel>
            <Input
              type="text"
              placeholder="Size"
              name="fit"
              value={Product.fit}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Waist Size</FormLabel>
            <Input
              type="number"
              placeholder="Size of the Waist"
              name="waistSize"
              value={Product.waistSize}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hips Size</FormLabel>
            <Input
              type="number"
              placeholder="Size of the Hips"
              name="hipsSize"
              value={Product.hipsSize}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bust Size</FormLabel>
            <Input
              type="number"
              placeholder="Size of the Bust"
              name="bustSize"
              value={Product.bustSize}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Length</FormLabel>
            <Input
              type="number"
              placeholder="Product Length"
              name="length"
              value={Product.length}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="black" bg="black" color="white" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
