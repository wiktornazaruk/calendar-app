import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { Dimensions } from "react-native";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleCurrMonth() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  function setTextSize() {
    return dimensions.window.width > 500 ? "text-xl" : "text-sm";
  }
  return (
    <div className="border-x">
      <header className="px-4 py-2 flex items-center">
        <h1 className={`mr-4 ${setTextSize} font-bold`}>Calendar</h1>
        <button
          onClick={handleCurrMonth}
          className="bg-green-500 text-white border-slate-700 border rounded-full py-2 px-4 mr-3"
        >
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer my-2">
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer mx-3 my-2">
            chevron_right
          </span>
        </button>
        <h2 className={`${setTextSize} font-bold`}>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </header>
    </div>
  );
}
