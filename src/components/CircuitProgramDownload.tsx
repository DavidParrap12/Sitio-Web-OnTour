"use client";

import { useState, useCallback } from "react";
import { FileDown, FileText, Loader2, CheckCircle2 } from "lucide-react";

interface CircuitProgramDownloadProps {
  name: string;
  slug: string;
  description: string;
  highlights: string[];
  itinerary: string[];
  days: number;
  nights: number;
  price: string;
  brochureUrl?: string;
  brochurePdfUrl?: string;
  labels: {
    downloadPdf: string;
    downloadWord: string;
    downloadProgram: string;
    generating: string;
    downloaded: string;
    tripDescription: string;
    youWillEnjoy: string;
    itineraryLabel: string;
    duration: string;
    daysNights: string;
    priceLabel: string;
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
function imageToBase64(img: HTMLImageElement, format: "JPEG" | "PNG" = "PNG"): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL(`image/${format.toLowerCase()}`, 0.92);
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

export function CircuitProgramDownload({
  name, slug, description, highlights, itinerary, days, nights, price, labels, brochureUrl, brochurePdfUrl,
}: CircuitProgramDownloadProps) {
  const [pdfState, setPdfState] = useState<DownloadState>("idle");
  const [wordState, setWordState] = useState<DownloadState>("idle");

  /* ============================================================
   *  PDF Download / Generation — real file or dynamic generation
   * ============================================================ */
  const generatePdf = useCallback(async () => {
    if (pdfState === "loading") return;
    setPdfState("loading");

    try {
      const { saveAs } = await import("file-saver");

      /* --- If a real PDF brochure file exists, download it directly --- */
      if (brochurePdfUrl) {
        const response = await fetch(brochurePdfUrl);
        if (!response.ok) throw new Error(`Failed to fetch PDF brochure: ${response.status}`);
        const blob = await response.blob();
        saveAs(blob, `OnTour-Programa-${slug}.pdf`);
        setPdfState("done");
        setTimeout(() => setPdfState("idle"), 3000);
        return;
      }

      const { default: jsPDF } = await import("jspdf");

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentW = pageW - margin * 2;

      // Brand colors
      const brandR = 11, brandG = 58, brandB = 96; // #0B3A60
      const accentR = 77, accentG = 216, accentB = 224; // #4DD8E0

      // Load logo
      let logoBase64: string | null = null;
      try {
        const logoImg = await loadImage("/image/logo-ON-TOUR-Nuevo.png");
        logoBase64 = imageToBase64(logoImg, "PNG");
      } catch { /* logo optional */ }

      let y = 0;

      /* --- Draw header on any page --- */
      const drawHeader = () => {
        pdf.setFillColor(brandR, brandG, brandB);
        pdf.rect(0, 0, pageW, 28, "F");
        if (logoBase64) pdf.addImage(logoBase64, "PNG", margin, 3, 22, 22);
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(name, logoBase64 ? margin + 26 : margin, 14);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.text("OnTour DMC Colombia", logoBase64 ? margin + 26 : margin, 21);
      };

      /* --- Draw footer on any page --- */
      const drawFooter = () => {
        pdf.setFillColor(brandR, brandG, brandB);
        pdf.rect(0, pageH - 10, pageW, 10, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(7);
        pdf.setFont("helvetica", "normal");
        pdf.text(
          "www.agenciaontour.com  |  gerencia@agenciaontour.com  |  +57 316 538 6892",
          pageW / 2, pageH - 4, { align: "center" }
        );
      };

      /* --- Check page break --- */
      const checkPageBreak = (neededH: number) => {
        if (y + neededH > pageH - 18) {
          drawFooter();
          pdf.addPage();
          drawHeader();
          y = 34;
        }
      };

      // ===== PAGE 1: Cover =====
      drawHeader();
      y = 34;

      // Duration & price badges
      pdf.setFillColor(accentR, accentG, accentB);
      pdf.roundedRect(margin, y, 60, 8, 2, 2, "F");
      pdf.setTextColor(brandR, brandG, brandB);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${labels.duration}: ${labels.daysNights}`, margin + 3, y + 5.5);

      pdf.setFillColor(brandR, brandG, brandB);
      pdf.roundedRect(margin + 65, y, 55, 8, 2, 2, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.text(`${labels.priceLabel}: ${price}`, margin + 68, y + 5.5);

      y += 16;

      // Description
      pdf.setTextColor(brandR, brandG, brandB);
      pdf.setFontSize(13);
      pdf.setFont("helvetica", "bold");
      pdf.text(labels.tripDescription, margin, y);
      y += 8;

      pdf.setTextColor(60, 60, 60);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const descLines = pdf.splitTextToSize(description, contentW);
      pdf.text(descLines, margin, y);
      y += descLines.length * 5 + 8;

      // Highlights
      checkPageBreak(20);
      pdf.setTextColor(brandR, brandG, brandB);
      pdf.setFontSize(13);
      pdf.setFont("helvetica", "bold");
      pdf.text(labels.youWillEnjoy, margin, y);
      y += 8;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      for (const h of highlights) {
        checkPageBreak(7);
        pdf.setTextColor(accentR, accentG, accentB);
        pdf.text("✓", margin, y);
        pdf.setTextColor(60, 60, 60);
        const hLines = pdf.splitTextToSize(h, contentW - 8);
        pdf.text(hLines, margin + 6, y);
        y += hLines.length * 5 + 2;
      }

      y += 6;

      // Itinerary
      checkPageBreak(20);
      pdf.setTextColor(brandR, brandG, brandB);
      pdf.setFontSize(13);
      pdf.setFont("helvetica", "bold");
      pdf.text(labels.itineraryLabel, margin, y);
      y += 10;

      for (const day of itinerary) {
        const colonIdx = day.indexOf(".");
        const dayTitle = colonIdx > 0 ? day.substring(0, colonIdx + 1) : "";
        const dayBody = colonIdx > 0 ? day.substring(colonIdx + 1).trim() : day;

        // Estimate height
        const titleLines = dayTitle ? pdf.splitTextToSize(dayTitle, contentW - 4) : [];
        const bodyLines = pdf.splitTextToSize(dayBody, contentW - 4);
        const blockH = (titleLines.length + bodyLines.length) * 5 + 12;

        checkPageBreak(blockH);

        // Day card background
        pdf.setFillColor(245, 248, 252);
        pdf.roundedRect(margin, y - 2, contentW, blockH, 2, 2, "F");

        // Accent bar
        pdf.setFillColor(accentR, accentG, accentB);
        pdf.rect(margin, y - 2, 2, blockH, "F");

        if (dayTitle) {
          pdf.setTextColor(brandR, brandG, brandB);
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "bold");
          pdf.text(titleLines, margin + 6, y + 4);
          y += titleLines.length * 5 + 2;
        }

        pdf.setTextColor(60, 60, 60);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.text(bodyLines, margin + 6, y + 4);
        y += bodyLines.length * 5 + 10;
      }

      drawFooter();

      const pdfBlob = pdf.output("blob");
      saveAs(pdfBlob, `OnTour-Programa-${slug}.pdf`);

      setPdfState("done");
      setTimeout(() => setPdfState("idle"), 3000);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setPdfState("idle");
    }
  }, [name, slug, description, highlights, itinerary, days, nights, price, labels, pdfState, brochurePdfUrl]);

  /* ============================================================
   *  WORD Download / Generation — real file or dynamic generation
   * ============================================================ */
  const generateWord = useCallback(async () => {
    if (wordState === "loading") return;
    setWordState("loading");

    try {
      const { saveAs } = await import("file-saver");

      /* --- If a real brochure file exists, download it directly --- */
      if (brochureUrl) {
        const response = await fetch(brochureUrl);
        if (!response.ok) throw new Error(`Failed to fetch brochure: ${response.status}`);
        const blob = await response.blob();
        saveAs(blob, `OnTour-Programa-${slug}.docx`);
        setWordState("done");
        setTimeout(() => setWordState("idle"), 3000);
        return;
      }

      /* --- Otherwise generate Word dynamically --- */
      const {
        Document, Packer, Paragraph, TextRun, ImageRun,
        AlignmentType, Header, Footer, BorderStyle, HeadingLevel,
      } = await import("docx");

      // Load logo
      let logoData: { buffer: ArrayBuffer; width: number; height: number } | null = null;
      try {
        logoData = await imageToArrayBuffer("/image/logo-ON-TOUR-Nuevo.png");
      } catch { /* logo optional */ }

      const children: InstanceType<typeof Paragraph>[] = [];

      // Duration & Price line
      children.push(
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: `${labels.duration}: ${labels.daysNights}`,
              bold: true,
              size: 22,
              color: "4DD8E0",
              font: "Calibri",
            }),
            new TextRun({
              text: `     ${labels.priceLabel}: ${price}`,
              bold: true,
              size: 22,
              color: "0B3A60",
              font: "Calibri",
            }),
          ],
        })
      );

      // Description heading
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 100 },
          children: [
            new TextRun({
              text: labels.tripDescription,
              bold: true,
              size: 28,
              color: "0B3A60",
              font: "Calibri",
            }),
          ],
        })
      );

      // Description text
      children.push(
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: description,
              size: 22,
              color: "3C3C3C",
              font: "Calibri",
            }),
          ],
        })
      );

      // Highlights heading
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 100 },
          children: [
            new TextRun({
              text: labels.youWillEnjoy,
              bold: true,
              size: 28,
              color: "0B3A60",
              font: "Calibri",
            }),
          ],
        })
      );

      // Highlights
      for (const h of highlights) {
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({
                text: "✓  ",
                bold: true,
                size: 22,
                color: "4DD8E0",
                font: "Calibri",
              }),
              new TextRun({
                text: h,
                size: 22,
                color: "3C3C3C",
                font: "Calibri",
              }),
            ],
          })
        );
      }

      // Itinerary heading
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 150 },
          children: [
            new TextRun({
              text: labels.itineraryLabel,
              bold: true,
              size: 28,
              color: "0B3A60",
              font: "Calibri",
            }),
          ],
        })
      );

      // Itinerary days
      for (const day of itinerary) {
        const colonIdx = day.indexOf(".");
        const dayTitle = colonIdx > 0 ? day.substring(0, colonIdx + 1) : "";
        const dayBody = colonIdx > 0 ? day.substring(colonIdx + 1).trim() : day;

        if (dayTitle) {
          children.push(
            new Paragraph({
              spacing: { before: 200, after: 40 },
              border: {
                left: { style: BorderStyle.SINGLE, size: 6, color: "4DD8E0", space: 8 },
              },
              children: [
                new TextRun({
                  text: dayTitle,
                  bold: true,
                  size: 22,
                  color: "0B3A60",
                  font: "Calibri",
                }),
              ],
            })
          );
        }

        children.push(
          new Paragraph({
            spacing: { after: 120 },
            border: {
              left: { style: BorderStyle.SINGLE, size: 6, color: "4DD8E0", space: 8 },
            },
            children: [
              new TextRun({
                text: dayBody,
                size: 20,
                color: "3C3C3C",
                font: "Calibri",
              }),
            ],
          })
        );
      }

      // Header
      const headerChildren: InstanceType<typeof Paragraph>[] = [];
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
                text: `  ${name}`,
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
                text: `OnTour DMC Colombia — ${name}`,
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
        title: `${name} — Programa de Viaje`,
        description: `Programa del circuito ${name}`,
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
      saveAs(blob, `OnTour-Programa-${slug}.docx`);

      setWordState("done");
      setTimeout(() => setWordState("idle"), 3000);
    } catch (err) {
      console.error("Word generation failed:", err);
      setWordState("idle");
    }
  }, [name, slug, description, highlights, itinerary, days, nights, price, labels, wordState, brochureUrl]);

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
          inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-xs
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
        <Icon className={`w-4 h-4 ${state === "loading" ? "animate-spin" : ""}`} />
        {label}
      </button>
    );
  };

  return (
    <div className="border-t pt-5 mb-2">
      <div className="grid grid-cols-2 gap-2">
        {renderButton("word", wordState, generateWord)}
        {renderButton("pdf", pdfState, generatePdf)}
      </div>
    </div>
  );
}
