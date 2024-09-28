import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import moment from "moment";
import { useState } from "react";
import { ModalWindow } from "./ModalWindow/ModalWindow";


export const CustomDateCell = (props: any) => {
    const [open, setOpen] = useState(false);
    const day = moment(props.date).format("D");
  
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchor(anchor ? null : event.currentTarget);
    };
  
    const id = open ? "simple-popper" : undefined;
  
    return (
      <>
        <div
          className="custom-date-cell"
          style={{
            marginRight: "10px",
            marginTop: "10px",
            position: "relative",
            zIndex: "0",
          }}
        >
          <BasePopup
            style={{ zIndex: "1200", position: "absolute" }}
            id={id}
            open={open}
            anchor={anchor}
          >
            <ModalWindow
              mode="add"
              initialDate={props.date}
              open={open}
              setOpen={setOpen}
            />
          </BasePopup>
          <span
            className="day-number"
            onClick={(e) => {
              setOpen(!open);
              handleClick(e);
            }}
          >
            {day}
          </span>
        </div>
      </>
    );
  };