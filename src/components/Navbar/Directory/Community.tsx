import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { GrAdd } from "react-icons/gr";
type CommunityProps = {};

const Community: React.FC<CommunityProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={open} handelClose={() => setOpen(false)} />
      <MenuItem
        fontSize="10pt"
        width="100%"
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};
export default Community;
