import React from 'react';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'primary' | 'horizontal' | 'vertical' | 'icon-only';
  themeVariant?: 'light' | 'dark' | 'monochrome' | 'transparent';
  width?: string | number;
  height?: string | number;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'primary',
  themeVariant = 'light',
  width,
  height,
  className = '',
  ...props
}) => {
  // Brand Colors
  const primaryColor = '#1976D2'; // Medical Blue
  const secondaryColor = '#2E7D32'; // Healthcare Green
  const accentColor = '#4FC3F7'; // Sky Blue
  const lightColor = '#FFFFFF';
  const darkColor = '#374151'; // Dark Gray
  
  // Theme Color Mappings
  const getColors = () => {
    switch (themeVariant) {
      case 'dark':
        return {
          shield: accentColor,
          cross: lightColor,
          helix: secondaryColor,
          textPrimary: lightColor,
          textSecondary: accentColor,
        };
      case 'monochrome':
        return {
          shield: 'currentColor',
          cross: 'none',
          helix: 'currentColor',
          textPrimary: 'currentColor',
          textSecondary: 'currentColor',
        };
      case 'light':
      case 'transparent':
      default:
        return {
          shield: primaryColor,
          cross: lightColor,
          helix: secondaryColor,
          textPrimary: darkColor,
          textSecondary: primaryColor,
        };
    }
  };

  const colors = getColors();

  // Responsive sizes based on variant
  const getDimensions = () => {
    if (width && height) return { width, height };
    switch (variant) {
      case 'icon-only':
        return { width: 48, height: 48 };
      case 'horizontal':
        return { width: 280, height: 48 };
      case 'vertical':
        return { width: 180, height: 120 };
      case 'primary':
      default:
        return { width: 260, height: 60 };
    }
  };

  const dims = getDimensions();

  // SVG Logo Emblem (Shield + Medical Cross + DNA Helix Helix Segment)
  const renderEmblem = (x: number, y: number, size: number) => (
    <g transform={`translate(${x}, ${y}) scale(${size / 100})`}>
      {/* Outer Shield representing protection, trustworthiness, and enterprise stability */}
      <path
        d="M50 5 C25 5 10 15 10 40 C10 65 30 85 50 95 C70 85 90 65 90 40 C90 15 75 5 50 5 Z"
        fill="none"
        stroke={colors.shield}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Healthcare Cross */}
      <path
        d="M38 50 H62 M50 38 V62"
        stroke={colors.shield}
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* DNA Helix / Pulse Intertwined represent Innovation & Digital Transformation */}
      <path
        d="M20 50 Q35 25 50 50 T80 50"
        fill="none"
        stroke={colors.helix}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M20 50 Q35 75 50 50 T80 50"
        fill="none"
        stroke={colors.shield}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="4 4"
        opacity="0.6"
      />
    </g>
  );

  if (variant === 'icon-only') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={dims.width}
        height={dims.height}
        className={className}
        {...props}
      >
        {renderEmblem(0, 0, 100)}
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <svg
        viewBox="0 0 320 60"
        width={dims.width}
        height={dims.height}
        className={className}
        {...props}
      >
        {renderEmblem(5, 5, 50)}
        <text
          x="65"
          y="32"
          fontFamily="var(--font-display, Poppins, sans-serif)"
          fontWeight="700"
          fontSize="20"
          fill={colors.textPrimary}
          letterSpacing="1"
        >
          MEDOCYN
        </text>
        <text
          x="172"
          y="32"
          fontFamily="var(--font-display, Poppins, sans-serif)"
          fontWeight="300"
          fontSize="20"
          fill={colors.textSecondary}
          letterSpacing="1"
        >
          HEALTHCARE
        </text>
        <text
          x="65"
          y="48"
          fontFamily="var(--font-sans, Inter, sans-serif)"
          fontWeight="500"
          fontSize="8.5"
          fill={colors.textSecondary}
          letterSpacing="1.2"
        >
          ADVANCING HEALTHCARE THROUGH TECHNOLOGY
        </text>
      </svg>
    );
  }

  if (variant === 'vertical') {
    return (
      <svg
        viewBox="0 0 200 140"
        width={dims.width}
        height={dims.height}
        className={className}
        {...props}
      >
        {renderEmblem(65, 5, 70)}
        <text
          x="100"
          y="95"
          textAnchor="middle"
          fontFamily="var(--font-display, Poppins, sans-serif)"
          fontWeight="700"
          fontSize="16"
          fill={colors.textPrimary}
          letterSpacing="1"
        >
          MEDOCYN
        </text>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fontFamily="var(--font-display, Poppins, sans-serif)"
          fontWeight="300"
          fontSize="14"
          fill={colors.textSecondary}
          letterSpacing="1.5"
        >
          HEALTHCARE
        </text>
        <text
          x="100"
          y="128"
          textAnchor="middle"
          fontFamily="var(--font-sans, Inter, sans-serif)"
          fontWeight="500"
          fontSize="7"
          fill={colors.textSecondary}
          letterSpacing="1"
        >
          ADVANCING HEALTHCARE THROUGH TECHNOLOGY
        </text>
      </svg>
    );
  }

  // Default Primary Layout
  return (
    <svg
      viewBox="0 0 300 70"
      width={dims.width}
      height={dims.height}
      className={className}
      {...props}
    >
      {renderEmblem(10, 5, 60)}
      <text
        x="80"
        y="35"
        fontFamily="var(--font-display, Poppins, sans-serif)"
        fontWeight="700"
        fontSize="22"
        fill={colors.textPrimary}
        letterSpacing="1.5"
      >
        MEDOCYN
      </text>
      <text
        x="80"
        y="54"
        fontFamily="var(--font-display, Poppins, sans-serif)"
        fontWeight="300"
        fontSize="15"
        fill={colors.textSecondary}
        letterSpacing="2.5"
      >
        HEALTHCARE
      </text>
    </svg>
  );
};
