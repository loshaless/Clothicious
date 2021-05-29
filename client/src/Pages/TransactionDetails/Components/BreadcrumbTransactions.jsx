import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const BreadcrumbTransactions = () => {
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
        <BreadcrumbLink href="/dashboard">
          <Text color="mainColor.fontColor">Dashboard</Text>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">
          <Text fontWeight="bold" color="mainColor.fontColor">
            Transaction Details
          </Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadcrumbTransactions;
