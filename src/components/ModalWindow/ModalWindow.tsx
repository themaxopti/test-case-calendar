import React, { useState } from "react";
import s from "./ModalWindow.module.css";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addEvent, editEvent } from "../../store/calendar.reducer";
import moment from "moment";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

interface ModalWindowProps {
  open: boolean;
  setOpen: any;
  initialDate: any;
  mode: "add" | "edit";
  start?: string;
  title?: string;
  date?: string;
  notes?: string;
  id?: string;
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
  id,
}) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: mode === "edit" ? title : "",
      date:
        mode === "edit"
          ? moment(date).format("YYYY-MM-DDTHH:mm:ssZ")
          : moment(initialDate).format("YYYY-MM-DDTHH:mm:ssZ"),
      time: mode === "edit" ? start : "",
      notes: mode === "edit" ? notes : "",
    },
    onSubmit: (values) => {
      const { date, name, notes, time } = values;

      if (
        name!.length === 0 ||
        notes!.length === 0 ||
        time!.length === 0
      ) {
        return setError("Fill all values");
      }

      const dateMoment = moment(date || initialDate);
      const timeMoment = moment(time);

      timeMoment.year(dateMoment.year());
      timeMoment.month(dateMoment.month());
      timeMoment.date(dateMoment.date());

      const startTime = timeMoment.clone();
      const endTime = timeMoment.clone().add(1, "hours");

      if (mode === "add") {
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
      }
      if (mode === "edit") {
        dispatch(
          editEvent({
            start: new Date(startTime as any) as any,
            end: new Date(endTime as any) as any,
            title: name!,
            date: new Date(dateMoment as any),
            notes: notes!,
            id,
          })
        );
      }

      setError(null);
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
              defaultValue={dayjs(formik.values.date)}
              value={dayjs(formik.values.date)}
              onChange={(value) => {
                formik.setFieldValue("date", value!.format(""));
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
              value={dayjs(formik.values.time)}
              onChange={(value) => {
                formik.setFieldValue("time", value!.format(""));
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
