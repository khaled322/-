
import React, { useState } from 'react';
import NewOrdersForm from './components/NewOrdersForm';
import OldOrdersForm from './components/OldOrdersForm';
import DataViewer from './components/DataViewer';
import type { NewOrdersData, OldOrdersData, OrderData } from './types';

function App() {
  const [allOrders, setAllOrders] = useState<OrderData[]>([]);

  const handleSaveNewOrders = (data: NewOrdersData) => {
    setAllOrders(prev => [...prev, data]);
  };

  const handleSaveOldOrders = (data: OldOrdersData) => {
    setAllOrders(prev => [...prev, data]);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400">منصة تتبع الطلبيات</h1>
          <p className="text-slate-400 mt-2 text-lg">للمؤكدة: املئي البيانات يوميًا وحفظيها</p>
        </header>

        <main className="grid grid-cols-1 gap-8">
          <NewOrdersForm onSave={handleSaveNewOrders} />
          <OldOrdersForm onSave={handleSaveOldOrders} />
          <DataViewer allOrders={allOrders} />
        </main>
        
        <footer className="text-center mt-12 text-slate-500">
          <p>&copy; {new Date().getFullYear()} - منصة تتبع الطلبيات</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
