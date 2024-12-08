import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalTeams: number;
}

interface ChartData {
  name: string;
  value: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProjects: 0,
    totalTeams: 0
  });
  
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch total counts
      const [usersRes, projectsRes, teamsRes] = await Promise.all([
        axios.get('http://localhost:3500/users'),
        axios.get('http://localhost:3500/projects'),
        axios.get('http://localhost:3500/team')
      ]);

      setStats({
        totalUsers: usersRes.data.length,
        totalProjects: projectsRes.data.length,
        totalTeams: teamsRes.data.length
      });

      // Set recent users
      setRecentUsers(usersRes.data.slice(0, 5));

      // Generate sample chart data (replace with real data later)
      const data = Array.from({ length: 30 }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 100)
      }));
      setChartData(data);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total Users</span>
            <span className="text-2xl font-bold">{stats.totalUsers}</span>
            <span className="text-xs text-green-500">↑ 12% from last month</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total Projects</span>
            <span className="text-2xl font-bold">{stats.totalProjects}</span>
            <span className="text-xs text-green-500">↑ 8% from last month</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total Teams</span>
            <span className="text-2xl font-bold">{stats.totalTeams}</span>
            <span className="text-xs text-green-500">↑ 15% from last month</span>
          </div>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Activity Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
