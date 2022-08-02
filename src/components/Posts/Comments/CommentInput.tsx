import {
  Button,
  Flex,
  InputElementProps,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import AuthButtons from "../../Navbar/RightContent/AuthButtons";

type CommentInputProps = {
  commentText: string;
  setCommentText: (value: string) => void;
  user: User;
  createLoading: boolean;
  onCreateComment: (commentText: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  setCommentText,
  user,
  createLoading,
  onCreateComment,
}) => {
  return (
    <Flex direction={"column"} position="relative">
      {user ? (
        <>
          <Text mb={1}>
            Comment as{" "}
            <span style={{ color: "#3182Ce" }}>
              {user.email?.split("@")[0]}
            </span>
          </Text>
          <Textarea
            value={commentText}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCommentText(event.target.value)
            }
            placeholder="What are your thought"
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            pb={10}
            _placeholder={{ color: "gray.500" }}
            _focus={{ outline: "none", bg: "white", border: "0 0 4px 4px" }}
          />
          <Flex
            position={"relative"}
            left="1px"
            right={0.1}
            bottom="1px"
            justify={"flex-end"}
            bg="gray.100"
            p={"6px 8px"}
            borderRadius="0 0 4px 4px"
          >
            <Button
              height="26px"
              disabled={!commentText.length}
              isLoading={createLoading}
              onClick={() => onCreateComment(commentText)}
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            align="center"
            justify={"space-between"}
            borderColor="gray.100"
            border="1px solid"
            p={4}
          >
            <Text fontWeight={600}>Log in or Sign up to leave a comment</Text>
            <AuthButtons />
          </Flex>
        </>
      )}
    </Flex>
  );
};
export default CommentInput;
