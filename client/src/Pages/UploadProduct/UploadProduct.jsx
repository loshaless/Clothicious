import React, { useState, useEffect } from "react";
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
  Select,
} from "@chakra-ui/react";
const UploadProduct = () => {
  const [lining, setLining] = useState(true);
  const [arrOfFiles, setArrOfFiles] = useState([{}, {}, {}]);
  let [counter, setCounter] = useState(0);
  const [sheerLevel, setSheerLevel] = useState(true);
  const [category, setCategory] = useState("");
  const [input, setInput] = useState({
    name: "",
    description: "",
    rentPrice: 0,
    guaranteePrice: 0,
    lining: false,
    thickness: 0,
    stretchability: 0,
    category: "",
    fit: "",
    waistSize: 0,
    bustSize: 0,
    hipsSize: 0,
    length: 0,
    sheerLevel: "",
  });

  function onChangeFrontImg(event) {
    let val = [...arrOfFiles];
    val[0] = event.target.files[0];
    console.log(val);
    setArrOfFiles(val);
    setCounter((counter += 1));
  }
  function onChangeBackImg(event) {
    let val = [...arrOfFiles];
    val[1] = event.target.files[0];
    console.log(val);
    setArrOfFiles(val);
    setCounter((counter += 1));
  }
  function onChangeSideImg(event) {
    let val = [...arrOfFiles];
    val[2] = event.target.files[0];
    console.log(val);
    setArrOfFiles(val);
    setCounter((counter += 1));
  }

  const fd = new FormData();
  useEffect(() => {
    for (const key in input) {
      fd.append(key, input[key]);
    }

    if (counter >= 3) {
      arrOfFiles.forEach((v, i) => fd.append("productImages", v, v.name));
      console.log(fd.getAll("productImages"), "this is from fd getAll");
    }
  }, [arrOfFiles, input]);

  useEffect(() => {
    setInput({ ...input, lining, sheerLevel, category });
  }, [sheerLevel, lining, category]);
  return (
    <Box minH="90vh" bg="mainColor.bg" pb="8">
      <Text>{JSON.stringify(arrOfFiles)}</Text>
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
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Description</FormLabel>
            <Textarea
              type="text"
              placeholder="Description..."
              borderColor="mainColor.fontColor"
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Rent Price</FormLabel>
            <Input
              type="number"
              placeholder="Rent Price..."
              borderColor="mainColor.fontColor"
              onChange={(e) =>
                setInput({ ...input, rentPrice: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Guarantee Price</FormLabel>
            <Input
              type="number"
              placeholder="Guarantee Price..."
              borderColor="mainColor.fontColor"
              onChange={(e) =>
                setInput({ ...input, guaranteePrice: e.target.value })
              }
            />
          </FormControl>
          <RadioGroup onChange={setLining}>
            <Stack direction="row">
              <Text>Lining</Text>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Stack>
          </RadioGroup>
        </VStack>
        <VStack spacing={5}>
          <FormControl>
            <FormLabel textAlign="center">Front Image</FormLabel>
            <Input
              type="file"
              borderColor="mainColor.fontColor"
              onChange={(e) => onChangeFrontImg(e)}
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Back Image</FormLabel>
            <Input
              type="file"
              placeholder="Product Name..."
              borderColor="mainColor.fontColor"
              onChange={(e) => onChangeBackImg(e)}
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Side Image</FormLabel>
            <Input
              type="file"
              placeholder="Product Name..."
              borderColor="mainColor.fontColor"
              onChange={(e) => onChangeSideImg(e)}
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Thickness</FormLabel>
            <Input
              type="number"
              placeholder="1 to 100"
              borderColor="mainColor.fontColor"
              onChange={(e) =>
                setInput({ ...input, thickness: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Strechability</FormLabel>
            <Input
              type="number"
              placeholder="1 to 100"
              borderColor="mainColor.fontColor"
              onChange={(e) =>
                setInput({ ...input, stretchability: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Category</FormLabel>
            <Select
              border="1px"
              borderColor="mainColor.fontColor"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" defaultValue disabled>
                Select Category
              </option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </Select>
          </FormControl>
        </VStack>
        <VStack spacing="5">
          <FormControl>
            <FormLabel textAlign="center">Fit</FormLabel>
            <Input
              type="text"
              placeholder="Size"
              borderColor="mainColor.fontColor"
              onChange={(e) => setInput({ ...input, fit: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Waist Size</FormLabel>
            <Input
              type="number"
              placeholder="Size of the Waist"
              borderColor="mainColor.fontColor"
              onChange={(e) =>
                setInput({ ...input, waistSize: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Hips Size</FormLabel>
            <Input
              type="number"
              placeholder="Size of the Hips"
              borderColor="mainColor.fontColor"
              onChange={(e) => setInput({ ...input, hipsSize: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Bust Size</FormLabel>
            <Input
              type="number"
              placeholder="Size of the Bust"
              borderColor="mainColor.fontColor"
              onChange={(e) => setInput({ ...input, bustSize: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel textAlign="center">Length</FormLabel>
            <Input
              type="number"
              placeholder="Product Length"
              borderColor="mainColor.fontColor"
              onChange={(e) => setInput({ ...input, length: e.target.value })}
            />
          </FormControl>
          <RadioGroup onChange={setSheerLevel}>
            <Stack direction="row">
              <Text>Sheer Level</Text>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Stack>
          </RadioGroup>
        </VStack>
      </HStack>
    </Box>
  );
};

export default UploadProduct;
