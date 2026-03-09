import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Star, MapPin, Phone, Mail, Heart, ChevronRight, ChevronLeft, Shield, CheckCircle, Users, Calendar, Clock, Video, Printer, Share2, Bed, Navigation, Award, Utensils, Dumbbell, Trees, Music, BookOpen, Car } from "lucide-react";

const FACILITY = {
    name: "Sunrise Gardens Assisted Living",
    type: "Assisted Living",
    city: "Seattle", state: "WA",
    address: "1234 Cedar Ridge Blvd, Seattle, WA 98101",
    phone: "(206) 555-0142",
    email: "info@sunrisegardens.com",
    starting_price: 4200,
    max_price: 6500,
    capacity: 64,
    beds_available: 3,
    rating: 4.8,
    review_count: 127,
    nurse_ratio: "1:6 during day / 1:10 at night",
    care_24_7: true,
    virtual_tour_url: "#",
    images: [
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=900&q=80",
        "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=900&q=80",
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=900&q=80",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80",
    ],
    certifications: ["Medicare Certified", "State Licensed (WA DOH)", "Joint Commission Accredited", "Memory Care Certified"],
    care_services: ["Medication management", "Personal hygiene assistance", "Mobility assistance", "24/7 nursing staff", "Memory care", "Physical therapy", "Occupational therapy", "Speech therapy", "Wound care", "Hospice coordination"],
    amenities: ["Chef-prepared meals", "Fitness center", "Landscaped garden", "Beauty salon", "Library & media room", "Chapel / meditation room", "Outdoor walking paths", "Art studio", "Music programs", "Transportation service"],
    insurance_accepted: ["Medicare", "Medicaid", "Private Pay", "Long-Term Care Insurance", "Veterans Benefits"],
    dining: "Three chef-prepared meals daily plus snacks. Special dietary accommodations for diabetic, low-sodium, and texture-modified diets. Private dining room available for family gatherings.",
    safety: ["Emergency call systems in all rooms", "24/7 security monitoring", "Secured memory care unit", "Fire suppression system", "Keypad entry", "Fall prevention protocols", "ADA compliant throughout"],
};

