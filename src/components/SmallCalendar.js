import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonth } from "../util/util.js";
import GlobalContext from "../context/GlobalContext.js";

export default function SmallCalendar() {
  const [currMonthIndex, setCurrMonthIndex] = useState(dayjs().month());
  const [currMonth, setCurrMonth] = useState(getMonth());
  useEffect(() => {
    setCurrMonth(getMonth(currMonthIndex));
  }, [currMonthIndex]);
  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);
  useEffect(() => {
    setCurrMonthIndex(monthIndex);
  }, [monthIndex]);
  function handlePrevMonth() {
    setCurrMonthIndex(currMonthIndex - 1);
  }
  function handleNextMonth() {
    setCurrMonthIndex(currMonthIndex + 1);
  }
  function colorToday(day) {
    const format = "DD-MM-YY";
    const today = dayjs().format(format);
    const currDay = day.format(format);
    const selectedDay = daySelected && daySelected.format(format);

    if (currDay === today) {
      return "bg-green-500 text-white rounded-full w-7";
    } else if (currDay === selectedDay) {
      return "bg-blue-500 text-white rounded-full w-7";
    } else {
      return "";
    }
  }
  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="font-bold">
          {dayjs(new Date(dayjs().year(), currMonthIndex)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                onClick={() => {
                  setSmallCalendarMonth(currMonthIndex);
                  setDaySelected(day);
                }}
                key={idx}
                className={`py-1 w-full ${colorToday(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
