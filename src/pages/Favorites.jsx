import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import Breadcrumb from "../components/ui/Breadcrumb";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import Toast from "../components/ui/Toast";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import ErrorState from "../components/ui/ErrorState";
import FavoriteButton from "../components/favorites/FavoriteButton";
import CollectionsPage from "../components/favorites/CollectionsPage";
import CollectionModal from "../components/favorites/CollectionModal";
import ExportButton from "../components/export/ExportButton";

import CSVExport from "../components/export/CSVExport";
import ExcelExport from "../components/export/ExcelExport";
import PDFExport from "../components/export/PDFExport";

import {
    FolderPlus,
    Search
} from "lucide-react";

const Favorites = () => {
    const { favorites, collections, createCollection, toggleFavorite } = useFavorites();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [loading] = useState(false);
    const [error] = useState(false);

    const breadcrumbItems = [
        "Home",
        "Favorites",
    ];

    const handleCreateCollection = (name) => {
        createCollection(name);
        setToastMessage("Collection Created Successfully");
        setShowToast(true);
    };

    const filteredBusinesses = (favorites || []).filter((business) =>
        business.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleCSV = () => {
        CSVExport(favorites);
        setToastMessage("Exported Favorites to CSV");
        setShowToast(true);
    };

    const handleExcel = () => {
        ExcelExport(favorites);
        setToastMessage("Exported Favorites to Excel");
        setShowToast(true);
    };

    const handlePDF = () => {
        PDFExport(favorites);
        setToastMessage("Exported Favorites to PDF");
        setShowToast(true);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <Breadcrumb items={breadcrumbItems} />

                {/* Header */}
                <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div>
                        <h1 className="text-4xl font-bold text-[#0F172A]">
                            My Favorites
                        </h1>
                        <p className="mt-2 text-[#64748B]">
                            Organize your favourite businesses into collections.
                        </p>
                    </div>

                    <Button
                        leftIcon={<FolderPlus size={18} />}
                        onClick={() => setShowModal(true)}
                    >
                        Create Collection
                    </Button>
                </div>

                {/* Search */}
                <div className="mt-10">
                    <Input
                        placeholder="Search Favorites..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        leftIcon={<Search size={18} />}
                    />
                </div>

                {/* Collection Modal */}
                <CollectionModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreateCollection}
                />

                {/* Toast */}
                <Toast
                    show={showToast}
                    message={toastMessage}
                    type="success"
                    onClose={() => setShowToast(false)}
                />

                {/* Collections */}
                <div className="mt-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-[#0F172A]">
                            Collections
                        </h2>
                        <Badge variant="secondary">
                            {(collections || []).length} Collections
                        </Badge>
                    </div>

                    <div className="mt-6">
                        <CollectionsPage collections={collections || []} />
                    </div>
                </div>

                {/* Favorite Businesses */}
                <div className="mt-16">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-[#0F172A]">
                            Favorite Businesses
                        </h2>
                        <Badge>
                            {filteredBusinesses.length} Saved
                        </Badge>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <LoadingSkeleton key={item} height="h-64" />
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="mt-8">
                            <ErrorState
                                title="Unable to load favorites"
                                message="Please try again later."
                            />
                        </div>
                    )}

                    {/* Cards */}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                            {filteredBusinesses.map((business) => (
                                <div
                                    key={business.id}
                                    className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                                >
                                    {/* Image */}
                                    <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600" />

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#0F172A]">
                                                    {business.name}
                                                </h3>
                                                <p className="mt-1 text-[#64748B]">
                                                    {business.address}
                                                </p>
                                            </div>

                                            <FavoriteButton
                                                isFavorite={true}
                                                onToggle={() => toggleFavorite(business)}
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 mt-5">
                                            <Badge>
                                                {business.category}
                                            </Badge>
                                            <Badge variant="warning">
                                                ⭐ {business.rating}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredBusinesses.length === 0 && (
                                <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-[#E2E8F0] w-full">
                                    <p className="text-gray-500">No favorites saved yet. Go back to Explore Map to add some!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Export */}
                <div className="mt-16 bg-white rounded-2xl border border-[#E2E8F0] p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#0F172A]">
                                Export Favorites
                            </h2>
                            <p className="mt-2 text-[#64748B]">
                                Download your saved businesses in different formats.
                            </p>
                        </div>

                        <ExportButton
                            onCSV={handleCSV}
                            onExcel={handleExcel}
                            onPDF={handlePDF}
                            disabled={filteredBusinesses.length === 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites;