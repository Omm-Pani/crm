import React, { useReducer, useState } from "react";
import AuthInputBox from "../ui/AuthInputBox";
import Small_exit_icon from "../svg/small_exit_icon";
import { campaignReducer } from "../reducers/campaignReducer";
import axios from "axios";

export default function NewCampaign({
  setVisible,
  campaignInputs,
  setCampaignInputs,
  rows,
  setRows,
}) {
  const [{ loading, error, campaigns }, dispatch] = useReducer(
    campaignReducer,
    {
      loading: false,
      campaigns: [],
      error: "",
    }
  );
  const handleCampaignRequest = async () => {
    const data = await axios.post(`http://localhost:5000/create-campaign`, {
      ...campaignInputs,
    });
    console.log(data);
    setRows([...rows, data.data]);
    setCampaignInputs({
      name: "",
      duration: "",
      goal: "",
      status: "",
    });
    setVisible(false);
  };

  console.log(campaigns);
  return (
    <div className="w-1/2 bg-white border rounded-lg  border-gray-500 p-4 mt-4 absolute left-1/4 top-1/4">
      <div
        className="w-8 h-8 rounded-full bg-gray-500 absolute right-0 top-0 mr-2 mt-2 cursor-pointer"
        onClick={() => setVisible(false)}
      >
        <Small_exit_icon />
      </div>
      <AuthInputBox
        label="Name"
        placeholder="Name"
        onChange={(e) => {
          setCampaignInputs({
            ...campaignInputs,
            name: e.target.value,
          });
        }}
      />

      <AuthInputBox
        label="Duration"
        placeholder="Duration"
        onChange={(e) => {
          setCampaignInputs({
            ...campaignInputs,
            duration: e.target.value,
          });
        }}
      />
      <AuthInputBox
        label="Goal"
        placeholder="Goal"
        onChange={(e) => {
          setCampaignInputs({
            ...campaignInputs,
            goal: e.target.value,
          });
        }}
      />
      <AuthInputBox
        label="Status"
        placeholder="Status"
        onChange={(e) => {
          setCampaignInputs({
            ...campaignInputs,
            status: e.target.value,
          });
        }}
      />

      <button
        type="button"
        onClick={() => {
          handleCampaignRequest();
        }}
        className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        submit
      </button>
    </div>
  );
}
