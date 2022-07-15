import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

const OAuthButton: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex width="100%" mb={4}>
      <Button
        width="100%"
        variant="oauth"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/google.png"
          height="20px"
          width="20px"
          mr={4}
          alt="google"
        />
        Continue with Google
      </Button>

      {error && (
        <Text>
          {error.message}
          {/* {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]} */}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButton;
