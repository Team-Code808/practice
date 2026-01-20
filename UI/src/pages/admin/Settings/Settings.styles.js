import styled, { keyframes, css } from 'styled-components';

// Animations
const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 5rem;
  animation: ${slideInBottom} 0.7s ease-out;
`;

/* Header */
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const HeaderTitle = styled.div`
  h2 {
    font-size: 1.875rem; /* 3xl */
    font-weight: 900;
    color: white;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  p {
    color: #94a3b8; /* slate-400 */
    font-size: 0.875rem; /* sm */
    font-weight: 500;
    margin-top: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: #4f46e5;
  color: white;
  border-radius: 1rem;
  font-weight: 900;
  font-size: 0.875rem; /* sm */
  box-shadow: 0 20px 25px -5px rgba(49, 46, 129, 0.2);
  transition: all 0.2s;
  
  &:hover { background-color: #4338ca; }
  &:active { transform: scale(0.95); }
  
  ${props => props.disabled && 'opacity: 0.5; cursor: not-allowed;'}
`;

export const SpinIcon = styled.div`
  animation: ${spin} 1s linear infinite;
`;

/* Main Grid */
export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

/* Section Styles */
export const Section = styled.div`
  background-color: #1e293b; /* slate-800 */
  border: 1px solid rgba(51, 65, 85, 0.5); /* slate-700/50 */
  padding: 2rem;
  border-radius: 2.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem; /* xl */
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  
  p {
    font-size: 0.875rem;
    font-weight: 900;
    color: #e2e8f0; /* slate-200 */
  }
  
  span {
    font-size: 1.125rem; /* lg */
    font-weight: 900;
    color: #f43f5e; /* rose-500 */
  }
`;

export const RangeInput = styled.input`
  width: 100%;
  height: 0.5rem;
  background-color: #0f172a;
  border-radius: 0.5rem;
  appearance: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background-color: #f43f5e;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

export const Description = styled.p`
  font-size: 0.625rem; /* 10px */
  color: #64748b; /* slate-500 */
  font-weight: 500;
  line-height: 1.625;
`;

export const ToggleBox = styled.div`
  padding: 1.5rem;
  background-color: rgba(15, 23, 42, 0.5); /* slate-900/50 */
  border-radius: 1.5rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ToggleText = styled.div`
  p:first-child {
    font-size: 0.875rem;
    font-weight: 900;
    color: #e2e8f0;
  }
  
  p:last-child {
    font-size: 0.625rem;
    color: #64748b; /* slate-500 */
    font-weight: 700;
    margin-top: 0.25rem;
  }
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  div {
    width: 2.75rem;
    height: 1.5rem;
    background-color: #334155; /* slate-700 */
    border-radius: 9999px;
    transition: all 0.2s;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      background-color: white;
      border: 1px solid #d1d5db;
      border-radius: 9999px;
      height: 1.25rem;
      width: 1.25rem;
      transition: all 0.2s;
    }
  }
  
  input:checked + div {
    background-color: #4f46e5;
  }
  
  input:checked + div::after {
    transform: translateX(100%);
    border-color: white;
  }
`;

/* Points Section */
export const PointsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PointItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: rgba(15, 23, 42, 0.5);
  border-radius: 1rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

  span:first-child {
    font-size: 0.75rem; /* xs */
    font-weight: 700;
    color: #94a3b8; /* slate-400 */
  }
`;

export const PointInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    width: 4rem;
    background-color: #020617; /* slate-950 */
    border: 1px solid rgba(51, 65, 85, 0.5);
    border-radius: 0.75rem;
    padding: 0.25rem 0.75rem;
    text-align: center;
    color: #fbbf24; /* amber-400 */
    font-weight: 900;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.2s;
    
    &:focus { border-color: #f59e0b; }
  }
  
  span {
    font-size: 0.625rem;
    font-weight: 900;
    color: #475569; /* slate-600 */
    text-transform: uppercase;
  }
`;

export const ConversionInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(245, 158, 11, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(245, 158, 11, 0.2);
  text-align: center;
  
  p {
    font-size: 0.625rem;
    font-weight: 900;
    color: #f59e0b;
    text-transform: uppercase;
  }
`;

/* Danger Zone */
export const DangerZone = styled.div`
  padding: 2rem;
  background-color: rgba(244, 63, 94, 0.1);
  border: 1px solid rgba(244, 63, 94, 0.2);
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  h4 {
    color: #f43f5e;
    font-weight: 900;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.625rem;
  font-weight: 900;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.danger ? css`
    background-color: rgba(244, 63, 94, 0.2);
    color: #f43f5e;
    border: 1px solid rgba(244, 63, 94, 0.2);
    &:hover { background-color: #f43f5e; color: white; }
  ` : css`
    background-color: rgba(255, 255, 255, 0.05);
    color: #64748b;
    border: 1px solid rgba(51, 65, 85, 0.5);
    &:hover { background-color: rgba(255, 255, 255, 0.1); }
  `}
`;
