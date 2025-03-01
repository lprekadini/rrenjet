import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout"; 
import Home from "./views/Home";
import Auth from "./views/Auth";
import About from "./views/About";
import Explore from "./views/Explore";
import NotFound from "./views/NotFound";
import SingleItem from "./views/SingleItem";

import Dashboard from "./views/dashboard/Dashboard"; // Dashboard pages
// import DashboardUsers from "./views/dashboard/DashboardUsers"; // Example dashboard page
// import DashboardSettings from "./views/dashboard/DashboardSettings"; // Example settings page
import AppRoutes from "./routes";

import "./App.css";

const App = () => (
  <Router>
        <AppRoutes />
  </Router>
);

export default App;
