import React from "react";
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
} from "@chakra-ui/react";
const EditProductModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input type="text" placeholder="Product Name..." />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea type="text" placeholder="Description..." />
          </FormControl>
          <FormControl>
            <FormLabel>Rent Price</FormLabel>
            <Input type="number" placeholder="Rent Price..." />
          </FormControl>
          <FormControl>
            <FormLabel>Guarantee Price</FormLabel>
            <Input type="number" placeholder="Guarantee Price" />
          </FormControl>
          <FormControl>
            <FormLabel>Thickness</FormLabel>
            <Input type="number" placeholder="1 to 100" />
          </FormControl>
          <FormControl>
            <FormLabel>Strechability</FormLabel>
            <Input type="number" placeholder="1 to 100" />
          </FormControl>
          <FormControl>
            <FormLabel>Fit</FormLabel>
            <Input type="text" placeholder="Size" />
          </FormControl>
          <FormControl>
            <FormLabel>Waist Size</FormLabel>
            <Input type="number" placeholder="Size of the Waist" />
          </FormControl>
          <FormControl>
            <FormLabel>Hips Size</FormLabel>
            <Input type="number" placeholder="Size of the Hips" />
          </FormControl>
          <FormControl>
            <FormLabel>Bust Size</FormLabel>
            <Input type="number" placeholder="Size of the Bust" />
          </FormControl>
          <FormControl>
            <FormLabel>Length</FormLabel>
            <Input type="number" placeholder="Product Length" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="black" bg="black" color="white">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
