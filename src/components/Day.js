import React, { useContext, useEffect, useState } from "react";
import daysjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModel,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  useEffect(() => {
    const events = filteredEvents.filter(
      (event) => daysjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);
  function getCurrDay() {
    return day.format("DD-MM-YY") === daysjs().format("DD-MM-YY")
      ? "bg-green-500 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-100 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrDay()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModel(true);
        }}
      >
        {dayEvents.map((event, i) => (
          <div
            key={i}
            onClick={() => setSelectedEvent(event)}
            className={`bg-${event.color}-400 p-1 mr-3 text-black text-sm rounded mb-1 truncate`}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}
