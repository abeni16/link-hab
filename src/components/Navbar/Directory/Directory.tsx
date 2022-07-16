import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { TiHome } from "react-icons/ti";
import Community from "./Community";

const UserMenu: React.FC = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 4px"
        borderRadius={4}
        mr={{ base: 0, lg: 2 }}
        ml={{ base: 0, lg: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} />
            <Flex fontSize="10pt" display={{ base: "none", lg: "flex" }}>
              <Text>Home</Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Community />
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
