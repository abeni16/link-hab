import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";

const OAuthButton: React.FC = () => {
  return (
    <Flex width="100%" mb={4}>
      <Button width="100%" variant="oauth">
        <Image
          src="/images/google.png"
          height="20px"
          width="20px"
          mr={4}
          alt="google"
        />{" "}
        Continue with Google
      </Button>
    </Flex>
  );
};
export default OAuthButton;
