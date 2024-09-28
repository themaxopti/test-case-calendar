import { Button } from "@mui/material";
import moment from "moment";
import s from "../calendar.module.css";

export const Toolbar = (props: any) => {
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
        <label className="label-date">
          {moment(props.date).format("MMMM YYYY")}
        </label>
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
      </div>
    </div>
  );
};
