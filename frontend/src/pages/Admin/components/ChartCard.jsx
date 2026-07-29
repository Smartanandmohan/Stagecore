import React, { useState } from 'react';

export const ChartCard = ({
  title,
  subtitle,
  type = 'line', // 'line' | 'bar' | 'donut'
  data, // Optional custom data
  height = 200
}) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Default Mock Data if none provided
  const lineData = data || [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 85 },
    { label: 'Wed', value: 55 },
    { label: 'Thu', value: 110 },
    { label: 'Fri', value: 90 },
    { label: 'Sat', value: 155 },
    { label: 'Sun', value: 135 }
  ];

  const barData = data || [
    { label: 'Jan', value: 140 },
    { label: 'Feb', value: 240 },
    { label: 'Mar', value: 180 },
    { label: 'Apr', value: 320 },
    { label: 'May', value: 260 },
    { label: 'Jun', value: 410 }
  ];

  const donutData = data || [
    { label: 'Tournaments', value: 45, color: '#7C3AED', count: 120 },
    { label: 'Matches', value: 35, color: '#06b6d4', count: 92 },
    { label: 'Sponsors', value: 20, color: '#eab308', count: 15 }
  ];

  // Render Line Chart (smooth curve SVG)
  const renderLineChart = () => {
    const width = 500;
    const svgHeight = 200;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 25;
    const paddingBottom = 30;

    const usableWidth = width - paddingLeft - paddingRight;
    const usableHeight = svgHeight - paddingTop - paddingBottom;

    const maxVal = Math.max(...lineData.map(d => d.value)) * 1.1 || 100;

    // Calculate coordinate points
    const points = lineData.map((d, i) => {
      const x = paddingLeft + (i * usableWidth) / (lineData.length - 1);
      const y = paddingTop + usableHeight - (d.value * usableHeight) / maxVal;
      return [x, y];
    });

    // Generate smooth curve using Monotone Cubic Bezier approximation
    let linePath = '';
    if (points.length > 0) {
      linePath = `M ${points[0][0]} ${points[0][1]}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cp1x = p0[0] + (p1[0] - p0[0]) / 2;
        const cp1y = p0[1];
        const cp2x = p0[0] + (p1[0] - p0[0]) / 2;
        const cp2y = p1[1];
        linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1[0]} ${p1[1]}`;
      }
    }

    // Gradient fill path (closes down to the baseline)
    const baselineY = svgHeight - paddingBottom;
    const areaPath = points.length > 0
      ? `${linePath} L ${points[points.length - 1][0]} ${baselineY} L ${points[0][0]} ${baselineY} Z`
      : '';

    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${svgHeight}`} className="w-full h-auto overflow-visible select-none">
          <defs>
            {/* Area gradient */}
            <linearGradient id="line-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
            </linearGradient>
            {/* Line glow */}
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = paddingTop + ratio * usableHeight;
            const gridVal = Math.round(maxVal * (1 - ratio));
            return (
              <g key={index}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="rgba(255,255,255,0.3)"
                  className="text-[9px] font-bold"
                >
                  {gridVal}
                </text>
              </g>
            );
          })}

          {/* Glowing Area under line */}
          {areaPath && <path d={areaPath} fill="url(#line-area-grad)" />}

          {/* Main Curved Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#7C3AED"
              strokeWidth="2.5"
              filter="url(#glow-filter)"
              strokeLinecap="round"
            />
          )}

          {/* Coordinate Circles & Hover interactive columns */}
          {points.map((p, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g key={i}>
                {/* Vertical cursor indicator line */}
                {isHovered && (
                  <line
                    x1={p[0]}
                    y1={paddingTop}
                    x2={p[0]}
                    y2={baselineY}
                    stroke="rgba(124, 58, 237, 0.3)"
                    strokeDasharray="2 2"
                    strokeWidth="1.5"
                  />
                )}

                {/* Point circle */}
                <circle
                  cx={p[0]}
                  cy={p[1]}
                  r={isHovered ? 5 : 3.5}
                  fill={isHovered ? '#a855f7' : '#7C3AED'}
                  stroke="#050816"
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-150"
                />

                {/* Transparent hover detector column */}
                <rect
                  x={p[0] - usableWidth / (lineData.length * 2)}
                  y={paddingTop}
                  width={usableWidth / (lineData.length - 1)}
                  height={usableHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}

          {/* X Axis labels */}
          {lineData.map((d, i) => {
            const x = paddingLeft + (i * usableWidth) / (lineData.length - 1);
            return (
              <text
                key={i}
                x={x}
                y={svgHeight - 10}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                className="text-[9px] font-bold uppercase tracking-wider"
              >
                {d.label}
              </text>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && (
          <div 
            className="absolute bg-[#0d1127] border border-gaming-purple/40 px-3 py-1.5 rounded-xl text-left pointer-events-none shadow-xl shadow-black/50 transition-all duration-100"
            style={{
              left: `${(points[hoveredIdx][0] / width) * 100}%`,
              top: `${(points[hoveredIdx][1] / svgHeight) * 100 - 25}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">
              {lineData[hoveredIdx].label}
            </div>
            <div className="text-xs font-black text-white">
              {lineData[hoveredIdx].value} registrations
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Bar Chart (custom SVG columns)
  const renderBarChart = () => {
    const width = 500;
    const svgHeight = 200;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 25;
    const paddingBottom = 30;

    const usableWidth = width - paddingLeft - paddingRight;
    const usableHeight = svgHeight - paddingTop - paddingBottom;

    const maxVal = Math.max(...barData.map(d => d.value)) * 1.1 || 100;
    const barSpacing = usableWidth / barData.length;
    const barWidth = barSpacing * 0.45;

    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${svgHeight}`} className="w-full h-auto overflow-visible select-none">
          <defs>
            {/* Bar gradient */}
            <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            {/* Glow filter for bars */}
            <filter id="bar-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = paddingTop + ratio * usableHeight;
            const gridVal = Math.round(maxVal * (1 - ratio));
            return (
              <g key={index}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="rgba(255,255,255,0.3)"
                  className="text-[9px] font-bold"
                >
                  {gridVal}
                </text>
              </g>
            );
          })}

          {/* Render Bars */}
          {barData.map((d, i) => {
            const barHeight = (d.value * usableHeight) / maxVal;
            const x = paddingLeft + i * barSpacing + (barSpacing - barWidth) / 2;
            const y = paddingTop + usableHeight - barHeight;
            const isHovered = hoveredIdx === i;

            return (
              <g key={i}>
                {/* Visual bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill="url(#bar-grad)"
                  filter={isHovered ? 'url(#bar-glow)' : undefined}
                  className="transition-all duration-200"
                  opacity={isHovered ? 1 : 0.8}
                />

                {/* Invisible hover zone */}
                <rect
                  x={paddingLeft + i * barSpacing}
                  y={paddingTop}
                  width={barSpacing}
                  height={usableHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}

          {/* X Axis Labels */}
          {barData.map((d, i) => {
            const x = paddingLeft + i * barSpacing + barSpacing / 2;
            return (
              <text
                key={i}
                x={x}
                y={svgHeight - 10}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                className="text-[9px] font-bold uppercase tracking-wider"
              >
                {d.label}
              </text>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && (
          <div 
            className="absolute bg-[#0d1127] border border-gaming-blue/40 px-3 py-1.5 rounded-xl text-left pointer-events-none shadow-xl shadow-black/50 transition-all duration-100"
            style={{
              left: `${((paddingLeft + hoveredIdx * barSpacing + barSpacing / 2) / width) * 100}%`,
              top: `${((paddingTop + usableHeight - (barData[hoveredIdx].value * usableHeight) / maxVal) / svgHeight) * 100 - 15}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">
              {barData[hoveredIdx].label}
            </div>
            <div className="text-xs font-black text-white">
              {barData[hoveredIdx].value} active users
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Donut Chart (radial ring circular layout)
  const renderDonutChart = () => {
    const total = donutData.reduce((acc, curr) => acc + curr.value, 0);
    const radius = 38;
    const strokeWidth = 8;
    const circ = 2 * Math.PI * radius; // ~238.76

    let accumulatedPercent = 0;

    return (
      <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
        {/* Left Circular Ring */}
        <div className="relative w-36 h-36 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth={strokeWidth}
            />

            {/* Slices */}
            {donutData.map((d, i) => {
              const pct = (d.value / total) * 100;
              const offset = circ - (pct / 100) * circ;
              const rotation = (accumulatedPercent / 100) * 360;
              accumulatedPercent += pct;

              return (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={d.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circ}
                  strokeDashoffset={offset}
                  transform={`rotate(${rotation} 50 50)`}
                  strokeLinecap="round"
                  className="transition-all duration-500 hover:scale-105 origin-center cursor-pointer"
                  title={`${d.label}: ${d.value}%`}
                />
              );
            })}
          </svg>

          {/* Absolute Center Stats */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-black text-white leading-none">227</span>
            <span className="text-[8px] text-gray-500 font-extrabold uppercase tracking-widest mt-1">Total items</span>
          </div>
        </div>

        {/* Right Details Grid */}
        <div className="flex-1 w-full space-y-2.5">
          <div className="grid grid-cols-1 gap-2.5">
            {donutData.map((d, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-2 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-xs font-bold text-gray-200">{d.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-white">{d.count}</span>
                  <span className="text-[9px] text-gray-500 font-bold ml-1.5 uppercase">({d.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col gap-4">
      {/* Header */}
      <div>
        <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
          {title}
        </h4>
        {subtitle && (
          <p className="text-[10px] text-gray-500 font-semibold uppercase mt-0.5 tracking-wider">
            {subtitle}
          </p>
        )}
      </div>

      {/* Chart Body */}
      <div style={{ minHeight: `${height}px` }} className="flex items-center justify-center">
        {type === 'line' && renderLineChart()}
        {type === 'bar' && renderBarChart()}
        {type === 'donut' && renderDonutChart()}
      </div>
    </div>
  );
};
