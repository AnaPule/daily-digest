import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  position?: 'bottom' | 'top' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content, 
  position = 'bottom' 
}) => {
  const tooltipClass = position === 'bottom' ? 'tooltip' : `tooltip tooltip-${position}`;
  
  return (
    <div className="tooltip-container">
      {children}
      <div className={tooltipClass}>
        {content}
      </div>
    </div>
  );
};
export default Tooltip;