import { ReactElement } from "react";

import {
  IntersectionArea,
  IntersectionAreaProps,
} from "src/components/IntersectionArea";
import { MaybePromise } from "src/types";
import { Box } from "src/ui/Box";
import { Sprinkles } from "src/ui/sprinkles.css";

interface ListProps<T> extends Pick<IntersectionAreaProps, "options"> {
  as: "ol" | "ul";
  css?: Sprinkles;
  fetchMore?: (lastItem: T) => MaybePromise<void>;
  list: T[];
  renderItem: (item: T) => ReactElement | ReactElement[];
}

// eslint-disable-next-line react/function-component-definition
function List<T>({
  list,
  as,
  css,
  renderItem,
  fetchMore,
  options,
}: ListProps<T>) {
  const handleFetchMore: IntersectionObserverCallback = ([
    { isIntersecting },
  ]) => {
    if (isIntersecting && fetchMore) {
      fetchMore(list.at(-1) as T);
    }
  };

  if (!list) return null;

  return (
    <Box as={as} {...css}>
      {list.map((chatting) => renderItem(chatting))}
      <IntersectionArea options={options} onIntersect={handleFetchMore}>
        <li />
      </IntersectionArea>
    </Box>
  );
}

export default List;
