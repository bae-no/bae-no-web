import { MouseEvent, ReactNode, useEffect, useMemo } from "react";

import {
  ReastorageInterface,
  useReastorageActions,
  useReastorageValue,
  useSetReastorage,
} from "@reastorage/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { AddressSystem, AddressType } from "src/graphql";
import { locationStorage, positionStorage } from "src/store/login";
import {
  RecentlySearchedShareZone,
  recentlySearchedShareZonesStorage,
} from "src/store/shareZone";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";
import { Label } from "src/ui/Label";
import { Header } from "src/ui/Layout";
import { sprinkles } from "src/ui/sprinkles.css";
import { Typography } from "src/ui/Typography";
import { createContext } from "src/utils/createContext";

type ExtractReastorage<T> = T extends ReastorageInterface<infer U, any>
  ? U
  : never;

interface SearchLocationContext {
  location: ExtractReastorage<typeof locationStorage>;
  nextUrl: string;
}

const [useSearchLocationContext, SearchLocationProvider] =
  createContext<SearchLocationContext>("searchLocationContext");

interface SetLocationProps {
  children: ReactNode;
  nextUrl: string;
}

const Head = () => (
  <Header leftNode={<Header.Back onClick={locationStorage.reset} />} />
);

const Title = ({ children }: { children: string }) => (
  <Typography as="h1" color="black2" fontSize="headline2" whiteSpace="pre-line">
    {children}
  </Typography>
);

const AdditionalExplanation = ({ children }: { children: string }) => (
  <Box marginTop="16">
    <Typography color="black4" fontSize="caption1-m">
      {children}
    </Typography>
  </Box>
);

const SearchInput = () => {
  const { nextUrl } = useSearchLocationContext();

  return (
    <Link
      href={{
        pathname: "/search-location/SearchLocationDaum",
        query: { nextUrl },
      }}
    >
      <Input
        leftNode={
          <Box cursor="pointer">
            <Icon name="icon_search" />
          </Box>
        }
        placeholder="도로명, 건물명 또는 지번으로 검색"
        tabIndex={-1}
        variant="underline"
      />
    </Link>
  );
};

const CurrentLocation = () => {
  const { nextUrl } = useSearchLocationContext();

  return (
    <Link
      href={{
        pathname: "/search-location/SearchLocationMap",
        query: { nextUrl },
      }}
    >
      <Box
        alignItems="center"
        cursor="pointer"
        flexDirection="row"
        gap="12"
        justifyContent="space-between"
        marginTop="16"
        py="12"
      >
        <Box alignItems="center" cursor="pointer" flexDirection="row" gap="12">
          <Icon name="gps" size="20" />
          <Typography color="black2" fontSize="body1-m">
            또는 현재 위치로 설정
          </Typography>
        </Box>
        <Icon name="arrow-right" size="16" />
      </Box>
    </Link>
  );
};

const [useRecentLocation, RecentLocationContext] = createContext<{
  onClick: (
    shareZone: RecentlySearchedShareZone,
  ) => (e: MouseEvent<HTMLButtonElement>) => void;
  onRemove: (
    shareZone: RecentlySearchedShareZone,
  ) => (e: MouseEvent<HTMLButtonElement>) => void;
}>("recentLocationContext");

const ADDRESS_TYPE_ICON_MAP = {
  [AddressType.Etc]: "location",
  [AddressType.Home]: "home-outline",
  [AddressType.Work]: "buliding",
} as const;

interface RecentLocationItemProps {
  isCurrentLocation?: boolean;
  shareZone: RecentlySearchedShareZone;
}

