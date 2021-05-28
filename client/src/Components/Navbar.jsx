import React from "react";
import Sidebar from "./Sidebar";
import { Flex, Spacer, Button, Text, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
const Navbar = ({ Link }) => {
  const sideBarRef = React.useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Flex h="16" alignItems="center" bg="mainColor.bg">
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
          fontSize="xl"
          letterSpacing="widest"
        >
          TRY CLOTHES.
        </Text>
        <Spacer />
        <Link to="/login">
          <Button
            variant="ghost"
            colorScheme="blackAlpha"
            color="mainColor.fontColor"
            borderRadius={null}
            mr="8"
          >
            Sign In
          </Button>
        </Link>
      </Flex>
      <Sidebar
        isOpen={isOpen}
        onClose={onClose}
        sideBarRef={sideBarRef}
        Link={Link}
      />
    </>
  );
};

export default Navbar;
