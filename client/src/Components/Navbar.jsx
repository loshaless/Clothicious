import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import LogoutAlert from "./LogoutAlert"
import { Flex, Spacer, Button, Text, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux'
const Navbar = ({ Link }) => {
  const dispatch = useDispatch()
  const sideBarRef = React.useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { 
    isOpen : isOpenLogoutAlert,
    onClose : onCloseLogoutAlert,
    onOpen : onOpenLogoutAlert
   } = useDisclosure();
  const isLogin = useSelector(state => state.isLogin)

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      dispatch({ type: 'SET_LOGIN', payload: true })
    }
  }, [dispatch]);

  function handleLogout() {
    onOpenLogoutAlert()
  }

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
        {(!isLogin) && (
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
        )}
        {(isLogin) && (
          <Button
            // variant="outline"
            colorScheme="blackAlpha"
            color="white"
            borderRadius={null}
            mr="8"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        )}
      </Flex>
      <Sidebar
        isOpen={isOpen}
        onClose={onClose}
        sideBarRef={sideBarRef}
        Link={Link}
      />
      <LogoutAlert isOpen={isOpenLogoutAlert}  onClose={onCloseLogoutAlert}/>
    </>
  );
};

export default Navbar;
