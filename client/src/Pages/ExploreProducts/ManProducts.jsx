import React, { useEffect, useState } from "react";
import ExploreBreadcrumbs from "./Components/ExploreBreadcrumbs";
import Carousel from "react-multi-carousel";
import { useHistory } from "react-router-dom"
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { fetchProducts } from '../../Stores/action'
import { useDispatch, useSelector } from 'react-redux'

const NestedExploreProducts = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const products = useSelector(state => state.products)
  const [filtered, setFiltered] = useState([])
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);
  
  useEffect(() => {
    setFiltered(products.filter(p => p.category === 'man'))
  },[products])

  function handleOnClickCard(id) {
    history.push("/details/" + id);
  }

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
        {filtered.map((product) => (
          <Box
            h="65vh"
            w="245px"
            pb="14"
            bg="mainColor.lightGreen"
            cursor="pointer"
            ml="12"
            key={product.id}
            onClick={() => handleOnClickCard(product.id)}
          >
            <Image
              src={product.frontImg}
              h="100%"
              w="245px"
            ></Image>
            <Text
              color="mainColor.hardGreen"
              textAlign="center"
              fontWeight="bold"
              mt="1"
            >
              {product.name}
            </Text>
            <Text
              color="mainColor.hardGreen"
              textAlign="center"
              mt="1"
              fontSize="sm"
            >
              Owner : {product.User.username}
            </Text>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default NestedExploreProducts;
