'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [dbStatus, setDbStatus] = useState<string>('');
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkDbStatus();
  }, []);

  const checkDbStatus = async () => {
    try {
      const response = await fetch('/api/seed-data');
      const data = await response.json();
      setDbStatus(`قاعدة البيانات تحتوي على ${data.studentsCount} طالب`);
    } catch (err) {
      console.error('Error checking DB status:', err);
    }
  };

  const handleSeedData = async () => {
    if (!confirm('هل تريد إنشاء قاعدة بيانات جديدة؟ (سيتم حذف البيانات القديمة)')) {
      return;
    }

    setIsSeeding(true);
    setError('');
    
    try {
      const response = await fetch('/api/seed-data', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(`✅ ${data.message}\n\nعدد الطلاب: ${data.totalStudents}\nعدد المحافظات: ${data.governorates}`);
        checkDbStatus();
      } else {
        setError(data.error || 'حدث خطأ أثناء إنشاء البيانات');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-black text-gray-800">🔧 لوحة التحكم</h1>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-bold"
            >
              ← العودة للرئيسية
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg font-bold">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">📊 حالة قاعدة البيانات</h2>
              <p className="text-lg text-blue-700">{dbStatus || 'جاري التحميل...'}</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">🔄 إنشاء قاعدة بيانات جديدة</h2>
              <p className="text-gray-700 mb-4">
                سيتم إنشاء قاعدة بيانات جديدة تحتوي على آلاف الطلاب مع توزيعهم على:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>27 محافظة</li>
                <li>3 شعب: أدبي، علمي رياضة، علمي علوم</li>
                <li>درجات حقيقية حسب توزيع 2026</li>
                <li>مواد نجاح ورسوب غير مضافة للمجموع</li>
              </ul>
              <button
                onClick={handleSeedData}
                disabled={isSeeding}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-8 rounded-lg font-black text-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSeeding ? '⏳ جاري إنشاء البيانات...' : '🚀 إنشاء قاعدة بيانات جديدة'}
              </button>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-2">ℹ️ معلومات</h2>
              <p className="text-gray-700">
                هذه الصفحة مخصصة لإدارة قاعدة البيانات. يمكنك الوصول إليها عبر: <code className="bg-gray-200 px-2 py-1 rounded">/admin</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
