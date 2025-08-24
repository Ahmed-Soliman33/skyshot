import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useLanguage } from "../hooks/useLanguage";

const Chart = ({
  type = "line",
  data = [],
  dataKey,
  xAxisKey = "name",
  color = "#032747",
  height = 300,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  gradient = false,
  loading = false,
  className = "",
}) => {
  const { formatNumber, isRTL } = useLanguage();

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${formatNumber(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div
        className={`rounded-xl bg-white p-6 ${className}`}
        style={{ height }}
      >
        <div className="animate-pulse">
          <div className="mb-4 h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-end space-x-2 rtl:space-x-reverse"
              >
                <div
                  className="h-8 w-full rounded bg-gray-200"
                  style={{ height: `${Math.random() * 100 + 20}px` }}
                ></div>
                <div
                  className="h-12 w-full rounded bg-gray-200"
                  style={{ height: `${Math.random() * 100 + 40}px` }}
                ></div>
                <div
                  className="h-6 w-full rounded bg-gray-200"
                  style={{ height: `${Math.random() * 100 + 30}px` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            )}
            {showXAxis && (
              <XAxis dataKey={xAxisKey} stroke="#666" fontSize={12} />
            )}
            {showYAxis && (
              <YAxis stroke="#666" fontSize={12} tickFormatter={formatNumber} />
            )}
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fillOpacity={1}
              fill={gradient ? "url(#colorGradient)" : color}
              strokeWidth={2}
            />
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            )}
            {showXAxis && (
              <XAxis dataKey={xAxisKey} stroke="#666" fontSize={12} />
            )}
            {showYAxis && (
              <YAxis stroke="#666" fontSize={12} tickFormatter={formatNumber} />
            )}
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      case "pie": {
        const COLORS = ["#032747", "#001d3d", "#343a40", "#212529", "#6a7282"];
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
          </PieChart>
        );
      }

      default: // line
        return (
          <LineChart {...commonProps}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            )}
            {showXAxis && (
              <XAxis dataKey={xAxisKey} stroke="#666" fontSize={12} />
            )}
            {showYAxis && (
              <YAxis stroke="#666" fontSize={12} tickFormatter={formatNumber} />
            )}
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className={`rounded-xl bg-white p-6 ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
