import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";
import useCommunityData from "../../hooks/useCommunityData";

const Reccomndation: React.FC = () => {
  const [comunities, setCommunities] = useState<Community[]>([]);
  const [loadingg, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeave, loading } = useCommunityData();
  const getCommunityRecommendation = async () => {
    setLoading(true);
    try {
      const communitiesQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const CommunitiesDocs = await getDocs(communitiesQuery);
      const communities = CommunitiesDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("recommandation", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCommunityRecommendation();
  }, []);
  return (
    <Flex
      direction={"column"}
      bg="white"
      borderRadius={4}
      border="1px solid"
      borderColor={"gray.300"}
    >
      <Flex
        align={"flex-end"}
        color="white"
        p={"6px 10px"}
        height="70px"
        borderRadius={"4px 4px 0 0"}
        fontWeight={700}
        backgroundSize="cover"
        bgGradient={
          "linear-gradient(to bottom,rgba(0,0,0,0), #960909e8), url('images/back.png')"
        }
      >
        Top Communities
      </Flex>
      <Flex direction={"column"}>
        {loadingg ? (
          <Stack mt={2} p={3}>
            <Flex justify={"space-between"} align="center">
              <SkeletonCircle size={"30px"} />
              <Skeleton height={"30"} width="70%" />
            </Flex>
            <Flex justify={"space-between"} align="center">
              <SkeletonCircle size={"30"} />
              <Skeleton height={"30"} width="70%" />
            </Flex>
            <Flex justify={"space-between"} align="center">
              <SkeletonCircle size={"30"} />
              <Skeleton height={"30"} width="70%" />
            </Flex>
            <Flex justify={"space-between"} align="center">
              <SkeletonCircle size={"30"} />
              <Skeleton height={"30"} width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {comunities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snipet) => snipet.communityId === item.id
              );
              return (
                <Link key={item.id} href={`/r/${item.id}`}>
                  <Flex
                    cursor={"pointer"}
                    align={"center"}
                    position="relative"
                    fontSize="10pt"
                    borderBottom="1px solid"
                    borderColor={"gray.200"}
                    p="10px 12px"
                  >
                    <Flex width="80%" align={"center"}>
                      <Flex width={"15%"}>
                        <Text>{index + 1}</Text>
                      </Flex>
                      <Flex align={"center"} width="80%">
                        {item.imageURL ? (
                          <Image
                            src={item.imageURL}
                            alt=""
                            borderRadius="full"
                            boxSize="28px"
                            mr={2}
                          />
                        ) : (
                          <Icon
                            as={IoPeopleCircleOutline}
                            fontSize={30}
                            mr={2}
                            color="red.500"
                          />
                        )}
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >{`r/${item.id}`}</span>
                      </Flex>
                    </Flex>
                    <Box position={"absolute"} right="10px ">
                      <Button
                        height={"22px"}
                        fontSize="8pt"
                        variant={!isJoined ? "solid" : "outline"}
                        onClick={(event: any) => {
                          event.stopPropagation();
                          onJoinOrLeave(item, isJoined);
                        }}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
            <Box p={"10px 20px"}>
              <Button height={"30"} width="100%">
                View All
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default Reccomndation;
