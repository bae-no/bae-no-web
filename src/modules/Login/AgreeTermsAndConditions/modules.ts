export interface TermsAndConditions {
  entireTerm: boolean;
  over14age: boolean;
  privacyTerms: boolean;
  serviceTerms: boolean;
}

export const AGREE_TERM_ARRAY = [
  {
    label: "(필수)서비스 이용약관",
    name: "serviceTerms",
  },
  {
    label: "(필수)개인정보 취급방침",
    name: "privacyTerms",
  },
  {
    label: "(필수)만 14세 이상입니다",
    name: "over14age",
  },
] as const;
