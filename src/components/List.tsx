import { ReactElement } from "react";

import { IntersectionArea } from "src/components/IntersectionArea";
import { MaybePromise } from "src/types";
import { Box } from "src/ui/Box";
import { Sprinkles } from "src/ui/sprinkles.css";

interface ListProps<T> {
  as: "ol" | "ul";
  css?: Sprinkles;
  fetchMore: (lastItem: T) => MaybePromise<void>;
  list: T[];
  renderItem: (item: T) => ReactElement;
}

// eslint-disable-next-line react/function-component-definition
function List<T>({ list, as, css, renderItem, fetchMore }: ListProps<T>) {
  const handleFetchMore: IntersectionObserverCallback = ([
    { isIntersecting },
  ]) => {
    if (isIntersecting) {
      fetchMore(list.at(-1) as T);
    }
  };

  return (
    <Box as={as} {...css}>
      {list.map((chatting) => renderItem(chatting))}
      <IntersectionArea onIntersect={handleFetchMore}>
        <li />
      </IntersectionArea>
    </Box>
  );
}

export default List;
