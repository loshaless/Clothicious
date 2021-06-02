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
  useToast
} from "@chakra-ui/react";
import { editUser } from '../../../Stores/action'
import { useDispatch } from 'react-redux'

const EditModal = ({ isOpen, onClose, user }) => {
  const toast = useToast()
  const dispatch = useDispatch()
  const [User, setUser] = useState(user)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUser({ ...User, [name]: value })
  }

  function handleSave() {
    dispatch(editUser(User, toast))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name..."
              name="username"
              value={User.username}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              type="number"
              placeholder="Phone..."
              name="phone"
              value={User.phone}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              placeholder="Address..."
              name="address"
              value={User.address}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Account Number</FormLabel>
            <Input
              type="number"
              placeholder="Account Number"
              name="bankAccount"
              value={User.bankAccount}
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

export default EditModal;
