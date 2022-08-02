import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Img,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Post } from "../../atoms/postAtom";
import {
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoBookmarkOutline,
  IoTrashOutline,
  IoPeopleCircleOutline,
} from "react-icons/io5";
import { BsChat, BsDot } from "react-icons/bs";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";
type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  homePage?: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    comunityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [loadingImage, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handelDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    try {
      setLoadingDelete(true);
      const success = await onDeletePost(post);
      if (!success) {
        throw Error("faild to delete the post");
      }
      console.log("deleted succussfully");
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  const singlePostPage = !onSelectPost;
  return (
    <Flex
      bg="white"
      borderRadius={singlePostPage ? "4px 4px 0 0" : "4px"}
      border="1px solid white"
      onClick={() => onSelectPost && onSelectPost(post)}
      cursor={singlePostPage ? "unset" : "pointer"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "white" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={singlePostPage ? "0 0" : "3px 0 0 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "red.500" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor="pointer"
        />

        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "green.500" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text fontSize={12} mr={2}>
              {error}
            </Text>
          </Alert>
        )}
        <Stack spacing={1} p="10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            {/* home page */}
            {homePage && (
              <>
                {post.communityImageUrl ? (
                  <Image
                    src={post.communityImageUrl}
                    borderRadius={"full"}
                    boxSize="18px"
                    mr={2}
                    alt=""
                  />
                ) : (
                  <Icon
                    fontSize={"18pt"}
                    mr={1}
                    color="green.500"
                    as={IoPeopleCircleOutline}
                  />
                )}
                <Link href={`/r/${post.communityId}`}>
                  <Text
                    onClick={(event: any) => event.stopPropagation()}
                    fontWeight={700}
                    _hover={{ textDecoration: "underline" }}
                  >{`r/${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} fontSize={8} color="gray.500" />
              </>
            )}
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="9pt">{post.body}</Text>

          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                alt="this is illegal"
                onLoad={() => setLoading(false)}
                display={loadingImage ? "none" : "unset"}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500">
          <Flex
            align="center"
            padding="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            padding="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            padding="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              padding="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              color="red.500"
              onClick={handelDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={IoTrashOutline} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
