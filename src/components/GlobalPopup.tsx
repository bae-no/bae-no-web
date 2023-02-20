import { atom, useAtomValue, useSetAtom } from "jotai";

import { Popup } from "src/ui/Popup";
import { PopupProps } from "src/ui/Popup/Popup";

const popupAtom = atom<null | PopupProps>(null);

export const usePopup = () => {
  const setPopup = useSetAtom(popupAtom);
  const closePopup = () => setPopup(null);
  const openPopup = (props: PopupProps) =>
    setPopup({
      ...props,
      onCancel: props.onCancel || closePopup,
      onConfirm: props.onConfirm || closePopup,
      open: true,
    });

  return { closePopup, openPopup };
};

const GlobalPopup = () => {
  const popupState = useAtomValue(popupAtom);

  if (!popupState) return null;

  return <Popup {...popupState} />;
};

export default GlobalPopup;
