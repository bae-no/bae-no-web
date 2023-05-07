import { ChangeEvent, useRef, useState } from "react";

import { useRouter } from "next/router";
import Textarea from "react-textarea-autosize";

import { useWriteChat } from "src/graphql";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

import { textAreaCss } from "./chatContent.css";

export const ChatTextArea = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate } = useWriteChat({
    onSuccess: () => {
      if (!textAreaRef.current) return;
      textAreaRef.current.value = "";
    },
  });
  const router = useRouter();
  const { id } = router.query as { [key: string]: string };
  const [hasValueInTextArea, setHasValueInTextArea] = useState(false);
  const [alignItemByTextareaHeight, setAlignItemByTextareaHeight] = useState<
    "center" | "flex-end"
  >("center");
  const handleChangeTextareaHeight = (height: number) => {
    setAlignItemByTextareaHeight(height === 20 ? "center" : "flex-end");
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setHasValueInTextArea(!!value);
  };

  const handleWriteChat = () => {
    if (!textAreaRef.current?.value) return;
    mutate({
      input: {
        content: textAreaRef.current.value,
        shareDealId: id,
      },
    });
  };

  return (
    <Box
      bg="white"
      borderColor="black7"
      bottom="0"
      flexDirection="row"
      overflow="hidden"
      position="sticky"
      px="16"
      py="8"
      width="full"
    >
      <Box
        alignItems={alignItemByTextareaHeight}
        borderColor="black7"
        borderRadius="24"
        borderStyle="solid"
        borderWidth="1"
        flexDirection="row"
        justifyContent="space-between"
        minHeight="40"
        paddingLeft="16"
        paddingRight="8"
        py="4"
        width="full"
      >
        <Textarea
          className={textAreaCss}
          maxRows={4}
          ref={textAreaRef}
          onChange={handleTextAreaChange}
          onHeightChange={handleChangeTextareaHeight}
        />
        {hasValueInTextArea && (
          <Box cursor="pointer" onClick={handleWriteChat}>
            <Icon name="btn_send" />
          </Box>
        )}
      </Box>
    </Box>
  );
};
