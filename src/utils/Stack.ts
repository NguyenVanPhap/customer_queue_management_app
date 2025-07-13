import { QueueHistory } from '../types';

export class Stack {
  private items: QueueHistory[] = [];

  // Thêm lịch sử vào đỉnh stack (LIFO)
  push(history: QueueHistory): void {
    this.items.push(history);
  }

  // Lấy lịch sử từ đỉnh stack
  pop(): QueueHistory | undefined {
    return this.items.pop();
  }

  // Xem lịch sử ở đỉnh stack mà không lấy ra
  peek(): QueueHistory | undefined {
    return this.items[this.items.length - 1];
  }

  // Kiểm tra stack có rỗng không
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Lấy số lượng lịch sử trong stack
  size(): number {
    return this.items.length;
  }

  // Lấy tất cả lịch sử trong stack
  getAll(): QueueHistory[] {
    return [...this.items];
  }

  // Lấy lịch sử gần đây nhất (n mục cuối)
  getRecent(n: number): QueueHistory[] {
    return this.items.slice(-n);
  }

  // Tìm lịch sử theo ID khách hàng
  findByCustomerId(customerId: string): QueueHistory | undefined {
    return this.items.find(history => history.customer.id === customerId);
  }

  // Xóa tất cả lịch sử
  clear(): void {
    this.items = [];
  }

  // Lọc lịch sử theo ngày
  filterByDate(date: Date): QueueHistory[] {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    return this.items.filter(history => {
      const historyDate = new Date(history.completedAt);
      historyDate.setHours(0, 0, 0, 0);
      return historyDate.getTime() === targetDate.getTime();
    });
  }
} 