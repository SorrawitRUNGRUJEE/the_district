#!/bin/bash

# กำหนด Folder หลักของโปรเจกต์ (หรือ Path ที่เก็บรูปเยอะๆ)
TARGET_DIR="./public/images"

echo "🔍 กำลังค้นหาไฟล์ JPG และ PNG ใน $TARGET_DIR..."

# ค้นหาไฟล์ภาพที่เป็น JPG, JPEG, PNG
find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
    
    # กำหนดชื่อไฟล์ output เป็น .webp ในที่เดียวกัน
    output_webp="${img%.*}.webp"

    # เช็กก่อนว่ามีไฟล์ .webp ชื่อนี้อยู่หรือยัง ถ้ามีแล้วให้ข้ามไปเลย
    if [ -f "$output_webp" ]; then
        echo "⏩ Skip: $output_webp (มีอยู่แล้ว)"
        continue
    fi

    echo "⚡️ Converting: $(basename "$img") -> $(basename "$output_webp")"

    # ใช้ Setting เดียวกับที่เราคุยกัน (Luxury 82% + High Effort Compression)
    # สำหรับ PNG: สคริปต์จะจัดการเรื่อง Transparency ให้ด้วยอัตโนมัติครับ
    magick "$img" \
        -resize "3840x3840>" \
        -strip \
        -quality 82 \
        -define webp:method=6 \
        -define webp:thread-level=1 \
        "$output_webp"

done

echo "🎉 แปลงไฟล์ทั้งหมดเรียบร้อยแล้วครับ! อย่าลืมไปเช็กความกริบก่อนลบไฟล์ต้นฉบับนะ"
