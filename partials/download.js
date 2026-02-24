// download.js — PDF export for song pages using jsPDF

(function () {
  const btn = document.getElementById('download-pdf');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const original = btn.textContent;
    btn.textContent = 'laddar...';
    btn.disabled = true;

    try {
      await loadJsPDF();
      generatePDF();
      btn.textContent = 'klar!';
    } catch (e) {
      console.error('PDF generation failed:', e);
      btn.textContent = 'något gick fel';
    } finally {
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 2000);
    }
  });

  function loadJsPDF() {
    if (window.jspdf) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function generatePDF() {
    const { jsPDF } = window.jspdf;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Extract content from DOM
    const contentDiv = document.querySelector('.content');
    const titleEl = contentDiv.querySelector('b');
    const melodyEl = contentDiv.querySelector('i');

    const title = titleEl ? titleEl.textContent.trim() : document.title;
    const melody = melodyEl ? melodyEl.textContent.trim() : '';

    // All <p> elements after the first one (title/melody paragraph) are verses
    const paragraphs = Array.from(contentDiv.querySelectorAll('p')).slice(1);
    const verses = paragraphs.map(p => p.textContent.trim()).filter(t => t.length > 0);

    // Page setup
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = doc.internal.pageSize.getWidth();   // 210mm
    const H = doc.internal.pageSize.getHeight();  // 297mm
    const margin = 25;
    const cw = W - margin * 2;                    // content width

    const bg = isDark ? [0, 0, 0] : [255, 255, 255];
    const fg = isDark ? [255, 255, 255] : [0, 0, 0];

    function fillPage() {
      doc.setFillColor(...bg);
      doc.rect(0, 0, W, H, 'F');
      doc.setTextColor(...fg);
      doc.setDrawColor(...fg);
    }

    fillPage();

    let y = margin + 5;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    const titleLines = doc.splitTextToSize(title, cw);
    doc.text(titleLines, W / 2, y, { align: 'center' });
    y += titleLines.length * 9 + 3;

    // Melody line
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    const melodyLines = doc.splitTextToSize(melody, cw);
    doc.text(melodyLines, W / 2, y, { align: 'center' });
    y += melodyLines.length * 5.5 + 8;

    // Separator
    doc.setLineWidth(0.3);
    doc.line(margin + 20, y, W - margin - 20, y);
    y += 10;

    // Verses
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    const lineH = 6.5;
    const verseGap = 5;

    verses.forEach(verse => {
      const lines = doc.splitTextToSize(verse, cw);
      const blockH = lines.length * lineH;

      if (y + blockH > H - margin) {
        doc.addPage();
        fillPage();
        y = margin;
      }

      doc.text(lines, W / 2, y, { align: 'center' });
      y += blockH + verseGap;
    });

    // Filename: lowercase, Swedish chars transliterated, spaces → underscore
    const filename = title
      .toLowerCase()
      .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') + '.pdf';

    doc.save(filename);
  }
})();
