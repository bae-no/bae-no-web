import { ForwardedRef, forwardRef, useCallback, useMemo } from "react";

import { useToggle } from "src/hooks/useToggle";

import { Box } from "../Box";
import { Icon } from "../Icon";
import { Sprinkles } from "../sprinkles.css";

import { inputContainerCss, inputCss } from "./Input.css";
import { InputProps } from "./Input.type";

const Input = forwardRef(
  (
    {
      size,
      variant,
      state,
      onClearClick,
      rightNode,
      value,
      disabled,
      leftNode,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [focused, toggleFocused] = useToggle(false);

    const isValid = useMemo(() => state === "valid", [state]);

    const iconColor = useMemo((): Sprinkles["color"] => {
      switch (state) {
        case "valid":
          return "success1";
        case "invalid":
          return "danger1";
        default:
          return "black7";
      }
    }, [state]);

    const handleClickClose = useCallback(() => {
      if (isValid) return;
      onClearClick?.();
    }, [onClearClick, isValid]);

    return (
      <Box
        alignItems="center"
        className={inputContainerCss({ disabled, size, state, variant })}
        flexDirection="row"
        gap="8"
        onBlur={toggleFocused}
        onFocus={toggleFocused}
      >
        {leftNode}
        <Box
          aria-invalid={state === "invalid"}
          as="input"
          className={inputCss({ size })}
          disabled={disabled}
          ref={ref}
          size="full"
          value={value}
          {...rest}
        />
        {focused && !rightNode && (
          <Box
            aria-hidden={!isValid}
            aria-label="입력 내용 삭제"
            as="button"
            backgroundColor="white"
            cursor={!isValid ? "pointer" : undefined}
            disabled={isValid}
            type="button"
            onClick={handleClickClose}
            onMouseDown={(e) => e.preventDefault()}
          >
            {onClearClick ? (
              <Icon
                color={iconColor}
                name={isValid ? "check" : "close-typing"}
                size="24"
              />
            ) : null}
          </Box>
        )}
        {rightNode}
      </Box>
    );
  },
);

export default Input;
