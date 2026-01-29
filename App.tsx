import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Personal from './pages/Personal';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="commercial-work" element={<Home />} /> {/* Alias for Home if needed */}
          <Route path="personal" element={<Personal />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Specific Routes for Project Details based on Category */}
          <Route path="commercial-work/:id" element={<ProjectDetail />} />
          <Route path="personal/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;