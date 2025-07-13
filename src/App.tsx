import React, { useState } from "react";
import { Customer, Counter, QueueStats, QueueHistory } from "./types";
import { Queue } from "./utils/Queue";
import { Stack } from "./utils/Stack";
import CustomerForm from "./components/CustomerForm";
import QueueDisplay from "./components/QueueDisplay";
import CounterManagement from "./components/CounterManagement";
import Statistics from "./components/Statistics";
import History from "./components/History";

const App: React.FC = () => {
  // TODO: Khởi tạo các state và cấu trúc dữ liệu
  const [queue] = useState(new Queue());
  const [historyStack] = useState(new Stack());
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [history, setHistory] = useState<QueueHistory[]>([]);
  const [nextCounterId, setNextCounterId] = useState(1);

  // TODO: Implement logic tính toán thống kê
  const calculateStats = (): QueueStats => {
    const totalWaiting = customers.filter((c) => c.status === "waiting").length;
    const totalServing = customers.filter((c) => c.status === "serving").length;
    const totalCompleted = history.length;

    // Tính thời gian chờ trung bình (từ history)
    let totalWaitTime = 0;
    let totalServiceTime = 0;
    let completedCount = 0;

    history.forEach((item) => {
      totalWaitTime += item.waitTime;
      totalServiceTime += item.serviceTime;
      completedCount++;
    });

    const averageWaitTime =
      completedCount > 0 ? Math.round(totalWaitTime / completedCount) : 0;
    const averageServiceTime =
      completedCount > 0 ? Math.round(totalServiceTime / completedCount) : 0;

    return {
      totalWaiting,
      totalServing,
      totalCompleted,
      averageWaitTime,
      averageServiceTime,
    };
  };

  // TODO: Implement logic thêm khách hàng mới
  const handleAddCustomer = (customer: Customer) => {
    queue.enqueue(customer);
    setCustomers(queue.getAll());
    console.log("Thêm khách hàng:", customer);
  };

  // TODO: Implement logic xóa khách hàng khỏi hàng đợi
  const handleRemoveCustomer = (id: string) => {
    queue.removeById(id);
    setCustomers(queue.getAll());
    console.log("Xóa khách hàng:", id);
  };

  // TODO: Implement logic thêm quầy mới
  const handleAddCounter = () => {
    const newCounter: Counter = {
      id: nextCounterId,
      isActive: true,
      currentCustomer: undefined,
      totalServed: 0,
    };
    // Thêm quầy mới vào state counters
    setCounters((prevCounters) => [...prevCounters, newCounter]);

    // Tăng ID cho quầy tiếp theo
    setNextCounterId((prevId) => prevId + 1);

    console.log("Thêm quầy mới");
  };

  // TODO: Implement logic xóa quầy
  const handleRemoveCounter = (id: number) => {
    // TODO: Xóa quầy và cập nhật state
    setCounters(counters.filter((p) => p.id != id));
    console.log("Xóa quầy:", id);
  };

  // TODO: Implement logic phục vụ khách hàng
  const handleServeCustomer = (counterId: number) => {
    // TODO: Lấy khách hàng từ queue và gán cho quầy

    let currentCustomer = queue.dequeue();
    if (currentCustomer) {
      currentCustomer.serviceTime = new Date();
      currentCustomer.status = 'serving';

      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === currentCustomer?.id
            ? currentCustomer
            : customer
        )
      );

      setCounters((prev) =>
        prev.map((counter) =>
          counter.id === counterId
            ? { ...counter, currentCustomer: currentCustomer }
            : counter
        )
      );
    }

    console.log("Phục vụ khách tại quầy:", counterId);
  };

  // Implement logic hoàn thành phục vụ
  const handleCompleteService = (counterId: number) => {
    // Tìm quầy cần hoàn thành
    const counter = counters.find(c => c.id === counterId);
    if (!counter || !counter.currentCustomer) {
      console.log('Quầy không tồn tại hoặc không có khách hàng đang phục vụ');
      return;
    }

    const customer = counter.currentCustomer;
    const endTime = new Date();

    // Tính thời gian chờ và phục vụ
    const waitTime = Math.floor((customer.serviceTime!.getTime() - customer.joinTime.getTime()) / (1000 * 60));
    const serviceTime = Math.floor((endTime.getTime() - customer.serviceTime!.getTime()) / (1000 * 60));

    // Tạo lịch sử phục vụ
    const historyItem: QueueHistory = {
      customer: {
        ...customer,
        status: 'completed',
        endTime: endTime
      },
      completedAt: endTime,
      waitTime: waitTime,
      serviceTime: serviceTime
    };

    // Thêm vào history stack
    historyStack.push(historyItem);

    // Cập nhật state
    setHistory(historyStack.getAll());
    setCounters(prevCounters => 
      prevCounters.map(c => 
        c.id === counterId 
          ? { ...c, currentCustomer: undefined, totalServed: c.totalServed + 1 }
          : c
      )
    );

    console.log('Hoàn thành phục vụ tại quầy:', counterId, historyItem);
  };

  // TODO: Implement logic xóa lịch sử
  const handleClearHistory = () => {
    historyStack.clear();   // Xóa toàn bộ lịch sử trong Stack
    setHistory([]);         // Cập nhật state history về rỗng
    console.log("Xóa lịch sử");
  };

  const stats = calculateStats();

  return (
    <div className="container">
      <h1 className="text-center mb-20">
        Hệ thống quản lý hàng đợi khách hàng
      </h1>

      <Statistics stats={stats} />

      <div className="grid">
        <CustomerForm onAddCustomer={handleAddCustomer} />
        <QueueDisplay
          customers={customers.filter((c) => c.status === "waiting")}
          onRemoveCustomer={handleRemoveCustomer}
        />
      </div>

      <CounterManagement
        counters={counters}
        onAddCounter={handleAddCounter}
        onRemoveCounter={handleRemoveCounter}
        onServeCustomer={handleServeCustomer}
        onCompleteService={handleCompleteService}
        waitingCustomers={customers.filter((c) => c.status === "waiting")}
      />

      <History history={history} onClearHistory={handleClearHistory} />
    </div>
  );
};

export default App;
