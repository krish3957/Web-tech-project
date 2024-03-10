import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Orders from "./pages/Orders/Orders";
import OrderUpdate from "./pages/OrderUpdate/OrderUpdate";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  var admin = null;
  if (currentUser) {
    admin = currentUser.isAdmin;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={admin ? <Navigate to={'/users'} /> : <Login />} />
      </Routes>
      {admin && (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/users" element={admin ? <UserList /> : <Navigate to='/' />} />
              <Route path="/user/:userId" element={admin ? <User /> : <Navigate to='/' />} />
              <Route path="/newUser" element={admin ? <NewUser /> : <Navigate to='/' />} />
              <Route path="/products" element={admin ? <ProductList /> : <Navigate to='/' />} />
              <Route path="/product/:productId" element={admin ? <Product /> : <Navigate to='/' />} />
              <Route path="/newproduct" element={admin ? <NewProduct /> : <Navigate to='/' />} />
              <Route path="/orders" element={admin ? <Orders /> : <Navigate to='/' />} />
              <Route path="/order/:id" element={admin ? <OrderUpdate /> : <Navigate to='/' />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
