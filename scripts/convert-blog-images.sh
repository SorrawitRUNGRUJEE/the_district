#!/bin/bash

# กำหนด Path ของ Blog
BLOG_DIR="./public/content/blog"

# ตรวจสอบว่า Folder มีอยู่จริงไหม
if [ ! -d "$BLOG_DIR" ]; then
    echo "❌ ไม่พบโฟลเดอร์: $BLOG_DIR"
    exit 1
fi

echo "📸 เริ่มต้นแปลงรูปภาพใน Blog และลบไฟล์ต้นฉบับ..."

# ค้นหาไฟล์ภาพ JPG, JPEG, PNG ในโฟลเดอร์ Blog
find "$BLOG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
    
    output_webp="${img%.*}.webp"

    echo "⚡️ Processing: $(basename "$img")"

    # สำหรับ Blog ใช้ความกว้าง 2560px ก็เพียงพอและชัดมากแล้วครับ
    # -quality 82 ตามมาตรฐาน Luxury ของเรา
    if magick "$img" \
        -resize "2560x2560>" \
        -strip \
        -quality 82 \
        -define webp:method=6 \
        -define webp:thread-level=1 \
        "$output_webp"; then
        
        # ถ้าแปลงสำเร็จ (Exit code 0) ให้ลบไฟล์ต้นฉบับทิ้งทันที
        rm "$img"
        echo "   ✅ Convert & Deleted Original: $(basename "$img")"
    else
        echo "   ⚠️ Error: ไม่สามารถแปลงไฟล์ $(basename "$img") ได้ (ข้ามการลบ)"
    fi

done

echo "🎉 จัดการรูปภาพใน Blog เรียบร้อยแล้ว! ตอนนี้เหลือแต่ไฟล์ .webp ที่เบาและเร็วครับ"