import { FormField } from "src/ui/Form";
import { Input } from "src/ui/Input";

import { useCreateChatFormContext } from "../hooks";

const MinParticipants = () => {
  const { register } = useCreateChatFormContext();
  return (
    <FormField label="최소 참여 인원">
      <Input
        inputMode="numeric"
        pattern="\d*"
        placeholder="0"
        type="number"
        {...register("minParticipants", {
          min: 2,
          required: true,
        })}
      />
    </FormField>
  );
};

export default MinParticipants;
