import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { useState } from "react";
import "./App.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import s from "./calendar.module.css";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { Button, ButtonGroup, Popover, Typography } from "@mui/material";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { useSelector } from "react-redux";
import { eventsSelector } from "./store/calendar.reducer";

const localizer = momentLocalizer(moment);

const Header = (props: any) => {
  // console.log(props);

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

const WeekHeader = (props: any) => {
  return (
    <div
      style={{
        width: "100%",
        height: "45px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F5F6FA",
        padding: "0px",
      }}
    >
      <div>
        <strong>{moment(props.date).format("ddd MM/DD")}</strong>
      </div>
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

const CustomEvent = ({ event, ...props }: any) => {
  // console.log(event);

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
          id={event.id}
          open={open}
          setOpen={setOpen}
        />
      </BasePopup>
    </div>
  );
};

function Toolbar(props: any) {
  const goToBack = () => {
    let mDate = props.date;
    let newDate = new Date(mDate);
    newDate.setMonth(mDate.getMonth() - 1);
    props.onNavigate("PREV");
  };

  const goToNext = () => {
    let mDate = props.date;
    let newDate = new Date(mDate);
    newDate.setMonth(mDate.getMonth() + 1);
    props.onNavigate("NEXT");
  };

  const goToCurrent = () => {
    let now = new Date();
    props.onNavigate("TODAY", now);
  };

  const goToMonthView = () => {
    props.onView("month");
  };

  const goToWeekView = () => {
    props.onView("week");
  };

  const goToDayView = () => {
    props.onView("day");
  };

  return (
    <div className={s["toolbar"]}>
      {/* <h4 style={{ color: "#4D4F5C" }}>Calendar View</h4> */}
      <div className="back-next-buttons">
        <Button
          onClick={goToCurrent}
          variant="outlined"
          sx={{
            background: "white",
            color: "black",
            border: "2px solid #D8DBE2",
          }}
        >
          <span className="label-filter-off">Today</span>
        </Button>
        <Button
          sx={{
            background: "white",
            color: "black",
            border: "2px solid #D8DBE2",
          }}
          variant="outlined"
          className={s["toolbar__button"]}
          onClick={goToBack}
        >
          <span className="label-filter-off">Back</span>
        </Button>
        <Button
          sx={{
            background: "white",
            color: "black",
            border: "2px solid #D8DBE2",
          }}
          variant="outlined"
          className={s["toolbar__button"]}
          onClick={goToNext}
        >
          <span className="label-filter-off">Next</span>
        </Button>
      </div>

      <div>
        <label className="label-date">{moment(props.date).format('MMMM YYYY')}</label>
      </div>

      <div className="filter-container">
        <Button
          onClick={goToMonthView}
          sx={{
            background: "white",
            color: "black",
            border: "2px solid #D8DBE2",
          }}
        >
          <span className="label-filter-off">Month</span>
        </Button>
        <Button
          onClick={goToWeekView}
          sx={{
            background: "white",
            color: "black",
            border: "2px solid #D8DBE2",
          }}
        >
          <span className="label-filter-off">Week</span>
        </Button>
        <Button
          onClick={goToDayView}
          sx={{
            background: "white",
            color: "black",
            border: "2px solid #D8DBE2",
          }}
        >
          <span className="label-filter-off">Day</span>
        </Button>
        {/* <Button className="bg-filter-off">
            <span className="label-filter-off">Year</span>
          </Button> */}
      </div>
    </div>
  );
}

function App() {
  const events = useSelector(eventsSelector);

  const [currentView, setCurrentView] = useState("month");
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

  return (
    <>
      <div>
        <Calendar
          defaultView="month"
          onView={(view) => setCurrentView(view)}
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
            toolbar: Toolbar,
            // header: Header,
            // dateCellWrapper: Component,
            // dayColumnWrapper:Component,
            // day:{
            //   header:Component,
            //   event:Component
            // },
            month: {
              dateHeader: CustomDateCell,
              header: Header,
              // header:Component
              // event:Component
            },
            week: {
              header: WeekHeader,
            },
            event: CustomEvent,
          }}
          className="calendar"
        />
      </div>
      <Popover
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
