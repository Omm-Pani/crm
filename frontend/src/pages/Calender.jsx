import React, { useState, useContext, useEffect } from "react";
// import "./App.css";
import { getMonth } from "../helpers/calenderUtil";
import CalendarHeader from "../components/calender/CalendarHeader";
import Sidebar from "../components/calender/Sidebar";
import Month from "../components/calender/Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "../components/calender/EventModal";
function Calender() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Calender;
