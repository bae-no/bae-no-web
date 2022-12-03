import { FieldPath, useFormContext, UseFormReturn } from "react-hook-form";

export type CreateChatFormFields = {
  category: string; // gql 세팅 후 타입 수정
  minParticipants: number;
  orderPrice: number;
  shareZone: string;
  storeName: string;
  thumbnail: string;
  title: string;
};

// export const useCreateChatForm =
export const useCreateChatFormContext: <
  TFields extends CreateChatFormFields,
  TPath extends FieldPath<TFields>,
>() => UseFormReturn<TFields, TPath> = useFormContext;
