"use client";

import * as React from "react";

interface PdfViewerProps {
  pdfUrl: string;
  className?: string;
}

export function PdfViewer({ pdfUrl, className }: PdfViewerProps) {
  return (
    <div
      className={`w-full bg-white rounded-xl border border-worker-neutral-200 overflow-hidden ${className || ""}`}
    >
      <div className="w-full border border-worker-neutral-200 rounded-xl overflow-hidden">
        <div className="w-full border border-worker-neutral-200 rounded-lg overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            className="w-full h-full min-h-[400px] border-0"
            title="PDF 문서 뷰어"
            style={{ minHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  );
}
