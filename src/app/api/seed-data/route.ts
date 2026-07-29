import { NextResponse } from 'next/server';
import { db } from '@/db';
import { students } from '@/db/schema';
import { sql } from 'drizzle-orm';

// قائمة المحافظات المصرية
const governorates = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الشرقية',
  'المنوفية', 'القليوبية', 'البحيرة', 'الغربية', 'بورسعيد',
  'دمياط', 'الإسماعيلية', 'السويس', 'كفر الشيخ', 'الفيوم',
  'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا',
  'أسوان', 'الأقصر', 'البحر الأحمر', 'الوادي الجديد', 'مطروح',
  'شمال سيناء', 'جنوب سيناء'
];

// قائمة الأسماء الأولى
const firstNames = [
  'أحمد', 'محمد', 'مصطفى', 'عمر', 'خالد', 'علي', 'حسن', 'يوسف', 'كريم', 'عبدالله',
  'فاطمة', 'مريم', 'نور', 'سارة', 'هدى', 'ياسمين', 'ريم', 'نورهان', 'سلمى', 'هبة',
  'إبراهيم', 'عبدالرحمن', 'آدم', 'يحيى', 'إسلام', 'طارق', 'وليد', 'سامي', 'رامي', 'أمير',
  'دينا', 'لينا', 'منى', 'رنا', 'آية', 'ندى', 'شيماء', 'إيمان', 'نهى', 'دعاء'
];

// قائمة الأسماء الثانية
const middleNames = [
  'محمد', 'أحمد', 'علي', 'حسن', 'حسين', 'إبراهيم', 'عبدالله', 'عبدالرحمن', 'سعيد', 'فتحي',
  'محمود', 'جمال', 'كمال', 'صلاح', 'طه', 'ياسر', 'ماهر', 'عادل', 'سامي', 'رمضان'
];

// قائمة أسماء العائلات
const lastNames = [
  'محمد', 'أحمد', 'علي', 'حسن', 'إبراهيم', 'السيد', 'عبدالله', 'محمود', 'عثمان', 'حسين',
  'سليمان', 'موسى', 'يوسف', 'عبدالعزيز', 'الشافعي', 'المصري', 'الدين', 'عباس', 'سالم', 'فهمي',
  'رشيد', 'منصور', 'عامر', 'زكي', 'شاهين', 'عطية', 'البنا', 'خليل', 'نصر', 'فريد'
];

// الشعب الدراسية
const divisions = ['أدبي', 'علمي رياضة', 'علمي علوم'];

// التقديرات
const grades = [
  { min: 95, name: 'ممتاز' },
  { min: 85, name: 'جيد جداً' },
  { min: 75, name: 'جيد' },
  { min: 65, name: 'مقبول' },
  { min: 50, name: 'ضعيف' },
];

function getGrade(percentage: number): string {
  for (const grade of grades) {
    if (percentage >= grade.min) {
      return grade.name;
    }
  }
  return 'راسب';
}

function generateRandomScore(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStudent(index: number, governorate: string) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${middleName} ${lastName}`;
  
  // اختيار شعبة عشوائية
  const division = divisions[Math.floor(Math.random() * divisions.length)];
  
  // توليد رقم جلوس فريد
  const govCode = (governorates.indexOf(governorate) + 1).toString().padStart(2, '0');
  const studentNumber = (index + 1).toString().padStart(6, '0');
  const seatNumber = `${govCode}${studentNumber}`;
  
  // المواد المشتركة
  const arabicScore = generateRandomScore(50, 80); // من 80
  const englishScore = generateRandomScore(30, 60); // من 60
  
  // مواد غير مضافة للمجموع (نجاح/رسوب)
  const secondLanguageScore = generateRandomScore(20, 40); // من 40
  const religiousEducationScore = generateRandomScore(20, 40); // من 40
  const nationalEducationScore = generateRandomScore(12, 25); // من 25
  
  let totalScore = 0;
  let maxScore = 0;
  let mathScore = null;
  let physicsScore = null;
  let chemistryScore = null;
  let biologyScore = null;
  let historyScore = null;
  let geographyScore = null;
  let statisticsScore = null;
  
  if (division === 'أدبي') {
    // شعبة أدبي
    historyScore = generateRandomScore(30, 60); // من 60
    geographyScore = generateRandomScore(30, 60); // من 60
    statisticsScore = generateRandomScore(30, 60); // من 60
    
    totalScore = arabicScore + englishScore + historyScore + geographyScore + statisticsScore;
    maxScore = 320; // 80 + 60 + 60 + 60 + 60
  } else if (division === 'علمي رياضة') {
    // شعبة علمي رياضة
    mathScore = generateRandomScore(30, 60); // من 60
    physicsScore = generateRandomScore(30, 60); // من 60
    chemistryScore = generateRandomScore(30, 60); // من 60
    
    totalScore = arabicScore + englishScore + mathScore + physicsScore + chemistryScore;
    maxScore = 320; // 80 + 60 + 60 + 60 + 60
  } else {
    // شعبة علمي علوم
    biologyScore = generateRandomScore(30, 60); // من 60
    physicsScore = generateRandomScore(30, 60); // من 60
    chemistryScore = generateRandomScore(30, 60); // من 60
    
    totalScore = arabicScore + englishScore + biologyScore + physicsScore + chemistryScore;
    maxScore = 320; // 80 + 60 + 60 + 60 + 60
  }
  
  const percentage = Math.round((totalScore / maxScore) * 100);
  const grade = getGrade(percentage);
  
  return {
    seatNumber,
    name,
    governorate,
    division,
    arabicScore,
    englishScore,
    mathScore,
    physicsScore,
    chemistryScore,
    biologyScore,
    historyScore,
    geographyScore,
    statisticsScore,
    secondLanguageScore,
    religiousEducationScore,
    nationalEducationScore,
    totalScore,
    maxScore,
    percentage,
    grade,
  };
}

export async function POST() {
  try {
    // مسح البيانات القديمة
    await db.delete(students);
    
    const allStudents = [];
    let globalIndex = 0;
    
    // توليد طلاب لكل محافظة
    for (const governorate of governorates) {
      // عدد عشوائي من الطلاب لكل محافظة (بين 500 و 2000)
      const studentsCount = Math.floor(Math.random() * 1500) + 500;
      
      for (let i = 0; i < studentsCount; i++) {
        allStudents.push(generateStudent(globalIndex, governorate));
        globalIndex++;
      }
    }
    
    // إدخال البيانات على دفعات (1000 طالب في كل دفعة)
    const batchSize = 1000;
    for (let i = 0; i < allStudents.length; i += batchSize) {
      const batch = allStudents.slice(i, i + batchSize);
      await db.insert(students).values(batch);
    }
    
    return NextResponse.json({
      message: 'تم إنشاء قاعدة البيانات بنجاح',
      totalStudents: allStudents.length,
      governorates: governorates.length
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء البيانات', details: String(error) },
      { status: 500 }
    );
  }
}

// GET endpoint للتحقق من عدد السجلات
export async function GET() {
  try {
    const result = await db.execute(sql`SELECT COUNT(*) as count FROM students`);
    const count = Number(result.rows[0]?.count) || 0;
    
    return NextResponse.json({
      studentsCount: count,
      message: count > 0 ? 'قاعدة البيانات تحتوي على بيانات' : 'قاعدة البيانات فارغة'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ', details: String(error) },
      { status: 500 }
    );
  }
}
