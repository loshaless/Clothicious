import React, { useEffect } from "react";
import LoadingPage from "../LoadingPage/LoadingPage"
import LandingPageBox from "./Components/Box"
import { useHistory } from "react-router-dom";
import { fetchProducts } from "../../Stores/action"
import { useDispatch, useSelector } from "react-redux"
import { Box, Text, Button, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Icon } from "@chakra-ui/react"
import { FaShippingFast, FaRecycle } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const isLoading = useSelector(state => state.isLoading);
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
  function handleOnClickCard(id) {
    history.push("/details/" + id);
  }

  function handleOnClickCTA() {
    history.push('/browse')
  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  console.log(products, 'dr landing page', "ini products")

  if(!products) return <LoadingPage />

  return (
    <Box minH="100vh" bg="mainColor.bg">
      <Flex alignItems="center" justifyContent="space-evenly">
        <Flex flexDirection="column">
          <Text fontSize="3xl" fontWeight="bold" color="black">
            Efortless Trendy Fashion With
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="black">
            TRY CLOTHES
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.400">
            Clothes Renting To Answer Your Full-Closet Dilemma
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.400" mt="8">
            Rent Clothes Easily From{" "}
            <Text fontSize="lg" fontWeight="bold" color="black">
              1.000+ Choices
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
            onClick={handleOnClickCTA}
          >
            Get Started
          </Button>
        </Flex>
        <Box bg="mainColor.lightGreen" mt="16" h="50vh">
          <Image
            src="https://cdn.shopify.com/s/files/1/0426/7006/3781/files/Banner_1200x.jpg?v=1601389314"
            h="50vh"
            mt="-8"
            ml="-8"
          />
        </Box>
      </Flex>
      <SimpleGrid columns={3} spacing={10} bg="white" h="20vh" mt="8">
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
          <Icon as={FaRecycle} w={8} h={8} />
          <Text>Support Sustainable Fashion</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
          <Icon as={GiClothes} w={8} h={8} />
          <Text>1.000+ Clothes</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
          <Icon as={FaShippingFast} w={8} h={8} />
          <Text>Free Delivery Within Jakarta Area</Text>
        </Flex>
      </SimpleGrid>
      <Text
        textAlign="center"
        fontSize="2xl"
        fontWeight="bold"
        color="black"
        my="8"
      >
        Step By Step To Try Clothes
      </Text>
      <SimpleGrid columns={3} spacing={10} minH="25vh" mt="8" pb="8">
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src="https://image.freepik.com/free-photo/close-up-clothes-hanging-rack_171337-7196.jpg"
            w="80%"
            h="35vh"
          ></Image>
          <Text fontWeight="bold" color="mainColor.fontColor" my="4">
            Browse Your Perfect Clothes
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src="https://image.freepik.com/free-photo/beautiful-young-smiling-asian-woman-working-laptop-while-home-office-work-space_7861-914.jpg"
            w="80%"
            h="35vh"
          ></Image>
          <Text fontWeight="bold" color="mainColor.fontColor" my="4">
            Get In Touch With The Owner
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Image
            src="https://image.freepik.com/free-photo/happy-smiling-couple-isolated-active-jumping-white-studio_285396-4960.jpg"
            w="80%"
            h="35vh"
          ></Image>
          <Text fontWeight="bold" color="mainColor.fontColor" my="4">
            Upgrade Your Style
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
          Pick Your Style
        </Text>
        <Carousel responsive={responsive} showDots={true}>
          {products && products.map((p) => (
           <LandingPageBox p={p} key={p.id}/>
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
          What They Said About Try Clothes
        </Text>
        <Flex justifyContent="space-around" w="100%" alignItems="center">
          <Box w="20%" bg="mainColor.lightGreen" h="55vh">
            <Image
              src="https://images.unsplash.com/photo-1608571857076-a52fe7c3321a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=978&q=80"
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
              Stephanie Santoso
            </Text>
            <Text fontSize="lg" color="gray.500" textAlign="center">
              Entrepreneur
            </Text>
            <Text
              fontSize="2xl"
              color="mainColor.fontColor"
              textAlign="center"
              mt="4"
            >
              "Try Clothes really helped me to find my perfect pre-wedding dress."
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
              888 Hacktiv8 St. Jakarta Indonesia 11840 (021)
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
