
import React, { useState, useEffect } from 'react';
import Card from './Card';
import type { NewOrdersData } from '../types';

interface NewOrdersFormProps {
  onSave: (data: NewOrdersData) => void;
}

const NewOrdersForm: React.FC<NewOrdersFormProps> = ({ onSave }) => {
  const [products, setProducts] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState('');
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [confirmedOrders, setConfirmedOrders] = useState('');
  const [canceledOrders, setCanceledOrders] = useState('');
  const [canceledReasons, setCanceledReasons] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = () => {
    if (newProduct.trim() && !products.includes(newProduct.trim())) {
      setProducts([...products, newProduct.trim()]);
      setNewProduct('');
    }
  };

  const handleRemoveProduct = (productToRemove: string) => {
    setProducts(products.filter(p => p !== productToRemove));
    const newCounts = { ...productCounts };
    delete newCounts[productToRemove];
    setProductCounts(newCounts);
  };

  const handleSave = () => {
    const productData = products
        .map(p => ({ name: p, count: productCounts[p] || 0 }))
        .filter(p => p.count > 0);

    const data: NewOrdersData = {
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date(),
      type: 'جديدة',
      products: productData,
      confirmed: parseInt(confirmedOrders) || 0,
      canceled: parseInt(canceledOrders) || 0,
      reasons: canceledReasons.split('\n').filter(r => r.trim() !== ''),
    };
    onSave(data);
    setSuccessMessage('تم حفظ الطلبيات الجديدة بنجاح!');
    
    // Reset form
    setProductCounts({});
    setConfirmedOrders('');
    setCanceledOrders('');
    setCanceledReasons('');

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Card title="الطلبيات الجديدة (اليوم)">
      <div className="space-y-6">
        <div>
          <label className="block text-slate-300 mb-2 font-medium">إضافة منتج جديد:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder="مثال: آيفون 15"
              className="flex-grow bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
            <button
              onClick={handleAddProduct}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition"
            >
              إضافة
            </button>
          </div>
        </div>

        {products.length > 0 && (
          <div id="productsList" className="space-y-4">
            {products.map(p => (
              <div key={p} className="flex items-center gap-3 bg-slate-700/50 p-3 rounded-lg">
                 <label className="flex-grow text-slate-300">
                    طلبيات جديدة لـ <strong className="text-white">{p}</strong>:
                </label>
                <input
                  type="number"
                  min="0"
                  value={productCounts[p] || ''}
                  onChange={(e) => setProductCounts({ ...productCounts, [p]: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-24 bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-center focus:ring-cyan-500 focus:border-cyan-500 transition"
                />
                <button
                  onClick={() => handleRemoveProduct(p)}
                  className="text-red-400 hover:text-red-300 font-bold text-xl"
                  title={`إزالة ${p}`}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <div>
          <label htmlFor="confirmedOrders" className="block text-slate-300 mb-2 font-medium">عدد الطلبيات المؤكدة اليوم:</label>
          <input type="number" id="confirmedOrders" min="0" placeholder="0" value={confirmedOrders} onChange={e => setConfirmedOrders(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
        </div>

        <div>
          <label htmlFor="canceledOrders" className="block text-slate-300 mb-2 font-medium">عدد الطلبيات الملغاة اليوم:</label>
          <input type="number" id="canceledOrders" min="0" placeholder="0" value={canceledOrders} onChange={e => setCanceledOrders(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
        </div>

        <div>
          <label htmlFor="canceledReasons" className="block text-slate-300 mb-2 font-medium">أسباب الإلغاء (سطر لكل طلبية):</label>
          <textarea id="canceledReasons" rows={3} placeholder="الزبون غير مهتم&#10;السعر مرتفع" value={canceledReasons} onChange={e => setCanceledReasons(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-cyan-500 focus:border-cyan-500 transition"></textarea>
        </div>
        
        {successMessage && <div className="text-green-400 text-center font-semibold p-3 bg-green-900/50 rounded-md">{successMessage}</div>}

        <button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-md transition text-lg">
          حفظ الطلبيات الجديدة
        </button>
      </div>
    </Card>
  );
};

export default NewOrdersForm;
