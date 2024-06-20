import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
export const DashBoard = () => {
  const handleConnectFacebook = async () => {
    // Redirect to backend route to initiate OAuth flow
    // const pageList = await axios.get("http://localhost:5000/auth/facebook");
    window.location.href = "http://localhost:5000/auth/facebook";
    // console.log(pageList);
  };
  return (
    <div>
      {/* <button onClick={handleConnectFacebook}>Connect Facebook Page</button> */}
      <div className="flex">
        <Sidebar />
        {/* <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div> */}
      </div>
    </div>
  );
};
