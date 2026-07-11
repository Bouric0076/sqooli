"use client";
import { Icon, icons } from 'lucide-react';
import React from 'react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function page() {
    const topTabs = [
        { name: 'New School', href: '/admin/schools', icon: icons.School, current: true },
        { name: 'New Program', href: '/admin/programs', icon: icons.Grid3x3, current: false },
        { name: 'New Partner', href: '/admin/partners', icon: icons.User, current: false },
        { name: 'New Curriculum', href: '/admin/curriculums', icon: icons.BookOpen, current: false },
    ];

const data = [
  { month: "Jan", transactions: 1200 },
  { month: "Feb", transactions: 1800 },
  { month: "Mar", transactions: 1500 },
  { month: "Apr", transactions: 2400 },
  { month: "May", transactions: 2100 },
  { month: "Jun", transactions: 2800 },
  { month: "Jul", transactions: 3200 },
  { month: "Aug", transactions: 2900 },
  { month: "Sep", transactions: 3600 },
  { month: "Oct", transactions: 4100 },
  { month: "Nov", transactions: 3900 },
  { month: "Dec", transactions: 4700 },
];
    return (
        <div className="py-6 px-6 ">
            <div className="flex-1 items-center gap-2 mb-4">
                <h4 className="text-lg font-semibold">Dashboard</h4>
                 <p className="text-sm text-gray-600 font-[480]">Overview of Sqooli Platform</p>
            </div>

            <div className="flex gap-4">
                {topTabs.map((tab) => (
                    <a
                        key={tab.name}
                        href={tab.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium theme-sm-text  bg-blue-50 ${
                            tab.current ? 'bg-blue-200 text-blue-900' : 'theme-text-color  hover:bg-gray-100'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.name}
                    </a>
                ))}
            </div>

            <div className="mt-6">
                <h4 className=" font-semibold">Urgent Actions</h4>
                <div className="flex gap-4 mt-2">
                    <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                        <div className="flex  gap-2">
                        <div className="flex-1 items-center gap-2">
                        <h5 className="font-medium theme-sm-text">Schools-Pending Approval</h5>
                        <p className="text-sm mt-2 text-gray-600 font-bold">20.</p>
                        </div>
                        <div className="flex  gap-1">
                        <h5 className="font-medium theme-sm-text theme-text-color">View</h5>
                          <icons.ArrowRight className="w-4 mt-[2px] h-4 theme-text-color" />
                        </div>
                        </div>
                    </div>

                    <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                        <div className="flex  gap-2">
                        <div className="flex-1 items-center gap-2">
                        <h5 className="font-medium theme-sm-text">Partners-Pending Approval</h5>
                        <p className="text-sm mt-2 text-gray-600 font-bold">30.</p>
                        </div>
                        <div className="flex  gap-1">
                        <h5 className="font-medium theme-sm-text theme-text-color">View</h5>
                          <icons.ArrowRight className="w-4 mt-[2px] h-4 theme-text-color" />
                        </div>
                        </div>
                    </div>

                    <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                        <div className="flex  gap-2">
                        <div className="flex-1 items-center gap-2">
                        <h5 className="font-medium theme-sm-text">Programs-Pending Approval</h5>
                        <p className="text-sm mt-2 text-gray-600 font-bold">5.</p>
                        </div>
                        <div className="flex  gap-1">
                        <h5 className="font-medium theme-sm-text theme-text-color">View</h5>
                          <icons.ArrowRight className="w-4 mt-[2px] h-4 theme-text-color" />
                        </div>
                        </div>
                    </div>

                </div>
            
            </div>

            <div className="mt-6">
                <h4 className=" font-semibold">Revenue Collected</h4>
                <div className="flex-1 gap-4 mt-2 p-4 bg-blue-100 rounded-lg">
                    <p className="theme-sm-text mt-2 text-gray-600 font-normal">Total Revenue Collected - All Time</p>
                    <h4 className="text-sm mt-2 text-gray-600 font-bold">KES 800,000.00</h4>


                 </div>
            </div>



<div className="mt-6">
    <div className="flex  gap-4 ">
        <div className="flex-1 mt-2 p-4 bg-gray-50 rounded-lg">
            <h5 className=" font-bold theme-sm-text">Today</h5>
            <p className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 10,000.00</p>
            <hr className="my-2" />
            <div className="flex justify-between">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Credit</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 5,000.00</h4>
            </div>

            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Lessons</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 75,000.00</h4>
            </div>
            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Subscriptions</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 85,000.00</h4>
            </div>
        </div>



                <div className="flex-1 mt-2 p-4 bg-gray-50 rounded-lg">
            <h5 className=" font-bold theme-sm-text">This Week</h5>
            <p className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 10,000.00</p>
            <hr className="my-2" />
            <div className="flex justify-between">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Credit</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 5,000.00</h4>
            </div>

            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Lessons</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 75,000.00</h4>
            </div>
            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Subscriptions</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 85,000.00</h4>
            </div>
        </div>

                <div className="flex-1 mt-2 p-4 bg-gray-50 rounded-lg">
            <h5 className=" font-bold theme-sm-text">This Month</h5>
            <p className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 10,000.00</p>
            <hr className="my-2" />
            <div className="flex justify-between">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Credit</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 5,000.00</h4>
            </div>

            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Lessons</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 75,000.00</h4>
            </div>
            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Subscriptions</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">KES 85,000.00</h4>
            </div>
        </div>

    </div>
</div>

<div className="bg-white rounded-xl shadow p-6">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-lg font-semibold">Revenue Trend aganist Time</h3>
      <p className="text-sm text-gray-500">
        Total transactions per month
      </p>
    </div>

    <select
      className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
      defaultValue="2026"
    >
      <option value="2026">2026</option>
      <option value="2025">2025</option>
      <option value="2024">2024</option>
      <option value="2023">2023</option>
    </select>
  </div>

  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="transactions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1D3C5B" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
        />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="transactions"
          stroke="#1D3C5B"
          strokeWidth={3}
          fill="url(#transactions)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</div>


<div className="mt-6">
    <h4 className="text-lg font-semibold">Registrations</h4>

    <div className="flex  gap-4 ">
        <div className="flex-1 mt-2 p-4 bg-gray-50 rounded-lg">
            <h5 className=" font-bold theme-sm-text">Schools</h5>
            <p className="text-sm mt-2 text-gray-600 font-normal font-semibold">20</p>
            <hr className="my-2" />
            <div className="flex justify-between">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Active</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">17</h4>
            </div>

            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Inactive</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">3</h4>
            </div>
  
        </div>

        <div className="flex-1 mt-2 p-4 bg-gray-50 rounded-lg">
            <h5 className=" font-bold theme-sm-text">Tutors</h5>
            <p className="text-sm mt-2 text-gray-600 font-normal font-semibold">20</p>
            <hr className="my-2" />
            <div className="flex justify-between">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Active</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">17</h4>
            </div>

            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Inactive</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">3</h4>
            </div>
  
        </div>


        <div className="flex-1 mt-2 p-4 bg-gray-50 rounded-lg">
            <h5 className=" font-bold theme-sm-text">Students</h5>
            <p className="text-sm mt-2 text-gray-600 font-normal font-semibold">20</p>
            <hr className="my-2" />
            <div className="flex justify-between">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Active</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">17</h4>
            </div>

            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Inactive</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">3</h4>
            </div>
  
        </div>

                <div className="flex-1 mt-2 p-4 bg-gray-50 rounded-lg">
            <h5 className=" font-bold theme-sm-text">Partners</h5>
            <p className="text-sm mt-2 text-gray-600 font-normal font-semibold">20</p>
            <hr className="my-2" />
            <div className="flex justify-between">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Active</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">17</h4>
            </div>

            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Inactive</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">3</h4>
            </div>
  
        </div>


                <div className="flex-1 mt-2 p-4 bg-gray-50 rounded-lg">
            <h5 className=" font-bold theme-sm-text">Programs</h5>
            <p className="text-sm mt-2 text-gray-600 font-normal font-semibold">20</p>
            <hr className="my-2" />
            <div className="flex justify-between">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Active</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">17</h4>
            </div>

            <div className="flex justify-between mt-2">
                <h4 className=" font-semibold theme-sm-text text-shadow-emerald-50">Inactive</h4>
                <h4 className="text-sm mt-2 text-gray-600 font-normal font-semibold">3</h4>
            </div>
  
        </div>



        </div>



<div className="mt-6 bg-gray-100 rounded p-4">
    <h4 className="text-lg font-semibold">Revenue Leaderboard by School</h4>
    <div className="flex gap-4 mt-2 p-4 ">
        <h4>3.3B</h4>
        <h4>Swiftcode School</h4>
    </div>
      <div className=" mx-4 bg-gray-200 rounded-full  overflow-hidden">
        <div className="bg-[#1D3C5B] h-2 rounded-full " style={{ width: "25%" }} />
     </div>
    
</div>










    </div>

















        </div>
    );
}

export default page;