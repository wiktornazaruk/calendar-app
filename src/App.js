import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util/util.js";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModel from "./components/EventModel";

function App() {
  const [currMonth, setCurrMonth] = useState(getMonth());
  const { monthIndex, showEventModel } = useContext(GlobalContext);
  useEffect(() => {
    setCurrMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <React.Fragment>
      {showEventModel && <EventModel />}
      <div className="h-screen flex flex-col bg-slate-800 text-white">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
