import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data for charts
const lineData = [
  { name: 'Jan', accuracy: 85, latency: 120 },
  { name: 'Feb', accuracy: 87, latency: 115 },
  { name: 'Mar', accuracy: 89, latency: 110 },
  { name: 'Apr', accuracy: 91, latency: 105 },
  { name: 'May', accuracy: 93, latency: 100 },
  { name: 'Jun', accuracy: 95, latency: 95 },
];

const barData = [
  { name: 'OpenAI', requests: 1200, cost: 45 },
  { name: 'Anthropic', requests: 800, cost: 32 },
  { name: 'Google', requests: 600, cost: 28 },
  { name: 'Local', requests: 400, cost: 5 },
];

const pieData = [
  { name: 'Text Processing', value: 35, color: '#3B82F6' },
  { name: 'Embedding', value: 25, color: '#10B981' },
  { name: 'Vector Search', value: 20, color: '#F59E0B' },
  { name: 'LLM Generation', value: 20, color: '#EF4444' },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function AccuracyChart() {
  return (
    <ChartCard title="Model Accuracy Over Time">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function LatencyChart() {
  return (
    <ChartCard title="Response Latency (ms)">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="latency"
            stroke="#EF4444"
            fill="#FEE2E2"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function UsageChart() {
  return (
    <ChartCard title="API Usage by Provider">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="requests" fill="#3B82F6" />
          <Bar yAxisId="right" dataKey="cost" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ResourceChart() {
  return (
    <ChartCard title="Resource Distribution">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default function Charts() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccuracyChart />
        <LatencyChart />
        <UsageChart />
        <ResourceChart />
      </div>
    </div>
  );
}
