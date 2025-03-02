import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./views/Home";
import Auth from "./views/Auth";
import About from "./views/About";
import Explore from "./views/Explore";
import NotFound from "./views/NotFound";
import SingleItem from "./views/SingleItem";

import Dashboard from "./views/Dashboard/Dashboard";
import DashboardParticipants from "./views/Dashboard/Participants/Participants";
import ParticipantsEdit from "./views/Dashboard/Participants/ParticipantsEdit";

const AppRoutes = () => {
  return (
    <Routes>
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
        <Route path="/dashboard/participants" element={<DashboardParticipants />} />
        <Route path="/dashboard/participants/:id?" element={<ParticipantsEdit />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
