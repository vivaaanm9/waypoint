import { useState } from "react";

import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Toast from "../components/ui/Toast";

import FavoriteButton from "../components/favorites/FavoriteButton";
import NotesEditor from "../components/favorites/NotesEditor";
import TagSelector from "../components/favorites/TagSelector";

import ExportButton from "../components/export/ExportButton";

import {
    ArrowLeft,
    MapPin,
    Globe,
    Phone,
    Star,
} from "lucide-react";

const CollectionDetails = () => {

    const breadcrumbItems = [
        "Home",
        "Favorites",
        "Weekend Cafes",
    ];

    const [showToast, setShowToast] = useState(false);

    const [businesses, setBusinesses] = useState([
        {
            id: 1,
            name: "Starbucks",
            category: "Cafe",
            rating: 4.8,
            address: "Thane",
            phone: "+91 9876543210",
            website: "www.starbucks.com",
            favorite: true,
        },
        {
            id: 2,
            name: "Blue Tokai",
            category: "Cafe",
            rating: 4.6,
            address: "Powai",
            phone: "+91 9876543211",
            website: "www.bluetokai.com",
            favorite: true,
        },
        {
            id: 3,
            name: "Third Wave Coffee",
            category: "Cafe",
            rating: 4.7,
            address: "Bandra",
            phone: "+91 9876543212",
            website: "www.thirdwave.coffee",
            favorite: true,
        },
    ]);

    const toggleFavorite = (id) => {

        setBusinesses((prev) =>
            prev.map((business) =>
                business.id === id
                    ? {
                          ...business,
                          favorite: !business.favorite,
                      }
                    : business
            )
        );

        setShowToast(true);

    };

    return (

        <div className="min-h-screen bg-[#F8FAFC]">

            <div className="max-w-7xl mx-auto px-6 py-10">

                <Breadcrumb
                    items={breadcrumbItems}
                />

                {/* Header */}

                <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div>

                        <Button
                            variant="ghost"
                            leftIcon={<ArrowLeft size={18} />}
                        >
                            Back
                        </Button>

                        <h1 className="text-4xl font-bold text-[#0F172A] mt-5">

                            Weekend Cafes

                        </h1>

                        <p className="text-[#64748B] mt-2">

                            3 Saved Businesses

                        </p>

                    </div>

                    <ExportButton
                        onCSV={() => console.log("CSV")}
                        onExcel={() => console.log("Excel")}
                        onPDF={() => console.log("PDF")}
                    />

                </div>

                {/* Businesses */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">

                    {businesses.map((business) => (

                        <div
                            key={business.id}
                            className="
                                bg-white
                                rounded-2xl
                                border
                                border-[#E2E8F0]
                                overflow-hidden
                                shadow-sm
                                hover:shadow-lg
                                transition-all
                            "
                        >

                            {/* Image */}

                            <div className="h-56 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]" />

                            {/* Content */}

                            <div className="p-6">

                                <div className="flex justify-between">

                                    <div>

                                        <h2 className="text-2xl font-semibold">

                                            {business.name}

                                        </h2>

                                        <div className="flex gap-3 mt-3">

                                            <Badge>

                                                {business.category}

                                            </Badge>

                                            <Badge variant="warning">

                                                ⭐ {business.rating}

                                            </Badge>

                                        </div>

                                    </div>

                                    <FavoriteButton
                                        isFavorite={business.favorite}
                                        onToggle={() =>
                                            toggleFavorite(business.id)
                                        }
                                    />

                                </div>

                                <div className="space-y-4 mt-8">

                                    <div className="flex gap-3">

                                        <MapPin size={18}/>

                                        {business.address}

                                    </div>

                                    <div className="flex gap-3">

                                        <Phone size={18}/>

                                        {business.phone}

                                    </div>

                                    <div className="flex gap-3">

                                        <Globe size={18}/>

                                        {business.website}

                                    </div>

                                </div>
                                                                {/* Action Buttons */}

                                <div className="flex gap-3 mt-8">

                                    <Button
                                        fullWidth
                                        leftIcon={<Globe size={18} />}
                                    >
                                        Visit Website
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        fullWidth
                                        leftIcon={<Phone size={18} />}
                                    >
                                        Call
                                    </Button>

                                </div>

                                {/* Personal Notes */}

                                <div className="mt-10">

                                    <h3 className="text-lg font-semibold text-[#0F172A] mb-4">

                                        Personal Notes

                                    </h3>

                                    <NotesEditor
                                        initialNote="Amazing ambience and excellent coffee."
                                        onSave={() =>
                                            setShowToast(true)
                                        }
                                    />

                                </div>

                                {/* Tags */}

                                <div className="mt-10">

                                    <h3 className="text-lg font-semibold text-[#0F172A] mb-4">

                                        Tags

                                    </h3>

                                    <TagSelector />

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Export Section */}

                <div className="mt-16 bg-white rounded-2xl border border-[#E2E8F0] p-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                        <div>

                            <h2 className="text-2xl font-semibold text-[#0F172A]">

                                Export Collection

                            </h2>

                            <p className="text-[#64748B] mt-2">

                                Download this collection in CSV, Excel or PDF format.

                            </p>

                        </div>

                        <ExportButton

                            onCSV={() => console.log("CSV")}

                            onExcel={() => console.log("Excel")}

                            onPDF={() => console.log("PDF")}

                        />

                    </div>

                </div>

                {/* Toast */}

                <Toast
                    show={showToast}
                    type="success"
                    message="Changes Saved Successfully"
                    onClose={() => setShowToast(false)}
                />

            </div>

        </div>

    );

};

export default CollectionDetails;