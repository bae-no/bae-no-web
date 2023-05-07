import { memo, useState, useRef } from "react";

import { PanInfo } from "framer-motion";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

import LazyDomMaxMotion from "src/components/LazyDomMaxMotion";
import { Avatar } from "src/ui/Avatar";
import { Box } from "src/ui/Box";
import { MotionBox } from "src/ui/Box/MotionBox";
import { CheckBox } from "src/ui/CheckBox";
import { Label } from "src/ui/Label";
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
  const router = useRouter();
  const [show나가기, setShow나가기] = useState(false);
  const mouseMoveRef = useRef(false);

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

  const handle나가기Click = () => {
    setValue(id, true);
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

  const handleRouteDetailPage = () => {
    if (mouseMoveRef.current || show나가기) {
      mouseMoveRef.current = false;

      return;
    }
    if (checkbox) return;
    router.push({
      pathname: "/chat/[id]",
      query: {
        id,
        title,
      },
    });
  };

  return (
    <Box
      as="li"
      flexDirection="row"
      width="full"
      onMouseUpCapture={handleRouteDetailPage}
    >
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
          onDragEnd={handleDragEnd}
          onDragStart={() => {
            mouseMoveRef.current = true;
          }}
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
        as="button"
        backgroundColor="danger1"
        boxSizing="content-box"
        cursor="pointer"
        justify="center"
        p="4"
        position="absolute"
        right="0"
        size="64"
        zIndex={show나가기 ? 0 : -1}
        onClick={handle나가기Click}
      >
        <Typography as="span" color="white" fontSize="body2-m">
          나가기
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(ChattingRoomsItem);
