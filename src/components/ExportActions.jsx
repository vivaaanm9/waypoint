import React from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Download, FileText, Table, Grid3X3 } from 'lucide-react';
import Button from './ui/Button';
import Tooltip from './ui/Tooltip';

export default function ExportActions({ 
  places = [], 
  title = 'Waypoint Explorer Export' 
}) {
  const prepareData = (dataList) => {
    return dataList.map((p) => ({
      ID: p.id,
      Name: p.name,
      Category: p.category,
      Rating: p.rating,
      Reviews: p.reviews,
      Address: p.address,
      Locality: p.locality || '',
      City: p.city || '',
      State: p.state || '',
      Pincode: p.pincode || '',
      Phone: p.phone || '',
      Website: p.website || '',
      Status: p.businessStatus || ''
    }));
  };

  const handleExportCSV = () => {
    if (places.length === 0) return alert('No data to export.');
    const data = prepareData(places);
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    if (places.length === 0) return alert('No data to export.');
    const data = prepareData(places);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Waypoints');
    XLSX.writeFile(wb, `${title.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
  };

  const handleExportPDF = () => {
    if (places.length === 0) return alert('No data to export.');
    const doc = new jsPDF();
    
    // Page Title
    doc.setFontSize(16);
    doc.text(title, 14, 15);
    
    doc.setFontSize(8);
    doc.text(`Generated on ${new Date().toLocaleString()} | Verified locations`, 14, 20);
    
    const tableRows = places.map((p) => [
      p.name,
      p.category,
      p.rating,
      p.reviews,
      p.address,
      p.phone || 'N/A'
    ]);

    doc.autoTable({
      head: [['Name', 'Category', 'Rating', 'Reviews', 'Address', 'Phone']],
      body: tableRows,
      startY: 25,
      theme: 'grid',
      styles: { fontSize: 8, font: 'helvetica' },
      headStyles: { fillColor: [71, 85, 105], textColor: [255, 255, 255] }
    });

    doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="flex flex-col space-y-2 select-none border border-brand-border/30 rounded-2xl p-4 bg-slate-50/50">
      <span className="text-[9px] font-extrabold uppercase text-slate-450 tracking-wider flex items-center gap-1.5 mb-1">
        <Download className="w-3.5 h-3.5" />
        <span>Export Current Results</span>
      </span>
      <div className="flex gap-2">
        <Tooltip text="Export data as CSV">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="flex-grow flex items-center justify-center gap-1.5 py-2 px-3 border border-brand-border/40 text-xs rounded-xl"
          >
            <FileText className="w-3.5 h-3.5 text-slate-450" />
            <span>CSV</span>
          </Button>
        </Tooltip>

        <Tooltip text="Export data as Excel spreadsheet">
          <Button
            onClick={handleExportExcel}
            variant="outline"
            size="sm"
            className="flex-grow flex items-center justify-center gap-1.5 py-2 px-3 border border-brand-border/40 text-xs rounded-xl"
          >
            <Grid3X3 className="w-3.5 h-3.5 text-slate-450" />
            <span>Excel</span>
          </Button>
        </Tooltip>

        <Tooltip text="Export data as PDF document">
          <Button
            onClick={handleExportPDF}
            variant="outline"
            size="sm"
            className="flex-grow flex items-center justify-center gap-1.5 py-2 px-3 border border-brand-border/40 text-xs rounded-xl"
          >
            <Table className="w-3.5 h-3.5 text-slate-450" />
            <span>PDF</span>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
export function exportSingleBusinessPDF(business) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(business.name, 14, 20);
  
  doc.setFontSize(10);
  doc.text(`Category: ${business.category}`, 14, 28);
  doc.text(`Rating: ${business.rating} (${business.reviews} reviews)`, 14, 34);
  doc.text(`Address: ${business.address}`, 14, 40);
  doc.text(`Phone: ${business.phone || 'N/A'}`, 14, 46);
  doc.text(`Website: ${business.website || 'N/A'}`, 14, 52);
  doc.text(`Operational Status: ${business.businessStatus || 'Active'}`, 14, 58);
  
  doc.setFontSize(12);
  doc.text("Description", 14, 68);
  doc.setFontSize(9);
  const splitDesc = doc.splitTextToSize(business.description || 'No description available.', 180);
  doc.text(splitDesc, 14, 74);
  
  if (business.reviewsList && business.reviewsList.length > 0) {
    doc.setFontSize(12);
    doc.text("Recent Reviews", 14, 95);
    
    const rows = business.reviewsList.map(r => [r.name, `${r.rating}/5`, r.text, r.date]);
    doc.autoTable({
      head: [['Reviewer', 'Rating', 'Comment', 'Date']],
      body: rows,
      startY: 100,
      theme: 'striped',
      styles: { fontSize: 8 }
    });
  }

  doc.save(`${business.name.toLowerCase().replace(/\s+/g, '_')}_details.pdf`);
}
