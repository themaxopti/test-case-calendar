import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { useState } from "react";
import "./App.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import s from "./calendar.module.css";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { Popover, Typography } from "@mui/material";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { useSelector } from "react-redux";
import { eventsSelector } from "./store/calendar.reducer";

const localizer = momentLocalizer(moment);

const Header = (props: any) => {
  return (
    <div
      style={{
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F5F6FA",
        padding: "0px",
      }}
    >
      <div>{props.label.toUpperCase()}</div>
    </div>
  );
};

const CustomDateCell = (props: any) => {
  const [open, setOpen] = useState(false);
  const day = moment(props.date).format("D");

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <div
        onClick={(e) => {
          // console.log("hi");
          // setOpen(true);
          // handleClick(e);
        }}
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

const MonthRow = ({ value, children }: any) => {
  return (
    <div
      style={{
        // backgroundColor: isWeekend ? '#ffcccc' : '#ccffcc',
        // height: '135px',
        position: "relative",
        minHeight: "135px",
      }}
    >
      {children}
    </div>
  );
};

function Component(props: any) {
  return <>121321</>;
}

const CustomEvent = ({ event, ...props }: any) => {
  console.log(event);

  const [open, setOpen] = useState(false);
  const day = moment(props.date).format("D");

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

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
          open={open}
          setOpen={setOpen}
        />
      </BasePopup>
    </div>
  );
};

function App() {
  const events = useSelector(eventsSelector);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectSlot = ({ start }: any, e: any) => {
    setSelectedDate(start);
    setAnchorEl(e.currentTarget); // Сохраняем элемент, на который кликнули
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // const [events, setEvents] = useState([
  //   {
  //     title: "Sample Event",
  //     start: new Date(),
  //     end: new Date(moment().add(1, "hours") as any),
  //     test:2,
  //   },
  //   {
  //     title: "Sample Event",
  //     start: new Date(),
  //     end: new Date(moment().add(1, "hours") as any),
  //   },
  // ]);

  return (
    <>
      {/* <ModalWindow /> */}
      <div>
        <Calendar
          // @ts-ignore
          onSelectSlot={() => {
            console.log("gi");
          }}
          localizer={localizer}
          events={events || undefined}
          formats={{
            monthHeaderFormat: "MMMM YYYY",
            dayFormat: "D",
          }}
          startAccessor="start"
          endAccessor="end"
          components={{
            header: Header,
            // dateCellWrapper: Component,
            // dayColumnWrapper:Component,
            // day:{
            //   header:Component,
            //   event:Component
            // },
            month: {
              dateHeader: CustomDateCell,
              // header:Component
              // event:Component
            },
            event: CustomEvent,
          }}
          className="calendar"
        />
      </div>
      <Popover
        // id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>
          You clicked on:{" "}
          {selectedDate && moment(selectedDate).format("MMMM Do YYYY")}
        </Typography>
      </Popover>
    </>
  );
}

export default App;
