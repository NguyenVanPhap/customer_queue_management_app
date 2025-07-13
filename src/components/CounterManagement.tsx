import React from 'react';
import { Counter, Customer } from '../types';

interface CounterManagementProps {
  counters: Counter[];
  onAddCounter: () => void;
  onRemoveCounter: (id: number) => void;
  onServeCustomer: (counterId: number) => void;
  onCompleteService: (counterId: number) => void;
  waitingCustomers: Customer[];
}

const CounterManagement: React.FC<CounterManagementProps> = ({
  counters,
  onAddCounter,
  onRemoveCounter,
  onServeCustomer,
  onCompleteService,
  waitingCustomers
}) => {
  // TODO: Implement logic format thời gian
 const formatTime = (date?: Date) => {
    console.log(date);
    if (!date) return '---';
    return new Date(date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  // TODO: Implement logic tính thời gian phục vụ
  const getServiceTime = (serviceTime: Date) => {
    const now = new Date();
    const diff = now.getTime() - serviceTime.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    return minutes < 1 ? 'Dưới 1 phút' : `${minutes} phút`;
  };

  return (
    <div className="card">
      <div className="flex-between mb-20">
        <h2>Quản lý quầy phục vụ</h2>
        <button className="btn btn-success" onClick={onAddCounter}>
          Thêm quầy
        </button>
      </div>

      <div className="grid">
        {counters.map((counter) => (
          <div key={counter.id} className="queue-item">
            <div className="flex-between mb-20">
              <div className="flex">
                <div className={`counter ${counter.currentCustomer ? 'busy' : 'free'}`}>
                  {counter.id}
                </div>
                <div>
                  <h3>Quầy {counter.id}</h3>
                  <p>Trạng thái: {counter.currentCustomer ? 'Đang phục vụ' : 'Rảnh'}</p>
                  <p>Đã phục vụ: {counter.totalServed} khách</p>
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => onRemoveCounter(counter.id)}
                disabled={counter.currentCustomer !== undefined}
              >
                Xóa quầy
              </button>
            </div>

            {counter.currentCustomer ? (
              <div className="queue-item serving">
                <h4>Đang phục vụ:</h4>
                <p><strong>{counter.currentCustomer.name}</strong></p>
                <p>SĐT: {counter.currentCustomer.phone}</p>
                <p>Bắt đầu: {formatTime(counter.currentCustomer.serviceTime!)}</p>
                <p>Thời gian phục vụ: {getServiceTime(counter.currentCustomer.serviceTime!)}</p>
                <button
                  className="btn btn-success"
                  onClick={() => onCompleteService(counter.id)}
                >
                  Hoàn thành
                </button>
              </div>
            ) : (
              <div>
                <p>Quầy rảnh</p>
                <button
                  className="btn"
                  onClick={() => onServeCustomer(counter.id)}
                  disabled={waitingCustomers.length === 0}
                >
                  Phục vụ khách tiếp theo
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {counters.length === 0 && (
        <p className="text-center">Chưa có quầy nào. Hãy thêm quầy để bắt đầu phục vụ.</p>
      )}
    </div>
  );
};

export default CounterManagement; 