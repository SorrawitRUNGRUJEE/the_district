#!/bin/bash

TARGET_BASE_DIR="./public/images/rooms"

echo "🧹 เริ่มต้นการ Clean Up ชื่อไฟล์และโฟลเดอร์ใน $TARGET_BASE_DIR..."

# 1. วนลูปจัดการไฟล์ก่อน (เพราะถ้าเปลี่ยนชื่อ Folder ก่อน ไฟล์ข้างในจะหาไม่เจอ)
find "$TARGET_BASE_DIR" -type f -name "*.webp" | while read -r file; do
    dir=$(dirname "$file")
    filename=$(basename "$file")

    # Logic การ Clean ชื่อไฟล์:
    # - เปลี่ยน & เป็น and
    # - เปลี่ยนอักขระที่ไม่ใช่ตัวเลข/ตัวอักษร เป็น -
    # - ทำให้เป็นตัวเล็ก (lowercase)
    # - บีบขีดที่ซ้ำกัน -- ให้เหลือ -
    new_filename=$(echo "$filename" | sed 's/&/and/g' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9.]/-/g' | sed 's/--*/-/g' | sed 's/-\././g')

    if [ "$filename" != "$new_filename" ]; then
        mv "$file" "$dir/$new_filename"
        echo "   📄 Renamed File: $filename -> $new_filename"
    fi
done

# 2. วนลูปจัดการชื่อ Folder
# ใช้ -depth เพื่อให้จัดการ Folder ย่อยสุดก่อน แล้วค่อยขยับออกมาข้างนอก
find "$TARGET_BASE_DIR" -mindepth 1 -type d -depth | while read -r dir; do
    parent=$(dirname "$dir")
    dirname=$(basename "$dir")

    # Logic เดียวกับไฟล์: เปลี่ยน & เป็น and และ clean slug
    new_dirname=$(echo "$dirname" | sed 's/&/and/g' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

    if [ "$dirname" != "$new_dirname" ]; then
        mv "$dir" "$parent/$new_dirname"
        echo "   📁 Renamed Folder: $dirname -> $new_dirname"
    fi
done

echo "✅ เสร็จสิ้น! ตอนนี้ Path ของคุณจะเป็นมาตรฐาน /lobby-and-facilities/ แล้วครับ"