import {
  FieldPath,
  useForm,
  useFormContext,
  UseFormReturn,
  useWatch,
} from "react-hook-form";

export type NotificationDeleteForm = Record<string, boolean>;

export const useNotificationDeleteForm: <
  TFields extends NotificationDeleteForm,
  TPath extends FieldPath<TFields>,
>() => UseFormReturn<TFields, TPath> = useForm;

export const useNotificationDeleteFormContext: <
  TFields extends NotificationDeleteForm,
  TPath extends FieldPath<TFields>,
>() => UseFormReturn<TFields, TPath> = useFormContext;

export const useNotificationDeleteFormWatch: <
  TFields extends NotificationDeleteForm,
  TPath extends FieldPath<TFields>,
>() => UseFormReturn<TFields, TPath> = useWatch;
