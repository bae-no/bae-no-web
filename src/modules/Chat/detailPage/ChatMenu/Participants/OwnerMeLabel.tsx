import { Label } from "src/ui/Label";

interface OwnerMeLabelProps {
  isMe: boolean;
  isOwner: boolean;
}

export const OwnerMeLabel = ({ isOwner, isMe }: OwnerMeLabelProps) => (
  <>
    {isOwner && (
      <Label color="skyblue" variant="border">
        방장
      </Label>
    )}
    {isMe && (
      <Label color="primary" variant="border">
        나
      </Label>
    )}
  </>
);
