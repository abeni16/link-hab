import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { auth } from "../../firebase/clientApp";
import RightContent from "./RightContent/RightContent";
import Searchinput from "./Searchinput";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "../Navbar/Directory/Directory";
import useDirectory from "../../hooks/useDirectory";
import { defaultMenuItem } from "../../atoms/directoryMenuAtom";
const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  return (
    <Flex
      bg="#fff"
      height="50px"
      padding="6px 12px"
      align="center"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        cursor="pointer"
      >
        <Image
          alt="linkhab logo"
          src="/images/logo1.png"
          height="30px"
          width="25px"
        />
        <Image
          alt="linkhab logo"
          src="/images/logo2.svg"
          height="40px"
          width="100px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      <Searchinput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
