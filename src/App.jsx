import React, { useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import HomePage from './pages/public/HomePage';
import SearchResultsPage from './pages/public/SearchResultsPage';
import PropertyDetailsPage from './pages/public/PropertyDetailsPage';
import ComparePage from './pages/public/ComparePage';
import BrokerProfilePage from './pages/public/BrokerProfilePage';

// Broker pages
import BrokerOverview from './pages/broker/BrokerOverview';
import BrokerListings from './pages/broker/BrokerListings';
import BrokerAddProperty from './pages/broker/BrokerAddProperty';
import BrokerCRM from './pages/broker/BrokerCRM';
import BrokerInbox from './pages/broker/BrokerInbox';
import BrokerProfile from './pages/broker/BrokerProfile';

// Developer pages
import DevOverview from './pages/developer/DevOverview';
import DevProjects from './pages/developer/DevProjects';
import DevAddProject from './pages/developer/DevAddProject';
import DevBookings from './pages/developer/DevBookings';
import DevProfile from './pages/developer/DevProfile';

// Admin pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProperties from './pages/admin/AdminProperties';
import AdminVerification from './pages/admin/AdminVerification';

// Global compare context
export const CompareContext = createContext({ compareList: [], addToCompare: () => {}, removeFromCompare: () => {} });
export const useCompare = () => useContext(CompareContext);

// Global dashboard role context
export const RoleContext = createContext({ role: 'broker', setRole: () => {} });
export const useRole = () => useContext(RoleContext);

export default function App() {
  const [compareList, setCompareList] = useState([]);
  const [role, setRole] = useState('broker');

  const addToCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList(prev => prev.filter(x => x !== id));
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/broker/:id" element={<BrokerProfilePage />} />

          {/* Broker Dashboard */}
          <Route path="/dashboard/broker" element={<BrokerOverview />} />
          <Route path="/dashboard/broker/listings" element={<BrokerListings />} />
          <Route path="/dashboard/broker/add-property" element={<BrokerAddProperty />} />
          <Route path="/dashboard/broker/crm" element={<BrokerCRM />} />
          <Route path="/dashboard/broker/inbox" element={<BrokerInbox />} />
          <Route path="/dashboard/broker/profile" element={<BrokerProfile />} />

          {/* Developer Dashboard */}
          <Route path="/dashboard/developer" element={<DevOverview />} />
          <Route path="/dashboard/developer/projects" element={<DevProjects />} />
          <Route path="/dashboard/developer/add-project" element={<DevAddProject />} />
          <Route path="/dashboard/developer/bookings" element={<DevBookings />} />
          <Route path="/dashboard/developer/profile" element={<DevProfile />} />

          {/* Admin Dashboard */}
          <Route path="/dashboard/admin" element={<AdminOverview />} />
          <Route path="/dashboard/admin/users" element={<AdminUsers />} />
          <Route path="/dashboard/admin/properties" element={<AdminProperties />} />
          <Route path="/dashboard/admin/verification" element={<AdminVerification />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CompareContext.Provider>
    </RoleContext.Provider>
  );
}
