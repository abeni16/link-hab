import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Image,
  Flex,
  MenuDivider,
  Text,
  Container,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "../../../firebase/clientApp";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { IoSparkles } from "react-icons/io5";
import { communityState } from "../../../atoms/communitiesAtom";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModal = useSetRecoilState(authModalState);
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Flex>
                  <Flex
                    bg="gray.300"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={4}
                    height="30px"
                    width="30px"
                    mr={1}
                  >
                    <Image
                      ml={2}
                      mr={1}
                      alt="linkhab logo"
                      src="/images/logo1.png"
                      height="25px"
                      width="20px"
                      filter="brightness(10)"
                    />
                  </Flex>

                  <Flex
                    direction="column"
                    fontSize="8pt"
                    align="flex-start"
                    mr={8}
                    display={{ base: "none", lg: "flex" }}
                  >
                    <Text fontWeight={700}>
                      {user?.displayName || user.email?.split("@")[0]}
                    </Text>
                    <Flex>
                      {" "}
                      <Icon as={IoSparkles} color="red.400" mr={1} />
                      <Text color="gray.400">1 Karma</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "red.400", color: "white" }}
            >
              <Flex align="center">
                <Icon as={CgProfile} fontSize={20} mr={2} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "red.400", color: "white" }}
              onClick={logout}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "teal.500", color: "white" }}
              onClick={() =>
                setAuthModal({
                  open: true,
                  view: "login",
                })
              }
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
