"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Plus, Minus, RefreshCcw, Download, Upload } from 'lucide-react';
import { Card } from '@repo/ui/card';
import Link from 'next/link';

const mockChartData = [
  { date: '20 FEB', value: 150000 },
  { date: '28 FEB', value: 50000 },
  { date: '7 MAR', value: 30000 },
  { date: '15 MAR', value: 200000 },
  { date: '23 MAR', value: 158793 }
];

const timeFrames = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];

const Dashboard = ({ user }: {
    user : {
        name:string;
        Balance:{
            value:number;
            date:string;
        }[];
    }
}) => {
  return (
    <div className='p-6'>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-purple-700">Good afternoon, {user.name}</h1>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Portfolio Value */}
        <div>
          <h2 className="text-sm text-gray-600 mb-1">Portfolio value</h2>
          <h3 className="text-3xl font-bold">Rs. {(user.Balance[0]?.value||0)/100}</h3>
        </div>

        {/* Chart */}
        <Card className="bg-white p-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={user.Balance.length>1?user.Balance:mockChartData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6B46C1" 
                  strokeWidth={2} 
                  dot={false}
                />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  hide={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Time Frame Selector */}
          <div className="flex justify-center gap-4 mt-4">
            {timeFrames.map(frame => (
              <button
                key={frame}
                className="px-3 py-1 text-sm rounded-full hover:bg-purple-100 text-gray-600 hover:text-purple-700"
              >
                {frame}
              </button>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="flex flex-col items-center p-4 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200">
            <RefreshCcw className="h-6 w-6 mb-1" />
            <span>Convert</span>
          </button>
          <Link className="flex flex-col items-center p-4 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200" href={"/transfer"}>
            <Download className="h-6 w-6 mb-1" />
            <span>Deposit</span>
          </Link>
          <Link className="flex flex-col items-center p-4 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200" href={"/transfer"}>
            <Upload className="h-6 w-6 mb-1" />
            <span>Withdraw</span>
          </Link>
        </div>

        {/* Recurring Buys Card */}
        <Card className="bg-white p-6 flex items-center">
          <div>
            <div className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mb-2">
              New
            </div>
            <h3 className="text-lg font-semibold mb-1">Set up recurring buys</h3>
            <p className="text-gray-600 text-sm">
              Schedule regular crypto purchases to balance market fluctuations.
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">
            Get started
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;