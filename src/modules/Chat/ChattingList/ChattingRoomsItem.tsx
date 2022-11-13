import { memo, useState } from "react";

import { PanInfo } from "framer-motion";
import { useFormContext } from "react-hook-form";

import LazyDomMaxMotion from "src/components/LazyDomMaxMotion";
import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { MotionBox } from "src/ui/Box/MotionBox";
import { CheckBox } from "src/ui/CheckBox";
import { Label } from "src/ui/Label";
import { Typography } from "src/ui/Typography";

export interface ChattingRoomsItemProps {
  avatarSrc: string;
  chattingId: string;
  checkbox?: boolean;
  date: string;
  ended: boolean;
  lastChat: string;
  notReadMessage: number;
  title: string;
}

const ChattingRoomsItem = ({
  avatarSrc,
  chattingId,
  checkbox,
  date,
  ended,
  lastChat,
  notReadMessage,
  title,
}: ChattingRoomsItemProps) => {
  const { setValue } = useFormContext();
  const [show나가기, setShow나가기] = useState(false);

  const handleDragEnd = (_: any, { offset }: PanInfo) => {
    if (offset.x < -44) {
      setShow나가기(true);
    } else {
      setShow나가기(false);
    }
  };

  const animation = (() => {
    if (show나가기) return { x: -72 };
    if (checkbox) return { x: "0.4rem" };
    return { x: 0 };
  })();

  return (
    <Box as="li" flexDirection="row" position="relative">
      <LazyDomMaxMotion>
        {checkbox && (
          <CheckBox
            id={chattingId}
            value={chattingId}
            onCheckedChange={(checked) => setValue(chattingId, checked)}
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
          height="64"
          justify="space-between"
          px="16"
          py="4"
          width="full"
          onDragEnd={handleDragEnd}
        >
          <Box align="center" direction="row" gap="16" width="max">
            <Avatar size="48" src={avatarSrc} />
            <Box as="span" gap="2">
              <Typography fontSize="body1-b">{title}</Typography>
              <Typography color="black2" fontSize="body2-m">
                {lastChat}
              </Typography>
            </Box>
          </Box>
          <Box
            align="flex-end"
            as="span"
            gap="5.5"
            justify="space-between"
            {...(ended && { paddingBottom: "32" })}
          >
            <Typography color="black4" fontSize="caption1-m">
              {date}
            </Typography>
            {!ended && (
              <Label color="primary" variant="border">
                <Typography fontSize="caption1-m">{notReadMessage}</Typography>
              </Label>
            )}
          </Box>
        </MotionBox>
      </LazyDomMaxMotion>
      <Box
        align="center"
        as="button"
        backgroundColor="danger1"
        boxSizing="content-box"
        justify="center"
        p="4"
        position="absolute"
        right="0"
        size="64"
        zIndex={-1}
      >
        <Typography as="span" color="white" fontSize="body2-m">
          나가기
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(ChattingRoomsItem);
