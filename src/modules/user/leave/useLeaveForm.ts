import {
  FieldPath,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

import { LeaveReasonType } from "src/graphql";

export type LeaveForm = {
  body?: string;
  name: string;
  type: LeaveReasonType;
};

export const useLeaveForm: <
  TFields extends LeaveForm,
  TPath extends FieldPath<TFields>,
>(
  props?: UseFormProps<TFields, TPath>,
) => UseFormReturn<TFields, TPath> = useForm;

export const useLeaveFormContext: <
  TFields extends LeaveForm,
  TPath extends FieldPath<TFields>,
>() => UseFormReturn<TFields, TPath> = useFormContext;
