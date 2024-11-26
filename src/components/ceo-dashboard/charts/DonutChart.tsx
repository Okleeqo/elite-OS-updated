import React from 'react';

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  total: number;
}

export function DonutChart({ data, total }: DonutChartProps) {
  let cumulativePercent = 0;

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {data.map((item, i) => {
          if (total === 0) return null;
          
          const percent = (item.value / total) * 100;
          const startAngle = (cumulativePercent * 3.6) * (Math.PI / 180);
          const endAngle = ((cumulativePercent + percent) * 3.6) * (Math.PI / 180);
          
          const x1 = 50 + 40 * Math.cos(startAngle);
          const y1 = 50 + 40 * Math.sin(startAngle);
          const x2 = 50 + 40 * Math.cos(endAngle);
          const y2 = 50 + 40 * Math.sin(endAngle);
          
          const largeArcFlag = percent > 50 ? 1 : 0;
          
          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`
          ].join(' ');
          
          cumulativePercent += percent;
          
          return (
            <path
              key={i}
              d={pathData}
              className={`${item.color} hover:opacity-90 transition-opacity`}
              stroke="white"
              strokeWidth="1"
            />
          );
        })}
        <circle cx="50" cy="50" r="25" fill="white" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold">{formatCompactNumber(total)}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>
    </div>
  );
}

function formatCompactNumber(num: number) {
  if (num >= 1e6) return `${Math.round(num / 1e6)}M`;
  if (num >= 1e3) return `${Math.round(num / 1e3)}K`;
  return Math.round(num).toString();
}