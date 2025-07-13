import React from 'react';
import { QueueStats } from '../types';

interface StatisticsProps {
  stats: QueueStats;
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  const formatTime = (minutes: number) => {
    if (minutes < 1) return 'Dưới 1 phút';
    if (minutes < 60) return `${Math.round(minutes)} phút`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours} giờ ${remainingMinutes} phút`;
  };

  return (
    <div className="card">
      <h2 className="mb-20">Thống kê hệ thống</h2>
      
      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">{stats.totalWaiting}</div>
          <div className="stat-label">Đang chờ</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.totalServing}</div>
          <div className="stat-label">Đang phục vụ</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{stats.totalCompleted}</div>
          <div className="stat-label">Đã hoàn thành</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{formatTime(stats.averageWaitTime)}</div>
          <div className="stat-label">Thời gian chờ TB</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{formatTime(stats.averageServiceTime)}</div>
          <div className="stat-label">Thời gian phục vụ TB</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 