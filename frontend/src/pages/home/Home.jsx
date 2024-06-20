import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="flex flex-wrap justify-between gap-4 p-20 bg-slate-100 h-full overscroll-none">
          <Widget type="campaign" />
          <Widget type="customer 360" />
          <Widget type="converse" />
          <Widget type="insights" />
          <Widget type="stores" />
          <Widget type="markups" />
        </div>
      </div>
    </div>
  );
};

export default Home;
