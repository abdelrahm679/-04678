'use client';

import { useState } from 'react';

// قائمة المحافظات
const governorates = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الشرقية',
  'المنوفية', 'القليوبية', 'البحيرة', 'الغربية', 'بورسعيد',
  'دمياط', 'الإسماعيلية', 'السويس', 'كفر الشيخ', 'الفيوم',
  'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا',
  'أسوان', 'الأقصر', 'البحر الأحمر', 'الوادي الجديد', 'مطروح',
  'شمال سيناء', 'جنوب سيناء'
];

interface Student {
  id: number;
  seatNumber: string;
  name: string;
  governorate: string;
  division: string;
  arabicScore: number;
  englishScore: number;
  mathScore: number | null;
  physicsScore: number | null;
  chemistryScore: number | null;
  biologyScore: number | null;
  historyScore: number | null;
  geographyScore: number | null;
  statisticsScore: number | null;
  secondLanguageScore: number | null;
  religiousEducationScore: number | null;
  nationalEducationScore: number | null;
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
}

export default function HomePage() {
  const [name, setName] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [results, setResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name && !seatNumber && !governorate) {
      setError('يرجى إدخال اسم الطالب أو رقم الجلوس أو المحافظة على الأقل');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (seatNumber) params.append('seatNumber', seatNumber);
      if (governorate) params.append('governorate', governorate);

      const response = await fetch(`/api/search-result?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.results);
      } else {
        setError(data.error || 'حدث خطأ أثناء البحث');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'ممتاز':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'جيد جداً':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'جيد':
        return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'مقبول':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-700';
    if (percentage >= 85) return 'text-blue-700';
    if (percentage >= 75) return 'text-indigo-700';
    if (percentage >= 65) return 'text-yellow-700';
    return 'text-red-700';
  };

  const getDivisionBadgeColor = (division: string) => {
    switch (division) {
      case 'أدبي':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'علمي رياضة':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'علمي علوم':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const renderScores = (student: Student) => {
    const scores = [];
    
    // المواد المشتركة
    scores.push({ title: 'اللغة العربية', score: student.arabicScore, total: 80, inTotal: true });
    scores.push({ title: 'اللغة الأجنبية الأولى', score: student.englishScore, total: 60, inTotal: true });
    
    // مواد حسب الشعبة
    if (student.division === 'أدبي') {
      if (student.historyScore !== null) scores.push({ title: 'التاريخ', score: student.historyScore, total: 60, inTotal: true });
      if (student.geographyScore !== null) scores.push({ title: 'الجغرافيا', score: student.geographyScore, total: 60, inTotal: true });
      if (student.statisticsScore !== null) scores.push({ title: 'الإحصاء', score: student.statisticsScore, total: 60, inTotal: true });
    } else if (student.division === 'علمي رياضة') {
      if (student.mathScore !== null) scores.push({ title: 'الرياضيات', score: student.mathScore, total: 60, inTotal: true });
      if (student.physicsScore !== null) scores.push({ title: 'الفيزياء', score: student.physicsScore, total: 60, inTotal: true });
      if (student.chemistryScore !== null) scores.push({ title: 'الكيمياء', score: student.chemistryScore, total: 60, inTotal: true });
    } else if (student.division === 'علمي علوم') {
      if (student.biologyScore !== null) scores.push({ title: 'الأحياء', score: student.biologyScore, total: 60, inTotal: true });
      if (student.physicsScore !== null) scores.push({ title: 'الفيزياء', score: student.physicsScore, total: 60, inTotal: true });
      if (student.chemistryScore !== null) scores.push({ title: 'الكيمياء', score: student.chemistryScore, total: 60, inTotal: true });
    }
    
    // المواد غير المضافة للمجموع
    if (student.secondLanguageScore !== null) {
      scores.push({ title: 'اللغة الأجنبية الثانية', score: student.secondLanguageScore, total: 40, inTotal: false });
    }
    if (student.religiousEducationScore !== null) {
      scores.push({ title: 'التربية الدينية', score: student.religiousEducationScore, total: 40, inTotal: false });
    }
    if (student.nationalEducationScore !== null) {
      scores.push({ title: 'التربية الوطنية', score: student.nationalEducationScore, total: 25, inTotal: false });
    }
    
    return scores;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-6 rounded-2xl shadow-2xl mb-6">
            <h1 className="text-5xl font-black mb-3">🎓 ظهور نتيجة الثانوية العامة</h1>
            <p className="text-xl opacity-90">استعلم عن نتيجتك الآن - 2026</p>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* اسم الطالب */}
              <div>
                <label htmlFor="name" className="block text-lg font-bold text-gray-700 mb-2">
                  اسم الطالب
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسم الطالب"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                />
              </div>

              {/* رقم الجلوس */}
              <div>
                <label htmlFor="seatNumber" className="block text-lg font-bold text-gray-700 mb-2">
                  رقم الجلوس
                </label>
                <input
                  id="seatNumber"
                  type="text"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  placeholder="أدخل رقم الجلوس"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                />
              </div>

              {/* المحافظة */}
              <div>
                <label htmlFor="governorate" className="block text-lg font-bold text-gray-700 mb-2">
                  المحافظة
                </label>
                <select
                  id="governorate"
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg bg-white"
                >
                  <option value="">اختر المحافظة</option>
                  {governorates.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-8 rounded-lg font-black text-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🔍 جاري البحث...' : '🔍 استعلام عن النتيجة'}
            </button>
          </form>

          {error && (
            <div className="mt-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-lg text-center font-bold">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-center text-gray-800 mb-6">
              📊 نتائج البحث ({results.length} طالب)
            </h2>
            
            {results.map((student) => {
              const studentScores = renderScores(student);
              const mainScores = studentScores.filter(s => s.inTotal);
              const extraScores = studentScores.filter(s => !s.inTotal);
              
              return (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-blue-300 transition-all"
                >
                  {/* Student Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <h3 className="text-3xl font-black mb-2">{student.name}</h3>
                        <p className="text-lg opacity-90 mb-2">رقم الجلوس: {student.seatNumber}</p>
                        <span className={`inline-block px-4 py-2 rounded-lg font-bold border-2 ${getDivisionBadgeColor(student.division)}`}>
                          {student.division}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-lg opacity-90 mb-1">المحافظة</p>
                        <p className="text-2xl font-bold">{student.governorate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Scores Grid */}
                  <div className="p-8">
                    {/* المواد المضافة للمجموع */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-700 mb-4">📚 المواد المضافة للمجموع</h4>
                      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {mainScores.map((scoreData, idx) => (
                          <ScoreCard key={idx} {...scoreData} />
                        ))}
                      </div>
                    </div>

                    {/* المواد غير المضافة للمجموع */}
                    {extraScores.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xl font-bold text-gray-700 mb-4">📋 مواد نجاح ورسوب (غير مضافة للمجموع)</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          {extraScores.map((scoreData, idx) => (
                            <ScoreCard key={idx} {...scoreData} isExtra={true} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Total and Grade */}
                    <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t-2 border-gray-200">
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center">
                        <p className="text-gray-600 font-bold mb-2">المجموع الكلي</p>
                        <p className="text-4xl font-black text-purple-700">{student.totalScore}</p>
                        <p className="text-sm text-gray-500 mt-1">من {student.maxScore}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center">
                        <p className="text-gray-600 font-bold mb-2">النسبة المئوية</p>
                        <p className={`text-4xl font-black ${getPercentageColor(student.percentage)}`}>
                          {student.percentage}%
                        </p>
                      </div>
                      
                      <div className={`border-2 rounded-xl p-6 text-center ${getGradeColor(student.grade)}`}>
                        <p className="font-bold mb-2 opacity-80">التقدير</p>
                        <p className="text-4xl font-black">{student.grade}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface ScoreCardProps {
  title: string;
  score: number;
  total: number;
  inTotal: boolean;
  isExtra?: boolean;
}

function ScoreCard({ title, score, total, isExtra = false }: ScoreCardProps) {
  const percentage = (score / total) * 100;
  const isPassed = percentage >= 50;
  
  const getColor = () => {
    if (isExtra) {
      return isPassed ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600';
    }
    if (percentage >= 90) return 'from-green-400 to-green-600';
    if (percentage >= 80) return 'from-blue-400 to-blue-600';
    if (percentage >= 70) return 'from-indigo-400 to-indigo-600';
    if (percentage >= 60) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 border-2 ${isExtra ? 'border-amber-200' : 'border-gray-200'} rounded-xl p-4 hover:shadow-lg transition-all`}>
      <p className="text-sm font-bold text-gray-600 mb-2">{title}</p>
      {isExtra && (
        <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${isPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isPassed ? '✓ نجاح' : '✗ رسوب'}
        </span>
      )}
      <div className="flex items-baseline gap-1">
        <p className="text-3xl font-black text-gray-800">{score}</p>
        <p className="text-sm text-gray-500">/ {total}</p>
      </div>
      <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
