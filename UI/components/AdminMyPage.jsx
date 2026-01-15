import React, { useState } from 'react';
import {
  Camera,
  Mail,
  Phone,
  ShieldCheck,
  Bell,
  CreditCard,
  ChevronRight,
  Settings,
  Lock,
  Smartphone,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  Key,
  Database,
  Copy,
  Check,
  User as UserIcon,
  Briefcase,
  ArrowLeft,
  Save,
  Moon
} from 'lucide-react';
import * as S from './AdminMyPage.styles';

const AdminMyPage = ({ user }) => {
  const [copied, setCopied] = useState(false);
  const [currentView, setCurrentView] = useState('MAIN');

  // Fallback data if user is null (though it shouldn't be in this view)
  const adminInfo = {
    name: user?.name || "관리자",
    position: user?.position || "센터 운영 총괄",
    department: user?.department || "운영 전략 본부",
    email: user?.id || "admin@calmdesk.com",
    phone: user?.phone || "010-0000-0000",
    joinDate: user?.joinDate || "2020.01.01",
    avatar: "🛡️",
    accessLevel: "Super Admin",
    companyCode: user?.companyCode || "CODE-ERROR"
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(adminInfo.companyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ProfileEditView = () => (
    <S.EditContainer>
      <S.EditHeader>
        <button onClick={() => setCurrentView('MAIN')}>
          <ArrowLeft />
        </button>
        <h2>관리자 프로필 수정</h2>
      </S.EditHeader>

      <S.EditGrid>
        {/* Avatar Section */}
        <S.AvatarEditCard>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <S.AvatarCircle>
              {adminInfo.avatar}
              <S.AvatarOverlay>
                <Camera />
              </S.AvatarOverlay>
            </S.AvatarCircle>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', fontWeight: 700, color: '#64748b' }}>
            프로필 사진 변경
          </p>
        </S.AvatarEditCard>

        {/* Form Section */}
        <S.FormCard>
          <S.FormGrid>
            <S.InputGroup>
              <label>이름</label>
              <S.InputWrapper readonly>
                <UserIcon />
                <span>{adminInfo.name}</span>
                <S.Badge>수정불가</S.Badge>
              </S.InputWrapper>
            </S.InputGroup>
            <S.InputGroup>
              <label>부서</label>
              <S.InputWrapper readonly>
                <Briefcase />
                <span>{adminInfo.department}</span>
                <S.Badge>수정불가</S.Badge>
              </S.InputWrapper>
            </S.InputGroup>
            <S.InputGroup>
              <label>연락처</label>
              <S.InputWrapper active>
                <Phone />
                <input type="text" defaultValue={adminInfo.phone} />
              </S.InputWrapper>
            </S.InputGroup>
            <S.InputGroup>
              <label>이메일</label>
              <S.InputWrapper active>
                <Mail />
                <input type="email" defaultValue={adminInfo.email} />
              </S.InputWrapper>
            </S.InputGroup>
          </S.FormGrid>

          {/* Password Change Section */}
          <S.PasswordSection>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Lock size={18} color="#64748b" />
              <h3>비밀번호 변경</h3>
            </div>

            <S.InputGroup>
              <label>현재 비밀번호</label>
              <S.InputWrapper>
                <input type="password" placeholder="••••••••" style={{ paddingLeft: '0.5rem' }} />
              </S.InputWrapper>
            </S.InputGroup>

            <S.FormGrid>
              <S.InputGroup>
                <label>새 비밀번호</label>
                <S.InputWrapper>
                  <input type="password" placeholder="새 비밀번호" style={{ paddingLeft: '0.5rem' }} />
                </S.InputWrapper>
              </S.InputGroup>
              <S.InputGroup>
                <label>비밀번호 확인</label>
                <S.InputWrapper>
                  <input type="password" placeholder="새 비밀번호 확인" style={{ paddingLeft: '0.5rem' }} />
                </S.InputWrapper>
              </S.InputGroup>
            </S.FormGrid>
          </S.PasswordSection>

          <S.ActionButtons>
            <S.Button onClick={() => setCurrentView('MAIN')}>
              취소
            </S.Button>
            <S.Button
              primary
              onClick={() => {
                alert('관리자 정보가 수정되었습니다.');
                setCurrentView('MAIN');
              }}
            >
              <Save size={18} />
              저장하기
            </S.Button>
          </S.ActionButtons>
        </S.FormCard>
      </S.EditGrid>
    </S.EditContainer>
  );

  if (currentView === 'PROFILE') return <ProfileEditView />;

  return (
    <S.Container>
      {/* Header Section */}
      <S.MainHeader>
        <div>
          <h1>관리자 프로필</h1>
          <p>Administrative Profile & Security</p>
        </div>
      </S.MainHeader>

      <S.ContentGrid>
        {/* Left Column */}
        <S.LeftCol>
          <S.ProfileCard>
            <S.ProfileAvatar>
              <div>
                {adminInfo.avatar}
              </div>
              <button>
                <Camera size={18} />
              </button>
            </S.ProfileAvatar>

            <S.ProfileInfo>
              <h2>{adminInfo.name}</h2>
              <p>{adminInfo.position}</p>
            </S.ProfileInfo>

            <S.ContactList>
              {[
                { icon: Mail, label: "Email", value: adminInfo.email },
                { icon: Phone, label: "Phone", value: adminInfo.phone },
                { icon: Calendar, label: "Join Date", value: adminInfo.joinDate },
              ].map((item, i) => (
                <S.ContactItem key={i}>
                  <S.ItemIcon>
                    <item.icon size={18} />
                  </S.ItemIcon>
                  <S.ItemText>
                    <p>{item.label}</p>
                    <p>{item.value}</p>
                  </S.ItemText>
                </S.ContactItem>
              ))}
            </S.ContactList>

            <S.EditProfileBtn onClick={() => setCurrentView('PROFILE')}>
              관리자 정보 수정
            </S.EditProfileBtn>
          </S.ProfileCard>

          <S.PermissionCard>
            <S.PermissionContent>
              <h3>
                <ShieldCheck size={20} />
                권한 등급: {adminInfo.accessLevel}
              </h3>
              <p>전체 시스템 제어 및 데이터 접근 권한이 활성화되어 있습니다.</p>
              <S.CertifiedBadge>
                <CheckCircle2 size={16} color="#c7d2fe" />
                <span>최고 관리자 인증됨</span>
              </S.CertifiedBadge>
            </S.PermissionContent>
            <S.LockIconBg>
              <Lock />
            </S.LockIconBg>
          </S.PermissionCard>
        </S.LeftCol>

        {/* Right Column */}
        <S.RightCol>
          {/* Company Code Section */}
          <S.CodeCard>
            <S.CodeContent>
              <S.CodeText>
                <h3>
                  <Key size={22} color="#34d399" />
                  회사 고유 코드 (초대 코드)
                </h3>
                <p>직원들이 입사 신청 시 사용할 고유 코드입니다.</p>
              </S.CodeText>
              <S.CodeBox>
                <span>{adminInfo.companyCode}</span>
                <button onClick={handleCopyCode}>
                  {copied ? <Check size={20} color="#34d399" /> : <Copy size={20} />}
                </button>
              </S.CodeBox>
            </S.CodeContent>
            <S.KeyIconBg>
              <Key />
            </S.KeyIconBg>
          </S.CodeCard>

          <S.SettingsCard>
            <h3>
              <Settings size={22} color="#64748b" />
              환경 설정
            </h3>
            <S.SettingsList>
              {[
                { icon: Bell, title: "알림 설정", desc: "푸시 및 이메일 수신 여부" },
                { icon: Lock, title: "비밀번호 변경", desc: "주기적인 변경으로 계정 보호" },
                { icon: Moon, title: "다크 모드", desc: "어두운 테마 유지 (기본값)", isToggle: true },
              ].map((item, i) => (
                <S.SettingsItem key={i}>
                  <S.ItemLeft>
                    <S.IconWrapper>
                      <item.icon size={20} />
                    </S.IconWrapper>
                    <S.TextWrapper>
                      <p>{item.title}</p>
                      <p>{item.desc}</p>
                    </S.TextWrapper>
                  </S.ItemLeft>
                  {item.isToggle ? (
                    <S.ToggleSwitch>
                      <input type="checkbox" defaultChecked />
                      <div />
                    </S.ToggleSwitch>
                  ) : (
                    <ChevronRight size={16} color="#334155" />
                  )}
                </S.SettingsItem>
              ))}
            </S.SettingsList>
          </S.SettingsCard>
        </S.RightCol>
      </S.ContentGrid>
    </S.Container>
  );
};

export default AdminMyPage;
