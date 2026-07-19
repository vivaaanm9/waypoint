import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import Breadcrumb from "../components/ui/Breadcrumb";
import Badge from "../components/ui/Badge";
import Toast from "../components/ui/Toast";
import ExportButton from "../components/export/ExportButton";

import CSVExport from "../components/export/CSVExport";
import ExcelExport from "../components/export/ExcelExport";
import PDFExport from "../components/export/PDFExport";

import {
    FileSpreadsheet,
    Download,
    FileArchive,
} from "lucide-react";

const ExportCenter = () => {
    const { favorites } = useFavorites();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [exportHistory, setExportHistory] = useState([
        {
            id: 1,
            file: "favorites.csv",
            type: "CSV",
            date: "Today"
        }
    ]);

    const breadcrumbItems = [
        "Home",
        "Export Center",
    ];

    const handleCSV = () => {
        CSVExport(favorites);
        setExportHistory(prev => [
            {
                id: Date.now(),
                file: `favorites_${Date.now().toString().slice(-4)}.csv`,
                type: "CSV",
                date: "Just now"
            },
            ...prev
        ]);
        setToastMessage("CSV Export Completed Successfully");
        setShowToast(true);
    };

    const handleExcel = () => {
        ExcelExport(favorites);
        setExportHistory(prev => [
            {
                id: Date.now(),
                file: `favorites_${Date.now().toString().slice(-4)}.xlsx`,
                type: "Excel",
                date: "Just now"
            },
            ...prev
        ]);
        setToastMessage("Excel Export Completed Successfully");
        setShowToast(true);
    };

    const handlePDF = () => {
        PDFExport(favorites);
        setExportHistory(prev => [
            {
                id: Date.now(),
                file: `favorites_${Date.now().toString().slice(-4)}.pdf`,
                type: "PDF",
                date: "Just now"
            },
            ...prev
        ]);
        setToastMessage("PDF Export Completed Successfully");
        setShowToast(true);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <Breadcrumb items={breadcrumbItems} />

                {/* Header */}
                <div className="mt-6">
                    <h1 className="text-4xl font-bold text-[#0F172A]">
                        Export Center
                    </h1>
                    <p className="text-[#64748B] mt-2">
                        Download your saved businesses in multiple formats.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                        <FileSpreadsheet className="text-[#10B981]" size={40} />
                        <h2 className="text-3xl font-bold mt-5">
                            {(favorites || []).length}
                        </h2>
                        <p className="text-[#64748B] mt-1">
                            Businesses Ready
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                        <Download className="text-[#4F46E5]" size={40} />
                        <h2 className="text-3xl font-bold mt-5">
                            {exportHistory.length}
                        </h2>
                        <p className="text-[#64748B] mt-1">
                            Total Exports
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                        <FileArchive className="text-[#F59E0B]" size={40} />
                        <h2 className="text-3xl font-bold mt-5">
                            3
                        </h2>
                        <p className="text-[#64748B] mt-1">
                            Export Formats
                        </p>
                    </div>
                </div>

                {/* Export Options */}
                <div className="mt-12 bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                        <div>
                            <h2 className="text-2xl font-semibold">
                                Quick Export
                            </h2>
                            <p className="text-[#64748B] mt-2">
                                Export your business data instantly.
                            </p>
                        </div>

                        <ExportButton
                            onCSV={handleCSV}
                            onExcel={handleExcel}
                            onPDF={handlePDF}
                            disabled={(favorites || []).length === 0}
                        />
                    </div>
                </div>

                {/* Export History */}
                <div className="mt-12">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">
                            Recent Exports
                        </h2>
                        <Badge>
                            {exportHistory.length} Files
                        </Badge>
                    </div>

                    <div className="mt-6 space-y-5">
                        {exportHistory.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex justify-between items-center shadow-sm"
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {item.file}
                                    </h3>
                                    <p className="text-[#64748B] mt-1 text-sm">
                                        {item.date}
                                    </p>
                                </div>
                                <Badge variant="secondary">
                                    {item.type}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                <Toast
                    show={showToast}
                    message={toastMessage}
                    type="success"
                    onClose={() => setShowToast(false)}
                />
            </div>
        </div>
    );
};

export default ExportCenter;