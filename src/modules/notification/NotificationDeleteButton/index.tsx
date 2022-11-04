import { useWatch } from "react-hook-form";

import { Button } from "src/ui/Button";
import { Container } from "src/ui/Container";

import { useNotificationDeleteFormContext } from "../useNotificationForm";

const NotificationDeleteButton = () => {
  const { handleSubmit } = useNotificationDeleteFormContext();
  const touchedIds = useWatch();
  const buttonDisabled = Object.values(touchedIds).every(
    (selected) => !selected,
  );

  const handleDelete = handleSubmit((fieldValues) => {
    const selectedIds = Object.entries(fieldValues)
      .filter(([, selected]) => selected)
      .map(([id]) => id);
    // TODO: api 연결
    // eslint-disable-next-line no-console
    console.log(selectedIds);
  });
  return (
    <Container bottom="48" left="0" position="fixed" width="full">
      <Button disabled={buttonDisabled} onClick={handleDelete}>
        삭제
      </Button>
    </Container>
  );
};

export default NotificationDeleteButton;
