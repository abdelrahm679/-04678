# 🎓 موقع ظهور نتيجة الثانوية العامة 2026

موقع ويب متكامل للاستعلام عن نتائج الثانوية العامة المصرية بنظام الشعب الثلاثة (أدبي، علمي رياضة، علمي علوم).

## ✨ المميزات

### 🔍 نظام بحث متقدم
- البحث بـ **اسم الطالب**
- البحث بـ **رقم الجلوس**
- البحث بـ **المحافظة**
- إمكانية البحث بأكثر من معيار

### 📚 الشعب الدراسية الثلاثة

#### 📖 شعبة أدبي (320 درجة)
- اللغة العربية: 80 درجة
- اللغة الأجنبية الأولى: 60 درجة
- التاريخ: 60 درجة
- الجغرافيا: 60 درجة
- الإحصاء: 60 درجة

#### 🔢 شعبة علمي رياضة (320 درجة)
- اللغة العربية: 80 درجة
- اللغة الأجنبية الأولى: 60 درجة
- الرياضيات: 60 درجة
- الفيزياء: 60 درجة
- الكيمياء: 60 درجة

#### 🧬 شعبة علمي علوم (320 درجة)
- اللغة العربية: 80 درجة
- اللغة الأجنبية الأولى: 60 درجة
- الأحياء: 60 درجة
- الفيزياء: 60 درجة
- الكيمياء: 60 درجة

### 📋 مواد نجاح ورسوب (غير مضافة للمجموع)
- اللغة الأجنبية الثانية: 40 درجة
- التربية الدينية: 40 درجة
- التربية الوطنية: 25 درجة

### 📊 قاعدة بيانات ضخمة
- أكثر من **26,000 طالب**
- **27 محافظة** (جميع محافظات مصر)
- توزيع عشوائي على الشعب الثلاثة
- درجات واقعية لكل مادة

### 🎨 تصميم احترافي
- واجهة عربية بالكامل مع خط Cairo
- تصميم متجاوب (Responsive)
- ألوان مميزة لكل تقدير
- عرض تفصيلي للدرجات مع رسوم بيانية

## 🚀 التقنيات المستخدمة

- **Next.js 16** (App Router)
- **TypeScript**
- **PostgreSQL** (قاعدة بيانات)
- **Drizzle ORM**
- **Tailwind CSS**

## 📖 كيفية الاستخدام

### للمستخدمين

1. **زيارة الصفحة الرئيسية**: `/`
2. إدخال معايير البحث (اسم أو رقم جلوس أو محافظة)
3. الضغط على "استعلام عن النتيجة"
4. عرض النتيجة مع جميع التفاصيل

### للمديرين

1. **زيارة صفحة الإدارة**: `/admin`
2. مشاهدة حالة قاعدة البيانات
3. إمكانية إنشاء قاعدة بيانات جديدة

## 🔧 API Endpoints

### `GET /api/search-result`
البحث عن نتائج الطلاب

**Query Parameters:**
- `name` (optional): اسم الطالب
- `seatNumber` (optional): رقم الجلوس
- `governorate` (optional): المحافظة

**Response:**
```json
{
  "results": [
    {
      "id": 1,
      "seatNumber": "01000001",
      "name": "أحمد محمد علي",
      "governorate": "القاهرة",
      "division": "أدبي",
      "arabicScore": 73,
      "englishScore": 50,
      "historyScore": 55,
      "geographyScore": 58,
      "statisticsScore": 52,
      "totalScore": 288,
      "maxScore": 320,
      "percentage": 90,
      "grade": "ممتاز"
    }
  ]
}
```

### `POST /api/seed-data`
إنشاء قاعدة بيانات جديدة بآلاف الطلاب

**Response:**
```json
{
  "message": "تم إنشاء قاعدة البيانات بنجاح",
  "totalStudents": 26732,
  "governorates": 27
}
```

### `GET /api/seed-data`
التحقق من عدد الطلاب في قاعدة البيانات

**Response:**
```json
{
  "studentsCount": 26732,
  "message": "قاعدة البيانات تحتوي على بيانات"
}
```

## 📊 Database Schema

```typescript
export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  seatNumber: varchar('seat_number', { length: 20 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  governorate: varchar('governorate', { length: 100 }).notNull(),
  division: varchar('division', { length: 50 }).notNull(),
  
  // المواد المشتركة
  arabicScore: integer('arabic_score').notNull(),
  englishScore: integer('english_score').notNull(),
  
  // مواد حسب الشعبة
  mathScore: integer('math_score'),
  physicsScore: integer('physics_score'),
  chemistryScore: integer('chemistry_score'),
  biologyScore: integer('biology_score'),
  historyScore: integer('history_score'),
  geographyScore: integer('geography_score'),
  statisticsScore: integer('statistics_score'),
  
  // مواد غير مضافة للمجموع
  secondLanguageScore: integer('second_language_score'),
  religiousEducationScore: integer('religious_education_score'),
  nationalEducationScore: integer('national_education_score'),
  
  // المجموع والتقدير
  totalScore: integer('total_score').notNull(),
  maxScore: integer('max_score').notNull(),
  percentage: integer('percentage').notNull(),
  grade: varchar('grade', { length: 50 }).notNull(),
});
```

## 🎯 التقديرات

- **ممتاز**: 95% فأكثر
- **جيد جداً**: 85% - 94%
- **جيد**: 75% - 84%
- **مقبول**: 65% - 74%
- **ضعيف**: 50% - 64%
- **راسب**: أقل من 50%

## 🌟 مميزات إضافية

- ✅ دعم كامل للغة العربية (RTL)
- ✅ خط Cairo الاحترافي
- ✅ رسوم بيانية للدرجات
- ✅ عرض حالة النجاح/الرسوب للمواد غير المضافة
- ✅ تصميم متجاوب لجميع الشاشات
- ✅ ألوان مميزة حسب الشعبة والتقدير

## 📝 ملاحظات

- تم إخفاء أزرار إدارة قاعدة البيانات من الصفحة الرئيسية
- يمكن الوصول لصفحة الإدارة عبر `/admin`
- البيانات الموجودة بيانات تجريبية (وهمية)
- يتم توليد الدرجات عشوائياً ضمن نطاق واقعي

## 🔐 الأمان

- جميع المدخلات يتم التحقق منها
- استخدام Prepared Statements لمنع SQL Injection
- معالجة الأخطاء بشكل آمن

---

تم التطوير بـ ❤️ لخدمة الطلاب المصريين
