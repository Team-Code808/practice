import React, { useState, useEffect } from 'react';
import StressGauge from './StressGauge';
import WeeklyChart from './WeeklyChart';
import {
  Play,
  Coffee,
  Calendar,
  Clock,
  Info,
  AlertCircle,
  TrendingDown,
  ChevronRight,
  Smile,
  X,
  Send,
  Heart,
  MessageSquare,
  SmilePlus
} from 'lucide-react';

import { NavItemType } from '../types';
import * as S from './Dashboard.styles';

const Dashboard = ({ onNavigate, isDarkMode }) => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isCoolDown, setIsCoolDown] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState('thisWeek'); // 'thisWeek' | 'lastWeek'

  // 모달 상태
  const [isEmotionModalOpen, setIsEmotionModalOpen] = useState(false);
  const [modalType, setModalType] = useState('IN');

  // 입력 상태
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [memo, setMemo] = useState('');

  const emotions = [
    { id: 1, emoji: '😄', label: '최고' },
    { id: 2, emoji: '😊', label: '좋음' },
    { id: 3, emoji: '😐', label: '보통' },
    { id: 4, emoji: '😟', label: '우울' },
    { id: 5, emoji: '😫', label: '힘듦' },
  ];

  const stressFactors = [
    '업무량 과다', '까다로운 고객', '시스템 장애', '동료 관계', '개인 사정', '컨디션 난조', '기타'
  ];

  const weeklyData = {
    thisWeek: [
      { day: '월', value: 45 },
      { day: '화', value: 52 },
      { day: '수', value: 68 },
      { day: '목', value: 55 },
      { day: '금', value: 40 },
      { day: '토', value: 25 },
      { day: '일', value: 18 },
    ],
    lastWeek: [
      { day: '월', value: 50 },
      { day: '화', value: 48 },
      { day: '수', value: 55 },
      { day: '목', value: 60 },
      { day: '금', value: 45 },
      { day: '토', value: 30 },
      { day: '일', value: 20 },
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockButtonClick = () => {
    setModalType(isClockedIn ? 'OUT' : 'IN');
    // 이전 상태 초기화
    setSelectedEmotion(null);
    setSelectedFactors([]);
    setMemo('');
    setIsEmotionModalOpen(true);
  };

  const toggleFactor = (factor) => {
    setSelectedFactors(prev =>
      prev.includes(factor) ? prev.filter(f => f !== factor) : [...prev, factor]
    );
  };

  const handleModalSubmit = () => {
    if (selectedEmotion === null) {
      alert('오늘의 기분을 선택해 주세요!');
      return;
    }

    // 실제 로직 연동 (여기서는 토글만)
    setIsClockedIn(!isClockedIn);
    setIsEmotionModalOpen(false);

    const message = modalType === 'IN' ? '출근 처리가 완료되었습니다. 오늘도 화이팅하세요!' : '퇴근 처리가 완료되었습니다. 오늘 하루도 고생 많으셨습니다!';
    alert(message);
  };

  const handleCoolDown = () => {
    setIsCoolDown(true);
    setTimeout(() => setIsCoolDown(false), 600000);
  };

  return (
    <S.Container>
      {/* Top Greeting & Quick Actions */}
      <S.GreetingSection isDarkMode={isDarkMode}>
        <S.UserInfo>
          <S.UserAvatar>
            <Smile className="w-8 h-8" />
          </S.UserAvatar>
          <S.GreetingText isDarkMode={isDarkMode}>
            <h1>안녕하세요, 김철수 상담원님!</h1>
            <p>
              <Clock className="w-4 h-4" />
              {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              <span className="mx-1">•</span>
              상태: <S.StatusBadge active={isClockedIn}>
                {isClockedIn ? "업무 중" : "업무 준비 중"}
              </S.StatusBadge>
            </p>
          </S.GreetingText>
        </S.UserInfo>

        <S.ActionGroup>
          <S.ActionButton
            onClick={handleClockButtonClick}
            variant={isClockedIn ? 'neutral' : 'primary'}
          >
            <Play className={`w-4 h-4 ${isClockedIn ? "rotate-90" : ""}`} />
            {isClockedIn ? "퇴근하기" : "출근하기"}
          </S.ActionButton>

          <S.ActionButton
            onClick={handleCoolDown}
            disabled={!isClockedIn || isCoolDown}
            variant={!isCoolDown && isClockedIn ? 'orange' : undefined}
            cooldownActive={isCoolDown}
          >
            <Coffee className="w-4 h-4" />
            {isCoolDown ? "쿨다운 작동 중" : "쿨다운"}
          </S.ActionButton>
        </S.ActionGroup>
      </S.GreetingSection>

      {/* Stats Grid */}
      <S.StatsGrid>
        <S.StatCard align="center" isDarkMode={isDarkMode}>
          <S.StatHeader mb="1rem">
            <span>스트레스 지수</span>
            <AlertCircle />
          </S.StatHeader>
          <StressGauge percentage={38} />
          <S.StatSubtext tag>매우 양호</S.StatSubtext>
        </S.StatCard>

        <S.StatCard isDarkMode={isDarkMode}>
          <S.StatHeader>
            <span>이번 달 출근율</span>
            <Calendar />
          </S.StatHeader>
          <S.StatContent>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '1rem' }}>
              <div>
                <S.StatValue>96%</S.StatValue>
                <S.StatSubtext>지각/결근 없음</S.StatSubtext>
              </div>
              <div style={{ width: '4rem', height: '4rem', position: 'relative' }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <path stroke="#f1f5f9" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path stroke="#22c55e" strokeWidth="3" fill="none" strokeDasharray="96, 100" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
            </div>
          </S.StatContent>
        </S.StatCard>

        <S.StatCard isDarkMode={isDarkMode}>
          <S.StatHeader>
            <span>잔여 연차</span>
            <Info />
          </S.StatHeader>
          <S.StatContent>
            <S.StatValue>12.5 <S.StatUnit>일</S.StatUnit></S.StatValue>
            <S.ProgressBar>
              <S.ProgressFill width="60%" />
            </S.ProgressBar>
            <S.StatSubtext>사용 연차: 8.5일 / 총 21일</S.StatSubtext>
          </S.StatContent>
        </S.StatCard>

        <S.StatCard variant="primary">
          <div style={{ position: 'relative', zIndex: 10 }}>
            <S.StatHeader light>
              <span>포인트</span>
            </S.StatHeader>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
              <S.StatValue light>2,450</S.StatValue>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>P</span>
            </div>
            <S.PointButton onClick={() => onNavigate(NavItemType.POINT_MALL)}>
              포인트 몰 가기 <ChevronRight size={12} />
            </S.PointButton>
          </div>
          <TrendingDown style={{ position: 'absolute', bottom: '-1rem', right: '-1rem', width: '8rem', height: '8rem', opacity: 0.1, transform: 'rotate(12deg)' }} />
        </S.StatCard>
      </S.StatsGrid>

      {/* Main Analysis Chart */}
      <S.ChartSection isDarkMode={isDarkMode}>
        <S.ChartHeader>
          <div>
            <h3>주간 스트레스 분석</h3>
            <p>상담 난이도 및 빈도에 따른 스트레스 추이</p>
          </div>
          <S.ChartToggle>
            <S.ToggleButton
              active={selectedWeek === 'thisWeek'}
              onClick={() => setSelectedWeek('thisWeek')}
            >
              이번 주
            </S.ToggleButton>
            <S.ToggleButton
              active={selectedWeek === 'lastWeek'}
              onClick={() => setSelectedWeek('lastWeek')}
            >
              지난 주
            </S.ToggleButton>
          </S.ChartToggle>
        </S.ChartHeader>
        <S.ChartWrapper>
          <WeeklyChart data={weeklyData[selectedWeek]} />
        </S.ChartWrapper>
      </S.ChartSection>

      {/* Emotion Modal */}
      {isEmotionModalOpen && (
        <S.ModalOverlay>
          <S.Backdrop onClick={() => setIsEmotionModalOpen(false)} />
          <S.ModalContent>
            <S.ModalHeader type={modalType}>
              <S.CloseRow>
                <S.IconBadge>
                  {modalType === 'IN' ? <SmilePlus size={24} /> : <Heart size={24} />}
                </S.IconBadge>
                <S.CloseButton onClick={() => setIsEmotionModalOpen(false)}>
                  <X size={24} />
                </S.CloseButton>
              </S.CloseRow>
              <S.ModalTitle>
                {modalType === 'IN' ? '오늘 하루, 어떻게 시작하시나요?' : '오늘 하루, 어떠셨나요?'}
              </S.ModalTitle>
              <S.ModalSub>상담원님의 소중한 마음 상태를 기록해 주세요.</S.ModalSub>
            </S.ModalHeader>

            <S.ModalBody>
              {/* Emotion Selection */}
              <div>
                <S.FormLabel>
                  <Smile size={16} className="text-indigo-500" />
                  현재 기분 선택
                </S.FormLabel>
                <S.MoodGrid>
                  {emotions.map((emotion) => (
                    <S.MoodButton
                      key={emotion.id}
                      onClick={() => setSelectedEmotion(emotion.id)}
                      active={selectedEmotion === emotion.id}
                    >
                      <span>{emotion.emoji}</span>
                      <span>{emotion.label}</span>
                    </S.MoodButton>
                  ))}
                </S.MoodGrid>
              </div>

              {/* Stress Factors */}
              <div>
                <S.FormLabel>
                  <AlertCircle size={16} className="text-indigo-500" />
                  주요 스트레스 요인 (중복 선택)
                </S.FormLabel>
                <S.FactorGrid>
                  {stressFactors.map((factor) => (
                    <S.FactorButton
                      key={factor}
                      onClick={() => toggleFactor(factor)}
                      active={selectedFactors.includes(factor)}
                    >
                      {factor}
                    </S.FactorButton>
                  ))}
                </S.FactorGrid>
              </div>

              {/* Memo */}
              <div>
                <S.FormLabel>
                  <MessageSquare size={16} className="text-indigo-500" />
                  특이사항 및 메모
                </S.FormLabel>
                <S.MemoTextarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="오늘 팀장님께 하고 싶은 말이나, 기록하고 싶은 점을 적어주세요."
                />
              </div>

              <S.SubmitModalButton
                onClick={handleModalSubmit}
                type={modalType}
              >
                <Send size={20} />
                {modalType === 'IN' ? '출근 완료' : '퇴근 완료'}
              </S.SubmitModalButton>
            </S.ModalBody>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default Dashboard;
