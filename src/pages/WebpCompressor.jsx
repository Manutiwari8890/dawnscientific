import React, { useState } from "react";
import imageCompression from "browser-image-compression";

export default function WebpCompressor() {
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState([]);

  const handleFiles = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    setProgress(0);
    setConverted([]);

    const total = selectedFiles.length;
    let processed = 0;
    const results = [];

    // Process in small batches (to avoid freezing)
    const batchSize = 50;

    for (let i = 0; i < total; i += batchSize) {
      const batch = selectedFiles.slice(i, i + batchSize);

      const compressedBatch = await Promise.all(
        batch.map(async (file) => {
          try {
            const options = {
              maxSizeMB: 1,            // target max size ~1MB
              maxWidthOrHeight: 1200,  // resize large images
              fileType: "image/webp",  // force WebP format
              useWebWorker: true,      // background processing
            };

            const compressedFile = await imageCompression(file, options);
            return compressedFile;
          } catch (err) {
            console.error("Compression error:", err);
            return null;
          }
        })
      );

      results.push(...compressedBatch.filter(Boolean));
      processed += batch.length;
      setProgress(Math.round((processed / total) * 100));
    }

    setConverted(results);

    // Auto-download all converted files
    results.forEach((file) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name.replace(/\.[^.]+$/, ".webp");
      link.click();
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Convert Images to WebP</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFiles}
      />

      {progress > 0 && (
        <div style={{ marginTop: "10px" }}>
          <p>Progress: {progress}%</p>
          <div
            style={{
              background: "#eee",
              height: "10px",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#4caf50",
                height: "100%",
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}

      {converted.length > 0 && (
        <p style={{ marginTop: "10px" }}>
          ✅ {converted.length} images converted to WebP!
        </p>
      )}
    </div>
  );
}
