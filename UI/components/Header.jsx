import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  MessageSquareHeart,
  UserCircle,
  LogOut,
  Bell,
  Coins,
  ShieldCheck,
  Activity,
  ArrowLeftRight,
  ClipboardList,
  X,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { NavItemType } from '../types';
import Logo from './Logo';
import { NOTIFICATIONS_DATA } from '../constants';
import * as S from './Header.styles';

const AllNotificationsModal = ({ onClose }) => {
  const [filter, setFilter] = useState('ALL');

  const filtered = NOTIFICATIONS_DATA.filter(n => filter === 'ALL' || !n.read);

  return (
    <S.ModalOverlay>
      <S.Backdrop onClick={onClose} />
      <S.ModalContent>
        {/* Header */}
        <S.ModalHeader>
          <div>
            <h2>알림 센터</h2>
            <p>받은 알림 내역을 모두 확인합니다.</p>
          </div>
          <S.CloseButton onClick={onClose}>
            <X size={24} />
          </S.CloseButton>
        </S.ModalHeader>

        {/* Tabs */}
        <S.ModalTabs>
          <S.ModalTabButton
            active={filter === 'ALL'}
            onClick={() => setFilter('ALL')}
          >
            전체
          </S.ModalTabButton>
          <S.ModalTabButton
            active={filter === 'UNREAD'}
            onClick={() => setFilter('UNREAD')}
            color="#4f46e5"
          >
            안 읽음
          </S.ModalTabButton>
        </S.ModalTabs>

        {/* List */}
        <S.ModalList>
          {filtered.length > 0 ? filtered.map(item => (
            <S.ModalItem key={item.id} read={item.read}>
              <S.IconBox type={item.type}>
                {item.type === 'success' ? <CheckCircle2 size={18} /> :
                  item.type === 'alert' ? <AlertCircle size={18} /> :
                    item.type === 'notice' ? <Bell size={18} /> : <Info size={18} />}
              </S.IconBox>
              <S.ListContent>
                <S.ListHeader read={item.read}>
                  <h4>{item.title}</h4>
                  <span>{item.time}</span>
                </S.ListHeader>
                <S.ListMessage>{item.message}</S.ListMessage>
              </S.ListContent>
              {!item.read && <S.ListUnreadDot />}
            </S.ModalItem>
          )) : (
            <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94a3b8' }}>
              <Bell size={40} style={{ opacity: 0.2, marginBottom: '0.5rem' }} />
              <p style={{ fontSize: '0.75rem', fontWeight: 700 }}>표시할 알림이 없습니다.</p>
            </div>
          )}
        </S.ModalList>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

const Header = ({
  activeTab,
  onTabChange,
  isAdminMode,
  setIsAdminMode,
  onLogout,
  userName,
  isDarkMode
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotificationsModal, setShowAllNotificationsModal] = useState(false);
  const notificationRef = useRef(null);

  const notifications = NOTIFICATIONS_DATA.slice(0, 3); // Preview only latest 3

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userNavItems = [
    { id: NavItemType.DASHBOARD, label: '대시보드', icon: LayoutDashboard },
    { id: NavItemType.DEPARTMENT, label: '부서정보', icon: Users },
    { id: NavItemType.ATTENDANCE, label: '근태관리', icon: CalendarCheck },
    { id: NavItemType.CONSULTATION, label: '상담신청', icon: MessageSquareHeart },
    { id: NavItemType.POINT_MALL, label: '포인트몰', icon: Coins },
  ];

  const adminNavItems = [
    { id: NavItemType.DASHBOARD, label: '통합현황', icon: LayoutDashboard },
    { id: NavItemType.ADMIN_USERS, label: '팀원관리', icon: Users },
    { id: NavItemType.ADMIN_MONITORING, label: '상세분석', icon: Activity },
    { id: NavItemType.ADMIN_APPLICATIONS, label: '신청관리', icon: ClipboardList },
  ];

  const currentNavItems = isAdminMode ? adminNavItems : userNavItems;
  const isMyPageActive = activeTab === NavItemType.MYPAGE;

  return (
    <>
      <S.HeaderContainer isAdminMode={isAdminMode} isDarkMode={isDarkMode}>
        <S.InnerContent>
          <S.HeaderRow>
            {/* Left Section */}
            <S.LeftSection>
              <S.BrandGroup>
                <S.LogoBox onClick={() => onTabChange(NavItemType.DASHBOARD)}>
                  <Logo size={70} />
                  <S.BrandText isAdminMode={isAdminMode} isDarkMode={isDarkMode}>
                    Calm Desk
                    <S.RoleBadge>{isAdminMode ? "ADMIN" : "STAFF"}</S.RoleBadge>
                  </S.BrandText>
                </S.LogoBox>

                <S.ModeToggleButton
                  isAdminMode={isAdminMode}
                  isDarkMode={isDarkMode}
                  onClick={() => {
                    setIsAdminMode(!isAdminMode);
                    onTabChange(NavItemType.DASHBOARD);
                  }}
                >
                  {isAdminMode ? (
                    <><ArrowLeftRight /> 직원 모드 복귀</>
                  ) : (
                    <><ShieldCheck /> 관리자 전환</>
                  )}
                </S.ModeToggleButton>
              </S.BrandGroup>
            </S.LeftSection>

            {/* Center Navigation */}
            <S.CenterNav>
              {currentNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <S.NavButton
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    isActive={isActive}
                    isAdminMode={isAdminMode}
                    isDarkMode={isDarkMode}
                  >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                    {isActive && <S.ActiveIndicator isAdminMode={isAdminMode} isDarkMode={isDarkMode} />}
                  </S.NavButton>
                );
              })}
            </S.CenterNav>

            {/* Right Section */}
            <S.RightSection>
              <S.RightGroup>
                <S.ProfileButton
                  onClick={() => onTabChange(NavItemType.MYPAGE)}
                  isActive={isMyPageActive}
                  isAdminMode={isAdminMode}
                  isDarkMode={isDarkMode}
                >
                  <S.ProfileAvatar
                    isActive={isMyPageActive}
                    isAdminMode={isAdminMode}
                  >
                    <UserCircle size={20} />
                  </S.ProfileAvatar>
                  <S.ProfileInfo>
                    <S.ProfileName isActive={isMyPageActive} isAdminMode={isAdminMode} isDarkMode={isDarkMode}>
                      {isAdminMode ? "관리자" : `${userName} 님`}
                    </S.ProfileName>
                    <S.ProfileRole isAdminMode={isAdminMode}>
                      {isAdminMode ? "운영 총괄" : "상담 1팀"}
                    </S.ProfileRole>
                  </S.ProfileInfo>
                </S.ProfileButton>

                <S.ActionDivider isAdminMode={isAdminMode} isDarkMode={isDarkMode}>
                  {/* Notification Button & Popup */}
                  <div style={{ position: 'relative' }} ref={notificationRef}>
                    <S.IconButton
                      onClick={() => setShowNotifications(!showNotifications)}
                      active={showNotifications}
                      isAdminMode={isAdminMode}
                      isDarkMode={isDarkMode}
                    >
                      <Bell size={20} />
                      <S.NotiDot />
                    </S.IconButton>

                    {showNotifications && (
                      <S.NotiPopover isAdminMode={isAdminMode}>
                        <S.NotiHeader isAdminMode={isAdminMode}>
                          <span>알림</span>
                          <button onClick={() => setShowNotifications(false)}>모두 읽음</button>
                        </S.NotiHeader>
                        <S.NotiList>
                          {notifications.map(notif => (
                            <S.NotiItem key={notif.id} isAdminMode={isAdminMode}>
                              <S.NotiItemHeader isAdminMode={isAdminMode}>
                                <span>{notif.title}</span>
                                <span>{notif.time}</span>
                              </S.NotiItemHeader>
                              <S.NotiMessage>{notif.message}</S.NotiMessage>
                            </S.NotiItem>
                          ))}
                        </S.NotiList>
                        <S.NotiFooter isAdminMode={isAdminMode}>
                          <button
                            onClick={() => {
                              setShowNotifications(false);
                              setShowAllNotificationsModal(true);
                            }}
                          >
                            알림 전체보기
                          </button>
                        </S.NotiFooter>
                      </S.NotiPopover>
                    )}
                  </div>

                  <S.IconButton
                    onClick={onLogout}
                    isAdminMode={isAdminMode}
                    logout
                    isDarkMode={isDarkMode}
                  >
                    <LogOut size={20} />
                  </S.IconButton>
                </S.ActionDivider>
              </S.RightGroup>
            </S.RightSection>
          </S.HeaderRow>
        </S.InnerContent>
      </S.HeaderContainer>

      {/* All Notifications Modal */}
      {showAllNotificationsModal && (
        <AllNotificationsModal onClose={() => setShowAllNotificationsModal(false)} />
      )}
    </>
  );
};

export default Header;
