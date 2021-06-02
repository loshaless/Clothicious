import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom"
import { ChevronRightIcon } from "@chakra-ui/icons";
const ExploreBreadcrumbs = ({ category }) => {
  const history = useHistory();
  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      ml="16"
      mt="4"
    >
      <BreadcrumbItem>
        <BreadcrumbLink onClick={() => history.push('/')}>
          <Text color="mainColor.fontColor">Home</Text>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink onClick={() => history.push('/browse')}>
          <Text color="mainColor.fontColor">Browse Products</Text>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">
          <Text fontWeight="bold" color="mainColor.fontColor">
            {category}
          </Text>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default ExploreBreadcrumbs;
