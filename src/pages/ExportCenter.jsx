import { useState } from "react";

import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Toast from "../components/ui/Toast";

import ExportButton from "../components/export/ExportButton";

import CSVExport from "../services/export/CSVExport";
import ExcelExport from "../services/export/ExcelExport";
import PDFExport from "../services/export/PDFExport";

import {
    FileSpreadsheet,
    FileText,
    FileArchive,
    Download,
} from "lucide-react";

const ExportCenter = () => {

    const breadcrumbItems = [
        "Home",
        "Export Center",
    ];

    const [showToast, setShowToast] = useState(false);

    const businessData = [
        {
            name: "Starbucks",
            category: "Cafe",
            rating: 4.7,
        },
        {
            name: "Dominos",
            category: "Restaurant",
            rating: 4.5,
        },
        {
            name: "Taj Hotel",
            category: "Hotel",
            rating: 4.9,
        },
    ];

    const exportHistory = [
        {
            id: 1,
            file: "favorites.csv",
            type: "CSV",
            date: "Today"
        },
        {
            id: 2,
            file: "restaurants.xlsx",
            type: "Excel",
            date: "Yesterday"
        },
        {
            id: 3,
            file: "hotels.pdf",
            type: "PDF",
            date: "2 Days Ago"
        }
    ];

    const handleCSV = () => {

        CSVExport(businessData);

        setShowToast(true);

    };

    const handleExcel = () => {

        ExcelExport(businessData);

        setShowToast(true);

    };

    const handlePDF = () => {

        PDFExport(businessData);

        setShowToast(true);

    };

    return (

        <div className="min-h-screen bg-[#F8FAFC]">

            <div className="max-w-7xl mx-auto px-6 py-10">

                <Breadcrumb
                    items={breadcrumbItems}
                />

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

                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">

                        <FileSpreadsheet
                            className="text-[#10B981]"
                            size={40}
                        />

                        <h2 className="text-3xl font-bold mt-5">

                            145

                        </h2>

                        <p className="text-[#64748B]">

                            Businesses Ready

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">

                        <Download
                            className="text-[#4F46E5]"
                            size={40}
                        />

                        <h2 className="text-3xl font-bold mt-5">

                            23

                        </h2>

                        <p className="text-[#64748B]">

                            Total Exports

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">

                        <FileArchive
                            className="text-[#F59E0B]"
                            size={40}
                        />

                        <h2 className="text-3xl font-bold mt-5">

                            3

                        </h2>

                        <p className="text-[#64748B]">

                            Export Formats

                        </p>

                    </div>

                </div>

                {/* Export Options */}

                <div className="mt-12 bg-white rounded-2xl border border-[#E2E8F0] p-8">

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

                        {exportHistory.map((item)=>(

                            <div

                                key={item.id}

                                className="
                                    bg-white
                                    border
                                    border-[#E2E8F0]
                                    rounded-2xl
                                    p-5
                                    flex
                                    justify-between
                                    items-center
                                "

                            >

                                <div>

                                    <h3 className="font-semibold">

                                        {item.file}

                                    </h3>

                                    <p className="text-[#64748B] mt-1">

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

                    message="Export Completed Successfully"

                    type="success"

                    onClose={() => setShowToast(false)}

                />

            </div>

        </div>

    );

};

export default ExportCenter;