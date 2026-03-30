import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdvancedSearchFilterPage } from './pages/AdvancedSearchFilterPage/AdvancedSearchFilterPage'
import { ApproveRejectModelPage } from './pages/ApproveRejectModelPage/ApproveRejectModelPage'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { StatusChangeModelPage } from './pages/StatusChangeModelPage/StatusChangeModelPage'
import { UserManagementList } from './pages/UserManagementList/UserManagementList'
import AgentProfilePage from './pages/AgentProfilePage/AgentProfilePage'
import ProfileSettingsPage from "./pages/ProfileSettingsPage/ProfileSettingsPage";
import MyInquiriesPage from "./pages/MyInquiriesPage/MyInquiriesPage";
import ListingViewsAnalytics from "./pages/ListingViewsAnalytics/ListingViewsAnalytics";
import PropertyDraftsPage from "./pages/PropertyDrafts/PropertyDraftsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route
          path="/AdvancedSearchFilterPage"
          element={<AdvancedSearchFilterPage />}
        />
        <Route
          path="/ApproveRejectModelPage"
          element={<ApproveRejectModelPage />}
        />
        <Route
          path="/StatusChangeModelPage"
          element={<StatusChangeModelPage />}
        />
        <Route path="/UserManagementList" element={<UserManagementList />} />
        <Route path="/AgentProfilePage" element={<AgentProfilePage />} />
        <Route path="/ProfileSettingsPage" element={<ProfileSettingsPage />} />
        <Route path="/MyInquiriesPage" element={<MyInquiriesPage />} />
        <Route
          path="/ListingViewsAnalytics"
          element={<ListingViewsAnalytics />}
        />
        <Route path="/PropertyDrafts" element={<PropertyDraftsPage />} />
        <Route
          path="/propertymoderation"
          element={<Navigate to="/ApproveRejectModelPage" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
