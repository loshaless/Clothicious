import React from "react";
import { Box, Text, Button, Flex, Image, SimpleGrid } from "@chakra-ui/react";
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
        How It Works (perlu diganti)
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
          ></Image>
          <Text fontWeight="bold" color="mainColor.fontColor" my="4">
            Browse Products
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
            w="80%"
          ></Image>
          <Text fontWeight="bold" color="mainColor.fontColor" my="4">
            Browse Products
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
            w="80%"
          ></Image>
          <Text fontWeight="bold" color="mainColor.fontColor" my="4">
            Browse Products
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
              w="75%"
              h="60vh"
              pb="5"
              ml="8"
            >
              <Image
                src="https://images.unsplash.com/photo-1605905337183-23443139dc06?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80"
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
      <Flex h="50vh" justifyContent="center">
        <Text fontSize="2xl" fontWeight="bold" color="black" my="8">
          What Are They Said ?
        </Text>
      </Flex>
    </Box>
  );
};

export default LandingPage;
