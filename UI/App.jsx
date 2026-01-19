import React, { useState } from 'react';
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

const App = () => {
  const [appState, setAppState] = useState('LANDING');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(NavItemType.DASHBOARD);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleStart = () => setAppState('AUTH');
  const handleFeatureDetails = () => setAppState('FEATURES');

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    const admin = loggedInUser.role === UserRole.ADMIN;
    setIsAdminMode(admin);
    setActiveTab(NavItemType.DASHBOARD);
    setAppState('MAIN');
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('LANDING');
    setIsAdminMode(false);
  };

  const renderMainContent = () => {
    if (user?.joinStatus === 'PENDING') {
      return <StatusPlaceholder icon={Clock} title="승인 대기 중" description="관리자의 입사 승인을 기다리고 있습니다. 승인이 완료되면 서비스를 이용하실 수 있습니다." />;
    }

    if (user?.joinStatus === 'REJECTED') {
      return <StatusPlaceholder icon={ShieldAlert} title="신청 반려됨" description="입사 신청이 반려되었습니다. 인사팀에 문의해 주세요." />;
    }

    if (activeTab === NavItemType.MYPAGE) {
      if (isAdminMode) {
        return <AdminMyPage user={user} />;
      }
      return <MyPage user={user} onNavigate={setActiveTab} />;
    }

    if (activeTab === NavItemType.DASHBOARD) {
      if (isAdminMode) {
        return <AdminDashboard />;
      }
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Dashboard onNavigate={setActiveTab} />
        </div>
      );
    }

    if (isAdminMode) {
      switch (activeTab) {
        case NavItemType.ADMIN_USERS:
          return <AdminTeamManagement />;
        case NavItemType.ADMIN_MONITORING:
          return <AdminMonitoring />;
        case NavItemType.ADMIN_APPLICATIONS:
          return <AdminApplications />;
        default:
          return <AdminPlaceholder icon={Lock} title="접근 제한" description="관리자 권한이 필요한 페이지입니다." />;
      }
    }

    switch (activeTab) {
      case NavItemType.DASHBOARD: return <Dashboard onNavigate={setActiveTab} />;
      case NavItemType.DEPARTMENT: return <Department />;
      case NavItemType.ATTENDANCE: return <Attendance />;
      case NavItemType.CONSULTATION: return <Consultation />;
      case NavItemType.POINT_MALL: return <PointMall />;
      default:
        return <AdminPlaceholder icon={Construction} title="서비스 준비 중" description="선택하신 기능은 현재 고도화 작업 중입니다." />;
    }
  };

  if (appState === 'LANDING') return <LandingPage onStart={handleStart} onViewFeatures={handleFeatureDetails} />;
  if (appState === 'FEATURES') return <FeatureDetails onBack={() => setAppState('LANDING')} onStart={handleStart} />;
  if (appState === 'AUTH') return <AuthPage onLogin={handleLogin} onBack={() => setAppState('LANDING')} />;

  return (
    <S.AppContainer $admin={isAdminMode}>
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        onLogout={handleLogout}
        userName={user?.name || ''}
      />
      <S.MainContent>
        {renderMainContent()}
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

export default App;
