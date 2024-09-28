import React, { useState } from "react";
import s from "./ModalWindow.module.css";
import { Box, Button, TextField } from "@mui/material";
// import { DatePicker } from '@mui/';
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eject } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addEvent } from "../../store/calendar.reducer";
import moment from "moment";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

interface Props {}

// const InputData = ({ label, icon, value, setValue }) => {
//   return (
//     <div>

//     </div>
//   )
// };

interface ModalWindowProps {
  open: boolean;
  setOpen: any;
  initialDate: any;
  mode: "add" | "edit";
  start?: string;
  title?: string;
  date?: string;
  notes?: string;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  open,
  setOpen,
  initialDate,
  mode,
  date,
  start,
  title,
  notes,
}) => {
  const [error, setError] = useState<string | null>(null);
  console.log(moment(initialDate).format("YYYY-MM-DDTHH:mm:ssZ"));

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: mode === "edit" ? title : "",
      date: mode === "edit" ? moment(date).format("YYYY-MM-DDTHH:mm:ssZ") : moment(initialDate).format("YYYY-MM-DDTHH:mm:ssZ"),
      time: mode === "edit" ? start : "",
      notes: mode === "edit" ? notes : "",
    },
    onSubmit: (values) => {
      const { date, name, notes, time } = values;

      if (
        // date.length === 0 ||
        name!.length === 0 ||
        notes!.length === 0 ||
        time!.length === 0
      ) {
        return setError("Fill all values");
      }

      // console.log(moment({da}));

      const dateMoment = moment(date || initialDate);
      const timeMoment = moment(time);

      timeMoment.year(dateMoment.year());
      timeMoment.month(dateMoment.month());
      timeMoment.date(dateMoment.date());

      const startTime = timeMoment.clone();
      const endTime = timeMoment.clone().add(1, "hours");

      console.log(startTime, endTime);

      dispatch(
        addEvent({
          id: uuidv4(),
          start: new Date(startTime as any) as any,
          end: new Date(endTime as any) as any,
          title: name!,
          date: new Date(dateMoment as any),
          notes: notes!,
        })
      );

      setError(null);
      console.log(values);
      setOpen(false);
    },
  });
  return (
    <>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={formik.handleSubmit}
        className={s.modal}
        style={{ display: open ? "flex" : "none" }}
      >
        <Eject className={s["modal-arrow"]} />
        <div className={s.modal__content}>
          <TextField
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            variant="standard"
            label="event name"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // @ts-ignore
              defaultValue={dayjs(formik.values.date)}
              // @ts-ignore
              value={dayjs(formik.values.date)}
              // @ts-ignore
              // value={moment(initialDate)}
              // @ts-ignore
              onChange={(value) => {
                formik.setFieldValue("date", value!.format(""));
                // console.log(value.format(""));
              }}
              slotProps={{
                textField: {
                  InputLabelProps: { shrink: true },
                  variant: "standard",
                  size: "small",
                  style: { overflow: "visible", width: "100%" },
                },
              }}
              label="event date"
            />
            <TimePicker
              defaultValue={moment(formik.values.time) as any}
              onChange={(value) => {
                formik.setFieldValue("time", value!.format(""));
                console.log(value!.format(""));
              }}
              slotProps={{
                textField: {
                  InputLabelProps: { shrink: true },
                  variant: "standard",
                  size: "small",
                  style: { overflow: "visible", width: "100%" },
                },
              }}
              label="event time"
            />
          </LocalizationProvider>
          <TextField
            onChange={formik.handleChange}
            value={formik.values.notes}
            name="notes"
            slotProps={{ inputLabel: { shrink: true } }}
            variant="standard"
            label="notes"
          />
        </div>
        {error && <Box color={"red"}>{error}</Box>}
        <div className={s.modal__buttons}>
          <Button onClick={() => setOpen(false)} color="error">
            Cancel
          </Button>
          {/* @ts-ignore */}
          <Button type="sumbit">Save</Button>
        </div>
      </form>
    </>
  );
};
