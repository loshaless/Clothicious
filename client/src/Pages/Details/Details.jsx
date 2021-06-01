import React, { useEffect, useState } from "react";
import DetailsBreadcrumb from "./Components/DetailsBreadcrumb";
import { fetchProductDetail } from "../../Stores/action";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import LoadingPage from '../LoadingPage/LoadingPage'

import {
  Box,
  Flex,
  Text,
  Image,
  Badge,
  SimpleGrid,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
const Details = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const loading = useSelector((state) => state.isLoading);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [sellerId, setSellerId] = useState('')
  const [productId, setProductId] = useState('')

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [id]);


  if (loading) return <LoadingPage />
  else {

    axios({
      url: 'http://localhost:3000/loggedUsers',
      method: 'get',
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(({ data }) => {
        console.log(data, 'ini data user login dan axios')
        setName(data.username)
        setEmail(data.email)
        setAddress(data.address)
        setPhone(data.phone)
      })
      .catch(error => {
        console.log(error, 'ini error axios data user login')
      })

    function handleOnClickCheckout() {
      const sellerId = productDetail.UserId
      const productId = productDetail.id
      const date = new Date()
      const miliseconds = date.getMilliseconds()
      const order_id = `order-user${name}-${miliseconds}`
      let parameter = {
        "transaction_details": {
          "order_id": order_id,
          "gross_amount": productDetail.rentPrice + productDetail.guaranteePrice
        },
        "item_details": [{
          "id": productDetail.id,
          "price": productDetail.rentPrice + productDetail.guaranteePrice,
          "quantity": 1,
          "name": productDetail.name,
          "brand": `Try Clothes - ${productDetail.User.username}`,
          "category": productDetail.category,
          "merchant_name": "Try Clothes"
        }],
        "customer_details": {
          "username": name,
          "email": email,
          "phone": phone,
          "shipping_address": {
            "first_name": name,
            "email": email,
            "phone": phone,
            "address": address,
            "city": "Jakarta",
            "country_code": "IDN"
          }
        },
      };



      axios({
        url: "http://localhost:3000/getTokenMidtrans",
        method: "POST",
        data: {
          parameter
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(snapResponse => {
          console.log("Retrieved snap token:", snapResponse.data);
          axios({
            url: "http://localhost:3000/transactions",
            method: "post",
            data: {
              'SellerId': sellerId,
              'ProductId': productId,
              'period': 4
            },
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(response => {
              console.log("response dari transactions:", response);
            })
            .catch(error => {
              console.log('error dari transactions response', error)
            })
          window.snap.pay(snapResponse.data, {
            onSuccess: function (result) {
              history.push("/success");

              console.log('success')
            },
            onPending: function (result) {
              console.log('pending')
            },
            onError: function (result) {
              console.log('error')
            },
            onClose: function () {
              console.log('di close')
            }
          })
        })


    }

    return (
      <Box minH="90vh" bg="mainColor.bg" pb="16">
        <Flex>
          <DetailsBreadcrumb />
        </Flex>
        <Flex justifyContent="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="mainColor.fontColor"
            letterSpacing="widest"
          >
            Product Details
          </Text>
        </Flex>
        <SimpleGrid columns={2} spacing={20} mt="4">
          <Box d="flex" justifyContent="flex-end">
            <VStack mr="12" spacing="5">
              <Box
                h="20vh"
                w="100px"
                opacity="0.7"
                transition="200ms"
                _hover={{ opacity: 1 }}
              >
                <Image src={productDetail.frontImg} h="100%" w="100px" />
              </Box>
              <Box
                h="20vh"
                w="100px"
                opacity="0.7"
                transition="200ms"
                _hover={{ opacity: 1 }}
              >
                <Image src={productDetail.sideImg} h="100%" w="100px" />
              </Box>
              <Box
                h="20vh"
                w="100px"
                opacity="0.7"
                transition="200ms"
                _hover={{ opacity: 1 }}
              >
                <Image src={productDetail.backImg} h="100%" w="100px" />
              </Box>
            </VStack>
            <Box h="70vh" w="300px">
              <Image src={productDetail.frontImg} h="100%" w="300px" />
            </Box>
          </Box>

          <Box>
            <Flex w="60%" h="48vh" border="1px" flexDirection="column">
              <VStack mt="2" px="4" spacing="5">
                <HStack w="90%">
                  <Text fontWeight="bold" color="mainColor.fontColor">
                    {productDetail.name}
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Rent Price
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    IDR {productDetail.rentPrice}
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Deposit Price
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    IDR {productDetail.guaranteePrice}
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Total Price
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    IDR {productDetail.rentPrice + productDetail.guaranteePrice}
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Owner
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    <Button
                      size="xs"
                      mr="2"
                      colorScheme="black"
                      bg="blue.100"
                      color="blue.600"
                    >
                      Chat Owner
                    </Button>
                    {productDetail.User.username}
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Status
                  </Text>
                  <Badge
                    colorScheme={productDetail.availability ? "green" : "red"}
                  >
                    {productDetail.availability ? "Available to Rent" : "Rented"}
                  </Badge>
                </HStack>

                <Button
                  colorScheme="black"
                  bg="black"
                  color="white"
                  borderRadius="0"
                  w="90%"
                  onClick={handleOnClickCheckout}
                  disabled={!productDetail.availability}
                >
                  Rent Now
                </Button>
              </VStack>
            </Flex>
            <Flex w="60%" h="50vh" border="1px" flexDirection="column" mt="8">
              <VStack mt="2" px="4" spacing="5">
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Fit
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    {productDetail.fit}
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Lining
                  </Text>
                  <Badge colorScheme="purple">Yes</Badge>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Sheer Level
                  </Text>
                  <Badge colorScheme="purple">Yes</Badge>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Bust Size
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    {productDetail.bustSize}
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Waist Size
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    {productDetail.waistSize}
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Hips Size
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    {productDetail.hipsSize}
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Thickness
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    {productDetail.thickness} / 100
                  </Text>
                </HStack>
                <HStack d="flex" justifyContent="space-between" w="90%">
                  <Text color="gray.500" fontSize="sm" fontWeight="bold">
                    Strechability
                  </Text>
                  <Text color="black" fontSize="sm" fontWeight="bold">
                    {productDetail.stretchability} / 100
                  </Text>
                </HStack>
              </VStack>
            </Flex>
          </Box>
        </SimpleGrid>
        <Box w="40%" h="30vh" ml="40" mt="-40">
          <Text fontWeight="bold" color="gray.500">
            Notes & Description
          </Text>
          <Text>
            {productDetail.description}
          </Text>
        </Box>
      </Box>
    );
  }

};

export default Details;
