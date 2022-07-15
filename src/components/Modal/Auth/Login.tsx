import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        fontSize="10pt"
        _placeholder={{
          color: "gray.500",
        }}
        _hover={{
          bg: "white",
          outline: "none",
          border: "1px solid",
          borderColor: "teal.500",
        }}
        _focus={{
          bg: "white",
          outline: "none",
          border: "1px solid",
          borderColor: "teal.500",
        }}
        bg="gray.50"
        onChange={onChange}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        fontSize="10pt"
        _placeholder={{
          color: "gray.500",
        }}
        _hover={{
          bg: "white",
          outline: "none",
          border: "1px solid",
          borderColor: "teal.500",
        }}
        _focus={{
          bg: "white",
          outline: "none",
          border: "1px solid",
          borderColor: "teal.500",
        }}
        bg="gray.50"
        onChange={onChange}
      />
      <Text color="red.500" fontSize="10pt" textAlign="center">
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        type="submit"
        width="100%"
        height="40px"
        mt={2}
        mb={2}
        isLoading={loading}
      >
        Log In
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text
          color="teal.500"
          fontWeight="700"
          cursor="pointer"
          onClick={() =>
            setAuthModal((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
