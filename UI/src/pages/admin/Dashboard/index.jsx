import React, { useState } from 'react';
import {
  Users,
  Activity,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Search,
  HeartPulse,
  CalendarCheck,
  FileText,
  Mail,
  Phone,
  X,
  History,
  ExternalLink,
  Trophy,
  Palmtree,
  Calendar,
  Zap,
  Coins,
  MessageCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import * as S from './styles';

const deptStressData = [
  { dept: '상담 1팀', stress: 42 },
  { dept: '상담 2팀', stress: 38 },
  { dept: '상담 3팀', stress: 75 },

  { dept: '운영지원', stress: 24 },
  { dept: '품질관리', stress: 31 },
  { dept: '기술지원', stress: 18 },
];

const deptCooldownData = [
  { dept: '상담 1팀', count: 12 },
  { dept: '상담 2팀', count: 8 },
  { dept: '상담 3팀', count: 15 },
  { dept: '운영지원', count: 3 },
  { dept: '품질관리', count: 5 },
  { dept: '기술지원', count: 2 },
];

const agents = [
  {
    id: 1, name: '박진호', dept: '상담 1팀', role: '시니어', stress: 88, status: '통화 중', avatar: '👨‍💼',
    phone: '010-3921-7025', email: 'jh.park@calmdesk.com', joinDate: '2021.11.15',
    metrics: { csat: 4.2, aht: '4m 12s', attendance: 92, leave: 8, cooldowns: 12, alerts: 5, points: '2,120' }
  },
  {
    id: 2, name: '이지은', dept: '상담 2팀', role: '상담원', stress: 82, status: '대기', avatar: '👩‍💼',
    phone: '010-4822-7042', email: 'je.lee@calmdesk.com', joinDate: '2023.02.01',
    metrics: { csat: 4.5, aht: '3m 58s', attendance: 95, leave: 11, cooldowns: 8, alerts: 3, points: '3,400' }
  },
  {
    id: 3, name: '강동원', dept: '상담 1팀', role: '상담원', stress: 79, status: '식사 중', avatar: '👨‍💻',
    phone: '010-5811-7103', email: 'dw.kang@calmdesk.com', joinDate: '2022.08.20',
    metrics: { csat: 3.9, aht: '5m 05s', attendance: 89, leave: 5.5, cooldowns: 15, alerts: 4, points: '1,850' }
  },
  {
    id: 4, name: '김태리', dept: '상담 3팀', role: '상담원', stress: 75, status: '통화 중', avatar: '👩‍🔬',
    phone: '010-6721-7118', email: 'tr.kim@calmdesk.com', joinDate: '2023.01.10',
    metrics: { csat: 4.7, aht: '3m 30s', attendance: 100, leave: 18, cooldowns: 1, alerts: 1, points: '5,200' }
  },
  {
    id: 5, name: '최우식', dept: '상담 2팀', role: '상담원', stress: 72, status: '대기', avatar: '🧔',
    phone: '010-7214-7150', email: 'ws.choi@calmdesk.com', joinDate: '2022.12.05',
    metrics: { csat: 4.1, aht: '4m 45s', attendance: 94, leave: 12, cooldowns: 6, alerts: 2, points: '2,900' }
  },
  {
    id: 6, name: '한소희', dept: '상담 3팀', role: '상담원', stress: 65, status: '업무 중', avatar: '👩‍🎨',
    phone: '010-8123-7200', email: 'sh.han@calmdesk.com', joinDate: '2024.01.15',
    metrics: { csat: 4.9, aht: '3m 20s', attendance: 99, leave: 15, cooldowns: 0, alerts: 0, points: '1,200' }
  },
  {
    id: 7, name: '조정석', dept: '상담 1팀', role: '팀장', stress: 58, status: '업무 중', avatar: '👨‍🎨',
    phone: '010-1234-5678', email: 'js.jo@calmdesk.com', joinDate: '2020.03.10',
    metrics: { csat: 4.8, aht: '3m 50s', attendance: 98, leave: 14, cooldowns: 2, alerts: 0, points: '5,800' }
  },
];

const departments = ['전체', '상담 1팀', '상담 2팀', '상담 3팀'];

const AdminDashboard = () => {
  const [selectedDept, setSelectedDept] = useState('전체');
  const [chartType, setChartType] = useState('stress'); // 'stress' | 'cooldown'
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredAgents = agents
    .filter(a => selectedDept === '전체' || a.dept === selectedDept)
    .sort((a, b) => b.stress - a.stress)
    .slice(0, 5);

  const stats = [
    { label: '평균 스트레스', val: '34%', trend: '-4%', color: 'indigo', icon: Activity },
    { label: '전체 출근률', val: '94.2%', trend: '+2.1%', color: 'blue', icon: CalendarCheck },
    { label: '상담 요청', val: '12건', trend: '오늘 기준', color: 'orange', icon: MessageSquare },
    { label: '휴가(근태) 요청', val: '5건', trend: '승인 대기', color: 'emerald', icon: FileText },
  ];

  const getTrendType = (trend) => {
    if (trend.includes('+')) return 'up';
    if (trend.includes('-')) return 'down';
    return 'neutral';
  };

  return (
    <S.Container>
      {/* Admin Quick Banner */}
      <S.QuickBanner>
        <S.BannerContent>
          <S.ShieldIconBox>
            <ShieldAlert size={24} color="white" />
          </S.ShieldIconBox>
          <S.BannerText>
            <h2>ADMINISTRATION CONSOLE</h2>
            <p>실시간 센터 활성도: 88% | 총 42명 근무 중</p>
          </S.BannerText>
        </S.BannerContent>
        <S.BannerStats>
          <S.StatBadge>Active Sessions: 28</S.StatBadge>
          <S.StatBadge alert>Stress Alerts: 4</S.StatBadge>
        </S.BannerStats>
        <S.BannerDecor>
          <Activity size={192} />
        </S.BannerDecor>
      </S.QuickBanner>

      {/* Stats Grid - Softened Dark Theme */}
      <S.StatsGrid>
        {stats.map((stat, i) => (
          <S.StatCard key={i}>
            <S.CardHeader>
              <S.IconBox color={stat.color}>
                <stat.icon size={20} />
              </S.IconBox>
              <span>{stat.label}</span>
            </S.CardHeader>
            <S.StatValue>{stat.val}</S.StatValue>
            <S.TrendText trendType={getTrendType(stat.trend)}>
              {stat.trend}
            </S.TrendText>
          </S.StatCard>
        ))}
      </S.StatsGrid>

      <S.MainGrid>
        {/* Weekly Stress Chart by Department */}
        <S.ChartSection>
          <S.SectionHeader>
            <S.HeaderLeft>
              <h3>
                {chartType === 'stress' ? (
                  <>
                    <HeartPulse size={20} color="#fb7185" />
                    부서별 평균 스트레스 지수
                  </>
                ) : (
                  <>
                    <Activity size={20} color="#60a5fa" />
                    주간 부서별 누적 쿨다운 횟수
                  </>
                )}
              </h3>
              <p>
                {chartType === 'stress'
                  ? '실시간 부서별 멘탈 건강 통합 지표 분석'
                  : '지난 7일간 부서별 쿨다운(휴식) 요청 빈도 분석'}
              </p>
            </S.HeaderLeft>

            <S.ChartTabContainer>
              <S.ChartTabButton
                active={chartType === 'stress'}
                activeColor="#fb7185"
                onClick={() => setChartType('stress')}
              >
                스트레스
              </S.ChartTabButton>
              <S.ChartTabButton
                active={chartType === 'cooldown'}
                activeColor="#60a5fa"
                onClick={() => setChartType('cooldown')}
              >
                쿨다운
              </S.ChartTabButton>
            </S.ChartTabContainer>

            <S.AvgBadge>
              <span>{chartType === 'stress' ? '평균 34%' : '총 45회'}</span>
            </S.AvgBadge>
          </S.SectionHeader>

          <S.ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartType === 'stress' ? deptStressData : deptCooldownData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis
                  dataKey="dept"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                />
                <YAxis hide domain={[0, 'auto']} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    padding: '12px'
                  }}
                  itemStyle={{ color: chartType === 'stress' ? '#fb7185' : '#60a5fa', fontWeight: 900 }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}
                  formatter={(value) => [
                    chartType === 'stress' ? `${value}%` : `${value}회`,
                    chartType === 'stress' ? '스트레스' : '쿨다운'
                  ]}
                />
                <Bar
                  dataKey={chartType === 'stress' ? 'stress' : 'count'}
                  radius={[8, 8, 0, 0]}
                  barSize={32}
                >
                  {(chartType === 'stress' ? deptStressData : deptCooldownData).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        chartType === 'stress'
                          ? (entry.stress > 50 ? '#fb7185' : entry.stress > 35 ? '#818cf8' : '#475569')
                          : (entry.count > 10 ? '#60a5fa' : '#475569')
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </S.ChartWrapper>
        </S.ChartSection>

        {/* High Stress Top 5 List */}
        <S.TopListSection>
          <S.SectionHeader>
            <S.HeaderLeft>
              <h3>
                <AlertTriangle size={18} color="#fb923c" />
                스트레스 고위험군
              </h3>
              <p style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>Stress Top 5</p>
            </S.HeaderLeft>
            <S.SearchButton>
              <Search size={16} />
            </S.SearchButton>
          </S.SectionHeader>

          {/* Department Filter Tabs */}
          <S.FilterTabs>
            {departments.map((dept) => (
              <S.TabButton
                key={dept}
                onClick={() => setSelectedDept(dept)}
                active={selectedDept === dept}
              >
                {dept}
              </S.TabButton>
            ))}
          </S.FilterTabs>

          <S.AgentList>
            {filteredAgents.map((agent) => (
              <S.AgentCard key={agent.id} onClick={() => setSelectedMember(agent)} style={{ cursor: 'pointer' }}>
                <S.AgentAvatar>
                  {agent.avatar}
                </S.AgentAvatar>
                <S.AgentInfo>
                  <S.NameRow>
                    <p>{agent.name}</p>
                    <span>{agent.stress}%</span>
                  </S.NameRow>
                  <S.StatusRow status={agent.status}>
                    <span>{agent.dept}</span>
                    <span />
                    <span>{agent.status}</span>
                  </S.StatusRow>
                </S.AgentInfo>
                <S.ActionButton>
                  <ChevronRight size={16} />
                </S.ActionButton>
              </S.AgentCard>
            ))}
            {filteredAgents.length === 0 && (
              <S.EmptyState>
                <Users />
                <p>해당 부서 데이터 없음</p>
              </S.EmptyState>
            )}
          </S.AgentList>

          <S.DetailButton>
            상세 모니터링 이동
          </S.DetailButton>
        </S.TopListSection>
      </S.MainGrid>

      {selectedMember && (
        <S.ModalOverlay>
          <S.Backdrop onClick={() => setSelectedMember(null)} />
          <S.ModalContainer>

            {/* Upper Profile Header */}
            <S.ModalHeader status={selectedMember.status}>
              <S.ModalAvatar>{selectedMember.avatar}</S.ModalAvatar>
              <S.ModalInfo>
                <S.NameTitle>
                  <h2>{selectedMember.name}</h2>
                  <span>{selectedMember.role} • {selectedMember.dept}</span>
                </S.NameTitle>
                <S.ContactRow>
                  <S.ContactChip>
                    <Phone />
                    <span>{selectedMember.phone}</span>
                  </S.ContactChip>
                  <S.ContactChip>
                    <Mail />
                    <span>{selectedMember.email}</span>
                  </S.ContactChip>
                  <S.ContactChip>
                    <Calendar />
                    <span>{selectedMember.joinDate} 입사</span>
                  </S.ContactChip>
                </S.ContactRow>
              </S.ModalInfo>

              <S.ModalActions>
                <S.CallButton>상담 호출</S.CallButton>
              </S.ModalActions>
              <S.CloseModalButton onClick={() => setSelectedMember(null)}>
                <X size={24} />
              </S.CloseModalButton>
            </S.ModalHeader>

            {/* Main Content Area */}
            <S.DetailContent>
              <S.ContentGrid>
                {/* Left Section: Stress & Performance */}
                <S.LeftColumn>
                  {/* Real-time Stress Bar */}
                  <S.StressWidget>
                    <S.WidgetHeader>
                      <p>
                        <Activity size={12} color="#818cf8" />
                        실시간 스트레스 지표
                      </p>
                      <S.BadgeSmall>{selectedMember.stress > 60 ? '주의 필요' : '정상 범위'}</S.BadgeSmall>
                    </S.WidgetHeader>
                    <S.StressValue>
                      <span>{selectedMember.stress}</span>
                      <span>%</span>
                    </S.StressValue>
                    <S.ProgressBar>
                      <div style={{ width: `${selectedMember.stress}%` }} />
                    </S.ProgressBar>
                  </S.StressWidget>

                  {/* 핵심 지표 섹션 */}
                  <S.MetricsGrid>
                    {/* 성과 포인트 */}
                    <S.MetricCard>
                      <S.MetricTitle>
                        <S.MetricIcon color="amber">
                          <Coins size={20} />
                        </S.MetricIcon>
                        <S.MetricName>성과 포인트</S.MetricName>
                      </S.MetricTitle>
                      <S.MetricValue color="amber">
                        <p>{selectedMember.metrics.points}</p>
                        <span>P</span>
                      </S.MetricValue>
                    </S.MetricCard>

                    {/* 출근 달성률 */}
                    <S.MetricCard>
                      <S.MetricTitle>
                        <S.MetricIcon color="emerald">
                          <Trophy size={20} />
                        </S.MetricIcon>
                        <S.MetricName>출근 달성률</S.MetricName>
                      </S.MetricTitle>
                      <S.MetricValue color="emerald">
                        <p>{selectedMember.metrics.attendance}</p>
                        <span>%</span>
                      </S.MetricValue>
                    </S.MetricCard>

                    {/* 쿨다운 누른 횟수 */}
                    <S.MetricCard>
                      <S.MetricTitle>
                        <S.MetricIcon color="orange">
                          <Zap size={20} />
                        </S.MetricIcon>
                        <S.MetricName>쿨다운 누른 횟수</S.MetricName>
                      </S.MetricTitle>
                      <S.MetricValue color="orange">
                        <p>{selectedMember.metrics.cooldowns}</p>
                        <span>회</span>
                      </S.MetricValue>
                    </S.MetricCard>
                  </S.MetricsGrid>
                </S.LeftColumn>

                {/* Right Section: Wellness & History */}
                <S.RightColumn>
                  {/* 웰니스 모니터링 */}
                  <S.WellnessSection>
                    <S.SectionTitle>
                      <HeartPulse size={16} color="#fb7185" />
                      웰니스 모니터링
                    </S.SectionTitle>
                    <S.WellnessItem>
                      <S.WellnessLeft>
                        <S.WellnessIcon color="indigo">
                          <Palmtree size={18} />
                        </S.WellnessIcon>
                        <S.WellnessLabel>잔여 연차</S.WellnessLabel>
                      </S.WellnessLeft>
                      <S.WellnessValue>
                        <p>{selectedMember.metrics.leave}</p>
                        <span>일</span>
                      </S.WellnessValue>
                    </S.WellnessItem>
                    <S.WellnessItem>
                      <S.WellnessLeft>
                        <S.WellnessIcon color="rose">
                          <Activity size={18} />
                        </S.WellnessIcon>
                        <S.WellnessLabel>스트레스 경고</S.WellnessLabel>
                      </S.WellnessLeft>
                      <S.WellnessValue color="#f43f5e">
                        <p>{selectedMember.metrics.alerts}</p>
                        <span>회</span>
                      </S.WellnessValue>
                    </S.WellnessItem>
                  </S.WellnessSection>

                  {/* 최근 활동 이력 */}
                  <S.WellnessSection>
                    <S.SectionTitle>
                      <History size={16} color="#818cf8" />
                      최근 인사 활동 이력
                    </S.SectionTitle>
                    <S.HistoryList>
                      {[
                        { title: '심층 심리 상담 완료', date: '2024.03.20', type: 'Consultation', icon: <MessageCircle size={18} /> },
                        { title: '반차 휴가 사용', date: '2024.03.14', type: 'Leave', icon: <Palmtree size={18} /> }
                      ].map((item, idx) => (
                        <S.HistoryItem key={idx}>
                          <S.HistoryContent>
                            <S.HistoryIcon>{item.icon}</S.HistoryIcon>
                            <S.HistoryText>
                              <p>{item.title}</p>
                              <p>{item.date} • {item.type}</p>
                            </S.HistoryText>
                          </S.HistoryContent>
                          <ExternalLink size={12} color="#475569" />
                        </S.HistoryItem>
                      ))}
                    </S.HistoryList>
                  </S.WellnessSection>
                </S.RightColumn>
              </S.ContentGrid>
            </S.DetailContent>
          </S.ModalContainer>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default AdminDashboard;
