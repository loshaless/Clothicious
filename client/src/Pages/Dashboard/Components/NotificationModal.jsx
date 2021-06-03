import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Skeleton
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages } from '../../../Stores/action'
import ModalData from './ModalData'

const NotificationModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.messages)

  useEffect(() => {
    dispatch(fetchMessages())
  }, [dispatch]);

  if (!messages.msgAsUser || !messages.msgAsSeller) {
    return (<Stack spacing="5" w="100%">
      <Skeleton h="33vh" w="100%" />
      <Skeleton h="33vh" w="100%" />
      <Skeleton h="33vh" w="100%" />
    </Stack>)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notifications</ModalHeader>
        <ModalCloseButton />
        {messages.msgAsUser.length > 0 && (
          <ModalBody>
            <Stack direction="row" justifyContent="space-between" px="4">
              <Text fontWeight="bold" letterSpacing="widest">
                Rented Product Messages
            </Text>
              <Text fontWeight="bold" letterSpacing="widest">
                Actions
            </Text>
            </Stack>
            {messages.msgAsUser.map(message => {
              return (
                <ModalData key={message.transactionId} message={message} />
              )
            })}
          </ModalBody>
        )}
        {messages.msgAsSeller.length > 0 && (
          <ModalBody>
            <Stack direction="row" justifyContent="space-between" px="4">
              <Text fontWeight="bold" letterSpacing="widest">
                Currently Renting Messages
            </Text>
              <Text fontWeight="bold" letterSpacing="widest">
                Actions
            </Text>
            </Stack>
            {messages.msgAsSeller.map(message => {
              return (
                <ModalData key={message.transactionId} message={message}/>
              )
            })}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
