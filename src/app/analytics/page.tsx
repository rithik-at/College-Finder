import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

export const metadata = {
  title: 'Analytics Dashboard - CollegeHub',
  description: 'Deep dive into placement statistics, ROI, and college distributions.',
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-[#1e3a5f] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Advanced Analytics
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl text-center">
            Track placement trends, compare ROI, and explore college data with interactive visualizations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
