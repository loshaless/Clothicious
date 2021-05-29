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
const Sidebar = ({ isOpen, onClose, sideBarRef, Link }) => {
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
          <DrawerHeader>MENU</DrawerHeader>
          <DrawerBody>
            <VStack
              divider={<StackDivider />}
              spacing={4}
              alignItems="flex-start"
            >
              <Link to="/">
                <Box cursor="pointer" w="40vh" h="8">
                  <Text color="mainColor.fontColor">HOME</Text>
                </Box>
              </Link>
              <Box cursor="pointer" w="40vh" h="8">
                <Text color="mainColor.fontColor">BROWSE PRODUCTS</Text>
              </Box>
              <Link to="/dashboard">
                <Box cursor="pointer" w="40vh" h="8">
                  <Text color="mainColor.fontColor">DASHBOARD</Text>
                </Box>
              </Link>
              <Link to="/products">
                <Box cursor="pointer" w="40vh" h="8">
                  <Text color="mainColor.fontColor">MY PRODUCTS</Text>
                </Box>
              </Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
