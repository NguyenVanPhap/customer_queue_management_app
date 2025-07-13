import React, { useState } from 'react';
import { Customer } from '../types';

interface CustomerFormProps {
  onAddCustomer: (customer: Customer) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onAddCustomer }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement validation logic
    if (!name.trim() || !phone.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    // TODO: Implement logic tạo khách hàng mới
    const newCustomer: Customer = {
      id: Date.now().toString(), // TODO: Tạo ID duy nhất
      name: name.trim(),
      phone: phone.trim(),
      joinTime: new Date(),
      status: 'waiting'
    };

    onAddCustomer(newCustomer);
    setName('');
    setPhone('');
  };

  return (
    <div className="card">
      <h2>Đăng ký khách hàng mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-20">
          <label htmlFor="name">Họ và tên:</label>
          <input
            type="text"
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ và tên"
            required
          />
        </div>
        
        <div className="mb-20">
          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="tel"
            id="phone"
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-success">
          Thêm vào hàng đợi
        </button>
      </form>
    </div>
  );
};

export default CustomerForm; 