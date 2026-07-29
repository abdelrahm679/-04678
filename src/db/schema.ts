import { pgTable, serial, varchar, integer, text } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  seatNumber: varchar('seat_number', { length: 20 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  governorate: varchar('governorate', { length: 100 }).notNull(),
  division: varchar('division', { length: 50 }).notNull(), // أدبي، علمي رياضة، علمي علوم
  
  // المواد المشتركة (تضاف للمجموع)
  arabicScore: integer('arabic_score').notNull(), // 80 درجة
  englishScore: integer('english_score').notNull(), // 60 درجة
  
  // مواد علمي رياضة
  mathScore: integer('math_score'), // 60 درجة
  physicsScore: integer('physics_score'), // 60 درجة
  
  // مواد علمي علوم
  chemistryScore: integer('chemistry_score'), // 60 درجة
  biologyScore: integer('biology_score'), // 60 درجة
  
  // مواد أدبي
  historyScore: integer('history_score'), // 60 درجة
  geographyScore: integer('geography_score'), // 60 درجة
  statisticsScore: integer('statistics_score'), // 60 درجة
  
  // مواد غير مضافة للمجموع (نجاح/رسوب فقط)
  secondLanguageScore: integer('second_language_score'), // 40 درجة
  religiousEducationScore: integer('religious_education_score'), // 40 درجة
  nationalEducationScore: integer('national_education_score'), // 25 درجة
  
  // المجموع والتقدير
  totalScore: integer('total_score').notNull(),
  maxScore: integer('max_score').notNull(), // 320 أو 320 حسب الشعبة
  percentage: integer('percentage').notNull(),
  grade: varchar('grade', { length: 50 }).notNull(),
});
