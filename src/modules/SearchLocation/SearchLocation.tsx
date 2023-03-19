import {
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";

import {
  ReastorageInterface,
  useReastorageActions,
  useReastorageValue,
  useSetReastorage,
} from "@reastorage/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { AddressSystem } from "src/graphql";
import { locationStorage, positionStorage } from "src/store/login";
import {
  RecentlySearchedShareZone,
  recentlySearchedShareZonesStorage,
} from "src/store/shareZone";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";
import { Header } from "src/ui/Layout";
import { sprinkles } from "src/ui/sprinkles.css";
import { Typography } from "src/ui/Typography";

type ExtractReastorage<T> = T extends ReastorageInterface<infer U, any>
  ? U
  : never;

interface SearchLocationContext {
  location: ExtractReastorage<typeof locationStorage>;
  nextUrl: string;
}

const searchLocationContext = createContext<SearchLocationContext | null>(null);
const useSearchLocationContext = () => {
  const context = useContext(searchLocationContext);
  if (!context) {
    throw new Error(
      "useSearchLocationContext must be used within a SearchLocationProvider",
    );
  }
  return context;
};

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

const RecentLocation = ({
  from,
}: {
  from: keyof ExtractReastorage<typeof recentlySearchedShareZonesStorage>;
}) => {
  const recentShareZones = useReastorageValue(
    recentlySearchedShareZonesStorage,
  );

  const { nextUrl } = useSearchLocationContext();
  const router = useRouter();

  const { remove } = useReastorageActions(recentlySearchedShareZonesStorage);
  const targetArr = recentShareZones[from];

  const handleRemove =
    (path: Parameters<typeof remove>[1]) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      remove(from, path);
    };
  const setLocation = useSetReastorage(locationStorage);
  const setPosition = useSetReastorage(positionStorage);

  const handleClick = (value: RecentlySearchedShareZone) => () => {
    const locationKey =
      value.addressSystem === AddressSystem.Jibun
        ? "jibunAddress"
        : "roadAddress";
    setLocation((prev) => ({
      ...prev,
      [locationKey]: value.addressPath,
    }));
    setPosition({ latitude: value.latitude, longitude: value.longitude });

    router.push(nextUrl);
  };

  if (!targetArr?.length) return null;

  return (
    <Box gap="8">
      <Typography color="black2" fontSize="headline5">
        최근 검색한 배달 공유존
      </Typography>
      <Box as="ul">
        {targetArr?.map((shareZone) => (
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
            onClick={handleClick(shareZone)}
          >
            <Box align="center" direction="row" gap="12">
              <Icon name="map-gps" />
              <Typography color="black4" fontSize="body3-m">
                {shareZone.addressPath}
              </Typography>
            </Box>
            <button type="button" onClick={handleRemove(shareZone.addressPath)}>
              <Icon
                aria-label="삭제"
                className={sprinkles({ color: "black7", marginLeft: "12" })}
                name="close-typing"
              />
            </button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const SearchLocation = ({ nextUrl, children }: SetLocationProps) => {
  const location = useReastorageValue(locationStorage);

  useEffect(() => {
    locationStorage.reset();
  }, [nextUrl]);

  const value = useMemo(() => ({ location, nextUrl }), [location, nextUrl]);

  return (
    <searchLocationContext.Provider value={value}>
      <Box zIndex={5}>{children}</Box>
    </searchLocationContext.Provider>
  );
};

SearchLocation.Head = Head;
SearchLocation.Title = Title;
SearchLocation.AdditionalExplanation = AdditionalExplanation;
SearchLocation.Input = SearchInput;
SearchLocation.CurrentLocation = CurrentLocation;
SearchLocation.RecentLocation = RecentLocation;

export default SearchLocation;
