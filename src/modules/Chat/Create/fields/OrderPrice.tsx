import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";

import { useCreateChatFormContext } from "../hooks";

const OrderPrice = () => {
  const { register } = useCreateChatFormContext();
  return (
    <FormField label="배달비 금액">
      <Input
        inputMode="numeric"
        pattern="\d*"
        placeholder="공유할 배달비 금액을 입력해주세요."
        type="number"
        {...register("orderPrice", { min: 0, required: true })}
      />
    </FormField>
  );
};

export default OrderPrice;
