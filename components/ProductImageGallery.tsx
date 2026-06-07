"use client";

import { useEffect, useState } from "react";

export default function ProductImageGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const cleanImages = images?.filter(Boolean) || [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const selectedImage = cleanImages[selectedIndex];

  if (!selectedImage) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-xl border bg-white text-gray-500 sm:h-[420px]">
        No image available
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-xl border bg-white p-3 sm:h-[420px] md:h-[460px]">
        <img
          src={selectedImage}
          alt={productName}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {cleanImages.length > 1 && (
        <div className="mt-4 flex max-w-full gap-3 overflow-x-auto pb-3">
          {cleanImages.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`flex h-24 min-w-24 items-center justify-center overflow-hidden rounded-lg border bg-white p-2 sm:h-28 sm:min-w-28 ${
                selectedIndex === index
                  ? "ring-2 ring-[#D4AF37]"
                  : "hover:ring-1 hover:ring-gray-400"
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}