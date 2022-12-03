import { useController } from "react-hook-form";

import { useCategoriesQuery } from "src/graphql";
import { FormField } from "src/ui/Form";
import { Select } from "src/ui/Select";

import { useCreateChatFormContext } from "../hooks";

const Category = () => {
  const { control } = useCreateChatFormContext();
  const { field } = useController({ control, name: "category" });

  const [{ data }] = useCategoriesQuery();

  if (!data) return null;

  return (
    <FormField label="카테고리">
      <Select
        options={data.categories.foodCatalog.map(({ name, code }) => ({
          label: name,
          value: code,
        }))}
        placeholder="카테고리 선택"
        size="large"
        title="카테고리"
        value={field.value}
        onValueChange={(value: string) => {
          field.onChange(value);
        }}
      />
    </FormField>
  );
};

export default Category;
