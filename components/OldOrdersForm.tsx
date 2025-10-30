
import React, { useState } from 'react';
import Card from './Card';
import type { OldOrdersData } from '../types';

interface OldOrdersFormProps {
  onSave: (data: OldOrdersData) => void;
}

const OldOrdersForm: React.FC<OldOrdersFormProps> = ({ onSave }) => {
    const [unanswered, setUnanswered] = useState('');
    const [attempts, setAttempts] = useState('1');
    const [canceled, setCanceled] = useState('');
    const [reasons, setReasons] = useState('');
    const [solutions, setSolutions] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSave = () => {
        const data: OldOrdersData = {
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date(),
            type: 'سابقة',
            unanswered: parseInt(unanswered) || 0,
            attempts,
            canceled: parseInt(canceled) || 0,
            reasons: reasons.split('\n').filter(r => r.trim() !== ''),
            solutions: solutions.split('\n').filter(s => s.trim() !== '')
        };
        onSave(data);
        setSuccessMessage('تم حفظ الطلبيات السابقة بنجاح!');
        
        // Reset form
        setUnanswered('');
        setAttempts('1');
        setCanceled('');
        setReasons('');
        setSolutions('');
        
        setTimeout(() => setSuccessMessage(''), 3000);
    };

  return (
    <Card title="الطلبيات السابقة">
      <div className="space-y-6">
        <div>
          <label htmlFor="unansweredOrders" className="block text-slate-300 mb-2 font-medium">عدد الطلبيات التي لم يرد عليها الزبون:</label>
          <input type="number" id="unansweredOrders" min="0" placeholder="0" value={unanswered} onChange={e => setUnanswered(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
        </div>

        <div>
          <label htmlFor="attempts" className="block text-slate-300 mb-2 font-medium">عدد المحاولات (لكل طلبية):</label>
          <select id="attempts" value={attempts} onChange={e => setAttempts(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
            <option value="1">مرة واحدة</option>
            <option value="2">مرتين</option>
            <option value="3">ثلاث مرات</option>
          </select>
        </div>

        <div>
          <label htmlFor="oldCanceledOrders" className="block text-slate-300 mb-2 font-medium">عدد الطلبيات الملغاة اليوم:</label>
          <input type="number" id="oldCanceledOrders" min="0" placeholder="0" value={canceled} onChange={e => setCanceled(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
        </div>

        <div>
          <label htmlFor="oldCanceledReasons" className="block text-slate-300 mb-2 font-medium">أسباب الإلغاء:</label>
          <textarea id="oldCanceledReasons" rows={3} placeholder="غير متوفر&#10;تأخر التوصيل" value={reasons} onChange={e => setReasons(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition"></textarea>
        </div>

        <div>
          <label htmlFor="solutions" className="block text-slate-300 mb-2 font-medium">الحل (ما فعلتِ):</label>
          <textarea id="solutions" rows={3} placeholder="أرسلت واتساب&#10;أعدت الاتصال غدًا" value={solutions} onChange={e => setSolutions(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition"></textarea>
        </div>
        
        {successMessage && <div className="text-green-400 text-center font-semibold p-3 bg-green-900/50 rounded-md">{successMessage}</div>}

        <button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-md transition text-lg">
          حفظ الطلبيات السابقة
        </button>
      </div>
    </Card>
  );
};

export default OldOrdersForm;
