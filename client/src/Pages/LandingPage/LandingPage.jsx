import React from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const LandingPage = () => {
  const colIdx = [0, 1, 2, 3, 4, 5, 6, 7];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Box minH="100vh" bg="mainColor.bg">
      <Flex alignItems="center" justifyContent="space-evenly">
        <Flex flexDirection="column">
          <Text fontSize="3xl" fontWeight="bold" color="black">
            Kata Kata yang paling nyentrik
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="black">
            Buat memikat User
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.400">
            Ini Subjudul juga pokonya yang keren
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.400" mt="8">
            Sewa baju mulai Harga{" "}
            <Text fontSize="lg" fontWeight="bold" color="black">
              Rp.200.000
            </Text>
          </Text>
          <Button
            w="85%"
            mt="4"
            colorScheme="white"
            bg="white"
            borderRadius={null}
            color="black"
            mt="8"
          >
            Get Started
          </Button>
        </Flex>
        <Box bg="mainColor.lightGreen" mt="16" h="60vh">
          <Image
            src="https://images.unsplash.com/photo-1528356857578-6dc41b9a62e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            h="60vh"
            mt="-8"
            ml="-8"
          />
        </Box>
      </Flex>
      <SimpleGrid columns={3} spacing={10} bg="white" h="20vh" mt="8">
        <Flex alignItems="center" justifyContent="center">
          marketing Statistics 1
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          marketing Statistics 2
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          marketing Statistics 3
        </Flex>
      </SimpleGrid>
      <Text
        textAlign="center"
        fontSize="2xl"
        fontWeight="bold"
        color="black"
        my="8"
      >
        The Flow
      </Text>
      <SimpleGrid columns={3} spacing={10} minH="25vh" mt="8" pb="8">
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
            w="80%"
            h="35vh"
          ></Image>
          <Text fontWeight="bold" color="mainColor.fontColor" my="4">
            Find Your Perfect Clothes
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src="https://images.unsplash.com/photo-1565665681743-6ff01c5181e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=686&q=80"
            w="80%"
            h="35vh"
          ></Image>
          <Text fontWeight="bold" color="mainColor.fontColor" my="4">
            Make Aggreement
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src="https://images.unsplash.com/photo-1540578956368-95ae86e7012f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80"
            w="80%"
            h="35vh"
          ></Image>
          <Text fontWeight="bold" color="mainColor.fontColor" my="4">
            Wear it
          </Text>
        </Flex>
      </SimpleGrid>
      <Flex bg="white" flexDirection="column" pb="8">
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          color="mainColor.fontColor"
          my="8"
        >
          Browse Clothes
        </Text>
        <Carousel responsive={responsive} showDots={true}>
          {colIdx.map((i) => (
            <Box
              d="flex"
              flexDirection="column"
              bg="mainColor.bg"
              w="80%"
              h="100%"
              pb="5"
              ml="8"
            >
              <Image
                src="https://images.unsplash.com/photo-1593075979461-e0116242e814?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                h="90%"
              />
              <Text
                textAlign="center"
                color="mainColor.fontColor"
                fontWeight="bold"
                textTransform="uppercase"
                mt="2"
              >
                Clothes {i}
              </Text>
              <Text textAlign="center" color="mainColor.fontColor" mt="2">
                Author : Someone
              </Text>
            </Box>
          ))}
        </Carousel>
      </Flex>
      <Flex
        minH="50vh"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        pb="16"
      >
        <Text fontSize="2xl" fontWeight="bold" color="black" my="8">
          What Are They Said ?
        </Text>
        <Flex justifyContent="space-around" w="100%" alignItems="center">
          <Box w="20%" bg="mainColor.lightGreen" h="55vh">
            <Image
              src="https://images.unsplash.com/photo-1578100584776-fdf3ff0b367f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80"
              h="55vh"
              ml="10"
              mt="8"
            />
          </Box>
          <Flex
            flexDirection="column"
            alignItems="center"
            borderWidth="2px"
            borderColor="mainColor.fontColor"
            p="4"
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="mainColor.fontColor"
              textAlign="center"
            >
              Stephanie Sarah
            </Text>
            <Text fontSize="lg" color="gray.500" textAlign="center">
              Fashion Designer
            </Text>
            <Text
              fontSize="2xl"
              color="mainColor.fontColor"
              textAlign="center"
              mt="4"
            >
              Testimonial Advices Here, for Marketing Purposes
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex bg="black" color="white" minH="30vh">
        <SimpleGrid columns={4} spacing={10} p="8" w="100%">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold" ml="8" fontSize="xl" letterSpacing="widest">
              TRY CLOTHES.
            </Text>
            <Text ml="8" fontSize="sm">
              {new Date().getFullYear()} &bull; All Rights Reserved
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold" letterSpacing="widest">
              Headquarter
            </Text>
            <Text textAlign="center" fontSize="sm" mt="2" cursor="pointer">
              Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522 (257)
              563-7401
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold" letterSpacing="widest">
              Carreers
            </Text>
            <Text cursor="pointer">The Company</Text>
            <Text cursor="pointer">Demand</Text>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontWeight="bold" letterSpacing="widest">
              Products
            </Text>
            <Text cursor="pointer">License</Text>
            <Text cursor="pointer">Payment Policy</Text>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default LandingPage;
