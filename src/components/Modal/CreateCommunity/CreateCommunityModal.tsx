import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "../../../firebase/clientApp";
import useDirectory from "../../../hooks/useDirectory";
type CreateCommunityModalProps = {
  open: boolean;
  handelClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handelClose,
}) => {
  const [communityName, setCommunityName] = useState("");
  const [charRemaining, setCharRemainging] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setErorr] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();
  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);

    setCharRemainging(21 - event.target.value.length);
  };

  const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(event.target.name);
  };

  const handelCreateCommunity = async () => {
    //validate
    if (error) setErorr("");
    const format = /[`!@#$%^&*()+-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(communityName) || communityName.length < 3) {
      setErorr(
        "Community name must be between 3-21 charachter, and can only contain letter, numbers and undersocrer"
      );
      return;
    }
    setLoading(true);
    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);

        if (communityDoc.exists()) {
          throw new Error(`Sorry r/${communityName} is already taken`);
        }

        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),

          {
            communityId: communityName,
            isModerator: true,
          }
        );
        handelClose();
        toggleMenuOpen();
        router.push(`/r/${communityName}`);
      });

      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setErorr(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handelClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" flexDirection="column" fontSize={15}>
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={10} color="gray.500">
                Community names including captalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.500"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                pl="22px"
                size="sm"
                onChange={handelChange}
              />
              <Text
                fontSize={9}
                fontWeight={600}
                color={charRemaining === 0 ? "red.500" : "green.500"}
              >
                {charRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="red.500" pt={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15} mb={2}>
                  Community Type
                </Text>
                <Stack>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="6pt" color="gray.500" mr={1}>
                        Anyone can view, post , and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />

                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="6pt" color="gray.500" mr={1}>
                        Anyone can view and commentbut only approve user post to
                        this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />

                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="6pt" color="gray.500" mr={1}>
                        Only approved user can submit and view to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              colorScheme="blue"
              mr={3}
              onClick={handelClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handelCreateCommunity}
              isLoading={loading}
            >
              Create Comunnity
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
