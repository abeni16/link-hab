import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import Searchinput from "./Searchinput";

const Navbar: React.FC = () => {
  return (
    <Flex bg="#fff" height="50px" padding="6px 12px">
      <Flex>
        <Image
          alt="linkhab logo"
          src="/images/logo1.png"
          height="40px"
          width="35px"
        />
        <Image
          alt="linkhab logo"
          src="/images/logo2.png"
          height="40px"
          width="100px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>

      <Searchinput />
      <RightContent />
    </Flex>
  );
};
export default Navbar;
