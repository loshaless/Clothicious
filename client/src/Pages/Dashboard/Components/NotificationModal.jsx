import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Button,
  Text,
  Spacer,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
const NotificationModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notifications</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="row" justifyContent="space-between" px="4">
            <Text fontWeight="bold" letterSpacing="widest">
              Message
            </Text>
            <Text fontWeight="bold" letterSpacing="widest">
              Actions
            </Text>
          </Stack>
          <SimpleGrid
            columns={2}
            spacing="5"
            py="2"
            px="4"
            bg="gray.100"
            my="2"
          >
            <Text letterSpacing="widest" fontSize="sm">
              Your Product has been Returned by : Name
            </Text>
            <Button
              colorScheme="black"
              bg="blue.100"
              color="blue.600"
              size="sm"
            >
              Return Guarantee
            </Button>
          </SimpleGrid>
          <SimpleGrid
            columns={2}
            spacing="5"
            py="2"
            px="4"
            bg="gray.100"
            my="2"
          >
            <Text letterSpacing="widest" fontSize="sm">
              Your Deposit has been Returned by : Name
            </Text>
            <Button
              colorScheme="black"
              bg="green.100"
              color="green.600"
              size="sm"
            >
              Accept & Close
            </Button>
          </SimpleGrid>
          <SimpleGrid
            columns={2}
            spacing="5"
            py="2"
            px="4"
            bg="gray.100"
            my="2"
          >
            <Text letterSpacing="widest" fontSize="sm">
              Transaction of "product name" succesfull, your payment will be
              sent within 3 working days
            </Text>
            <Button
              colorScheme="black"
              bg="green.100"
              color="green.600"
              size="sm"
            >
              Accept & Close
            </Button>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
