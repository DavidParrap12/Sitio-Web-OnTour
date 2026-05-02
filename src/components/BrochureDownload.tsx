"use client";

import { useState, useCallback } from "react";
import { FileDown, FileText, Loader2, CheckCircle2 } from "lucide-react";

interface BrochureDownloadProps {
  images: string[];
  title: string;
  slug: string;
  labels: {
    downloadPdf: string;
    downloadWord: string;
    downloadBrochure: string;
    generating: string;
    downloaded: string;
  };
}

type DownloadState = "idle" | "loading" | "done";

/* ---------- helper: load image as HTMLImageElement ---------- */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/* ---------- helper: image → base64 data URL via canvas ---------- */
function imageToBase64(img: HTMLImageElement, format: "JPEG" | "PNG" = "JPEG"): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL(`image/${format.toLowerCase()}`, 0.92);
}

/* ---------- helper: load logo as base64 ---------- */
async function loadLogoBase64(): Promise<string> {
  const img = await loadImage("/image/logo-ON-TOUR-Nuevo.png");
  return imageToBase64(img, "PNG");
}

/* ---------- helper: image → ArrayBuffer for docx ---------- */
async function imageToArrayBuffer(src: string): Promise<{ buffer: ArrayBuffer; width: number; height: number }> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Canvas toBlob failed"));
        blob.arrayBuffer().then((buffer) => {
          resolve({ buffer, width: img.naturalWidth, height: img.naturalHeight });
        });
      },
      "image/png",
      0.92
    );
  });
}

