import {
  FieldPath,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

export type EditProfileForm = {
  desc: string;
  nickname: string;
  phoneNumber: string;
};

export const useEditProfileForm: <
  TFields extends EditProfileForm,
  TPath extends FieldPath<TFields>,
>(
  props?: UseFormProps<TFields, TPath>,
) => UseFormReturn<TFields, TPath> = useForm;

export const useEditProfileFormContext: <
  TFields extends EditProfileForm,
  TPath extends FieldPath<TFields>,
>() => UseFormReturn<TFields, TPath> = useFormContext;
