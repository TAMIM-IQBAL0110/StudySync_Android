import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utilities/axiosInstance.js';
import { API_PATH } from '../../utilities/apiPath.js';
import { FiActivity, FiCalendar, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import PerformanceGraph from '../../AnalysisGraph/PerformanceGraph.jsx';
import CategoryPieChart from '../../AnalysisGraph/CategoryPieChart.jsx';
import DailyBarChart from '../../AnalysisGraph/DailyBarChart.jsx';

const Analysis = () => {
  const [nDays, setNDays] = useState(30);
  const [data, setData] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalysisData = async () => {
    setLoading(true);
    try {
      const [dashboardRes, tasksRes] = await Promise.all([
        axiosInstance.get(API_PATH.DASHBOARD.GET_DATA),
        axiosInstance.get(API_PATH.TASK.GET_ALL_TASK)
      ]);
      
      if (dashboardRes.data.success) {
        setData(dashboardRes.data);
        console.log("Dashboard data:", dashboardRes.data);
      }
      
      if (tasksRes.data.tasks) {
        setAllTasks(tasksRes.data.tasks);
        console.log("All tasks:", tasksRes.data.tasks);
      }
    } catch (err) {
      console.error("Analysis Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const filterTasks = (tasks) => {
    if (!tasks || !Array.isArray(tasks)) return [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - nDays);
    return tasks.filter(task => {
      if (!task.date) return false;
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate >= cutoff;
    });
  };

  // Improved UI for the Timeframe Selector
  const TimeFilter = () => (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all" style={{ backgroundColor: 'oklch(1 0.03 245)', borderColor: 'oklch(0.85 0.03 245)' }}>
      <FiCalendar size={14} style={{ color: 'oklch(0.4 0.1 245)' }} />
      <select 
        value={nDays} 
        onChange={(e) => setNDays(Number(e.target.value))}
        className="outline-none bg-transparent text-xs font-bold cursor-pointer appearance-none pr-1"
        style={{ color: 'oklch(0.15 0.06 245)' }}
      >
        <option value={7}>Last 7 Days</option>
        <option value={30}>Last 30 Days</option>
        <option value={90}>Last 3 Months</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-8" style={{ backgroundColor: 'oklch(0.96 0.03 245)' }}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-2 md:gap-4">
        <div>
          <h1 className="text-xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2" style={{ color: 'oklch(0.15 0.06 245)' }}>
            <span className="p-1.5 md:p-2 rounded-lg text-white shadow-lg" style={{ backgroundColor: 'oklch(0.4 0.1 245)' }}>
                <FiActivity size={18} className="md:w-6 md:h-6" />
            </span>
            <span className="text-lg md:text-3xl">Analytics Overview</span>
          </h1>
          <p className="mt-1 ml-7 md:ml-12 font-medium text-xs md:text-sm" style={{ color: 'oklch(0.4 0.06 245)' }}>Tracking your productivity trends</p>
        </div>
        <TimeFilter />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 md:py-32 gap-4">
          <div className="w-10 md:w-12 h-10 md:h-12 border-4 rounded-full animate-spin" style={{ borderColor: 'oklch(0.85 0.03 245)', borderTopColor: 'oklch(0.4 0.1 245)' }}></div>
          <p className="font-semibold animate-pulse text-base md:text-lg" style={{ color: 'oklch(0.4 0.06 245)' }}>Generating Insights...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          
          {/* Top Row: Pie Charts (Categories) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div className="group transition-transform duration-300 hover:-translate-y-1">
                <CategoryPieChart 
                  title="Completed Tasks by Category" 
                  tasks={filterTasks(allTasks.filter(t => t.status === 'Completed'))} 
                  colorScheme="greens"
                />
            </div>
            <div className="group transition-transform duration-300 hover:-translate-y-1">
                <CategoryPieChart 
                  title="Pending Tasks by Category" 
                  tasks={filterTasks(allTasks.filter(t => t.status === 'Pending'))} 
                  colorScheme="oranges"
                />
            </div>
          </div>

          {/* Middle Row: Performance Graph (Full Width Card) */}
          <div className="rounded-2xl shadow-lg" style={{ backgroundColor: 'oklch(1 0.03 245)' }}>
            <div className="p-3 md:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 md:mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg text-white" style={{ backgroundColor: 'oklch(0.4 0.1 245)' }}>
                    <FiTrendingUp size={18} className="md:w-5 md:h-5" />
                  </div>
                  <h3 className="text-sm md:text-lg lg:text-xl font-bold" style={{ color: 'oklch(0.15 0.06 245)' }}>
                    {nDays === 7 ? '7-Day' : nDays === 30 ? '30-Day' : '90-Day'} Performance Trend
                  </h3>
                </div>
                {/* Legend */}
                <div className="flex gap-2 sm:gap-4 text-xs md:text-sm p-2 md:p-3 rounded-lg w-full sm:w-auto" style={{ backgroundColor: 'white' }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: 'oklch(0.5 0.06 160)' }}></div>
                    <span style={{ color: 'oklch(0.4 0.06 245)' }}>Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: 'oklch(0.5 0.06 100)' }}></div>
                    <span style={{ color: 'oklch(0.4 0.06 245)' }}>Pending</span>
                  </div>
                </div>
              </div>
              <div className="h-72 md:h-96 lg:h-full w-full" style={{ minHeight: '400px' }}>
                {data?.last30DaysPerformance && data.last30DaysPerformance.length > 0 ? (
                  <PerformanceGraph 
                    Performance={data?.last30DaysPerformance || []} 
                    nDays={nDays} 
                  />
                ) : (
                  <div className="rounded-xl p-6 flex items-center justify-center h-full" style={{ backgroundColor: 'oklch(0.96 0.03 245)' }}>
                    <p style={{ color: 'oklch(0.4 0.06 245)' }} className="italic">No performance data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          

          {/* Bottom Row: Bar Chart */}
          <div className="rounded-2xl shadow-lg overflow-hidden" style={{ backgroundColor: 'oklch(1 0.03 245)' }}>
             <div className="p-3 md:p-4 lg:p-6">
               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg text-white" style={{ backgroundColor: 'oklch(0.5 0.06 160)' }}><FiCheckCircle size={18} className="md:w-5 md:h-5" /></div>
                      <h3 className="text-sm md:text-lg lg:text-xl font-bold" style={{ color: 'oklch(0.15 0.06 245)' }}>Daily Completion Volume</h3>
                  </div>
                  {/* Legend - Parallel to title */}
                  <div className="flex gap-2 sm:gap-4 text-xs md:text-sm p-2 md:p-3 rounded-lg w-full sm:w-auto" style={{ backgroundColor: 'white' }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: 'oklch(0.5 0.06 160)' }}></div>
                      <span style={{ color: 'oklch(0.4 0.06 245)' }}>Completed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: '#f97316' }}></div>
                      <span style={{ color: 'oklch(0.4 0.06 245)' }}>Pending</span>
                    </div>
                  </div>
               </div>
               <div className="h-60 md:h-80 lg:h-96 w-full">
                  {data?.last30DaysPerformance && data.last30DaysPerformance.length > 0 ? (
                    <DailyBarChart 
                      data={data.last30DaysPerformance.slice(-nDays)} 
                      title="Daily Completion Volume"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full rounded-xl" style={{ backgroundColor: 'oklch(0.96 0.03 245)' }}>
                      <p style={{ color: 'oklch(0.4 0.06 245)' }} className="italic">No performance data available</p>
                    </div>
                  )}
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;