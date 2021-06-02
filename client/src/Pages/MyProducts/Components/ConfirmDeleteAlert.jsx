import React from 'react'
import {
    AlertDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    AlertDialogCloseButton,
    useToast,
    AlertDialogBody
  } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"  
import { useDispatch } from "react-redux"
import { deleteProduct } from '../../../Stores/action'
const ConfirmDeleteAlert = ({ onClose, isOpen, id }) => {
  const cancelRef = React.useRef()
  const history = useHistory()
  const toast = useToast()
  const dispatch = useDispatch()
  
    function handleDelete() {
        dispatch(deleteProduct(id, toast))
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
          <AlertDialogHeader>Are You Sure Want To Discard ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Your changes can't be undone
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="black"
              bg="red.100"
              color="red.600"
              ml={3}
              onClick={handleDelete}
            >
              Discard
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </>
    )
}

export default ConfirmDeleteAlert
