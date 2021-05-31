import React from "react";
import DetailsBreadcrumb from "./Components/DetailsBreadcrumb";
import { useHistory } from "react-router-dom";
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

  function handleOnClickCheckout() {
    history.push("/success");
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
              <Image
                src="https://images.unsplash.com/photo-1536891648359-888e3aa968f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80"
                h="100%"
                w="100px"
              />
            </Box>
            <Box
              h="20vh"
              w="100px"
              opacity="0.7"
              transition="200ms"
              _hover={{ opacity: 1 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1536891648359-888e3aa968f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80"
                h="100%"
                w="100px"
              />
            </Box>
            <Box
              h="20vh"
              w="100px"
              opacity="0.7"
              transition="200ms"
              _hover={{ opacity: 1 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1536891648359-888e3aa968f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80"
                h="100%"
                w="100px"
              />
            </Box>
          </VStack>
          <Box h="70vh" w="300px">
            <Image
              src="https://images.unsplash.com/photo-1536891648359-888e3aa968f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80"
              h="100%"
              w="300px"
            />
          </Box>
        </Box>

        <Box>
          <Flex w="60%" h="43vh" border="1px" flexDirection="column">
            <VStack mt="2" px="4" spacing="5">
              <HStack w="90%">
                <Text fontWeight="bold" color="mainColor.fontColor">
                  Asymmetric Ruffled Striped Shirt
                </Text>
              </HStack>
              <HStack d="flex" justifyContent="space-between" w="90%">
                <Text color="gray.500" fontSize="sm" fontWeight="bold">
                  Rent Price
                </Text>
                <Text color="black" fontSize="sm" fontWeight="bold">
                  IDR 100.000
                </Text>
              </HStack>
              <HStack d="flex" justifyContent="space-between" w="90%">
                <Text color="gray.500" fontSize="sm" fontWeight="bold">
                  Deposit Price
                </Text>
                <Text color="black" fontSize="sm" fontWeight="bold">
                  IDR 200.000
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
                  Tsuyuri Kanao
                </Text>
              </HStack>
              <HStack d="flex" justifyContent="space-between" w="90%">
                <Text color="gray.500" fontSize="sm" fontWeight="bold">
                  Status
                </Text>
                <Badge colorScheme="green">Available to Rent</Badge>
              </HStack>
              <Button
                colorScheme="black"
                bg="black"
                color="white"
                borderRadius="0"
                w="90%"
                onClick={handleOnClickCheckout}
              >
                Checkout
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
                  REGULAR
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
                  Number
                </Text>
              </HStack>
              <HStack d="flex" justifyContent="space-between" w="90%">
                <Text color="gray.500" fontSize="sm" fontWeight="bold">
                  Waist Size
                </Text>
                <Text color="black" fontSize="sm" fontWeight="bold">
                  Number
                </Text>
              </HStack>
              <HStack d="flex" justifyContent="space-between" w="90%">
                <Text color="gray.500" fontSize="sm" fontWeight="bold">
                  Hips Size
                </Text>
                <Text color="black" fontSize="sm" fontWeight="bold">
                  Number
                </Text>
              </HStack>
              <HStack d="flex" justifyContent="space-between" w="90%">
                <Text color="gray.500" fontSize="sm" fontWeight="bold">
                  Thickness
                </Text>
                <Text color="black" fontSize="sm" fontWeight="bold">
                  Value / 100
                </Text>
              </HStack>
              <HStack d="flex" justifyContent="space-between" w="90%">
                <Text color="gray.500" fontSize="sm" fontWeight="bold">
                  Strechability
                </Text>
                <Text color="black" fontSize="sm" fontWeight="bold">
                  Value / 100
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
          Endlessly versatile, this shirt works just as well tucked into smart
          trousers for the evening as it does untucked with jeans for the day.
          Cut from crisp cotton mix fabric, this structured shirt boasts
          cut-about panelling with three contrasting stripes, feminine
          architectural ruffles to the sleeves and shoulders for a sense of
          modern drama and is finished with a subtle waisted fit. Nude
          undergarment is advised.
        </Text>
      </Box>
    </Box>
  );
};

export default Details;
