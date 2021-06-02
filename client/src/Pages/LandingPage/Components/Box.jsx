import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Box, Text, Image, Skeleton } from "@chakra-ui/react"
const LandingPageBox = ({ p }) => {
    const history = useHistory();
    function handleOnClickCard(id) {
        history.push("/details/" + id);
      }

    return (
        <Box
        d="flex"
        flexDirection="column"
        bg="mainColor.bg"
        w="250px"
        h="100%"
        pb="5"
        ml="8"
        onClick={() => handleOnClickCard(p.id)}
        cursor="pointer"
        key={p.id}
      >
        <Image
          src={p.frontImg}
          h="90%"
          w="250px"
        />
        <Text
          textAlign="center"
          color="mainColor.fontColor"
          fontWeight="bold"
          textTransform="uppercase"
          mt="2"
        >
          {p.name}
        </Text>
        <Text textAlign="center" color="mainColor.fontColor" mt="2">
          Owner : {p.User && p.User.username}
        </Text>
      </Box>
    )
}

export default LandingPageBox
