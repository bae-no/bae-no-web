import {
  FieldPath,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

import { CreateChatForm } from "./storage";

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
