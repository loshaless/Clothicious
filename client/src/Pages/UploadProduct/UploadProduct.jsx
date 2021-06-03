import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressModal from "./Components/ProgessModal"
import { useHistory } from "react-router-dom"
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
  Select,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
const UploadProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory();
  const toast = useToast()
  const [percentage, setPercentage] = useState(0)
  const [lining, setLining] = useState(true);
  const [arrOfFiles, setArrOfFiles] = useState([null, null, null]);
  let [counter, setCounter] = useState(0);
  const [sheerLevel, setSheerLevel] = useState(true);
  const [category, setCategory] = useState("man");
  const [input, setInput] = useState({
    name: "",
    description: "",
    rentPrice: 0,
    guaranteePrice: 0,
    lining: false,
    thickness: 0,
    stretchability: 0,
    category: "man",
    fit: "",
    waistSize: 0,
    bustSize: 0,
    hipsSize: 0,
    length: 0,
    sheerLevel: false,
  });

  function onChangeFrontImg(event) {
    if (arrOfFiles[0] === null)
      setCounter((counter += 1));

    let val = [...arrOfFiles];
    val[0] = event.target.files[0];
    setArrOfFiles(val);
  }
  function onChangeBackImg(event) {
    if (arrOfFiles[1] === null)
      setCounter((counter += 1));

    let val = [...arrOfFiles];
    val[1] = event.target.files[0];
    setArrOfFiles(val);
  }
  function onChangeSideImg(event) {
    if (arrOfFiles[2] === null)
      setCounter((counter += 1));

    let val = [...arrOfFiles];
    val[2] = event.target.files[0];
    setArrOfFiles(val);
  }

  const fd = new FormData();
  useEffect(() => {
    for (const key in input) {
      fd.append(key, input[key]);
    }

    if (counter >= 3) {
      arrOfFiles.forEach((v, i) => fd.append("productImages", v, v.name));
    }
  }, [arrOfFiles, input]);

  useEffect(() => {
    setInput({ ...input, lining, sheerLevel, category });
  }, [sheerLevel, lining, category]);

  async function uploadProduct() {
    try {

      let flag = true
      let moreThanFive = false
      for (const key in input) {
        const keys = ['lining', 'sheerLevel']
        const fiveQtyLimit = ['stretchability', 'thickness']
        if(!keys.includes(key)) {
          if(!input[key])
          flag = false
        }
        if(fiveQtyLimit.includes(key)) {
          if(input[key] > 5)
          moreThanFive = true
        }
      }
        if(!flag) throw { response : "please fill the blank form" }
        if(moreThanFive) throw { response : "Maximum Thickness and Strechability is 5"}
        const { data } = await axios.post('http://18.234.129.205:3000/products', fd, {
          headers: {
            "content-type": 'multipart/form-data',
            access_token: localStorage.access_token,
          },
          onUploadProgress: progressEvent => {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setPercentage(percentCompleted)
            onOpen()
          }
        })
        onClose()
        history.push('/products')
        toast({
          title: "Upload product: " + input.name + " success",
          status: "success",
          duration: 3000,
          isClosable: true,
          variant: "left-accent",
          position: "top"
        })
    } catch (error) {
        toast({
          title: error.response,
          status: "warning",
          duration: 3000,
          isClosable: true,
          variant: "left-accent",
          position: "top",
        })
      console.log(error.response)
    }
  }

  return (
    <>
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
              <FormLabel textAlign="center">Deposit Price</FormLabel>
              <Input
                type="number"
                placeholder="Deposit Price..."
                borderColor="mainColor.fontColor"
                onChange={(e) =>
                  setInput({ ...input, guaranteePrice: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel textAlign="center">Lining</FormLabel>
              <Select
                border="1px"
                borderColor="mainColor.fontColor"
                onChange={(e) => setLining(e.target.value)}
              >
                <option value="" defaultValue disabled>
                  Select Lining Type
              </option>
                <option value="true">With Lining</option>
                <option value="false">Without Lining</option>
              </Select>
            </FormControl>
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
                min="1"
                max="5"
                type="number"
                placeholder="1 to 5"
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
                min="1"
                max="5"
                placeholder="1 to 5"
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
            <FormControl>
              <FormLabel textAlign="center">Sheer Level</FormLabel>
              <Select
                border="1px"
                borderColor="mainColor.fontColor"
                onChange={(e) => setSheerLevel(e.target.value)}
              >
                <option value="" defaultValue disabled>
                  Select Sheer Level Type
              </option>
              <option value="true">With Sheer</option>
              <option value="false">Without Sheer</option>
            </Select>
          </FormControl>
        </VStack>
      </HStack>
      <Flex justifyContent="center" mt="3">
        <Button w="35%" colorScheme="black" bg="green.200" color="green500" onClick={uploadProduct}>Upload</Button>
      </Flex>
    </Box>
    <ProgressModal isOpen={isOpen} onClose={onClose} percentage={percentage} />
    </>
  );
};

export default UploadProduct;
