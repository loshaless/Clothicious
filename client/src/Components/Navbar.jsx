import React from "react";
import Sidebar from "./Sidebar";
import { Flex, Spacer, Button, Text, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
const Navbar = () => {
  const sideBarRef = React.useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Flex h="16" alignItems="center">
        <HamburgerIcon
          fontSize="xl"
          fontWeight="thin"
          ref={sideBarRef}
          onClick={onOpen}
          cursor="pointer"
          ml="8"
        />
        <Text
          color="mainColor.fontColor"
          fontWeight="bold"
          ml="8"
          fontSize="lg"
          cursor="pointer"
        >
          Clothicious.
        </Text>
        <Spacer />
        <Button
          variant="ghost"
          colorScheme="blackAlpha"
          color="mainColor.fontColor"
          borderRadius={null}
          mr="8"
        >
          Sign In
        </Button>
      </Flex>
      <Sidebar isOpen={isOpen} onClose={onClose} sideBarRef={sideBarRef} />
    </>
  );
};

export default Navbar;