export function BrochureDownload({ images, title, slug, labels }: BrochureDownloadProps) {
  const [pdfState, setPdfState] = useState<DownloadState>("idle");
  const [wordState, setWordState] = useState<DownloadState>("idle");

  /* ============================================================
   *  PDF Generation
   * ============================================================ */
  const generatePdf = useCallback(async () => {
    if (pdfState === "loading") return;
    setPdfState("loading");

    try {
      const { default: jsPDF } = await import("jspdf");
      const { saveAs } = await import("file-saver");

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      // Branding constants
      const margin = 10;
      const headerH = 18;
      const footerH = 12;
      const contentTop = margin + headerH + 4;
      const contentBottom = pageH - margin - footerH;
      const contentW = pageW - margin * 2;
      const contentH = contentBottom - contentTop;

      // Load logo
      let logoBase64: string | null = null;
      try {
        logoBase64 = await loadLogoBase64();
      } catch {
        /* logo optional */
      }

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        // --- Header ---
        pdf.setFillColor(11, 58, 96); // primary dark blue
        pdf.rect(0, 0, pageW, headerH + margin, "F");

        if (logoBase64) {
          pdf.addImage(logoBase64, "PNG", margin, 3, 22, 22);
        }

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, logoBase64 ? margin + 26 : margin, 14);

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.text("OnTour DMC Colombia", logoBase64 ? margin + 26 : margin, 21);

        // --- Image ---
        try {
          const img = await loadImage(images[i]);
          const base64 = imageToBase64(img);
          const imgRatio = img.naturalWidth / img.naturalHeight;

          let drawW = contentW;
          let drawH = drawW / imgRatio;

          if (drawH > contentH) {
            drawH = contentH;
            drawW = drawH * imgRatio;
          }

          const drawX = margin + (contentW - drawW) / 2;
          const drawY = contentTop + (contentH - drawH) / 2;

          pdf.addImage(base64, "JPEG", drawX, drawY, drawW, drawH);
        } catch {
          // If image fails, add placeholder text
          pdf.setTextColor(150, 150, 150);
          pdf.setFontSize(12);
          pdf.text(`Image ${i + 1} could not be loaded`, pageW / 2, pageH / 2, { align: "center" });
        }

        // --- Footer ---
        pdf.setFillColor(11, 58, 96);
        pdf.rect(0, pageH - footerH, pageW, footerH, "F");

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.text(
          "www.agenciaontour.com  |  gerencia@agenciaontour.com  |  +57 316 538 6892",
          pageW / 2,
          pageH - footerH / 2 + 1,
          { align: "center" }
        );

        // Page number
        pdf.setFontSize(7);
        pdf.text(`${i + 1} / ${images.length}`, pageW - margin, pageH - 3, { align: "right" });
      }

      const pdfBlob = pdf.output("blob");
      saveAs(pdfBlob, `OnTour-${slug}.pdf`);

      setPdfState("done");
      setTimeout(() => setPdfState("idle"), 3000);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setPdfState("idle");
    }
  }, [images, title, slug, pdfState]);

  /* ============================================================
   *  WORD Generation
   * ============================================================ */
  const generateWord = useCallback(async () => {
    if (wordState === "loading") return;
    setWordState("loading");

    try {
      const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        ImageRun,
        AlignmentType,
        Header,
        Footer,
        PageBreak,
      } = await import("docx");
      const { saveAs } = await import("file-saver");

      // Load logo for Word
      let logoData: { buffer: ArrayBuffer; width: number; height: number } | null = null;
      try {
        logoData = await imageToArrayBuffer("/image/logo-ON-TOUR-Nuevo.png");
      } catch {
        /* logo optional */
      }

      // Build sections children
      const children: (typeof Paragraph extends new (...args: infer A) => infer R ? R : never)[] = [];

      for (let i = 0; i < images.length; i++) {
        try {
          const imgData = await imageToArrayBuffer(images[i]);

          // Scale to fit A4-ish width (~600px usable at 72dpi → ~15.24cm)
          const maxW = 550;
          const maxH = 730;
          const ratio = imgData.width / imgData.height;
          let drawW = maxW;
          let drawH = drawW / ratio;
          if (drawH > maxH) {
            drawH = maxH;
            drawW = drawH * ratio;
          }

          children.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 100, after: 100 },
              children: [
                new ImageRun({
                  data: imgData.buffer,
                  transformation: { width: drawW, height: drawH },
                  type: "png",
                }),
              ],
            })
          );

          // Page break between images (except last)
          if (i < images.length - 1) {
            children.push(
              new Paragraph({
                children: [new PageBreak()],
              })
            );
          }
        } catch {
          children.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [
                new TextRun({
                  text: `Image ${i + 1} could not be loaded`,
                  color: "999999",
                  size: 24,
                }),
              ],
            })
          );
        }
      }

      // Header with logo and title
      const headerChildren: (typeof Paragraph extends new (...args: infer A) => infer R ? R : never)[] = [];

      if (logoData) {
        headerChildren.push(
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 100 },
            children: [
              new ImageRun({
                data: logoData.buffer,
                transformation: { width: 80, height: 80 },
                type: "png",
              }),
              new TextRun({
                text: `  ${title}`,
                bold: true,
                size: 28,
                color: "0B3A60",
                font: "Calibri",
              }),
            ],
          })
        );
      } else {
        headerChildren.push(
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `OnTour DMC Colombia — ${title}`,
                bold: true,
                size: 28,
                color: "0B3A60",
                font: "Calibri",
              }),
            ],
          })
        );
      }

      const doc = new Document({
        creator: "OnTour DMC Colombia",
        title: `${title} — OnTour DMC Colombia`,
        description: `Brochure for ${title}`,
        sections: [
          {
            headers: {
              default: new Header({ children: headerChildren }),
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "www.agenciaontour.com  |  gerencia@agenciaontour.com  |  +57 316 538 6892",
                        size: 16,
                        color: "0B3A60",
                        font: "Calibri",
                      }),
                    ],
                  }),
                ],
              }),
            },
            children,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `OnTour-${slug}.docx`);

      setWordState("done");
      setTimeout(() => setWordState("idle"), 3000);
    } catch (err) {
      console.error("Word generation failed:", err);
      setWordState("idle");
    }
  }, [images, title, slug, wordState]);

  /* ============================================================
   *  Button rendering
   * ============================================================ */
  const renderButton = (
    type: "pdf" | "word",
    state: DownloadState,
    handler: () => void
  ) => {
    const isPdf = type === "pdf";
    const Icon = state === "loading" ? Loader2 : state === "done" ? CheckCircle2 : isPdf ? FileDown : FileText;
    const label =
      state === "loading"
        ? labels.generating
        : state === "done"
          ? labels.downloaded
          : isPdf
            ? labels.downloadPdf
            : labels.downloadWord;

    return (
      <button
        onClick={handler}
        disabled={state === "loading"}
        className={`
          inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm
          transition-all duration-300 cursor-pointer
          border-2
          ${state === "done"
            ? "border-green-500 bg-green-50 text-green-700"
            : state === "loading"
              ? "border-gray-300 bg-gray-50 text-gray-500 cursor-wait"
              : isPdf
                ? "border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-400 hover:shadow-md hover:-translate-y-0.5"
                : "border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5"
          }
        `}
      >
        <Icon className={`w-5 h-5 ${state === "loading" ? "animate-spin" : ""}`} />
        {label}
      </button>
    );
  };

  if (!images.length) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <h3 className="text-lg font-heading font-semibold text-foreground/70">
        {labels.downloadBrochure}
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {renderButton("pdf", pdfState, generatePdf)}
        {renderButton("word", wordState, generateWord)}
      </div>
    </div>
  );
}
