import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminTeamManagement from './components/AdminTeamManagement';
import AdminMonitoring from './components/AdminMonitoring';
import AdminApplications from './components/AdminApplications';
import AdminMyPage from './components/AdminMyPage';
import Department from './components/Department';
import Attendance from './components/Attendance';
import Consultation from './components/Consultation';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import MyPage from './components/MyPage';
import FeatureDetails from './components/FeatureDetails';
import PointMall from './components/PointMall';
import { NavItemType, UserRole } from './types';
import {
  ShieldAlert,
  Lock,
  Construction,
  Clock
} from 'lucide-react';
import * as S from './components/App.styles';

const MainLayout = ({ children, isAdminMode, setIsAdminMode, onLogout, user }) => {
  return (
    <S.AppContainer $admin={isAdminMode}>
      <Header
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        onLogout={onLogout}
        userName={user?.name || ''}
      />
      <S.MainContent>
        {children}
      </S.MainContent>
      <S.Footer $admin={isAdminMode}>
        <S.FooterContent>
          <p>© 2024 Calm Desk Admin Suite. All rights reserved.</p>
          <S.FooterLinks>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">고객지원</a>
          </S.FooterLinks>
        </S.FooterContent>
      </S.Footer>
    </S.AppContainer>
  );
};

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => navigate('/auth');
  const handleFeatureDetails = () => navigate('/features');
  const handleBackToLanding = () => navigate('/');

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    const admin = loggedInUser.role === UserRole.ADMIN;
    setIsAdminMode(admin);
    navigate('/app/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdminMode(false);
    navigate('/');
  };

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
      <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />

      <Route path="/app/*" element={
        <ProtectedRoute user={user}>
          <MainLayout
            isAdminMode={isAdminMode}
            setIsAdminMode={setIsAdminMode}
            onLogout={handleLogout}
            user={user}
          >
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
                    <Route path="mypage" element={<AdminMyPage user={user} />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
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
                    <Route path="mypage/*" element={<MyPage user={user} />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
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
