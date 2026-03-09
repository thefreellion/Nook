import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Heart, Calendar, FileText, MessageSquare, BarChart2, Star, MapPin, Trash2, StickyNote, Plus, CheckCircle, Clock, Phone, ChevronRight, Upload, X } from "lucide-react";

const SAVED = [
    { id: "1", name: "Sunrise Gardens", type: "Assisted Living", city: "Seattle, WA", price: 4200, rating: 4.8, img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&q=80", compare: true },
    { id: "2", name: "Meadowbrook Memory Care", type: "Memory Care", city: "Bellevue, WA", price: 5800, rating: 4.9, img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80", compare: true },
    { id: "3", name: "Evergreen Family Home", type: "Adult Family Home", city: "Kirkland, WA", price: 3800, rating: 4.6, img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80", compare: false },
];

const TOURS = [
    { id: "1", facility: "Sunrise Gardens", date: "March 14, 2026", time: "10:00 AM", type: "In-Person", status: "Confirmed" },
    { id: "2", facility: "Meadowbrook Memory Care", date: "March 18, 2026", time: "2:00 PM", type: "Virtual", status: "Pending" },
    { id: "3", facility: "Harborview Residence", date: "February 28, 2026", time: "11:00 AM", type: "In-Person", status: "Completed" },
];

const DOCS = [
    { name: "Medical Records - Dr. Chen.pdf", size: "2.4 MB", date: "Feb 12, 2026" },
    { name: "Insurance Card (Aetna).pdf", size: "0.8 MB", date: "Jan 30, 2026" },
    { name: "Power of Attorney.pdf", size: "1.2 MB", date: "Mar 1, 2026" },
];

const COMPARE_DATA = {
    "Sunrise Gardens": { price: "$4,200/mo", rating: "4.8 ⭐", beds: "3 available", care: "24/7", certs: "Medicare, CARF", type: "Assisted Living" },
    "Meadowbrook Memory Care": { price: "$5,800/mo", rating: "4.9 ⭐", beds: "1 available", care: "24/7", certs: "Medicare, Joint Commission", type: "Memory Care" },
};

const statusColors = { Confirmed: "bg-[#EBF3ED] text-[#4A7C59]", Pending: "bg-[#FBF3E8] text-[#C67C3A]", Completed: "bg-[#F5F2ED] text-[#8B8B8B]", Cancelled: "bg-[#FEE2E2] text-[#EF4444]" };

export default function FamilyDashboard() {
    const [activeTab, setActiveTab] = useState("saved");
    const [savedFacilities, setSavedFacilities] = useState(SAVED);
    const [showCompare, setShowCompare] = useState(false);

    const tabs = [
        { id: "saved", label: "Saved Facilities", icon: <Heart className="w-4 h-4" /> },
        { id: "tours", label: "Tour Schedule", icon: <Calendar className="w-4 h-4" /> },
        { id: "documents", label: "Documents", icon: <FileText className="w-4 h-4" /> },
        { id: "compare", label: "Compare", icon: <BarChart2 className="w-4 h-4" /> },
    ];

    const compareFacilities = savedFacilities.filter(f => f.compare);

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-[#8B8B8B] text-sm mb-1">Welcome back</p>
                            <h1 className="font-display text-3xl font-semibold text-[#2D3142]">Family Dashboard</h1>
                        </div>
                        <Link to={createPageUrl("Assessment")}>
                            <button className="btn-primary flex items-center gap-2 text-sm">
                                <Plus className="w-4 h-4" /> New Assessment
                            </button>
                        </Link>
                    </div>

                    {/* Loved one card */}
                    <div className="mt-5 bg-white rounded-2xl p-5 card-shadow flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] flex items-center justify-center">
                                <Heart className="w-6 h-6 text-[#4A7C59] fill-[#4A7C59]" />
                            </div>
                            <div>
                                <p className="font-semibold text-[#2D3142]">Eleanor Thompson</p>
                                <p className="text-[#8B8B8B] text-sm">Age 82 · Seeking Assisted Living</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="bg-[#FBF3E8] text-[#C67C3A] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Planning (3-6 months)</span>
                            <span className="bg-[#EBF1F8] text-[#5B7FA6] px-3 py-1 rounded-full text-xs font-semibold">Budget: $4k–6k/mo</span>
                            <Link to={createPageUrl("Assessment")} className="text-xs text-[#4A7C59] font-medium hover:underline">Update assessment →</Link>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-[#F0EDE7] rounded-xl p-1 mb-6 overflow-x-auto">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center ${activeTab === t.id ? 'bg-white text-[#2D3142] card-shadow' : 'text-[#8B8B8B] hover:text-[#2D3142]'}`}
                        >
                            {t.icon}
                            <span className="hidden sm:block">{t.label}</span>
                        </button>
                    ))}
                </div>

                {/* Saved Facilities */}
                {activeTab === "saved" && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-[#2D3142]">{savedFacilities.length} saved facilities</h2>
                            <Link to={createPageUrl("Search")}>
                                <button className="text-sm text-[#4A7C59] font-medium hover:underline flex items-center gap-1">Find more <ChevronRight className="w-3 h-3" /></button>
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {savedFacilities.map(f => (
                                <div key={f.id} className="bg-white rounded-2xl overflow-hidden card-shadow flex flex-col sm:flex-row">
                                    <div className="sm:w-36 h-40 sm:h-auto shrink-0">
                                        <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 p-5">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-semibold text-[#2D3142] text-base mb-0.5">{f.name}</h3>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-xs bg-[#EBF3ED] text-[#4A7C59] px-2 py-0.5 rounded-full font-medium">{f.type}</span>
                                                    <span className="text-xs text-[#8B8B8B] flex items-center gap-1"><MapPin className="w-3 h-3" />{f.city}</span>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                                                        <span className="text-xs font-medium text-[#2D3142]">{f.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => setSavedFacilities(s => s.filter(x => x.id !== f.id))} className="p-1.5 hover:bg-[#FAF8F5] rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4 text-[#C0BBB5]" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                                            <span className="font-bold text-[#2D3142]">${f.price.toLocaleString()}<span className="font-normal text-[#8B8B8B] text-sm">/mo</span></span>
                                            <div className="flex gap-2">
                                                <label className="flex items-center gap-1.5 text-xs text-[#6B6B6B] cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={f.compare}
                                                        onChange={() => setSavedFacilities(s => s.map(x => x.id === f.id ? { ...x, compare: !x.compare } : x))}
                                                        className="accent-[#4A7C59] w-3.5 h-3.5"
                                                    />
                                                    Compare
                                                </label>
                                                <Link to={createPageUrl("FacilityDetail")}>
                                                    <button className="btn-primary text-xs px-3 py-2">View Details</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tours */}
                {activeTab === "tours" && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-[#2D3142]">Your Tours</h2>
                            <Link to={createPageUrl("FacilityDetail")}>
                                <button className="text-sm text-[#4A7C59] font-medium hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Schedule tour</button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {TOURS.map(t => (
                                <div key={t.id} className="bg-white rounded-2xl p-5 card-shadow">
                                    <div className="flex items-start justify-between flex-wrap gap-3">
                                        <div>
                                            <h3 className="font-semibold text-[#2D3142] text-base mb-1">{t.facility}</h3>
                                            <div className="flex items-center gap-3 text-sm text-[#6B6B6B] flex-wrap">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{t.date}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.time}</span>
                                                <span className="bg-[#F5F2ED] text-[#6B6B6B] text-xs px-2 py-0.5 rounded-full">{t.type}</span>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[t.status]}`}>{t.status}</span>
                                    </div>
                                    {t.status !== "Completed" && (
                                        <div className="flex gap-2 mt-4 pt-4 border-t border-[#F0EDE7]">
                                            <button className="text-xs font-semibold text-[#5B7FA6] border border-[#5B7FA6] px-3 py-1.5 rounded-lg hover:bg-[#EBF1F8] transition-colors">Reschedule</button>
                                            <button className="text-xs font-semibold text-[#E05B5B] border border-[#E05B5B] px-3 py-1.5 rounded-lg hover:bg-[#FEE2E2] transition-colors">Cancel</button>
                                            <Link to={createPageUrl("Messaging")} className="ml-auto">
                                                <button className="text-xs font-semibold text-[#4A7C59] flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Message facility</button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Documents */}
                {activeTab === "documents" && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-[#2D3142]">Uploaded Documents</h2>
                            <button className="btn-primary text-sm flex items-center gap-2 px-4 py-2.5"><Upload className="w-4 h-4" /> Upload</button>
                        </div>
                        <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                            {DOCS.map((doc, i) => (
                                <div key={doc.name} className={`flex items-center gap-4 p-4 ${i < DOCS.length - 1 ? 'border-b border-[#F0EDE7]' : ''}`}>
                                    <div className="w-10 h-10 rounded-xl bg-[#EBF1F8] flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-[#5B7FA6]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-[#2D3142] text-sm truncate">{doc.name}</p>
                                        <p className="text-[#8B8B8B] text-xs">{doc.size} · Uploaded {doc.date}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-xs text-[#5B7FA6] font-medium hover:underline">View</button>
                                        <button className="text-xs text-[#E05B5B] font-medium hover:underline">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 border-2 border-dashed border-[#D0CCC6] rounded-2xl p-8 text-center">
                            <Upload className="w-8 h-8 text-[#C0BBB5] mx-auto mb-3" />
                            <p className="text-[#2D3142] font-medium mb-1">Drop files here or click to upload</p>
                            <p className="text-[#8B8B8B] text-sm">Medical records, insurance cards, legal documents (PDF, JPG, PNG)</p>
                        </div>
                    </div>
                )}

                {/* Compare */}
                {activeTab === "compare" && (
                    <div>
                        <div className="mb-5">
                            <h2 className="font-semibold text-[#2D3142] mb-1">Side-by-side Comparison</h2>
                            <p className="text-[#8B8B8B] text-sm">Select facilities to compare from your saved list.</p>
                        </div>
                        {compareFacilities.length >= 2 ? (
                            <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                                <div className="grid" style={{ gridTemplateColumns: `200px repeat(${compareFacilities.length}, 1fr)` }}>
                                    {/* Header row */}
                                    <div className="p-4 bg-[#FAF8F5] border-b border-r border-[#F0EDE7]" />
                                    {compareFacilities.map(f => (
                                        <div key={f.id} className="p-4 bg-[#FAF8F5] border-b border-r border-[#F0EDE7] last:border-r-0 text-center">
                                            <img src={f.img} alt={f.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                                            <p className="font-semibold text-[#2D3142] text-sm">{f.name}</p>
                                            <p className="text-[#8B8B8B] text-xs">{f.city}</p>
                                        </div>
                                    ))}

                                    {/* Data rows */}
                                    {[
                                        ["Monthly Price", f => `$${f.price.toLocaleString()}/mo`],
                                        ["Rating", f => `${f.rating} ★`],
                                        ["Care Type", f => f.type],
                                        ["24/7 Care", () => "✓ Yes"],
                                        ["Medicare", () => "✓ Accepted"],
                                    ].map(([label, getVal]) => (
                                        <>
                                            <div key={label} className="p-4 border-b border-r border-[#F0EDE7] bg-[#FAF8F5]">
                                                <p className="text-sm font-medium text-[#6B6B6B]">{label}</p>
                                            </div>
                                            {compareFacilities.map(f => (
                                                <div key={f.id + label} className="p-4 border-b border-r border-[#F0EDE7] last:border-r-0 text-center">
                                                    <p className="text-sm text-[#2D3142] font-medium">{getVal(f)}</p>
                                                </div>
                                            ))}
                                        </>
                                    ))}

                                    {/* CTA row */}
                                    <div className="p-4 border-r border-[#F0EDE7] bg-[#FAF8F5]" />
                                    {compareFacilities.map(f => (
                                        <div key={f.id + "cta"} className="p-4 border-r border-[#F0EDE7] last:border-r-0 flex justify-center">
                                            <Link to={createPageUrl("FacilityDetail")}>
                                                <button className="btn-primary text-xs px-4 py-2">View Details</button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl card-shadow p-10 text-center">
                                <BarChart2 className="w-10 h-10 text-[#C0BBB5] mx-auto mb-3" />
                                <p className="font-semibold text-[#2D3142] mb-1">No facilities selected for comparison</p>
                                <p className="text-[#8B8B8B] text-sm mb-4">Go to Saved Facilities and check "Compare" on at least 2 facilities.</p>
                                <button onClick={() => setActiveTab("saved")} className="btn-primary text-sm px-5 py-2.5">View Saved Facilities</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}