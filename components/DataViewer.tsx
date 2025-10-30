
import React, { useState } from 'react';
import Card from './Card';
import type { OrderData, NewOrdersData, OldOrdersData } from '../types';

interface DataViewerProps {
  allOrders: OrderData[];
}

const DataViewer: React.FC<DataViewerProps> = ({ allOrders }) => {
  const [viewDate, setViewDate] = useState('');
  const [displayedData, setDisplayedData] = useState<OrderData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleDisplayData = () => {
    if (!viewDate) {
        alert('الرجاء اختيار تاريخ لعرض البيانات');
        return;
    }
    const filtered = allOrders.filter(order => order.date === viewDate);
    setDisplayedData(filtered);
    setHasSearched(true);
  };
  
  const renderOrderRow = (order: OrderData, index: number) => {
    let details = '';
    if(order.type === 'جديدة'){
        const o = order as NewOrdersData;
        const productsStr = o.products.map(p => `${p.name} (${p.count})`).join(', ');
        details = `منتجات: ${productsStr} | مؤكدة: ${o.confirmed} | ملغاة: ${o.canceled}`;
        if (o.reasons.length > 0) {
            details += ` | الأسباب: ${o.reasons.join(', ')}`;
        }
    } else {
        const o = order as OldOrdersData;
        details = `لم يرد: ${o.unanswered} | محاولات: ${o.attempts} | ملغاة: ${o.canceled}`;
        if (o.reasons.length > 0) {
            details += ` | الأسباب: ${o.reasons.join(', ')}`;
        }
        if (o.solutions.length > 0) {
            details += ` | الحلول: ${o.solutions.join(', ')}`;
        }
    }

    return (
        <tr key={index} className="bg-slate-700/50 border-b border-slate-700">
            <td className="px-4 py-3 font-medium">{order.type}</td>
            <td className="px-4 py-3 text-slate-300">{details}</td>
        </tr>
    );
  }

  return (
    <Card title="عرض بيانات يوم سابق">
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <input type="date" value={viewDate} onChange={e => setViewDate(e.target.value)} className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition flex-grow" />
        <button onClick={handleDisplayData} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md transition">
          عرض البيانات
        </button>
      </div>

      <div id="displayData">
        {hasSearched && (
            <div>
                <h3 className="text-xl font-semibold mb-4 text-center text-slate-300">بيانات يوم: {viewDate}</h3>
                {displayedData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-slate-900 text-slate-300 uppercase text-sm">
                                <tr>
                                    <th className="px-4 py-3">النوع</th>
                                    <th className="px-4 py-3">التفاصيل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime()).map(renderOrderRow)}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-slate-400 py-6 bg-slate-700/30 rounded-lg">لا توجد بيانات مسجلة لهذا اليوم.</p>
                )}
            </div>
        )}
      </div>
    </Card>
  );
};

export default DataViewer;