const REVIEWS = [
    { name: "Patricia M.", relation: "Daughter", rating: 5, date: "November 2025", text: "My mother has been at Sunrise Gardens for 8 months and I couldn't be happier. The staff knows her by name and always goes above and beyond. The food is excellent.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80" },
    { name: "James W.", relation: "Son", rating: 5, date: "October 2025", text: "After a difficult hospital stay, dad needed a place to recover and eventually make his permanent home. The transition was seamless. Highly recommend.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
    { name: "Carol R.", relation: "Resident's spouse", rating: 4, date: "September 2025", text: "Clean, welcoming environment. Staff is caring and responsive. My only suggestion would be more evening activities.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
];

const AMENITY_ICONS = {
    "Chef-prepared meals": <Utensils className="w-4 h-4" />,
    "Fitness center": <Dumbbell className="w-4 h-4" />,
    "Landscaped garden": <Trees className="w-4 h-4" />,
    "Music programs": <Music className="w-4 h-4" />,
    "Library & media room": <BookOpen className="w-4 h-4" />,
    "Transportation service": <Car className="w-4 h-4" />,
};

export default function FacilityDetail() {
    const [imgIdx, setImgIdx] = useState(0);
    const [saved, setSaved] = useState(false);
    const [showTourModal, setShowTourModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [tourData, setTourData] = useState({ name: "", email: "", phone: "", date: "", time: "", type: "In-Person", notes: "" });
    const [tourSubmitted, setTourSubmitted] = useState(false);

    const prevImg = () => setImgIdx(i => (i === 0 ? FACILITY.images.length - 1 : i - 1));
    const nextImg = () => setImgIdx(i => (i === FACILITY.images.length - 1 ? 0 : i + 1));

    const handleTourSubmit = (e) => {
        e.preventDefault();
        setTourSubmitted(true);
        setTimeout(() => { setShowTourModal(false); setTourSubmitted(false); }, 2500);
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-[#E8E4DD]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 text-sm text-[#8B8B8B]">
                        <Link to={createPageUrl("Home")} className="hover:text-[#4A7C59] transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to={createPageUrl("Search")} className="hover:text-[#4A7C59] transition-colors">Search</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-[#2D3142] font-medium">{FACILITY.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className="text-xs font-semibold bg-[#EBF3ED] text-[#4A7C59] px-3 py-1 rounded-full">{FACILITY.type}</span>
                            {FACILITY.certifications.slice(0, 2).map(c => <span key={c} className="text-xs bg-[#EBF1F8] text-[#5B7FA6] px-3 py-1 rounded-full font-medium">{c}</span>)}
                        </div>
                        <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#2D3142] mb-2">{FACILITY.name}</h1>
                        <div className="flex items-center gap-4 text-[#6B6B6B] text-sm flex-wrap">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{FACILITY.address}</span>
                            <span className="flex items-center gap-1"><Navigation className="w-4 h-4" />2.1 miles away</span>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(FACILITY.rating) ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#E8E4DD]'}`} />)}
                                <span className="font-semibold text-[#2D3142] text-sm ml-1">{FACILITY.rating}</span>
                                <span className="text-[#8B8B8B] text-sm">({FACILITY.review_count} reviews)</span>
                            </div>
                            <span className="text-xs bg-[#EBF3ED] text-[#4A7C59] px-2 py-0.5 rounded-full font-medium"><Bed className="w-3 h-3 inline mr-1" />{FACILITY.beds_available} beds available</span>
                        </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <button className="p-2.5 rounded-xl border border-[#E8E4DD] bg-white hover:bg-[#FAF8F5] transition-colors" title="Print"><Printer className="w-4 h-4 text-[#8B8B8B]" /></button>
                        <button className="p-2.5 rounded-xl border border-[#E8E4DD] bg-white hover:bg-[#FAF8F5] transition-colors" title="Share"><Share2 className="w-4 h-4 text-[#8B8B8B]" /></button>
                        <button onClick={() => setSaved(!saved)} className="p-2.5 rounded-xl border border-[#E8E4DD] bg-white hover:bg-[#FAF8F5] transition-colors" title="Save">
                            <Heart className={`w-4 h-4 ${saved ? 'fill-[#E05B5B] text-[#E05B5B]' : 'text-[#8B8B8B]'}`} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Photo Gallery */}
                        <div className="relative rounded-2xl overflow-hidden bg-black group" style={{ height: "380px" }}>
                            <img src={FACILITY.images[imgIdx]} alt="Facility" className="w-full h-full object-cover opacity-95" />
                            <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                                <ChevronLeft className="w-5 h-5 text-[#2D3142]" />
                            </button>
                            <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                                <ChevronRight className="w-5 h-5 text-[#2D3142]" />
                            </button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {FACILITY.images.map((_, i) => <button key={i} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white w-5' : 'bg-white/50'}`} />)}
                            </div>
                            <a href={FACILITY.virtual_tour_url} className="absolute top-3 right-3">
                                <span className="bg-white/90 backdrop-blur-sm text-[#2D3142] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-white transition-colors cursor-pointer">
                                    <Video className="w-3 h-3" /> Virtual Tour
                                </span>
                            </a>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {FACILITY.images.map((img, i) => (
                                <button key={i} onClick={() => setImgIdx(i)} className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === imgIdx ? 'border-[#4A7C59]' : 'border-transparent'}`}>
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Overview */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <h2 className="font-display text-xl font-semibold text-[#2D3142] mb-4">Facility Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: "Starting Price", value: `$${FACILITY.starting_price.toLocaleString()}/mo` },
                                    { label: "Capacity", value: `${FACILITY.capacity} residents` },
                                    { label: "Beds Available", value: `${FACILITY.beds_available} now` },
                                    { label: "Care", value: "24/7 nursing" },
                                ].map(item => (
                                    <div key={item.label} className="bg-[#FAF8F5] rounded-xl p-4 text-center">
                                        <div className="font-semibold text-[#2D3142] text-lg mb-1">{item.value}</div>
                                        <div className="text-[#8B8B8B] text-xs">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-4 bg-[#EBF1F8] rounded-xl flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#5B7FA6]/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Users className="w-4 h-4 text-[#5B7FA6]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#2D3142] text-sm">Nurse-to-Resident Ratio</p>
                                    <p className="text-[#6B6B6B] text-sm">{FACILITY.nurse_ratio}</p>
                                </div>
                            </div>
                        </div>

                        {/* Care Services */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <h2 className="font-display text-xl font-semibold text-[#2D3142] mb-4">Care Services Offered</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {FACILITY.care_services.map(s => (
                                    <div key={s} className="flex items-center gap-2 text-sm text-[#6B6B6B] py-1.5">
                                        <CheckCircle className="w-4 h-4 text-[#4A7C59] shrink-0" />
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <h2 className="font-display text-xl font-semibold text-[#2D3142] mb-4">Amenities & Activities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {FACILITY.amenities.map(a => (
                                    <div key={a} className="flex items-center gap-2 bg-[#FAF8F5] rounded-xl p-3 text-sm text-[#6B6B6B]">
                                        <span className="text-[#4A7C59]">{AMENITY_ICONS[a] || <CheckCircle className="w-4 h-4" />}</span>
                                        {a}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dining */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <h2 className="font-display text-xl font-semibold text-[#2D3142] mb-3 flex items-center gap-2"><Utensils className="w-5 h-5 text-[#4A7C59]" />Dining & Nutrition</h2>
                            <p className="text-[#6B6B6B] text-base leading-relaxed">{FACILITY.dining}</p>
                        </div>

                        {/* Safety */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <h2 className="font-display text-xl font-semibold text-[#2D3142] mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-[#4A7C59]" />Safety & Security</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {FACILITY.safety.map(s => (
                                    <div key={s} className="flex items-center gap-2 text-sm text-[#6B6B6B] py-1.5">
                                        <Shield className="w-4 h-4 text-[#4A7C59] shrink-0" />
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <h2 className="font-display text-xl font-semibold text-[#2D3142] mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-[#4A7C59]" />Certifications & Licenses</h2>
                            <div className="flex flex-wrap gap-3">
                                {FACILITY.certifications.map(c => (
                                    <span key={c} className="flex items-center gap-2 bg-[#EBF3ED] text-[#4A7C59] px-4 py-2 rounded-xl text-sm font-semibold">
                                        <CheckCircle className="w-4 h-4" /> {c}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Insurance */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <h2 className="font-display text-xl font-semibold text-[#2D3142] mb-4">Payment & Insurance Accepted</h2>
                            <div className="flex flex-wrap gap-2">
                                {FACILITY.insurance_accepted.map(ins => (
                                    <span key={ins} className="bg-[#EBF1F8] text-[#5B7FA6] px-3 py-1.5 rounded-lg text-sm font-medium">{ins}</span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-2xl p-6 card-shadow">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-display text-xl font-semibold text-[#2D3142]">Family Reviews</h2>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />)}
                                    </div>
                                    <span className="font-bold text-[#2D3142]">{FACILITY.rating}</span>
                                    <span className="text-[#8B8B8B] text-sm">({FACILITY.review_count})</span>
                                </div>
                            </div>
                            <div className="space-y-5">
                                {REVIEWS.map(r => (
                                    <div key={r.name} className="pb-5 border-b border-[#F0EDE7] last:border-0 last:pb-0">
                                        <div className="flex items-start gap-3">
                                            <img src={r.img} alt={r.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div>
                                                        <span className="font-semibold text-[#2D3142] text-sm">{r.name}</span>
                                                        <span className="text-[#8B8B8B] text-xs ml-2">{r.relation}</span>
                                                    </div>
                                                    <span className="text-[#8B8B8B] text-xs">{r.date}</span>
                                                </div>
                                                <div className="flex items-center gap-0.5 mb-2">
                                                    {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />)}
                                                </div>
                                                <p className="text-[#6B6B6B] text-sm leading-relaxed">{r.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Pricing Card */}
                        <div className="bg-white rounded-2xl p-6 card-shadow sticky top-24">
                            <div className="mb-5">
                                <div className="text-[#8B8B8B] text-sm mb-1">Starting at</div>
                                <div className="flex items-end gap-1">
                                    <span className="font-bold text-[#2D3142] text-3xl">${FACILITY.starting_price.toLocaleString()}</span>
                                    <span className="text-[#8B8B8B] text-sm mb-1">/month</span>
                                </div>
                                <div className="text-[#8B8B8B] text-xs">Up to ${FACILITY.max_price.toLocaleString()}/month depending on care level</div>
                            </div>

                            <div className="space-y-3 mb-5">
                                <button onClick={() => setShowTourModal(true)} className="btn-primary w-full flex items-center gap-2 justify-center text-base py-3">
                                    <Calendar className="w-4 h-4" /> Schedule a Tour
                                </button>
                                <button onClick={() => setShowInfoModal(true)} className="btn-secondary w-full flex items-center gap-2 justify-center py-3">
                                    <Mail className="w-4 h-4" /> Request Information
                                </button>
                                <a href={`tel:${FACILITY.phone}`} className="block">
                                    <button className="w-full border border-[#E8E4DD] rounded-lg py-3 text-[#2D3142] text-sm font-semibold hover:bg-[#FAF8F5] transition-colors flex items-center gap-2 justify-center">
                                        <Phone className="w-4 h-4 text-[#4A7C59]" /> {FACILITY.phone}
                                    </button>
                                </a>
                            </div>

                            <div className="border-t border-[#F0EDE7] pt-4 space-y-2.5">
                                {[
                                    { icon: <CheckCircle className="w-4 h-4 text-[#4A7C59]" />, text: "No cost to inquire" },
                                    { icon: <Shield className="w-4 h-4 text-[#5B7FA6]" />, text: "Licensed & verified facility" },
                                    { icon: <Clock className="w-4 h-4 text-[#4A7C59]" />, text: "Usually responds within 24hrs" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                                        {item.icon} {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="bg-[#EBF3ED] rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <Bed className="w-4 h-4 text-[#4A7C59]" />
                                <span className="font-semibold text-[#4A7C59] text-sm">{FACILITY.beds_available} Beds Available Now</span>
                            </div>
                            <p className="text-[#4A7C59]/70 text-xs">Availability changes frequently. Contact us to hold your spot.</p>
                        </div>

                        {/* Compare */}
                        <div className="bg-white rounded-2xl p-5 card-shadow">
                            <h3 className="font-semibold text-[#2D3142] text-sm mb-3">Compare with other facilities</h3>
                            <Link to={createPageUrl("FamilyDashboard")}>
                                <button className="w-full text-sm text-[#5B7FA6] font-semibold border border-[#5B7FA6] rounded-lg py-2.5 hover:bg-[#EBF1F8] transition-colors">
                                    Open Comparison Tool
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tour Modal */}
            {showTourModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        {tourSubmitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-[#EBF3ED] flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-[#4A7C59]" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-[#2D3142] mb-2">Tour Requested!</h3>
                                <p className="text-[#6B6B6B]">A care coordinator will confirm your tour within 24 hours.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="font-display text-xl font-semibold text-[#2D3142]">Schedule a Tour</h3>
                                    <button onClick={() => setShowTourModal(false)} className="p-1.5 hover:bg-[#FAF8F5] rounded-lg transition-colors">✕</button>
                                </div>
                                <form onSubmit={handleTourSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#2D3142] mb-1.5">Your Name *</label>
                                        <input value={tourData.name} onChange={e => setTourData(d => ({ ...d, name: e.target.value }))} required className="w-full border border-[#E8E4DD] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A7C59] transition-colors" placeholder="Full name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2D3142] mb-1.5">Email *</label>
                                        <input type="email" value={tourData.email} onChange={e => setTourData(d => ({ ...d, email: e.target.value }))} required className="w-full border border-[#E8E4DD] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A7C59] transition-colors" placeholder="Email address" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2D3142] mb-1.5">Phone</label>
                                        <input type="tel" value={tourData.phone} onChange={e => setTourData(d => ({ ...d, phone: e.target.value }))} className="w-full border border-[#E8E4DD] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A7C59] transition-colors" placeholder="Phone number" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-[#2D3142] mb-1.5">Preferred Date *</label>
                                            <input type="date" value={tourData.date} onChange={e => setTourData(d => ({ ...d, date: e.target.value }))} required className="w-full border border-[#E8E4DD] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A7C59] transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#2D3142] mb-1.5">Preferred Time</label>
                                            <select value={tourData.time} onChange={e => setTourData(d => ({ ...d, time: e.target.value }))} className="w-full border border-[#E8E4DD] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A7C59] transition-colors">
                                                <option value="">Any time</option>
                                                {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2D3142] mb-1.5">Tour Type</label>
                                        <div className="flex gap-3">
                                            {["In-Person", "Virtual"].map(t => (
                                                <label key={t} className={`flex-1 flex items-center gap-2 border-2 rounded-xl px-4 py-3 cursor-pointer transition-all ${tourData.type === t ? 'border-[#4A7C59] bg-[#EBF3ED]' : 'border-[#E8E4DD]'}`}>
                                                    <input type="radio" name="tourType" value={t} checked={tourData.type === t} onChange={e => setTourData(d => ({ ...d, type: e.target.value }))} className="hidden" />
                                                    <span className="text-sm font-medium text-[#2D3142]">{t}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2D3142] mb-1.5">Notes (optional)</label>
                                        <textarea value={tourData.notes} onChange={e => setTourData(d => ({ ...d, notes: e.target.value }))} rows={3} className="w-full border border-[#E8E4DD] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A7C59] transition-colors resize-none" placeholder="Any questions or special requirements?" />
                                    </div>
                                    <button type="submit" className="btn-primary w-full py-3 text-base">Request Tour</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}