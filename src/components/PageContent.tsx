import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: any;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex border="1px solid red" justify="center" p="16px 0">
      <Flex
        width="95%"
        justify="center"
        maxWidth="860px"
        border="1px solid green"
      >
        <Flex
          border="1px solid blue"
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: "0", md: 6 }}
        >
          {children[0]}
        </Flex>
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          mr={{ base: "0", md: 6 }}
          flexGrow={1}
          border="1px solid yellow"
        >
          {children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
