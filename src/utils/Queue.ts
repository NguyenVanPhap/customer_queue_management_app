import { Customer } from '../types';

export class Queue {
  private items: Customer[] = [];

  // Thêm khách hàng vào cuối hàng đợi
  enqueue(customer: Customer): void {
    this.items.push(customer);
  }

  // Lấy khách hàng đầu tiên ra khỏi hàng đợi (FIFO)
  dequeue(): Customer | undefined {
    return this.items.shift();
  }

  // Xem khách hàng đầu tiên mà không lấy ra
  peek(): Customer | undefined {
    return this.items[0];
  }

  // Kiểm tra hàng đợi có rỗng không
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Lấy số lượng khách hàng trong hàng đợi
  size(): number {
    return this.items.length;
  }

  // Lấy tất cả khách hàng trong hàng đợi
  getAll(): Customer[] {
    return [...this.items];
  }

  // Tìm khách hàng theo ID
  findById(id: string): Customer | undefined {
    return this.items.find(customer => customer.id === id);
  }

  // Xóa khách hàng theo ID
  removeById(id: string): boolean {
    const index = this.items.findIndex(customer => customer.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  // Xóa tất cả khách hàng
  clear(): void {
    this.items = [];
  }
} 