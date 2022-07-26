import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectedImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedTab,
  setSelectedFile,
  onSelectedImage,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex flexDirection="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Image alt="" src={selectedFile} maxWidth="400px" maxHeight="400px" />
          <Stack direction="row" mt={4}>
            <Button height="28px" onClick={() => setSelectedTab("Post")}>
              Back to Post
            </Button>
            <Button
              variant="outline"
              height="28px"
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
          \{" "}
        </>
      ) : (
        <Flex
          justify="center"
          alignItems="center"
          border="1px dashed"
          borderColor="gray.500"
          p={20}
          width="100%"
          borderRadius={4}
        >
          <Button
            height={30}
            variant="outline"
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={onSelectedImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
