import { useState } from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { ModalWindow } from "./ModalWindow/ModalWindow";

export const CustomEvent = ({ event, ...props }: any) => {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const id = open ? "simple-popper" : undefined;

  return (
    <div
      onClick={(e) => {
        setOpen(!open);
        handleClick(e);
      }}
    >
      <div>{event.title}</div>
      <BasePopup
        style={{ zIndex: "1200", position: "absolute" }}
        id={id}
        open={open}
        anchor={anchor}
      >
        <ModalWindow
          mode="edit"
          date={event.date}
          start={event.start}
          title={event.title}
          notes={event.notes}
          initialDate={props.date}
          id={event.id}
          open={open}
          setOpen={setOpen}
        />
      </BasePopup>
    </div>
  );
};
