import React, { useState } from 'react';
import { QueueHistory } from '../types';

interface HistoryProps {
  history: QueueHistory[];
  onClearHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Implement logic format thời gian
  const formatTime = (date: Date) => {
    // TODO: Format thời gian theo định dạng Việt Nam
    return date.toLocaleTimeString();
  };

  // TODO: Implement logic format ngày
  const formatDate = (date: Date) => {
    // TODO: Format ngày theo định dạng Việt Nam
    return date.toLocaleDateString();
  };

  // TODO: Implement logic format thời lượng
  const formatDuration = (minutes: number) => {
    // TODO: Chuyển đổi phút thành định dạng thời gian dễ đọc
    return `${minutes} phút`;
  };

  // TODO: Implement logic tìm kiếm
  const filteredHistory = history.filter(item =>
    // TODO: Lọc lịch sử theo từ khóa tìm kiếm
    item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.phone.includes(searchTerm)
  );

  return (
    <div className="card">
      <div className="flex-between mb-20">
        <h2>Lịch sử phục vụ</h2>
        <button className="btn btn-danger" onClick={onClearHistory}>
          Xóa lịch sử
        </button>
      </div>

      <div className="mb-20">
        <input
          type="text"
          className="input"
          placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredHistory.length === 0 ? (
        <p className="text-center">
          {searchTerm ? 'Không tìm thấy kết quả' : 'Chưa có lịch sử phục vụ'}
        </p>
      ) : (
        <div>
          {filteredHistory.slice(0, 20).map((item, index) => (
            <div key={index} className="queue-item">
              <div className="flex-between">
                <div>
                  <h3>{item.customer.name}</h3>
                  <p>SĐT: {item.customer.phone}</p>
                  <p>Quầy: {item.customer.counterId}</p>
                  <p>Hoàn thành: {formatDate(item.completedAt)} {formatTime(item.completedAt)}</p>
                  <p>Thời gian chờ: {formatDuration(item.waitTime)}</p>
                  <p>Thời gian phục vụ: {formatDuration(item.serviceTime)}</p>
                </div>
              </div>
            </div>
          ))}
          
          {filteredHistory.length > 20 && (
            <p className="text-center mt-20">
              Hiển thị 20 kết quả gần nhất. Tổng cộng {filteredHistory.length} kết quả.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default History; 