const RecentLocationItem = ({
  shareZone,
  isCurrentLocation,
}: RecentLocationItemProps) => {
  const { onClick, onRemove } = useRecentLocation();
  return (
    <Box
      as="li"
      borderBottomWidth="1"
      borderColor="black11"
      borderStyle="solid"
      direction="row"
      justify="space-between"
      paddingBottom="16"
      paddingTop="12"
      width="full"
      onClick={isCurrentLocation ? undefined : onClick(shareZone)}
    >
      <Box align="center" direction="row" gap="12">
        <Icon name={ADDRESS_TYPE_ICON_MAP[shareZone.type]} size="24" />
        <Box>
          <Box align="center" direction="row" gap="8">
            <Typography color="black2" fontSize="body1-b">
              {shareZone.alias}
            </Typography>
            {isCurrentLocation && <Label size="small">현위치</Label>}
          </Box>
          <Typography color="black4" fontSize="body3-m">
            {shareZone.path}
          </Typography>
        </Box>
      </Box>
      {!isCurrentLocation && (
        <button type="button" onClick={onRemove(shareZone)}>
          <Icon
            aria-label="삭제"
            className={sprinkles({ color: "black7", marginLeft: "12" })}
            name="close-typing"
          />
        </button>
      )}
    </Box>
  );
};

interface RecentLocationImplProps {
  list?: RecentlySearchedShareZone[];
  onClick: (shareZone: RecentlySearchedShareZone) => void;
  onRemove: (shareZone: RecentlySearchedShareZone) => void;
  renderListItem: (shareZone: RecentlySearchedShareZone) => ReactNode;
  title?: string;
}

const RecentLocationImpl = ({
  list,
  title,
  onClick,
  onRemove,
  renderListItem,
}: RecentLocationImplProps) => {
  const handleRemove =
    (shareZone: RecentlySearchedShareZone) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemove(shareZone);
    };

  const handleClick = (shareZone: RecentlySearchedShareZone) => () => {
    onClick(shareZone);
  };

  return (
    <RecentLocationContext
      value={{ onClick: handleClick, onRemove: handleRemove }}
    >
      <Box gap="8">
        {title && (
          <Typography color="black2" fontSize="headline5">
            {title}
          </Typography>
        )}
        <Box as="ul">{list?.map(renderListItem)}</Box>
      </Box>
    </RecentLocationContext>
  );
};

const RecentLocation = ({ title }: { title?: string }) => {
  const recentShareZones = useReastorageValue(
    recentlySearchedShareZonesStorage,
  );

  const { nextUrl } = useSearchLocationContext();
  const router = useRouter();

  const { remove } = useReastorageActions(recentlySearchedShareZonesStorage);

  const setLocation = useSetReastorage(locationStorage);
  const setPosition = useSetReastorage(positionStorage);

  const handleClick = (value: RecentlySearchedShareZone) => {
    const locationKey =
      value.system === AddressSystem.Jibun ? "jibunAddress" : "roadAddress";
    const { latitude, longitude } = value.coordinate;
    setLocation((prev) => ({
      ...prev,
      [locationKey]: value.path,
    }));
    setPosition({ latitude, longitude });

    router.push(nextUrl);
  };

  return (
    <RecentLocationImpl
      list={recentShareZones}
      renderListItem={(shareZone) => (
        <RecentLocationItem key={shareZone.path} shareZone={shareZone} />
      )}
      title={title}
      onClick={handleClick}
      onRemove={({ path }) => remove(path)}
    />
  );
};

const SearchLocation = ({ nextUrl, children }: SetLocationProps) => {
  const location = useReastorageValue(locationStorage);

  useEffect(() => {
    locationStorage.reset();
  }, [nextUrl]);

  const value = useMemo(() => ({ location, nextUrl }), [location, nextUrl]);

  return (
    <SearchLocationProvider value={value}>
      <Box zIndex={5}>{children}</Box>
    </SearchLocationProvider>
  );
};

SearchLocation.Head = Head;
SearchLocation.Title = Title;
SearchLocation.AdditionalExplanation = AdditionalExplanation;
SearchLocation.Input = SearchInput;
SearchLocation.CurrentLocation = CurrentLocation;
SearchLocation.RecentLocation = RecentLocation;
SearchLocation.RecentLocationImpl = RecentLocationImpl;
SearchLocation.RecentLocationItem = RecentLocationItem;

export default SearchLocation;
