import React, { useState } from 'react';
import {
  Settings,
  Zap,
  Coins,
  Save,
  RefreshCcw,
  AlertCircle,
  Database
} from 'lucide-react';
import * as S from './AdminSettings.styles';

const AdminSettings = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('설정이 시스템에 안전하게 적용되었습니다.');
    }, 1500);
  };

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        <S.HeaderTitle>
          <h2>
            <Settings size={24} color="#818cf8" />
            시스템 환경 설정
          </h2>
          <p>Global Policy & Automation Control</p>
        </S.HeaderTitle>
        <S.SaveButton
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <S.SpinIcon>
              <RefreshCcw size={16} />
            </S.SpinIcon>
          ) : <Save size={16} />}
          {isSaving ? '적용 중...' : '변경 사항 저장'}
        </S.SaveButton>
      </S.Header>

      <S.SettingsGrid>
        {/* AI Stress Care Logic */}
        <S.Section>
          <S.SectionTitle>
            <Zap size={20} color="#fb7185" />
            AI 스트레스 케어 임계치
          </S.SectionTitle>
          <S.SettingGroup>
            <S.InputGroup>
              <S.LabelRow>
                <p>관리자 알림 경고 (Threshold)</p>
                <span>75%</span>
              </S.LabelRow>
              <S.RangeInput type="range" min="50" max="95" defaultValue="75" />
              <S.Description>
                상담원의 실시간 스트레스 지수가 설정된 임계치를 초과할 경우, 관리자 대시보드에 즉시 경고가 노출되며 긴급 케어 대상자로 분류됩니다.
              </S.Description>
            </S.InputGroup>

            <S.ToggleBox>
              <S.ToggleRow>
                <S.ToggleText>
                  <p>자동 쿨다운 권고 기능</p>
                  <p>고위험군 진입 시 상담원 앱에 휴식 권고 자동 팝업</p>
                </S.ToggleText>
                <S.ToggleSwitch>
                  <input type="checkbox" defaultChecked />
                  <div />
                </S.ToggleSwitch>
              </S.ToggleRow>
            </S.ToggleBox>
          </S.SettingGroup>
        </S.Section>

        {/* Economy & System */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section: Point Economy */}
          <S.Section>
            <S.SectionTitle>
              <Coins size={20} color="#fbbf24" />
              포인트 보상 체계
            </S.SectionTitle>
            <S.PointsList>
              {[
                { label: '정시 출근 보너스', val: '10' },
                { label: '주간 스트레스 목표 달성', val: '50' },
                { label: '동료 칭찬 획득 (1건당)', val: '5' },
              ].map((item, idx) => (
                <S.PointItem key={idx}>
                  <span>{item.label}</span>
                  <S.PointInputGroup>
                    <input type="number" defaultValue={item.val} />
                    <span>Points</span>
                  </S.PointInputGroup>
                </S.PointItem>
              ))}
              <S.ConversionInfo>
                <p>현재 포인트 가치: 1P = 1원</p>
              </S.ConversionInfo>
            </S.PointsList>
          </S.Section>

          {/* Danger Zone */}
          <S.DangerZone>
            <h4>
              <AlertCircle size={16} />
              시스템 관리 (Danger Zone)
            </h4>
            <S.ButtonGroup>
              <S.ActionButton>
                <Database size={12} />
                데이터 백업
              </S.ActionButton>
              <S.ActionButton danger>
                데이터 초기화
              </S.ActionButton>
            </S.ButtonGroup>
          </S.DangerZone>
        </div>
      </S.SettingsGrid>
    </S.Container>
  );
};

export default AdminSettings;
