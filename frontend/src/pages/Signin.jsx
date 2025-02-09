import { Auth } from "../components/Auth";
import { Quotes } from "../components/Quotes";
import React from "react";

export const Signin = () => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <Auth type="signin" />
      </div>
      <div className="invisible lg:visible">
        <Quotes />
      </div>
    </div>
  );
};
