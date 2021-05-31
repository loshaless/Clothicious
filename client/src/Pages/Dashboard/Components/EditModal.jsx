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
} from "@chakra-ui/react";
const EditModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Name..." />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input type="number" placeholder="Phone..." />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" placeholder="Address..." />
          </FormControl>
          <FormControl>
            <FormLabel>Account Number</FormLabel>
            <Input type="text" placeholder="Account Number" />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Thickness</FormLabel>
            <Input
              type="number"
              placeholder="1 to 100"
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Strechability</FormLabel>
            <Input
              type="number"
              placeholder="1 to 100"
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="******" />
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

export default EditModal;
