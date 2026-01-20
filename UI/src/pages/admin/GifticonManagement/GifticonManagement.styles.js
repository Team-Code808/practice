import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  color: #f8fafc;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const BulkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.variant === 'activate'
        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const ItemCard = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  transition: all 0.2s;
  overflow: hidden;

  /* Inactive styling override */
  ${props => !props.active && `
    border-color: rgba(148, 163, 184, 0.2);
    background: rgba(15, 23, 42, 0.8);
    opacity: 0.8;
  `}
`;

export const ItemImage = styled.div`
  width: 100%;
  height: 160px;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  margin-bottom: 0.5rem;
  
  ${props => !props.active && `
    filter: grayscale(100%);
    opacity: 0.5;
  `}
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.25rem;
`;

export const ItemPrice = styled.p`
  color: #94a3b8;
  font-size: 0.95rem;

  span {
    color: #fbbf24;
    font-weight: 600;
  }
`;

export const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
`;

export const StatusBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: ${props => props.active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(148, 163, 184, 0.1)'};
  color: ${props => props.active ? '#4ade80' : '#94a3b8'};
`;

export const ToggleButton = styled.button`
  position: relative;
  width: 48px;
  height: 24px;
  background: ${props => props.active ? '#4f46e5' : '#334155'};
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: left 0.2s;
  }
`;
