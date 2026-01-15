import React, { useState } from 'react';
import {
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight,
  Settings,
  Lock,
  CheckCircle2,
  Calendar,
  Key,
  Copy,
  Check,
  User as UserIcon,
  Briefcase,
  ArrowLeft,
  Save
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
        <button onClick={() => setCurrentView('MAIN')} style={{ color: '#94a3b8' }}>
          <ArrowLeft />
        </button>
        <h2 style={{ color: 'white' }}>관리자 프로필 수정</h2>
      </S.EditHeader>

      <S.EditGrid>
        {/* Avatar Section */}
        <S.AvatarEditCard>
          <div style={{ position: 'relative' }}>
            <S.AvatarCircle>
              {adminInfo.avatar}
            </S.AvatarCircle>
          </div>
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
              <h3 style={{ color: '#cbd5e1' }}>비밀번호 변경</h3>
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
        <div style={{ color: 'white' }}>
          <h1>관리자 프로필</h1>
          <p style={{ color: '#64748b' }}>Administrative Profile & Security</p>
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
            </S.ProfileAvatar>

            <S.ProfileInfo>
              <h2 style={{ color: 'white' }}>{adminInfo.name}</h2>
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
              <h3 style={{ color: 'white' }}>
                <ShieldCheck size={20} />
                권한 등급: {adminInfo.accessLevel}
              </h3>
              <p style={{ color: '#e0e7ff' }}>전체 시스템 제어 및 데이터 접근 권한이 활성화되어 있습니다.</p>
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
                <h3 style={{ color: 'white' }}>
                  <Key size={22} color="#34d399" />
                  회사 고유 코드 (초대 코드)
                </h3>
                <p style={{ color: '#94a3b8' }}>직원들이 입사 신청 시 사용할 고유 코드입니다.</p>
              </S.CodeText>
              <S.CodeBox>
                <span style={{ color: 'white' }}>{adminInfo.companyCode}</span>
                <button onClick={handleCopyCode} style={{ color: 'white' }}>
                  {copied ? <Check size={20} color="#34d399" /> : <Copy size={20} />}
                </button>
              </S.CodeBox>
            </S.CodeContent>
            <S.KeyIconBg>
              <Key />
            </S.KeyIconBg>
          </S.CodeCard>

          <S.SettingsCard>
            <h3 style={{ color: 'white' }}>
              <Settings size={22} color="#64748b" />
              환경 설정
            </h3>
            <S.SettingsList>
              <S.SettingsItem onClick={() => setCurrentView('PROFILE')} style={{ cursor: 'pointer' }}>
                <S.ItemLeft>
                  <S.IconWrapper>
                    <Lock size={20} />
                  </S.IconWrapper>
                  <S.TextWrapper>
                    <p>비밀번호 변경</p>
                    <p>주기적인 변경으로 계정 보호</p>
                  </S.TextWrapper>
                </S.ItemLeft>
                <ChevronRight size={16} color="#334155" />
              </S.SettingsItem>

              {/* Dark Mode Toggle */}




            </S.SettingsList>
          </S.SettingsCard>
        </S.RightCol>
      </S.ContentGrid>
    </S.Container>
  );
};

export default AdminMyPage;
