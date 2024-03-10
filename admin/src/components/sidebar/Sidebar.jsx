import "./sidebar.css";
import { useDispatch } from 'react-redux';
import {
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { loggingOut } from "../../redux/apiCalls";

export default function Sidebar() {
  const dispatch = useDispatch();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
            </Link>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={() => {
              loggingOut(dispatch);
            }}>
              <Report className="sidebarIcon" />
              logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
