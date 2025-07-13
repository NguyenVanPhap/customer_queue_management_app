export interface Customer {
  id: string;
  name: string;
  phone: string;
  joinTime: Date;
  serviceTime?: Date;
  endTime?: Date;
  counterId?: number;
  status: 'waiting' | 'serving' | 'completed';
}

export interface Counter {
  id: number;
  isActive: boolean;
  currentCustomer?: Customer;
  totalServed: number;
}

export interface QueueStats {
  totalWaiting: number;
  totalServing: number;
  totalCompleted: number;
  averageWaitTime: number;
  averageServiceTime: number;
}

export interface QueueHistory {
  customer: Customer;
  completedAt: Date;
  waitTime: number;
  serviceTime: number;
} 