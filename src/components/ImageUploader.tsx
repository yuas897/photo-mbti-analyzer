"use client";

import { useCallback, useState } from "react";

interface ImageUploaderProps {
  onImageSelect: (base64: string, mimeType: string) => void;
  disabled?: boolean;
}

export default function ImageUploader({ onImageSelect, disabled }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("ファイルサイズは10MB以下にしてください");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      
      // Base64データ部分のみを抽出
      const base64Data = result.split(",")[1];
      onImageSelect(base64Data, file.type);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, [disabled, processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const clearImage = useCallback(() => {
    setPreview(null);
    onImageSelect("", "");
  }, [onImageSelect]);

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative group">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={preview}
              alt="アップロードした写真"
              className="w-full h-auto max-h-[400px] object-contain bg-white/50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {!disabled && (
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
              aria-label="画像を削除"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center w-full h-72 
            border-3 border-dashed rounded-3xl cursor-pointer
            transition-all duration-300 ease-out
            ${isDragging 
              ? "border-brand-500 bg-brand-50 scale-[1.02]" 
              : "border-gray-300 bg-white/50 hover:bg-white/80 hover:border-brand-400"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
          />
          
          <div className={`
            w-20 h-20 mb-4 rounded-2xl flex items-center justify-center
            transition-all duration-300
            ${isDragging ? "bg-brand-100 scale-110" : "bg-gray-100"}
          `}>
            <svg 
              className={`w-10 h-10 transition-colors ${isDragging ? "text-brand-500" : "text-gray-400"}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          
          <p className="text-lg font-medium text-gray-700 mb-1">
            写真をドラッグ&ドロップ
          </p>
          <p className="text-sm text-gray-500">
            または<span className="text-brand-600 font-medium">クリックして選択</span>
          </p>
          <p className="text-xs text-gray-400 mt-3">
            JPEG, PNG, WebP, GIF（最大10MB）
          </p>
        </label>
      )}
    </div>
  );
}
