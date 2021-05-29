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
          <DrawerHeader>Menu.</DrawerHeader>
          <DrawerBody>
            <VStack
              divider={<StackDivider />}
              spacing={4}
              alignItems="flex-start"
            >
              <Link to="/">
                <Box cursor="pointer" w="100%" h="8">
                  <Text color="mainColor.fontColor">Home</Text>
                </Box>
              </Link>
              <Box cursor="pointer" w="100%" h="8">
                <Text color="mainColor.fontColor">Browse Products</Text>
              </Box>
              <Link to="/dashboard">
                <Box cursor="pointer" w="100%" h="8">
                  <Text color="mainColor.fontColor">Dashboard</Text>
                </Box>
              </Link>
              <Link to="/products">
                <Box cursor="pointer" w="100%" h="8">
                  <Text color="mainColor.fontColor">My Products</Text>
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
