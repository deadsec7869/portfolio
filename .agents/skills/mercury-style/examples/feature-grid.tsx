import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  metric,
  metricLabel,
}) => {
  return (
    // Level 1 Elevation: Graphite Card (#1e1e2a), 12px radius, 32px padding, no shadow, no border
    <div className="bg-[#1e1e2a] rounded-[12px] p-8 flex flex-col justify-between border-0 shadow-none transition-transform hover:-translate-y-0.5 duration-200">
      <div>
        {/* Heading: 28px arcadiaDisplay, weight 480, tracking 0.015em */}
        <h3 className="text-[#ededf3] text-[28px] font-[480] leading-[1.2] tracking-[0.015em] mb-4 font-['arcadiaDisplay',sans-serif]">
          {title}
        </h3>
        {/* Body: 16px arcadia, weight 400, line-height 1.5, Ivory text */}
        <p className="text-[#c3c3cc] text-[16px] font-[400] leading-[1.5] font-['arcadia',sans-serif]">
          {description}
        </p>
      </div>

      {metric && (
        <div className="mt-8 pt-6 border-t border-[#70707d]/20 flex items-baseline justify-between">
          <span className="text-[21px] font-[480] text-[#ededf3] font-['arcadiaDisplay',sans-serif]">
            {metric}
          </span>
          {metricLabel && (
            <span className="text-[12px] font-[480] text-[#c3c3cc] tracking-[0.01em]">
              {metricLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const MercuryFeatureGrid: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      title: 'Automated Treasury',
      description: 'Deploy idle working capital into short-term US Treasury bills and government money market funds effortlessly.',
      metric: '5.02% APY',
      metricLabel: 'Net annualized yield',
    },
    {
      title: 'Multi-Entity Accounts',
      description: 'Manage multiple subsidiaries, hold parent funds, and toggle permissions under a unified security architecture.',
      metric: 'Up to $5M',
      metricLabel: 'FDIC insurance coverage',
    },
    {
      title: 'Precision Controls',
      description: 'Issue virtual and physical corporate credit cards with customizable category limits and real-time approval rules.',
      metric: '0.00s',
      metricLabel: 'Instant rule syncing',
    },
  ];

  return (
    // Canvas: Onyx Canvas (#171721), 72px vertical padding rhythm, 1200px max width
    <section className="bg-[#171721] text-[#ededf3] py-[72px] px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="mb-14 max-w-[720px]">
          <span className="text-[14px] font-[480] text-[#c3c3cc] tracking-[0.02em] uppercase mb-3 block">
            Core Infrastructure
          </span>
          <h2 className="text-[42px] font-[480] leading-[1.15] tracking-[0.01em] text-[#ededf3] font-['arcadiaDisplay',sans-serif]">
            Engineered for stability. Calibrated for scale.
          </h2>
        </div>

        {/* 3-Column Graphite Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MercuryFeatureGrid;

