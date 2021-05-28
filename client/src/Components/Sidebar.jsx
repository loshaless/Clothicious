import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Text,
  StackDivider,
  VStack,
  Box,
} from "@chakra-ui/react";
const Sidebar = ({ isOpen, onClose, sideBarRef }) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={sideBarRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Clothicous Menu</DrawerHeader>
          <DrawerBody>
            <VStack
              divider={<StackDivider />}
              spacing={4}
              alignItems="flex-start"
            >
              <Box cursor="pointer" w="100%" h="8">
                <Text color="mainColor.fontColor">Home</Text>
              </Box>
              <Box cursor="pointer" w="100%" h="8">
                <Text color="mainColor.fontColor">Browse Product</Text>
              </Box>
              <Box cursor="pointer" w="100%" h="8">
                <Text color="mainColor.fontColor">Dashboard</Text>
              </Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
