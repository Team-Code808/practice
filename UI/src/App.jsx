import React, { useEffect } from 'react';
import useStore from './store/useStore';
import FooterLinks from './components/FooterLinks';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminTeamManagement from './pages/AdminTeamManagement';
import AdminMonitoring from './pages/AdminMonitoring';
import AdminApplications from './pages/AdminApplications';
import AdminMyPage from './pages/AdminMyPage';
import Department from './pages/Department';
import Attendance from './pages/Attendance';
import Consultation from './pages/Consultation';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import MyPage from './pages/MyPage';
import FeatureDetails from './pages/FeatureDetails';
import PointMall from './pages/PointMall';
import { NavItemType, UserRole } from './constants/types';
import {
  ShieldAlert,
  Lock,
  Construction,
  Clock
} from 'lucide-react';
import * as S from './App.styles';

const MainLayout = ({ children }) => {
  const { isAdminMode, setIsAdminMode, logout, user } = useStore();

  return (
    <S.AppContainer $admin={isAdminMode}>
      <Header />
      <S.MainContent>
        {children}
      </S.MainContent>
      <S.Footer $admin={isAdminMode}>
        <S.FooterContent>
          <p>© 2024 Calm Desk Admin Suite. All rights reserved.</p>
          <FooterLinks />
        </S.FooterContent>
      </S.Footer>
    </S.AppContainer>
  );
};

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const App = () => {
  const { user, isAdminMode } = useStore();
  const navigate = useNavigate();

  const handleStart = () => navigate('/auth');
  const handleFeatureDetails = () => navigate('/features');
  const handleBackToLanding = () => navigate('/');

  const AdminPlaceholder = ({ icon: Icon, title, description }) => (
    <S.PlaceholderContainer>
      <S.PlaceholderIconBox $mode="admin">
        <Icon />
      </S.PlaceholderIconBox>
      <S.PlaceholderText $mode="admin">
        <h2>{title}</h2>
        <p>{description}</p>
      </S.PlaceholderText>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <S.Badge>Coming Soon</S.Badge>
      </div>
    </S.PlaceholderContainer>
  );

  const StatusPlaceholder = ({ icon: Icon, title, description }) => (
    <S.PlaceholderContainer>
      <S.PlaceholderIconBox>
        <Icon />
      </S.PlaceholderIconBox>
      <S.PlaceholderText>
        <h2>{title}</h2>
        <p>{description}</p>
      </S.PlaceholderText>
    </S.PlaceholderContainer>
  );

  return (
    <Routes>
      <Route path="/" element={<LandingPage onStart={handleStart} onViewFeatures={handleFeatureDetails} />} />
      <Route path="/features" element={<FeatureDetails onBack={handleBackToLanding} onStart={handleStart} />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route path="/app/*" element={
        <ProtectedRoute>
          <MainLayout>
            {user?.joinStatus === 'PENDING' ? (
              <StatusPlaceholder icon={Clock} title="승인 대기 중" description="관리자의 입사 승인을 기다리고 있습니다." />
            ) : user?.joinStatus === 'REJECTED' ? (
              <StatusPlaceholder icon={ShieldAlert} title="신청 반려됨" description="입사 신청이 반려되었습니다." />
            ) : (
              <Routes>
                {/* Admin Routes */}
                {isAdminMode && (
                  <>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminTeamManagement />} />
                    <Route path="monitoring" element={<AdminMonitoring />} />
                    <Route path="applications" element={<AdminApplications />} />
                    <Route path="mypage" element={<AdminMyPage />} />
                    <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                  </>
                )}

                {/* Staff Routes */}
                {!isAdminMode && (
                  <>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="department" element={<Department />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="consultation" element={<Consultation />} />
                    <Route path="pointmall" element={<PointMall />} />
                    <Route path="mypage/*" element={<MyPage />} />
                    <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                  </>
                )}
              </Routes>
            )}
          </MainLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
