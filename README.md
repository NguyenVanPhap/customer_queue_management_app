# Customer Queue Management System

A React TypeScript application that simulates a customer queue management system at service counters using Queue (FIFO) and Stack (LIFO) data structures.

## 🎯 Application Goals

- **Customer Queue Management**: Customers register and are served in FIFO order
- **Counter System Simulation**: Manage multiple service counters simultaneously
- **Time Tracking**: Calculate waiting time and service time for customers
- **Statistics and Reporting**: Display system performance indicators
- **History Storage**: Track and search service history with LIFO structure

## ⚙️ Data Structures Used

### Queue (FIFO) - Customer Queue
- **Purpose**: Manage list of customers waiting for service
- **Principle**: First In, First Out - Customers who arrive first are served first
- **Operations**: `enqueue()`, `dequeue()`, `peek()`, `size()`, `getAll()`, `findById()`, `removeById()`, `clear()`

### Stack (LIFO) - Service History
- **Purpose**: Store history of customers who have been served
- **Principle**: Last In, First Out - Most recently completed customers viewed first
- **Operations**: `push()`, `pop()`, `getRecent()`, `getAll()`, `findByCustomerId()`, `filterByDate()`, `clear()`

### Array - Counter Management
- **Purpose**: Manage list of service counters
- **Information**: Counter status, currently serving customer, total served count

## 🚀 Technologies Used

### Frontend Framework
- **React 18**: Main UI library with functional components
- **TypeScript 4.9**: Type safety and enhanced development experience
- **React Hooks**: useState, useEffect for state management
