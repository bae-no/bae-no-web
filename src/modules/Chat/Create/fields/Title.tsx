import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";

import { useCreateChatFormContext } from "../hooks";

const Title = () => {
  const { register } = useCreateChatFormContext();
  return (
    <FormField label="채팅방 이름">
      <Input
        placeholder="사용하실 채팅방 이름을 입력해주세요."
        {...register("title", { required: true })}
      />
    </FormField>
  );
};

export default Title;
