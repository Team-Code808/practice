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
  ArrowDownRight,
  Zap
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
import * as S from './Monitoring.styles';

// Mock Data
const trendData = [
  { month: '8월', stress: 32, consultation: 140, cooldown: 45 },
  { month: '9월', stress: 35, consultation: 165, cooldown: 52 },
  { month: '10월', stress: 45, consultation: 210, cooldown: 78 },
  { month: '11월', stress: 38, consultation: 180, cooldown: 65 },
  { month: '12월', stress: 42, consultation: 195, cooldown: 58 },
  { month: '1월', stress: 34, consultation: 172, cooldown: 48 },
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
  const [isPeriodOpen, setIsPeriodOpen] = React.useState(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState('2026년 1분기');
  const periods = ['2026년 1분기', '2025년 4분기', '2025년 3분기', '2025년 2분기'];

  return (
    <S.Container>
      {/* Header with Title & Filter */}
      <S.Header>
        <S.TitleBox>
          <h2>
            <Activity size={28} color="#818cf8" />
            심층 분석 레포트
          </h2>
          <p>Advanced Emotional Analytics</p>
        </S.TitleBox>
        <S.HeaderControls>
          <S.PeriodDropdownContainer>
            <S.PeriodButton onClick={() => setIsPeriodOpen(!isPeriodOpen)}>
              {selectedPeriod}
              <ChevronDown size={14} style={{ transform: isPeriodOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
            </S.PeriodButton>
            {isPeriodOpen && (
              <S.DropdownMenu>
                {periods.map(period => (
                  <S.DropdownItem
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsPeriodOpen(false);
                    }}
                    active={selectedPeriod === period}
                  >
                    {period}
                  </S.DropdownItem>
                ))}
              </S.DropdownMenu>
            )}
          </S.PeriodDropdownContainer>
          <S.PrintButton>분석 보고서 출력</S.PrintButton>
        </S.HeaderControls>
      </S.Header>

      {/* Summary Cards */}
      <S.StatsGrid>
        {[
          { label: '전체 직원', val: '142명', trend: '+2', icon: Users, color: 'blue' },
          { label: '평균 스트레스', val: '34.2%', trend: '-4.1%', icon: HeartPulse, color: 'rose' },
          { label: '위험군 (70%+)', val: '12명', trend: '-1', icon: AlertTriangle, color: 'orange' },
          { label: '평균 쿨다운', val: '3.2회', trend: '+12%', icon: Zap, color: 'violet' },
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
                <span>스트레스 %</span>
              </S.LegendItem>
              <S.LegendItem color="#fb923c">
                <div />
                <span>쿨다운 횟수</span>
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
                  <linearGradient id="colorCooldown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
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
                <Area name="상담" type="monotone" dataKey="consultation" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorConsult)" />
                <Area name="스트레스" type="monotone" dataKey="stress" stroke="#fb7185" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
                <Area name="쿨다운" type="monotone" dataKey="cooldown" stroke="#fb923c" strokeWidth={3} fillOpacity={1} fill="url(#colorCooldown)" />
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
        </S.FactorsCard>
      </S.BottomGrid>
    </S.Container>
  );
};

export default AdminMonitoring;
