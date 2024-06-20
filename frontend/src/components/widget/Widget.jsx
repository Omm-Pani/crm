import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type }) => {
  return (
    <div className="flex flex-col items-center h-24 w-3/12 p-5 rounded-lg shadow-md hover:shadow-xl bg-white cursor-pointer	">
      <div className="pb-3">
        <PersonOutlinedIcon fontSize="large" />
      </div>
      <div>{type}</div>
    </div>
  );
};

export default Widget;
