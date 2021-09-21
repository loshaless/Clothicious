import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    AlertDialogCloseButton,
    useToast
  } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"  
import { useDispatch } from "react-redux"
const LogoutAlert = ({ onClose, isOpen }) => {
  const cancelRef = React.useRef()
  const history = useHistory()
  const toast = useToast()
  const dispatch = useDispatch()
  function handleConfirmLogout() {
    dispatch({ type: 'SET_LOGIN', payload: false })
    localStorage.removeItem('access_token')
    history.push("/");
    onClose()
    toast({
          title: "Logout Success.",
          status: "success",
          duration: 3000,
          isClosable: true,
          variant: "left-accent",
          position: "top"
      })
  }
    return (
        <>
            <AlertDialog
                motionPreset="scale"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
                closeOnOverlayClick={false}
            >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Are You Sure Want To Logout ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Come back here soon :)
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="black"
              bg="blue.100"
              color="blue.600"
              ml={3}
              onClick={handleConfirmLogout}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </>
    )
}

export default LogoutAlert
