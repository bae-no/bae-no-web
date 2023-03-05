import { forwardRef, ReactNode } from "react";

import Link from "next/link";

import { ConditionalProps } from "src/types/ConditionalProps";
import { Box } from "src/ui/Box";
import { Popup } from "src/ui/Popup";
import { Typography } from "src/ui/Typography";

type SectionItemProps = ConditionalProps<
  { onClick?: VoidFunction },
  { href?: string }
> & {
  name: string;
  suffix?: string;
};

const SectionItem = forwardRef(
  ({ name, onClick, suffix, href }: SectionItemProps, ref) => (
    <Box
      align="center"
      as={href ? Link : "div"}
      cursor={onClick || href ? "pointer" : undefined}
      flexDirection="row"
      height="48"
      href={href}
      justify="space-between"
      key={name}
      ref={ref}
      onClick={onClick}
    >
      <Typography as="span" color="black2" fontSize="body1-m">
        {name}
      </Typography>
      {suffix && (
        <Typography as="span" color="black4" fontSize="body2-m">
          {suffix}
        </Typography>
      )}
    </Box>
  ),
);

interface SectionProps {
  children: ReactNode;
  title: string;
}

const Section = ({ children, title }: SectionProps) => (
  <Box as="section" gap="8">
    <Typography as="h3" color="black4" fontSize="caption1-m">
      {title}
    </Typography>
    <Box gap="8">{children}</Box>
  </Box>
);

const UserPageSection = () => (
  <Box gap="24">
    <Section title="서비스이용약관">
      <SectionItem href="/test" name="개인정보정책" />
      <SectionItem href="/test" name="이용약관" />
      <SectionItem name="버전" suffix="1.0v" />
    </Section>
    <Section title="계정관리">
      <Popup
        cancelText="취소"
        confirmText="로그아웃"
        description="정말로 로그아웃 하실건가요?"
        title="로그아웃"
      >
        <SectionItem name="로그아웃" />
      </Popup>
      <SectionItem href="/user/leave" name="회원탈퇴" />
    </Section>
    <Section title="고객센터">
      <SectionItem
        href="mailto: leejj2002@naver.com"
        name="이메일로 문의하기"
      />
    </Section>
  </Box>
);

export default UserPageSection;
