import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";

import { useCreateChatFormContext } from "../hooks";

const StoreName = () => {
  const { register } = useCreateChatFormContext();
  return (
    <FormField label="주문할 가게 이름">
      <Input
        placeholder="주문하실 가게 이름을 입력해주세요."
        {...register("storeName", { required: true })}
      />
    </FormField>
  );
};

export default StoreName;
