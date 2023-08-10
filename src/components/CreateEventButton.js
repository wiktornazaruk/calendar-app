import React, { useContext } from "react";
import SmallCalendar from "./SmallCalendar";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export default function CreateEventButton() {
  const { setShowEventModel, daySelected } = useContext(GlobalContext);
  function colorButton(daySelected) {
    const format = "DD-MM-YY";
    const today = dayjs().format(format);
    const currDay = daySelected.format(format);

    if (currDay === today) {
      return "bg-green-500";
    } else {
      return "bg-blue-500";
    }
  }
  return (
    <button
      onClick={() => setShowEventModel(true)}
      className={`border-slate-700 border p-2 rounded-full flex items-center ${colorButton(
        daySelected
      )}`}
    >
      <span className="pl-3 pr-3">Create Event</span>
    </button>
  );
}
