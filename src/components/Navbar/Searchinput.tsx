import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type SearchinputProps = {
  user?: User | null;
};

const Searchinput: React.FC<SearchinputProps> = ({ user }) => {
  return (
    <Flex
      flexGrow={1}
      ml={2}
      mr={2}
      maxWidth={user ? "auto" : "600px"}
      align="center"
      bg="gray.50"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="search here"
          height="38px"
          _placeholder={{ color: "gray.400" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "green.500",
          }}
          _focus={{
            outlined: "none",
            border: "1px solid",
            borderColor: "green.500",
          }}
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};
export default Searchinput;
