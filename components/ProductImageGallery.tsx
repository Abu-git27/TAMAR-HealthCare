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

  if (cleanImages.length === 0 || !selectedImage) {
    return (
      <div className="flex h-[460px] items-center justify-center rounded-xl border bg-white text-gray-400">
        No image available
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="flex h-[460px] w-full items-center justify-center overflow-hidden rounded-xl border bg-white p-4">
        <img
          src={selectedImage}
          alt={productName}
          className="h-full w-full object-contain"
        />
      </div>

      {cleanImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 max-w-full">
          {cleanImages.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              style={{
                width: "120px",
                height: "120px",
                minWidth: "120px",
                flex: "0 0 120px",
              }}
              className={`flex items-center justify-center overflow-hidden rounded-lg border bg-white p-2 ${
                selectedIndex === index
                  ? "ring-2 ring-[#0B2E4F]"
                  : "hover:ring-1 hover:ring-gray-400"
              }`}
            >
              <div className="flex h-[90px] w-[90px] items-center justify-center overflow-hidden">
                <img
                  src={img}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}