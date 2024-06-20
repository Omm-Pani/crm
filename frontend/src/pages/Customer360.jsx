import React, { useState } from "react";
import NewCampaign from "../components/NewCampaign";
import List from "../components/table/Table";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

export default function Customer360() {
  const [visible, setVisible] = useState(false);
  const [campaignInputs, setCampaignInputs] = useState({
    name: "",
    duration: "",
    goal: "",
    status: "",
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Test camp",
      created: "1 March",
      duration: "2 weeks",
      goal: "Improve sales",
      status: "Started",
    },
  ]);
  //   useEffect(() => {
  //     fetchCampaigns();
  //   }, [rows]);

  const fetchCampaigns = async () => {
    const data = await axios.get(`http://localhost:5000/get-campaigns`);
    setRows(data.data);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="relative">
          <div className="flex justify-between p-2">
            <p className="pl-4 text-3xl">Customer 360</p>
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Create New
            </button>
          </div>
          <div className="pl-5 pr-5">
            <List rows={rows} />
          </div>
          {visible ? (
            <NewCampaign
              setCampaignInputs={setCampaignInputs}
              campaignInputs={campaignInputs}
              setVisible={setVisible}
              rows={rows}
              setRows={setRows}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
