import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

type SearchinputProps = {};

const Searchinput: React.FC<SearchinputProps> = () => {
  return (
    <Flex flexGrow={1} ml={2} mr={2} align="center" bg="gray.50">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          placeholder="search here"
          height="38px"
          _placeholder={{ color: "gray.400" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outlined: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};
export default Searchinput;
