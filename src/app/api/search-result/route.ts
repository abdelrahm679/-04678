import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { students } from '@/db/schema';
import { eq, and, or, ilike } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const seatNumber = searchParams.get('seatNumber');
    const name = searchParams.get('name');
    const governorate = searchParams.get('governorate');

    // التحقق من وجود معايير بحث
    if (!seatNumber && !name && !governorate) {
      return NextResponse.json(
        { error: 'يجب إدخال رقم الجلوس أو الاسم أو المحافظة على الأقل' },
        { status: 400 }
      );
    }

    // بناء شروط البحث
    const conditions = [];
    
    if (seatNumber) {
      conditions.push(eq(students.seatNumber, seatNumber));
    }
    
    if (name) {
      conditions.push(ilike(students.name, `%${name}%`));
    }
    
    if (governorate) {
      conditions.push(eq(students.governorate, governorate));
    }

    // البحث في قاعدة البيانات
    const results = await db
      .select()
      .from(students)
      .where(and(...conditions))
      .limit(50);

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'لم يتم العثور على نتائج مطابقة' },
        { status: 404 }
      );
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء البحث' },
      { status: 500 }
    );
  }
}
