import styled from 'styled-components';

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  
  /* Recharts overriding if necessary can go here */
  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: #f1f5f9;
  }
`;
