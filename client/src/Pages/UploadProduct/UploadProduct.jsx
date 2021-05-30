import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Textarea,
  Radio,
  Stack,
  RadioGroup,
} from "@chakra-ui/react";
const UploadProduct = () => {
  const [lining, setLining] = useState(true);
  const [sheerLevel, setSheerLevel] = useState(true);
  return (
    <Box minH="90vh" bg="mainColor.bg" pb="8">
      <Flex justifyContent="center">
        <Text
          fontWeight="bold"
          fontSize="2xl"
          color="mainColor.fontColor"
          letterSpacing="widest"
        >
          Add Product to Rent
        </Text>
      </Flex>
      <HStack d="flex" justifyContent="center" spacing="10" mt="4">
        <VStack spacing="5">
          <FormControl>
            <FormLabel textAlign="center">Product Name</FormLabel>
            <Input
              type="text"
              placeholder="Product Name..."
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Description</FormLabel>
            <Textarea
              type="text"
              placeholder="Description..."
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Rent Price</FormLabel>
            <Input
              type="number"
              placeholder="Rent Price..."
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Guarantee Price</FormLabel>
            <Input
              type="number"
              placeholder="Guarantee Price..."
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <RadioGroup onChange={setSheerLevel}>
            <Stack direction="row">
              <Text>Lining</Text>
              <Radio value={true}>Yes</Radio>
              <Radio value={true}>No</Radio>
            </Stack>
          </RadioGroup>
        </VStack>
        <VStack spacing={5}>
          <FormControl>
            <FormLabel textAlign="center">Front Image</FormLabel>
            <Input
              type="file"
              placeholder="Product Name..."
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Back Image</FormLabel>
            <Input
              type="file"
              placeholder="Product Name..."
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Side Image</FormLabel>
            <Input
              type="file"
              placeholder="Product Name..."
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Thickness</FormLabel>
            <Input
              type="number"
              placeholder="1 to 100"
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Strechability</FormLabel>
            <Input
              type="number"
              placeholder="1 to 100"
              borderColor="mainColor.fontColor"
            />
          </FormControl>
        </VStack>
        <VStack spacing="5">
          <FormControl>
            <FormLabel textAlign="center">Fit</FormLabel>
            <Input
              type="text"
              placeholder="Size"
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Waist Size</FormLabel>
            <Input
              type="number"
              placeholder="Size of the Waist"
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Hips Size</FormLabel>
            <Input
              type="number"
              placeholder="Size of the Hips"
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Bust Size</FormLabel>
            <Input
              type="number"
              placeholder="Size of the Bust"
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Length</FormLabel>
            <Input
              type="number"
              placeholder="Product Length"
              borderColor="mainColor.fontColor"
            />
          </FormControl>
          <RadioGroup onChange={setSheerLevel}>
            <Stack direction="row">
              <Text>Sheer Level</Text>
              <Radio value={true}>Yes</Radio>
              <Radio value={true}>No</Radio>
            </Stack>
          </RadioGroup>
        </VStack>
      </HStack>
    </Box>
  );
};

export default UploadProduct;
