import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => (
  <div>
    <Navbar />
    <main className="">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
