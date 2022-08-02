import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import React from "react";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import useDirectory from "../../../hooks/useDirectory";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();

  console.log(displayText, imageURL);
  return (
    <MenuItem
      width={"100%"}
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex align="center">
        {imageURL ? (
          <Image
            borderRadius={"full"}
            boxSize="18px"
            mr={2}
            src={imageURL}
            alt=""
          />
        ) : (
          <Icon fontSize={22} mr="2" color={iconColor} as={icon} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
