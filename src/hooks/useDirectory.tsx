import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { useRecoilState, useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import {
  DirectoryMenuItem,
  directoryMenuState,
} from "../atoms/directoryMenuAtom";

const useDirectory = () => {
  const communityStateValue = useRecoilValue(communityState);
  const [directoryState, setDirecrtoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();

  const toggleMenuOpen = () => {
    setDirecrtoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;

    if (currentCommunity) {
      setDirecrtoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: IoPeopleCircleOutline,
          iconColor: "green.500",
        },
      }));
    }
  }, [communityStateValue.currentCommunity]);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirecrtoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };
  return {
    directoryState,
    toggleMenuOpen,
    onSelectMenuItem,
  };
};

export default useDirectory;
