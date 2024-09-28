import { Calendar, momentLocalizer } from "react-big-calendar";
import "./App.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import { eventsSelector } from "./store/calendar.reducer";
import { CustomEvent } from "./components/CustomEvent";
import { Toolbar } from "./components/Toolbar";
import { Header, WeekHeader } from "./components/Header";
import { CustomDateCell } from "./components/CustomDateCell";

const localizer = momentLocalizer(moment);

function App() {
  const events = useSelector(eventsSelector);

  return (
    <>
      <div>
        <Calendar
          defaultView="month"
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
            month: {
              dateHeader: CustomDateCell,
              header: Header,
            },
            week: {
              header: WeekHeader,
            },
            event: CustomEvent,
          }}
          className="calendar"
        />
      </div>
    </>
  );
}

export default App;
