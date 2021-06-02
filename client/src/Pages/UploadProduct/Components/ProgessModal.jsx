import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    CircularProgress,
    Text,
    Flex,
  } from "@chakra-ui/react"
const ProgessModal = ({ isOpen, onClose, percentage }) => {
  const cancelRef = React.useRef()
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
          <AlertDialogHeader textAlign="center">Uploading in Progress</AlertDialogHeader>
          <AlertDialogBody>
              <Flex justifyContent="center" alignItems="center" flexDirection="column">
              <CircularProgress isIndeterminate color="green.300">
              </CircularProgress>
              <Text>
                Your Images are being uploaded, please wait...
              </Text>
            <Text fontWeight="bold">{percentage === 100 ? "Uploading Your Images to Cloud" : "Connecting to Server"}</Text>
              </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
    )
}

export default ProgessModal
