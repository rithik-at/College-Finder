'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell
} from 'recharts';
import { formatCurrency, formatLPA } from '@/lib/utils';

type AnalyticsData = {
  colleges: {
    name: string;
    type: string;
    rating: number;
    feesMin: number;
    avgPackage: number;
    placementRate: number;
  }[];
  stateDistribution: { name: string; value: number }[];
  typeDistribution: { name: string; value: number }[];
};

const COLORS = ['#1e3a5f', '#ff7900', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b'];

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(e => console.error(e));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // ROI Scatter Data: X=Fees, Y=Avg Package
  const scatterData = data.colleges.map(c => ({
    name: c.name,
    fees: c.feesMin,
    package: c.avgPackage,
    type: c.type
  })).filter(c => c.package < 40); // Filter out extreme outliers for better chart visibility

  return (
    <div className="space-y-20 animate-fade-in pb-32">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Return on Investment (Fees vs Average Package)</h2>
        <p className="text-gray-500 mb-6 text-center">Compare the annual fees against the average placement packages (LPA).</p>
        <div className="h-[400px] w-full max-w-5xl">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="fees" 
                name="Annual Fees" 
                tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`} 
              />
              <YAxis 
                type="number" 
                dataKey="package" 
                name="Avg Package" 
                tickFormatter={(val) => `${val} LPA`}
              />
              <ZAxis type="category" dataKey="name" name="College" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-xl">
                        <p className="font-bold text-gray-900 mb-2">{data.name}</p>
                        <p className="text-sm text-gray-600">Fees: {formatCurrency(data.fees)}</p>
                        <p className="text-sm text-emerald-600 font-bold">Avg Package: {formatLPA(data.package)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Colleges" data={scatterData} fill="#1e3a5f" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Colleges by State (Top 10)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.stateDistribution} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="value" fill="#ff7900" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">College Types</h2>
          <div className="h-[300px] w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.typeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
