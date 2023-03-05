import {
  FieldPath,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

import { FoodCategory } from "src/graphql";

export type CreateChatForm = {
  category: FoodCategory;
  maxParticipant: number;
  orderPrice: number;
  storeName: string;
  title: string;
};

export const useCreateChatForm: <
  TFields extends CreateChatForm,
  TPath extends FieldPath<TFields>,
>(
  props?: UseFormProps<TFields, TPath>,
) => UseFormReturn<TFields, TPath> = useForm;

export const useCreateChatFormContext: <
  TFields extends CreateChatForm,
  TPath extends FieldPath<TFields>,
>() => UseFormReturn<TFields, TPath> = useFormContext;
