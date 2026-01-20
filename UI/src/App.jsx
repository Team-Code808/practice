import React from 'react';
import useStore from './store/useStore';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';

// 관리자 페이지 (Admin Pages)
import AdminDashboard from './pages/admin/Dashboard/Dashboard';
import AdminTeamManagement from './pages/admin/TeamManagement/TeamManagement';
import AdminMonitoring from './pages/admin/Monitoring/Monitoring';
import AdminApplications from './pages/admin/Applications/Applications';
import AdminGifticonManagement from './pages/admin/GifticonManagement/GifticonManagement';
import PurchaseHistory from './pages/admin/GifticonManagement/PurchaseHistory/PurchaseHistory';
import AdminMyPage from './pages/admin/MyPage/MyPage';

// 직원 페이지 (Employee Pages)
import Dashboard from './pages/employee/Dashboard/Dashboard';
import Department from './pages/employee/Department/Department';
import Attendance from './pages/employee/Attendance/Attendance';
import Consultation from './pages/employee/Consultation/Consultation';
import PointMall from './pages/employee/PointMall/PointMall';
import MyPage from './pages/employee/MyPage/MyPage';

// 공통 페이지 (Common Pages)
import LandingPage from './pages/common/Landing/Landing';
import FeatureDetails from './pages/common/FeatureDetails/FeatureDetails';

// 인증 페이지 (Auth Pages)
import AuthPage from './pages/auth/Login/Login';
import NotFound from './pages/common/NotFound/NotFound';

import {
  ShieldAlert,
  Clock
} from 'lucide-react';
import * as S from './App.styles';

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

      {/* 검색 엔진 및 단축 경로 리다이렉트 */}
      <Route path="/login" element={<Navigate to="/auth" replace />} />
      <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/admin" element={<Navigate to="/app/dashboard" replace />} />

      <Route path="/app/*" element={
        <ProtectedRoute>
          <MainLayout>
            {user?.joinStatus === 'PENDING' ? (
              <StatusPlaceholder icon={Clock} title="승인 대기 중" description="관리자의 입사 승인을 기다리고 있습니다." />
            ) : user?.joinStatus === 'REJECTED' ? (
              <StatusPlaceholder icon={ShieldAlert} title="신청 반려됨" description="입사 신청이 반려되었습니다." />
            ) : (
              <Routes>
                {/* 관리자 라우트 */}
                {isAdminMode && (
                  <>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminTeamManagement />} />
                    <Route path="monitoring" element={<AdminMonitoring />} />
                    <Route path="applications" element={<AdminApplications />} />
                    <Route path="gifticons" element={<AdminGifticonManagement />} />
                    <Route path="gifticons/history" element={<PurchaseHistory />} />
                    <Route path="mypage" element={<AdminMyPage />} />
                    <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                  </>
                )}

                {/* 직원 라우트 */}
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
