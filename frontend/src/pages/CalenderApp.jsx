import React from "react";
import Calender from "./Calender";
import ContextWrapper from "../context/ContextWrapper";

export default function CalenderApp() {
  return (
    <ContextWrapper>
      <Calender />
    </ContextWrapper>
  );
}
