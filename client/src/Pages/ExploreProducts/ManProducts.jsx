import React from "react";
import ExploreBreadcrumbs from "./Components/ExploreBreadcrumbs";
import Carousel from "react-multi-carousel";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
const NestedExploreProducts = () => {
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
    <Box minH="90vh" bg="mainColor.bg">
      <Flex>
        <ExploreBreadcrumbs category="Man" />
      </Flex>
      <Flex justifyContent="center" mb="8">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="widest"
          color="mainColor.fontColor"
          mt="4"
        >
          A COOL AND STYLISH MAN
        </Text>
      </Flex>
      <Carousel responsive={responsive} showDots={true}>
        {colIdx.map((i) => (
          <Box
            h="65vh"
            w="245px"
            pb="14"
            bg="mainColor.lightGreen"
            cursor="pointer"
            ml="12"
          >
            <Image
              src="https://images.unsplash.com/photo-1604073536770-8a33e332f830?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=324&q=80"
              h="100%"
              w="245px"
            ></Image>
            <Text
              color="mainColor.hardGreen"
              textAlign="center"
              fontWeight="bold"
              mt="1"
            >
              Cloth Name
            </Text>
            <Text
              color="mainColor.hardGreen"
              textAlign="center"
              mt="1"
              fontSize="sm"
            >
              Owner : Owner Name
            </Text>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default NestedExploreProducts;
