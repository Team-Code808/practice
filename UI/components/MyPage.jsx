import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Bell,
  CreditCard,
  ChevronRight,
  Ticket,
  Heart,
  Settings,
  Lock,
  Calendar,
  Clock,
  ArrowLeft,
  Save,
  User as UserIcon,
  Briefcase,
  Download,
  Filter,
  ShoppingBag,
  PlusCircle,
  MinusCircle,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { MOCK_USER, COUPONS, NOTIFICATIONS_DATA } from '../constants';
import { NavItemType } from '../types';
import * as S from './MyPage.styles';

const MyPage = ({ user, onNavigate, initialView }) => {
  const [currentView, setCurrentView] = useState('MAIN');

  useEffect(() => {
    if (initialView && initialView !== 'MAIN') {
      setCurrentView(initialView);
    }
  }, [initialView]);

  const displayUser = {
    ...MOCK_USER,
    ...(user ? {
      name: user.name,
      department: user.department,
      phone: user.phone || MOCK_USER.phone,
      joinDate: user.joinDate || MOCK_USER.joinDate
    } : {})
  };

  // --- Sub Views ---

  const ProfileEditView = () => (
    <S.SubPageContainer>
      <S.SubPageHeader>
        <S.HeaderLeft>
          <S.BackButton onClick={() => setCurrentView('MAIN')}>
            <ArrowLeft size={24} />
          </S.BackButton>
          <S.SubTitleGroup>
            <h2>프로필 수정</h2>
          </S.SubTitleGroup>
        </S.HeaderLeft>
      </S.SubPageHeader>

      <S.ProfileGrid>
        <S.AvatarCard>
          <S.AvatarWrapper>
            <S.AvatarImage>
              {displayUser.avatar}
            </S.AvatarImage>
          </S.AvatarWrapper>
        </S.AvatarCard>

        <div style={{ gridColumn: 'span 2' }}>
          <S.FormCard>
            <S.FormGrid>
              <S.InputGroup>
                <S.Label>이름</S.Label>
                <S.ReadOnlyField>
                  <UserIcon size={18} color="#94a3b8" />
                  <span>{displayUser.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', backgroundColor: '#e2e8f0', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>수정불가</span>
                </S.ReadOnlyField>
              </S.InputGroup>
              <S.InputGroup>
                <S.Label>부서</S.Label>
                <S.ReadOnlyField>
                  <Briefcase size={18} color="#94a3b8" />
                  <span>{displayUser.department}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', backgroundColor: '#e2e8f0', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>수정불가</span>
                </S.ReadOnlyField>
              </S.InputGroup>
              <S.InputGroup>
                <S.Label>연락처</S.Label>
                <S.InputField>
                  <Phone size={18} color="#3b82f6" />
                  <input type="text" defaultValue={displayUser.phone} />
                </S.InputField>
              </S.InputGroup>
              <S.InputGroup>
                <S.Label>이메일</S.Label>
                <S.InputField>
                  <Mail size={18} color="#3b82f6" />
                  <input type="email" defaultValue={displayUser.email} />
                </S.InputField>
              </S.InputGroup>
            </S.FormGrid>

            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #f8fafc', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Lock size={18} color="#94a3b8" />
                <h3 style={{ fontSize: '0.875rem', fontWeight: 900, color: '#1e293b' }}>비밀번호 변경</h3>
              </div>

              <S.InputGroup>
                <S.Label>현재 비밀번호</S.Label>
                <S.PasswordInput type="password" placeholder="••••••••" />
              </S.InputGroup>

              <S.FormGrid>
                <S.InputGroup>
                  <S.Label>새 비밀번호</S.Label>
                  <S.PasswordInput type="password" placeholder="새 비밀번호" />
                </S.InputGroup>
                <S.InputGroup>
                  <S.Label>비밀번호 확인</S.Label>
                  <S.PasswordInput type="password" placeholder="새 비밀번호 확인" />
                </S.InputGroup>
              </S.FormGrid>
            </div>

            <S.ActionRow>
              <S.CancelButton onClick={() => setCurrentView('MAIN')}>
                취소
              </S.CancelButton>
              <S.SaveButton onClick={() => {
                alert('프로필이 성공적으로 수정되었습니다.');
                setCurrentView('MAIN');
              }}>
                <Save size={18} />
                저장하기
              </S.SaveButton>
            </S.ActionRow>
          </S.FormCard>
        </div>
      </S.ProfileGrid>
    </S.SubPageContainer>
  );

  const CouponWalletView = () => {
    const [filter, setFilter] = useState('AVAILABLE');
    const filteredCoupons = COUPONS.filter(c => c.status === filter);

    return (
      <S.SubPageContainer>
        <S.SubPageHeader>
          <S.HeaderLeft>
            <S.BackButton onClick={() => setCurrentView('MAIN')}>
              <ArrowLeft size={24} />
            </S.BackButton>
            <S.SubTitleGroup>
              <h2>기프티콘 보관함</h2>
              <p>획득한 보상을 확인하고 사용하세요.</p>
            </S.SubTitleGroup>
          </S.HeaderLeft>
          <S.FilterGroup>
            <S.FilterButton active={filter === 'AVAILABLE'} onClick={() => setFilter('AVAILABLE')}>
              사용 가능
            </S.FilterButton>
            <S.FilterButton active={filter === 'USED'} onClick={() => setFilter('USED')}>
              사용 완료
            </S.FilterButton>
          </S.FilterGroup>
        </S.SubPageHeader>

        <S.CouponGrid>
          {filteredCoupons.map((coupon) => (
            <S.CouponCard key={coupon.id} isUsed={coupon.status === 'USED'}>
              <S.CouponTopBar color={coupon.color.replace('bg-', 'var(--tw-bg-opacity, 1) ')} />
              {/* Note: In real scenarios, color props should be handled better than class string parsing. 
                  For now we rely on the passed className or switch to prop based colors in data. 
                  Assuming coupon.color is like 'bg-emerald-500' 
              */}

              <S.CouponHeader>
                <S.CouponIcon>
                  {coupon.icon}
                </S.CouponIcon>
                <S.CouponStatus status={coupon.status}>
                  {coupon.status === 'AVAILABLE' ? 'D-30' : '사용됨'}
                </S.CouponStatus>
              </S.CouponHeader>

              <S.CouponInfo>
                <p>{coupon.shop}</p>
                <h3>{coupon.name}</h3>
              </S.CouponInfo>

              <S.CouponFooter>
                <S.CouponDate>
                  <Clock size={12} /> {coupon.date}
                </S.CouponDate>
                <S.CouponButton disabled={coupon.status !== 'AVAILABLE'}>
                  {coupon.status === 'AVAILABLE' ? '바코드 보기' : '사용 완료'}
                </S.CouponButton>
              </S.CouponFooter>

              <S.CouponDecorCircle side="left" />
              <S.CouponDecorCircle side="right" />
            </S.CouponCard>
          ))}

          <S.CouponCard
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderStyle: 'dashed', cursor: 'pointer', minHeight: '300px' }}
            onClick={() => onNavigate(NavItemType.POINT_MALL)}
          >
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShoppingBag size={24} color="#cbd5e1" />
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 900, color: '#94a3b8' }}>포인트몰 바로가기</h3>
            <p style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '0.25rem' }}>포인트를 사용하여<br />새로운 쿠폰을 획득하세요!</p>
          </S.CouponCard>
        </S.CouponGrid>
      </S.SubPageContainer>
    );
  };

  const PointHistoryView = () => {
    const [filter, setFilter] = useState('ALL');
    const history = [
      { id: 1, type: 'EARN', title: '주간 미션 달성', date: '2024.03.21 14:00', amount: 50, balance: 2450 },
      { id: 2, type: 'USE', title: '스타벅스 아메리카노 교환', date: '2024.03.20 09:30', amount: -4500, balance: 2400 },
      { id: 3, type: 'EARN', title: '정시 출근 보너스', date: '2024.03.20 08:50', amount: 10, balance: 6900 },
      { id: 4, type: 'EARN', title: '칭찬 카드 획득', date: '2024.03.19 17:20', amount: 30, balance: 6890 },
      { id: 5, type: 'EARN', title: '정시 출근 보너스', date: '2024.03.19 08:55', amount: 10, balance: 6860 },
    ];
    const filteredHistory = history.filter(item => filter === 'ALL' || item.type === filter);

    return (
      <S.SubPageContainer>
        <S.SubPageHeader>
          <S.HeaderLeft>
            <S.BackButton onClick={() => setCurrentView('MAIN')}>
              <ArrowLeft size={24} />
            </S.BackButton>
            <S.SubTitleGroup>
              <h2>포인트 내역</h2>
              <p>포인트 적립 및 사용 내역을 확인하세요.</p>
            </S.SubTitleGroup>
          </S.HeaderLeft>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem', fontSize: '0.75rem', fontWeight: 700, color: '#475569', backgroundColor: 'white' }}>
            <Download size={14} />
            내역 다운로드
          </button>
        </S.SubPageHeader>

        <S.PointSummaryCard>
          <S.BalanceSection>
            <p>Total Balance</p>
            <h3>{displayUser.point} <span>P</span></h3>
          </S.BalanceSection>
          <S.StatsSection>
            <S.StatItem isPositive>
              <p>이번 달 적립</p>
              <p>+3,250 P</p>
            </S.StatItem>
            <S.Divider />
            <S.StatItem>
              <p>이번 달 사용</p>
              <p>-4,500 P</p>
            </S.StatItem>
          </S.StatsSection>
          <CreditCard style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', width: '12rem', height: '12rem', opacity: 0.05, transform: 'rotate(12deg)' }} />
        </S.PointSummaryCard>

        <S.HistoryContainer>
          <S.HistoryHeader>
            <S.FilterTabs>
              <S.TabButton active={filter === 'ALL'} onClick={() => setFilter('ALL')}>전체</S.TabButton>
              <S.TabButton active={filter === 'EARN'} onClick={() => setFilter('EARN')} color="#059669">적립</S.TabButton>
              <S.TabButton active={filter === 'USE'} onClick={() => setFilter('USE')} color="#1e293b">사용</S.TabButton>
            </S.FilterTabs>
            <button style={{ padding: '0.5rem', color: '#94a3b8' }}><Filter size={16} /></button>
          </S.HistoryHeader>

          <S.HistoryList>
            {filteredHistory.map((item) => (
              <S.HistoryItem key={item.id}>
                <S.ItemLeft>
                  <S.IconBox type={item.type}>
                    {item.type === 'EARN' ? <PlusCircle size={20} /> : <MinusCircle size={20} />}
                  </S.IconBox>
                  <S.ItemDetails>
                    <p>{item.title}</p>
                    <p>{item.date}</p>
                  </S.ItemDetails>
                </S.ItemLeft>
                <S.ItemRight type={item.type}>
                  <p>{item.type === 'EARN' ? '+' : ''}{item.amount.toLocaleString()} P</p>
                  <p>잔액 {item.balance.toLocaleString()} P</p>
                </S.ItemRight>
              </S.HistoryItem>
            ))}
            {filteredHistory.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>내역이 없습니다.</div>
            )}
          </S.HistoryList>
          <S.LoadMoreButton>더 보기</S.LoadMoreButton>
        </S.HistoryContainer>
      </S.SubPageContainer>
    );
  };

  const NotificationCenterView = () => {
    const [filter, setFilter] = useState('ALL');
    const filteredNotifications = NOTIFICATIONS_DATA.filter(n => filter === 'ALL' || (filter === 'UNREAD' && !n.read));

    // Group by date logic... omitted for brevity if complex, but kept simple here
    const groupedNotifications = filteredNotifications.reduce((acc, curr) => {
      if (!acc[curr.date]) acc[curr.date] = [];
      acc[curr.date].push(curr);
      return acc;
    }, {});

    return (
      <S.SubPageContainer>
        <S.SubPageHeader>
          <S.HeaderLeft>
            <S.BackButton onClick={() => setCurrentView('MAIN')}>
              <ArrowLeft size={24} />
            </S.BackButton>
            <S.SubTitleGroup>
              <h2>알림 센터</h2>
              <p>중요한 소식과 업데이트를 확인하세요.</p>
            </S.SubTitleGroup>
          </S.HeaderLeft>
          <button style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748b', padding: '0.375rem 0.75rem', backgroundColor: '#f1f5f9', borderRadius: '0.5rem' }}>
            모두 읽음 처리
          </button>
        </S.SubPageHeader>

        <S.NotiList>
          <S.HistoryHeader>
            <S.FilterTabs>
              <S.TabButton active={filter === 'ALL'} onClick={() => setFilter('ALL')}>전체 알림</S.TabButton>
              <S.TabButton active={filter === 'UNREAD'} onClick={() => setFilter('UNREAD')} color="#4f46e5">안 읽음</S.TabButton>
            </S.FilterTabs>
          </S.HistoryHeader>

          <div style={{ padding: '1.5rem' }}>
            {Object.entries(groupedNotifications).length > 0 ? (
              Object.entries(groupedNotifications).map(([date, items]) => (
                <S.NotiGroup key={date}>
                  <S.DateHeader>{date}</S.DateHeader>
                  <div>
                    {items.map(item => (
                      <S.NotiItem key={item.id} read={item.read}>
                        <S.IconWrapper type={item.type}>
                          {item.type === 'success' ? <CheckCircle2 size={18} /> :
                            item.type === 'alert' ? <AlertCircle size={18} /> :
                              item.type === 'notice' ? <Bell size={18} /> : <Info size={18} />}
                        </S.IconWrapper>
                        <S.ContentWrapper>
                          <S.ItemHeader read={item.read}>
                            <h4>{item.title}</h4>
                            <span>{item.time}</span>
                          </S.ItemHeader>
                          <S.ItemMessage read={item.read}>{item.message}</S.ItemMessage>
                        </S.ContentWrapper>
                        {!item.read && <S.UnreadDot />}
                      </S.NotiItem>
                    ))}
                  </div>
                </S.NotiGroup>
              ))
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 0', color: '#cbd5e1' }}>
                <Bell size={40} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.875rem', fontWeight: 700 }}>새로운 알림이 없습니다.</p>
              </div>
            )}
          </div>
        </S.NotiList>
      </S.SubPageContainer>
    );
  };

  if (currentView === 'PROFILE') return <ProfileEditView />;
  if (currentView === 'COUPONS') return <CouponWalletView />;
  if (currentView === 'POINTS') return <PointHistoryView />;
  if (currentView === 'NOTIFICATIONS') return <NotificationCenterView />;

  return (
    <S.Container>
      <S.HeaderSection>
        <S.TitleGroup>
          <h1>마이페이지</h1>
          <p>개인 정보 및 혜택을 한곳에서 관리하세요.</p>
        </S.TitleGroup>
      </S.HeaderSection>

      <S.MainGrid>
        {/* Left Column */}
        <S.ColLeft>
          <S.BentoCard>
            <S.ProfileBento>
              <S.AvatarWrapper>
                <S.AvatarImage>
                  {displayUser.avatar}
                </S.AvatarImage>
              </S.AvatarWrapper>

              <S.ProfileInfo>
                <h2>{displayUser.name}</h2>
                <p>{displayUser.position} • {displayUser.department}</p>
              </S.ProfileInfo>

              <S.ContactList>
                <S.ContactItem>
                  <S.ContactIcon><Mail size={18} /></S.ContactIcon>
                  <S.ContactText>
                    <p>Email</p>
                    <p>{displayUser.email}</p>
                  </S.ContactText>
                </S.ContactItem>
                <S.ContactItem>
                  <S.ContactIcon><Phone size={18} /></S.ContactIcon>
                  <S.ContactText>
                    <p>Phone</p>
                    <p>{displayUser.phone}</p>
                  </S.ContactText>
                </S.ContactItem>
                <S.ContactItem>
                  <S.ContactIcon><Calendar size={18} /></S.ContactIcon>
                  <S.ContactText>
                    <p>Join Date</p>
                    <p>{displayUser.joinDate}</p>
                  </S.ContactText>
                </S.ContactItem>
              </S.ContactList>

              <S.EditButton onClick={() => setCurrentView('PROFILE')}>
                프로필 수정하기
              </S.EditButton>
            </S.ProfileBento>
          </S.BentoCard>
        </S.ColLeft>

        {/* Right Column */}
        <S.ColRight>
          <S.BentoCard gradient>
            <S.StressGrid>
              <S.StressCircle>
                <S.CircleContent>
                  <span>24%</span>
                  <span>Stress</span>
                </S.CircleContent>
                <S.StressLevelBadge>Low Level</S.StressLevelBadge>
              </S.StressCircle>
              <S.StressDetails>
                <h3>
                  <Heart size={20} color="#f43f5e" />
                  주간 컨디션 요약
                </h3>
                <p>
                  현재 전반적으로 <span style={{ color: '#2563eb', fontWeight: 700 }}>안정적인 컨디션</span>을 유지하고 있습니다.
                  규칙적인 휴식과 긍정적인 마인드로 활기찬 한 주를 보내세요!
                </p>
                <S.TagGroup>
                  <S.Tag>#스트레스_제로</S.Tag>
                  <S.Tag>#마음건강_튼튼</S.Tag>
                  <S.Tag>#긍정_에너지</S.Tag>
                </S.TagGroup>
              </S.StressDetails>
            </S.StressGrid>
          </S.BentoCard>

          <S.BentoCard>
            <S.SectionTitle>
              <h3>
                <Ticket size={22} color="#2563eb" />
                기프티콘 보관함
              </h3>
              <button onClick={() => setCurrentView('COUPONS')}>
                전체보기 <ChevronRight size={14} />
              </button>
            </S.SectionTitle>
            <S.SmallCouponGrid>
              {COUPONS.slice(0, 3).map((coupon) => (
                <S.SmallCouponCard key={coupon.id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3rem', height: '3rem', borderRadius: '1rem', backgroundColor: 'rgba(0,0,0,0.05)', fontSize: '1.5rem', marginBottom: '1rem' }}>
                    {coupon.icon}
                  </div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 900, color: '#1e293b' }}>{coupon.name}</h4>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', marginTop: '0.25rem' }}>{coupon.shop}</p>
                </S.SmallCouponCard>
              ))}
            </S.SmallCouponGrid>
          </S.BentoCard>

          <S.SettingsGrid>
            <S.BentoCard>
              <S.SectionTitle>
                <h3>
                  <Settings size={20} color="#94a3b8" />
                  환경 설정
                </h3>
              </S.SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Notification Setting Removed */}

                <S.SettingItem onClick={() => setCurrentView('PROFILE')} style={{ cursor: 'pointer' }}>
                  <S.SettingLeft>
                    <div><Lock size={18} /></div>
                    <div>
                      <p>비밀번호 변경</p>
                      <p>주기적인 변경으로 계정 보호</p>
                    </div>
                  </S.SettingLeft>
                  <ChevronRight size={14} color="#cbd5e1" />
                </S.SettingItem>

              </div>
            </S.BentoCard>

            <S.BentoCard style={{ padding: 0 }}>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CreditCard size={20} color="#94a3b8" />
                  포인트 및 결제
                </h3>
                <S.PointCard>
                  <p>Current Points</p>
                  <p>{displayUser.point} <span>P</span></p>
                  <button onClick={() => setCurrentView('POINTS')}>
                    포인트 내역
                  </button>
                </S.PointCard>
              </div>
            </S.BentoCard>
          </S.SettingsGrid>
        </S.ColRight>
      </S.MainGrid>
    </S.Container>
  );
};

export default MyPage;
