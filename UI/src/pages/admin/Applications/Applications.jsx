import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Plane,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  X,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import * as S from './Applications.styles';

const AdminApplications = () => {
  const [activeSubTab, setActiveSubTab] = useState('LEAVE');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [joinRequests, setJoinRequests] = useState([]);

  useEffect(() => {
    const loadJoinRequests = () => {
      const stored = JSON.parse(localStorage.getItem('params_applications') || '[]');
      const formatted = stored.map((req) => ({
        ...req,
        type: '입사 신청',
        status: req.joinStatus === 'PENDING' ? '대기' : (req.joinStatus === 'APPROVED' ? '승인' : '반려'),
        reason: `부서: ${req.department} / 직급: ${req.position}`,
        avatar: '👤'
      }));
      setJoinRequests(formatted);
    };

    loadJoinRequests();
    const interval = setInterval(loadJoinRequests, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinAction = (id, action) => {
    const stored = JSON.parse(localStorage.getItem('params_applications') || '[]');
    const updated = stored.map((req) => {
      if (req.id === id) {
        return { ...req, joinStatus: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' };
      }
      return req;
    });
    localStorage.setItem('params_applications', JSON.stringify(updated));

    const formatted = updated.map((req) => ({
      ...req,
      type: '입사 신청',
      status: req.joinStatus === 'PENDING' ? '대기' : (req.joinStatus === 'APPROVED' ? '승인' : '반려'),
      reason: `부서: ${req.department} / 직급: ${req.position}`,
      avatar: '👤'
    }));
    setJoinRequests(formatted);
    setSelectedRequest(null);
  };

  const leaveRequests = [
    { id: 1, name: '정태양', dept: '상담 1팀', type: '연차', period: '2026.01.25 - 01.26', status: '대기', reason: '가족 모임 참석', day: 25, avatar: '🧔' },
    { id: 2, name: '서예진', dept: '상담 3팀', type: '반차', period: '2026.01.22 (오후)', status: '대기', reason: '병원 정기 검진', day: 22, avatar: '👩‍🎨' },
    { id: 3, name: '이민수', dept: '상담 1팀', type: '연차', period: '2026.01.15', status: '승인', reason: '개인 사유', day: 15, avatar: '👨‍💼' },
    { id: 4, name: '김지아', dept: '상담 2팀', type: '반차', period: '2026.01.12 (오전)', status: '반려', reason: '업무 폭주 기간', day: 12, avatar: '👩‍💼' },
    { id: 5, name: '박진호', dept: '상담 1팀', type: '연차', period: '2026.01.25', status: '승인', reason: '개인 휴식', day: 25, avatar: '👨‍💻' },
    { id: 6, name: '최우식', dept: '상담 2팀', type: '연차', period: '2026.01.22', status: '대기', reason: '이사 준비', day: 22, avatar: '👨‍🎨' },
    { id: 7, name: '이수민', dept: '개발팀', type: '워케이션', period: '2026.01.27 - 01.28', status: '대기', reason: '제주도 워케이션 근무', day: 27, avatar: '👩‍💻' },
  ];

  const consultationRequests = [
    { id: 101, name: '박진호', dept: '상담 1팀', type: '긴급 상담', time: '2026.01.21 14:30', status: '대기', message: '악성 민원으로 인한 멘탈 케어 필요', day: 21 },
    { id: 102, name: '이지은', dept: '상담 2팀', type: '일반 상담', time: '2026.01.21 15:00', status: '대기', message: '직무 스트레스 및 진로 상담', day: 21 },
    { id: 103, name: '강동원', dept: '상담 1팀', type: '일반 상담', time: '2026.01.20 11:00', status: '완료', message: '업무 조정 관련 면담', day: 20 },
  ];

  const getFilteredList = () => {
    let list = [];
    if (activeSubTab === 'LEAVE') list = leaveRequests;
    else if (activeSubTab === 'CONSULTATION') list = consultationRequests;
    else if (activeSubTab === 'JOIN') list = joinRequests;

    return list.filter(req => {
      if (statusFilter === '전체') return true;
      return req.status === statusFilter;
    });
  };

  const calendarGrid = Array.from({ length: 35 }, (_, i) => {
    const day = i - 5 + 1;
    if (day <= 0 || day > 31) return null;
    const leaves = leaveRequests.filter(l => l.day === day);
    const consults = consultationRequests.filter(c => c.day === day);
    return { day, leaves, consults };
  });

  const getRequestsForSelectedDay = () => {
    if (selectedDay === null) return [];
    const leaves = leaveRequests.filter(l => l.day === selectedDay).map(l => ({ ...l, category: 'LEAVE' }));
    const consults = consultationRequests.filter(c => c.day === selectedDay).map(c => ({ ...c, category: 'CONSULTATION' }));
    return [...leaves, ...consults];
  };

  const closeModal = () => {
    setSelectedDay(null);
    setSelectedRequest(null);
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleBox>
          <h2>
            <ClipboardList size={28} color="#818cf8" />
            통합 신청 매니저
          </h2>
          <p>Global Schedule & Request Control</p>
        </S.TitleBox>
        <S.TabGroup>
          <S.TabButton
            active={activeSubTab === 'LEAVE'}
            onClick={() => setActiveSubTab('LEAVE')}
          >
            <Plane size={14} />
            휴가 관리
          </S.TabButton>
          <S.TabButton
            active={activeSubTab === 'CONSULTATION'}
            onClick={() => setActiveSubTab('CONSULTATION')}
          >
            <MessageSquare size={14} />
            상담 관리
          </S.TabButton>
          <S.TabButton
            active={activeSubTab === 'JOIN'}
            onClick={() => setActiveSubTab('JOIN')}
          >
            <UserPlus size={14} />
            입사 신청
          </S.TabButton>
        </S.TabGroup>
      </S.Header>

      <S.MainGrid>
        {/* Left Side: Calendar (Only show for Leave/Consultation) */}
        {activeSubTab !== 'JOIN' ? (
          <S.LeftColumn>
            <S.CalendarCard>
              <S.CalendarHeader>
                <S.MonthTitle>
                  <S.MonthIconBox>
                    <CalendarIcon size={24} />
                  </S.MonthIconBox>
                  <S.MonthText>
                    <h3>2026년 1월</h3>
                    <p>March Overview</p>
                  </S.MonthText>
                </S.MonthTitle>
                <S.CalendarControls>
                  <S.NavButton><ChevronLeft size={20} /></S.NavButton>
                  <S.TodayButton>오늘</S.TodayButton>
                  <S.NavButton><ChevronRightIcon size={20} /></S.NavButton>
                </S.CalendarControls>
              </S.CalendarHeader>

              <S.CalendarGrid>
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <S.DayHeader key={day}>{day}</S.DayHeader>
                ))}
                {calendarGrid.map((cell, idx) => (
                  <S.DayCell
                    key={idx}
                    empty={!cell}
                    selected={cell && selectedDay === cell.day}
                    onClick={() => cell && setSelectedDay(cell.day)}
                  >
                    {cell && (
                      <>
                        <S.DayNumber
                          isWeekend={[0, 6].includes(idx % 7)}
                          selected={selectedDay === cell.day}
                        >
                          <span>{cell.day}</span>
                          {(cell.leaves.length > 0 || cell.consults.length > 0) && (
                            <S.IndicatorDots>
                              {cell.leaves.some(l => l.status === '대기') && <S.Dot color="amber" />}
                              {cell.consults.some(c => c.status === '대기') && <S.Dot color="rose" />}
                            </S.IndicatorDots>
                          )}
                        </S.DayNumber>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                          {cell.leaves.slice(0, 2).map(l => (
                            <S.RequestItem key={l.id} status={l.status}>
                              {l.name}
                            </S.RequestItem>
                          ))}
                          {cell.consults.map(c => (
                            <S.RequestItem key={c.id} type="consultation">
                              [상담] {c.name}
                            </S.RequestItem>
                          ))}
                        </div>
                      </>
                    )}
                  </S.DayCell>
                ))}
              </S.CalendarGrid>
            </S.CalendarCard>
          </S.LeftColumn>
        ) : (
          /* Join Request Full Width View */
          <S.LeftColumn>
            <S.EmptyJoinView>
              <div>
                <UserPlus size={48} />
                <p>입사 신청 내역은 우측 리스트에서 확인 및 승인 처리할 수 있습니다.</p>
              </div>
            </S.EmptyJoinView>
          </S.LeftColumn>
        )}

        {/* Right Side: Quick List */}
        <S.RightColumn>
          <S.ListCard>
            <S.ListHeader>
              <S.ListTitle>
                <h3>처리 대기 리스트</h3>
                <p>Pending Queue</p>
              </S.ListTitle>
              <S.FilterGrid>
                {['전체', '대기', '승인', '반려'].map(status => (
                  <S.FilterChip
                    key={status}
                    active={statusFilter === status}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </S.FilterChip>
                ))}
              </S.FilterGrid>
            </S.ListHeader>

            <S.ScrollList>
              {getFilteredList().map((req, idx) => (
                <S.ListItem
                  key={req.id || idx}
                  onClick={() => setSelectedRequest(req)}
                >
                  <S.ItemTop>
                    <S.ItemAvatar>
                      {req.avatar || '👤'}
                    </S.ItemAvatar>
                    <S.ItemInfo>
                      <h4>{req.name}</h4>
                      <p>{req.dept} {req.joinStatus ? '' : ''}</p>
                    </S.ItemInfo>
                    <S.StatusPill status={req.status}>
                      {req.status}
                    </S.StatusPill>
                  </S.ItemTop>
                  <S.ItemBottom>
                    <span>{req.type}</span>
                    <button>
                      자세히 <ChevronRight size={12} />
                    </button>
                  </S.ItemBottom>
                </S.ListItem>
              ))}
              {getFilteredList().length === 0 && (
                <S.EmptyList>내역이 없습니다.</S.EmptyList>
              )}
            </S.ScrollList>
          </S.ListCard>
        </S.RightColumn>
      </S.MainGrid>

      {/* Detail Modal */}
      {(selectedDay !== null || selectedRequest !== null) && (
        <S.ModalOverlay>
          <S.Backdrop onClick={closeModal} />
          <S.ModalContainer>
            <S.ModalHeader>
              <S.ModalTitle>
                <S.ModalIconBox>
                  {selectedRequest && selectedRequest.type === '입사 신청' ? <UserPlus size={28} color="white" /> : <CalendarIcon size={28} color="white" />}
                </S.ModalIconBox>
                <S.ModalTexts>
                  <h3>
                    {selectedRequest ? `${selectedRequest.name}님 상세 신청` : `3월 ${selectedDay}일 신청 현황`}
                  </h3>
                  <p>Daily Review & Decisions</p>
                </S.ModalTexts>
              </S.ModalTitle>
              <S.CloseButton onClick={closeModal}>
                <X size={24} color="white" />
              </S.CloseButton>
            </S.ModalHeader>

            <S.ModalBody>
              {(selectedRequest ? [selectedRequest] : getRequestsForSelectedDay()).map((req, i) => (
                <S.DetailCard key={req.id || i}>
                  <S.DetailHeader>
                    <S.PersonInfo>
                      <S.PersonAvatar>
                        {req.avatar || '👤'}
                      </S.PersonAvatar>
                      <S.PersonTexts>
                        <h4>{req.name}</h4>
                        <p>{req.dept} • {req.type}</p>
                      </S.PersonTexts>
                    </S.PersonInfo>
                    <S.StatusPill status={req.status} style={{ fontSize: '0.625rem' }}>
                      {req.status}
                    </S.StatusPill>
                  </S.DetailHeader>

                  <S.ContentBox>
                    <p>
                      {req.type === '입사 신청' ? '신청 정보' : '사유 / 메시지'}
                    </p>
                    <p>
                      {req.reason || req.message || '입력된 상세 내용이 없습니다.'}
                    </p>
                    {req.type === '입사 신청' && (
                      <S.JoinInfo>
                        <p>연락처: {req.phone}</p>
                        <p>입사희망일: {req.joinDate}</p>
                      </S.JoinInfo>
                    )}
                  </S.ContentBox>

                  {req.status === '대기' && (
                    <S.ActionButtons>
                      <S.ActionBtn
                        type="approve"
                        onClick={() => req.type === '입사 신청' ? handleJoinAction(req.id, 'APPROVE') : null}
                      >
                        <CheckCircle2 size={16} /> 승인
                      </S.ActionBtn>
                      <S.ActionBtn
                        type="reject"
                        onClick={() => req.type === '입사 신청' ? handleJoinAction(req.id, 'REJECT') : null}
                      >
                        <XCircle size={16} /> 반려
                      </S.ActionBtn>
                    </S.ActionButtons>
                  )}
                </S.DetailCard>
              ))}
            </S.ModalBody>
            <S.ModalFooter>
              <button onClick={closeModal}>닫기</button>
            </S.ModalFooter>
          </S.ModalContainer>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default AdminApplications;
