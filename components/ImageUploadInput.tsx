"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  value?: string[];
  onChange: (urls: string[]) => void;
};

export default function ImageUploadInput({ value = [], onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          setError("Only image files are allowed.");
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok || !data.imageUrl) {
          setError(data.message || "One image upload failed.");
          continue;
        }

        uploadedUrls.push(data.imageUrl);
      }

      if (uploadedUrls.length > 0) {
        onChange([...value, ...uploadedUrls]);
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function makeMainImage(index: number) {
    const selected = value[index];
    const remaining = value.filter((_, i) => i !== index);
    onChange([selected, ...remaining]);
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full rounded-xl border px-4 py-3"
      />

      {uploading && (
        <p className="text-sm font-medium text-blue-600">
          Uploading image...
        </p>
      )}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      {value.length > 0 && (
        <div className="rounded-xl border bg-gray-50 p-3">
          <p className="mb-3 text-sm text-gray-600">
            Uploaded Images Preview
          </p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {value.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="relative rounded-lg border bg-white p-2"
              >
                {index === 0 && (
                  <span className="absolute left-2 top-2 z-10 rounded-md bg-green-600 px-2 py-1 text-xs text-white">
                    Main
                  </span>
                )}

                <div className="relative h-28 w-full">
                  <Image
                    src={img}
                    alt={`Uploaded preview ${index + 1}`}
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>

                <div className="mt-2 flex gap-2">
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => makeMainImage(index)}
                      className="flex-1 rounded-md bg-[#0B2E4F] px-2 py-1 text-xs text-white"
                    >
                      Main
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="flex-1 rounded-md bg-red-600 px-2 py-1 text-xs text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}