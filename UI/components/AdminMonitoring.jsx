import React from 'react';
import {
  Users,
  HeartPulse,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  ChevronDown,
  Info,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import * as S from './AdminMonitoring.styles';

// Mock Data
const trendData = [
  { month: '10월', stress: 32, consultation: 140 },
  { month: '11월', stress: 35, consultation: 165 },
  { month: '12월', stress: 45, consultation: 210 },
  { month: '1월', stress: 38, consultation: 180 },
  { month: '2월', stress: 42, consultation: 195 },
  { month: '3월', stress: 34, consultation: 172 },
];

const distributionData = [
  { name: '위험 (70%+)', value: 12, color: '#fb7185' },
  { name: '주의 (40-70%)', value: 25, color: '#fca5a5' },
  { name: '정상 (0-40%)', value: 63, color: '#818cf8' },
];

const stressFactors = [
  { factor: '업무량', value: 45 },
  { factor: '고객 응대', value: 38 },
  { factor: '개인 사정', value: 12 },
  { factor: '동료 관계', value: 5 },
];

const deptComparison = [
  { dept: '상담 1팀', avg: 42, highRisk: 4 },
  { dept: '상담 2팀', avg: 38, highRisk: 3 },
  { dept: '상담 3팀', avg: 55, highRisk: 6 },
  { dept: '운영지원', avg: 24, highRisk: 1 },
  { dept: '품질관리', avg: 31, highRisk: 2 },
  { dept: '기술지원', avg: 18, highRisk: 0 },
];

const AdminMonitoring = () => {
  return (
    <S.Container>
      {/* Header with Title & Filter */}
      <S.Header>
        <S.TitleBox>
          <h2>
            <Activity size={28} color="#818cf8" />
            심층 분석 레포트
          </h2>
          <p>Advanced Emotional Intelligence Analytics</p>
        </S.TitleBox>
        <S.HeaderControls>
          <S.PeriodButton>
            2024년 1분기
            <ChevronDown size={14} />
          </S.PeriodButton>
          <S.PrintButton>분석 보고서 출력</S.PrintButton>
        </S.HeaderControls>
      </S.Header>

      {/* Summary Cards */}
      <S.StatsGrid>
        {[
          { label: '전체 직원', val: '142명', trend: '+2', icon: Users, color: 'blue' },
          { label: '평균 스트레스', val: '34.2%', trend: '-4.1%', icon: HeartPulse, color: 'rose' },
          { label: '위험군 (70%+)', val: '12명', trend: '-1', icon: AlertTriangle, color: 'orange' },
          { label: '전월 대비 상담', val: '172건', trend: '-12%', icon: MessageSquare, color: 'emerald' },
        ].map((stat, i) => (
          <S.StatCard key={i}>
            <S.StatContent>
              <S.StatHeader>
                <S.IconBox color={stat.color}>
                  <stat.icon size={20} />
                </S.IconBox>
                <span>{stat.label}</span>
              </S.StatHeader>
              <S.StatValueRow>
                <p>{stat.val}</p>
                <S.TrendBadge trend={stat.trend.includes('-') ? 'down' : 'up'}>
                  {stat.trend.includes('-') ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                  {stat.trend.replace(/[+-]/, '')}
                </S.TrendBadge>
              </S.StatValueRow>
            </S.StatContent>
            <S.BackgroundIcon>
              <stat.icon />
            </S.BackgroundIcon>
          </S.StatCard>
        ))}
      </S.StatsGrid>

      <S.AnalysisGrid>
        {/* Monthly Trend Chart */}
        <S.TrendChartCard>
          <S.ChartHeader>
            <S.ChartTitles>
              <h3>
                <TrendingUp size={20} color="#818cf8" />
                월별 통합 추이 분석
              </h3>
              <p>상담 빈도와 평균 스트레스 수치의 상관관계</p>
            </S.ChartTitles>
            <S.Legend>
              <S.LegendItem color="#818cf8">
                <div />
                <span>상담 건수</span>
              </S.LegendItem>
              <S.LegendItem color="#fb7185">
                <div />
                <span>이슈 %</span>
              </S.LegendItem>
            </S.Legend>
          </S.ChartHeader>

          <S.ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorConsult" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb7185" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    padding: '12px'
                  }}
                  itemStyle={{ fontWeight: 900 }}
                />
                <Area type="monotone" dataKey="consultation" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorConsult)" />
                <Area type="monotone" dataKey="stress" stroke="#fb7185" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
              </AreaChart>
            </ResponsiveContainer>
          </S.ChartWrapper>
        </S.TrendChartCard>

        {/* Stress Distribution */}
        <S.DistributionCard>
          <div style={{ marginBottom: '2rem' }}>
            <S.ChartTitles>
              <h3>
                <PieIcon size={20} color="#fb7185" />
                스트레스 수준 분포
              </h3>
              <p uppercase>Emotional Baseline Distribution</p>
            </S.ChartTitles>
          </div>

          <S.PieContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <S.CenterLabel>
              <p>142</p>
              <p>전체</p>
            </S.CenterLabel>
          </S.PieContainer>

          <S.DistributionList>
            {distributionData.map((item, i) => (
              <S.DistItem key={i}>
                <div>
                  <S.ColorDot color={item.color} />
                  <span>{item.name}</span>
                </div>
                <span>{item.value}%</span>
              </S.DistItem>
            ))}
          </S.DistributionList>
        </S.DistributionCard>
      </S.AnalysisGrid>

      <S.BottomGrid>
        {/* Dept Comparison */}
        <S.ComparisonCard>
          <S.ChartHeader>
            <S.ChartTitles>
              <h3>
                <BarChart3 size={20} color="#60a5fa" />
                부서별 스트레스 비교
              </h3>
              <p italic>Average vs High Risk Individuals per Dept</p>
            </S.ChartTitles>
            <S.InfoButton><Info size={16} /></S.InfoButton>
          </S.ChartHeader>

          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptComparison} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="dept"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 900 }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Bar dataKey="avg" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </S.ComparisonCard>

        {/* Stress Factors Horizontal */}
        <S.FactorsCard>
          <S.ChartTitles>
            <h3>
              <AlertTriangle size={20} color="#fb923c" />
              주요 스트레스 요인 분석
            </h3>
            <p uppercase>Primary Emotional Triggers</p>
          </S.ChartTitles>

          <S.FactorsList>
            {stressFactors.map((item, i) => (
              <S.FactorItem key={i}>
                <S.FactorHeader>
                  <span>{item.factor}</span>
                  <span>{item.value}%</span>
                </S.FactorHeader>
                <S.FactorBarBg>
                  <S.FactorBarFill width={`${item.value}%`} />
                </S.FactorBarBg>
              </S.FactorItem>
            ))}
          </S.FactorsList>

          <S.CommentBox>
            <S.CommentTitle>
              <Info size={14} color="#818cf8" />
              전문가 코멘트
            </S.CommentTitle>
            <S.CommentText>
              현재 상담 3팀의 스트레스 지수가 평균 대비 <span>18% 높게</span> 나타나고 있습니다.
              최근 '업무량' 요인이 증가한 점을 고려할 때, 즉각적인 인원 보강 또는 업무 재분배를 권장합니다.
            </S.CommentText>
          </S.CommentBox>
        </S.FactorsCard>
      </S.BottomGrid>
    </S.Container>
  );
};

export default AdminMonitoring;
