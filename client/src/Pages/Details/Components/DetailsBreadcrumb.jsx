import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
const ExploreBreadcrumbs = () => {
  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      ml="16"
      mt="4"
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Text color="mainColor.fontColor">Home</Text>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="/browse">
          <Text color="mainColor.fontColor">Browse Products</Text>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">
          <Text fontWeight="bold" color="mainColor.fontColor">
            Product Details
          </Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default ExploreBreadcrumbs;
