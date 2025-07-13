import React from 'react';
import { Customer } from '../types';

interface QueueDisplayProps {
  customers: Customer[];
  onRemoveCustomer: (id: string) => void;
}

const QueueDisplay: React.FC<QueueDisplayProps> = ({ customers, onRemoveCustomer }) => {
  // TODO: Implement logic format thời gian
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  // TODO: Implement logic tính thời gian chờ
  const getWaitTime = (joinTime: Date) => {
    const now = new Date();
    const diff = now.getTime() - joinTime.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    return minutes < 1 ? 'Dưới 1 phút' : `${minutes} phút`;
  };

  return (
    <div className="card">
      <div className="flex-between mb-20">
        <h2>Hàng đợi khách hàng</h2>
        <span className="stat-number">{customers.length}</span>
      </div>
      
      {customers.length === 0 ? (
        <p className="text-center">Không có khách hàng nào trong hàng đợi</p>
      ) : (
        <div>
          {customers.map((customer, index) => (
            <div key={customer.id} className="queue-item">
              <div className="flex-between">
                <div className="flex">
                  <div className="counter">{index + 1}</div>
                  <div>
                    <h3>{customer.name}</h3>
                    <p>SĐT: {customer.phone}</p>
                    <p>Thời gian đăng ký: {formatTime(customer.joinTime)}</p>
                    <p>Thời gian chờ: {getWaitTime(customer.joinTime)}</p>
                  </div>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => onRemoveCustomer(customer.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueueDisplay; 