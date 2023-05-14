import {
  cloneElement,
  forwardRef,
  ReactElement,
  useEffect,
  useRef,
} from "react";

import {
  useReastorage,
  useReastorageValue,
  useSetReastorage,
} from "@reastorage/react";
import { useQueryClient } from "@tanstack/react-query";

import {
  useDeleteAddressMutation,
  UserAddressQuery,
  useUserAddressQuery,
} from "src/graphql";
import { useToggle } from "src/hooks/useToggle";
import {
  currentShareZoneStorage,
  RecentlySearchedShareZone,
  showShareZoneTooltipStorage,
} from "src/store/shareZone";
import { PullToCloseBottomDrawer } from "src/ui/BottomDrawer";
import { Box } from "src/ui/Box";
import Divider from "src/ui/Divider";
import ArrowBottomIcon from "src/ui/Icon/svgs/arrow-bottom.svg";
import { colors } from "src/ui/tokens/color";
import { Typography } from "src/ui/Typography";

import SearchLocation from "../SearchLocation/SearchLocation";

const LocationSelectorTrigger = forwardRef<
  HTMLButtonElement,
  { onClick?: VoidFunction }
>(({ onClick }, ref) => {
  const currentShareZone = useReastorageValue(currentShareZoneStorage);

  return (
    <Box
      align="center"
      direction="row"
      gap="8"
      ref={ref}
      type="button"
      onClick={onClick}
    >
      <Typography fontSize="body1-b">
        {currentShareZone?.alias || "주소를 설정해주세요"}
      </Typography>
      <ArrowBottomIcon color={colors.black1} />
    </Box>
  );
});

interface LocationSelectorProps {
  children: ReactElement;
}

const LocationSelector = ({ children }: LocationSelectorProps) => {
  const [open, toggleOpen, setOpen] = useToggle(false);

  const [currentShareZone, setCurrentShareZone] = useReastorage(
    currentShareZoneStorage,
  );

  const initialShareZone = useRef(currentShareZoneStorage.get());

  useEffect(() => {
    if (open) {
      initialShareZone.current = currentShareZoneStorage.get();
    }
  }, [open]);

  const { data, refetch } = useUserAddressQuery(undefined, {
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const { mutate } = useDeleteAddressMutation({
    onMutate: ({ id }) => {
      const addressQueryKey = useUserAddressQuery.getKey();

      queryClient.setQueryData(addressQueryKey, (old) => {
        if (!old) return;

        return {
          ...old,
          addresses: (old as UserAddressQuery).addresses.filter(
            (address) => address.key !== id,
          ),
        };
      });
    },
    onSettled: () => refetch(),
  });

  const setShowShareZoneTooltip = useSetReastorage(showShareZoneTooltipStorage);
  const handleClick = (shareZone: RecentlySearchedShareZone) => {
    setCurrentShareZone(shareZone);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value && initialShareZone.current !== currentShareZone) {
      setShowShareZoneTooltip(true);
    }
    setOpen(value);
  };

  return (
    <PullToCloseBottomDrawer
      open={open}
      trigger={cloneElement(children, { onClick: () => toggleOpen() })}
      onOpenChange={handleOpenChange}
    >
      <Typography fontSize="headline5">주소설정</Typography>
      <SearchLocation nextUrl="/add-location">
        <SearchLocation.Input />
        <SearchLocation.CurrentLocation />
        <Divider
          backgroundColor="black8"
          height="8"
          marginTop="8"
          width="full"
        />
        <SearchLocation.RecentLocationImpl
          list={data?.addresses}
          renderListItem={(shareZone) => (
            <SearchLocation.RecentLocationItem
              isCurrentLocation={
                shareZone.alias === currentShareZone?.alias &&
                shareZone.path === currentShareZone?.path
              }
              key={shareZone.key}
              shareZone={shareZone}
            />
          )}
          onClick={handleClick}
          onRemove={({ key }) => mutate({ id: key as string })}
        />
      </SearchLocation>
    </PullToCloseBottomDrawer>
  );
};

LocationSelector.Trigger = LocationSelectorTrigger;

export default LocationSelector;
