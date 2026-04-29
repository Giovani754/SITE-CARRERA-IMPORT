"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  onImagesChange: (urls: string[]) => void;
  initialImages?: string[];
  slug?: string;
}

export function ImageUpload({ onImagesChange, initialImages = [], slug = "vehicle" }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [];

    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
        const filePath = `vehicles/${fileName}`;

        const { error } = await supabase.storage
          .from('vehicle-images')
          .upload(filePath, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(filePath);

        newUrls.push(publicUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Erro ao fazer upload de uma das imagens.');
      }
    }

    const updatedImages = [...images, ...newUrls];
    setImages(updatedImages);
    onImagesChange(updatedImages);
    setIsUploading(false);
    
    // Clear input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (url: string) => {
    const updatedImages = images.filter((img) => img !== url);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const triggerInput = () => {
    if (!isUploading) fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
          Galeria do Veículo
        </label>
        <span className="text-[9px] text-white/10 uppercase tracking-widest">
          {images.length} imagens no acervo
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Gallery Grid */}
        {images.map((url, idx) => (
          <div key={url} className="relative aspect-square rounded-sm overflow-hidden border border-white/5 group">
            <Image 
              src={url} 
              alt="Vehicle" 
              fill 
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="bg-red-500/80 p-2 rounded-full hover:bg-red-500 transition-colors"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
            {idx === 0 && (
              <div className="absolute top-2 left-2 bg-brand-gold text-black text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tighter shadow-xl">
                Capa
              </div>
            )}
          </div>
        ))}

        {/* Upload Trigger */}
        <button
          type="button"
          onClick={triggerInput}
          disabled={isUploading}
          className="aspect-square rounded-sm border-2 border-dashed border-white/5 hover:border-brand-gold/30 hover:bg-white/[0.02] transition-all flex flex-col items-center justify-center gap-3 group disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 size={18} className="text-brand-gold animate-spin" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-gold">
                Enviando...
              </span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload size={18} className="text-white/20 group-hover:text-brand-gold" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/20 group-hover:text-white/40">
                Adicionar Fotos
              </span>
            </>
          )}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />
      
      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm">
        <p className="text-[9px] text-white/20 uppercase tracking-[0.15em] leading-relaxed text-center">
          Dica: A primeira imagem da galeria será usada como a capa do anúncio. <br/>
          As imagens são salvas automaticamente no servidor ao serem selecionadas.
        </p>
      </div>
    </div>
  );
}
