import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "./util/util.js";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModel from "./components/EventModel";
import { Dimensions } from "react-native";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

function App() {
  const [currMonth, setCurrMonth] = useState(getMonth());
  const { monthIndex, showEventModel } = useContext(GlobalContext);
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

  useEffect(() => {
    setCurrMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModel && <EventModel />}
      <div className="h-screen flex flex-col bg-slate-800 text-white">
        <CalendarHeader />
        <div className="flex flex-1">
          {dimensions.window.width > 1000 && <Sidebar />}
          <Month month={currMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
