import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./views/Home";
import Auth from "./views/Auth";
import About from "./views/About";
import Explore from "./views/Explore";
import NotFound from "./views/NotFound";
import SingleItem from "./views/SingleItem";

import Dashboard from "./views/Dashboard/Dashboard";
import DashboardPersonality from "./views/Dashboard/Personality/Personality";
import PersonalityEdit from "./views/Dashboard/Personality/PersonalityEdit";
import DashboardCategories from "./views/Dashboard/Categories/Categories";
import CategoryEdit from "./views/Dashboard/Categories/CategoryEdit";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Main Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/single/:id" element={<SingleItem />} />
      </Route>

      {/* Dashboard Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/dashboard/personality"
          element={<DashboardPersonality />}
        />
        <Route
          path="/dashboard/personality/:id?"
          element={<PersonalityEdit />}
        />

        <Route path="/dashboard/categories" element={<DashboardCategories />} />
        <Route path="/dashboard/category/:id?" element={<CategoryEdit />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
