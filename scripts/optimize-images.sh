#!/bin/bash

# Folder ต้นทาง (ปรับตามจริง)
SOURCE_DIR=${1:-"/Users/ball/Downloads/district-photo-by-room"}
TARGET_BASE_DIR="./public/images/rooms"

echo "🚀 เริ่มต้น Standardizing & Optimizing..."

# ค้นหา Folder ชั้นแรกใน Source (เช่น District A, District B)
find "$SOURCE_DIR" -mindepth 1 -maxdepth 1 -type d | while read -r room_dir; do
    
    # 1. แปลงชื่อ Folder เป็น kebab-case (District A -> district-a)
    folder_raw_name=$(basename "$room_dir")
    folder_slug=$(echo "$folder_raw_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    
    target_dir="$TARGET_BASE_DIR/$folder_slug"
    mkdir -p "$target_dir"
    
    echo "📂 Processing: $folder_raw_name -> $folder_slug"
    
    # 2. วนลูปรูปใน Folder นั้นๆ และรันตัวเลข 001, 002...
    count=1
    find "$room_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | sort | while read -r img; do
        
        # Format ตัวเลขให้เป็น 3 หลัก (001, 002)
        idx=$(printf "%03d" $count)
        output_webp="$target_dir/$folder_slug-$idx.webp"
        
        echo "   ⚡️ Converting [$idx]: $(basename "$img") -> $(basename "$output_webp")"
        
        magick "$img" \
            -resize "3840x3840>" \
            -strip \
            -quality 82 \
            -define webp:method=6 \
            -define webp:thread-level=1 \
            "$output_webp"
            
        ((count++))
    done
done

echo "✅ All set! รูปสะอาด กริบ และเป็น Standard เดียวกันแล้วครับ"
