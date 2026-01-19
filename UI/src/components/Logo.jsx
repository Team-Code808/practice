import React from 'react';
import logoSrc from '../Logo.png';
import * as S from './Logo.styles';

const Logo = ({
  className = "",
  size = 40,
  showText = false,
  textColor // Expecting a hex code or color string now, effectively. But to support prop passing, we might just use style or refactor usages.
  // Actually, previous usage passed tailwind class "text-slate-900". Now we should pass color hex.
  // But to minimize breakage, I'll default to dark if not provided, or handle "text-white" string if passed.
}) => {
  // Simple helper to map common tailwind text colors to hex if needed, 
  // or just expect the parent to pass a color. 
  // For now, let's assume if it contains 'white', it's white, otherwise slate-900.
  let color = '#0f172a';
  if (textColor && textColor.includes('white')) color = 'white';
  if (textColor && textColor.includes('slate-200')) color = '#e2e8f0';

  return (
    <S.LogoContainer className={className}>
      <S.LogoImage
        src={logoSrc}
        alt="Calm Desk Logo"
        style={{ width: size, height: size }}
      />
      {showText && (
        <S.LogoText color={color}>
          Calm Desk
        </S.LogoText>
      )}
    </S.LogoContainer>
  );
};

export default Logo;
