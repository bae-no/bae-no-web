import { memo, useState } from "react";

import { PanInfo } from "framer-motion";
import { useFormContext } from "react-hook-form";

import LazyDomMaxMotion from "src/components/LazyDomMaxMotion";
import { useLeaveChat } from "src/graphql";
import { useToggle } from "src/hooks/useToggle";
import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { MotionBox } from "src/ui/Box/MotionBox";
import { CheckBox } from "src/ui/CheckBox";
import { Label } from "src/ui/Label";
import { Popup } from "src/ui/Popup";
import { Typography } from "src/ui/Typography";

export interface ChattingRoomsItemProps {
  checkbox?: boolean;
  ended: boolean;
  id: string;
  lastContent: string;
  lastUpdatedAt: string;
  thumbnail: string;
  title: string;
  unreadCount: number;
}

const ChattingRoomsItem = ({
  thumbnail,
  id,
  checkbox,
  lastUpdatedAt,
  ended,
  lastContent,
  unreadCount,
  title,
}: ChattingRoomsItemProps) => {
  const { setValue } = useFormContext();
  const [show나가기, setShow나가기] = useState(false);
  const [isOpenPopUp, togglePopUp] = useToggle();

  const { mutate } = useLeaveChat({
    onSettled: () => {
      togglePopUp();
    },
  });

  const handleConfirm = () => {
    mutate({
      input: {
        shareDealId: id,
      },
    });
  };

  const handleCancel = () => {
    togglePopUp();
    setShow나가기(false);
  };

  const handleDragEnd = (_: any, { offset }: PanInfo) => {
    if (offset.x < -44) {
      setShow나가기(true);
    } else {
      setShow나가기(false);
    }
  };

  const animation = (() => {
    if (show나가기) return { x: -80 };
    if (checkbox) return { x: "0.4rem" };
    return { x: 0 };
  })();

  const handleClick나가기Click = () => {
    togglePopUp();
  };

  const getFormattiedDate = (date: string) => {
    if (!date) return;

    const dateTypedDate = new Date(date);
    const [year, month, day] = [
      dateTypedDate.getFullYear(),
      String(dateTypedDate.getMonth() + 1).padStart(2, "0"),
      String(dateTypedDate.getDate()).padStart(2, "0"),
    ];

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Box as="li" flexDirection="row" width="full">
        <LazyDomMaxMotion>
          {checkbox && (
            <CheckBox
              id={id}
              value={id}
              onCheckedChange={(checked) => setValue(id, checked)}
            />
          )}
          <MotionBox
            dragSnapToOrigin
            align="center"
            animate={animation}
            backgroundColor="white"
            boxSizing="content-box"
            direction="row"
            drag={!checkbox && "x"}
            dragConstraints={{ left: -88, right: 0 }}
            dragElastic={0.2}
            gap="16"
            height="64"
            minWidth="full"
            paddingRight="16"
            py="4"
            zIndex={1}
            onDragEnd={handleDragEnd}
          >
            <Box>
              <Avatar size="48" src={thumbnail} />
            </Box>
            <Box as="span" gap="2" overflow="hidden" width="full">
              <Typography fontSize="body1-b">{title}</Typography>
              <Box width="full">
                <Typography
                  color="black2"
                  fontSize="body2-m"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  wordBreak="break-all"
                >
                  {lastContent}
                </Typography>
              </Box>
            </Box>
            <Box
              align="flex-end"
              as="span"
              gap="5.5"
              minWidth="max"
              {...(ended && { paddingBottom: "32" })}
            >
              <Typography color="black4" fontSize="caption1-m">
                {getFormattiedDate(lastUpdatedAt)}
              </Typography>
              {!ended && (
                <Label color="primary" variant="border">
                  <Typography fontSize="caption1-m">{unreadCount}</Typography>
                </Label>
              )}
            </Box>
          </MotionBox>
        </LazyDomMaxMotion>
        <Box
          align="center"
          backgroundColor="danger1"
          boxSizing="content-box"
          cursor="pointer"
          justify="center"
          p="4"
          position="absolute"
          right="0"
          size="64"
          zIndex={0}
          onClick={handleClick나가기Click}
        >
          <Typography as="span" color="white" fontSize="body2-m">
            나가기
          </Typography>
        </Box>
      </Box>
      <Popup
        cancelText="취소"
        confirmText="나가기"
        description="채팅방에서 나가실건가요? 나가게되면 대화내용이 모두 삭제되고 채팅목록에서도 삭제됩니다."
        open={isOpenPopUp}
        title="채딩방 나가기"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default memo(ChattingRoomsItem);
