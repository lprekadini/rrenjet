
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './views/Home';
import About from './views/About';
import Explore from './views/Explore';
import NotFound from './views/NotFound';
import SingleItem from './views/SingleItem';
import './App.css'

const App = () => (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/single/:id" element={<SingleItem />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
