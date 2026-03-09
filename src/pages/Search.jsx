import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Search, MapPin, Star, Heart, SlidersHorizontal, ChevronDown, ChevronUp, X, Bed, Phone, Navigation, Filter } from "lucide-react";

const MOCK_FACILITIES = [
    { id: "1", name: "Sunrise Gardens", type: "Assisted Living", city: "Seattle", state: "WA", starting_price: 4200, rating: 4.8, review_count: 127, beds_available: 3, distance_miles: 2.1, img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600&q=80", certifications: ["Medicare", "State Licensed", "Joint Commission"], amenities: ["Chef meals", "Fitness center", "Garden", "Activities"], care_24_7: true, badge: "Top Rated" },
    { id: "2", name: "Meadowbrook Memory Care", type: "Memory Care", city: "Bellevue", state: "WA", starting_price: 5800, rating: 4.9, review_count: 89, beds_available: 1, distance_miles: 4.3, img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&q=80", certifications: ["Medicare", "State Licensed", "CARF"], amenities: ["Secure garden", "Music therapy", "Dementia activities"], care_24_7: true, badge: "Specialist" },
    { id: "3", name: "Harborview Residence", type: "Independent Living", city: "Tacoma", state: "WA", starting_price: 3100, rating: 4.7, review_count: 204, beds_available: 7, distance_miles: 8.5, img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80", certifications: ["State Licensed"], amenities: ["Pool", "Library", "Transportation", "Dining"], care_24_7: false, badge: "Best Value" },
    { id: "4", name: "Evergreen Family Home", type: "Adult Family Home", city: "Kirkland", state: "WA", starting_price: 3800, rating: 4.6, review_count: 42, beds_available: 2, distance_miles: 5.7, img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", certifications: ["State Licensed", "DSHS Certified"], amenities: ["Home-cooked meals", "Personalized care", "Outdoor patio"], care_24_7: true, badge: null },
    { id: "5", name: "Cascade Assisted Living", type: "Assisted Living", city: "Redmond", state: "WA", starting_price: 4600, rating: 4.5, review_count: 156, beds_available: 4, distance_miles: 11.2, img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80", certifications: ["Medicare", "State Licensed"], amenities: ["Physical therapy", "Art studio", "Chapel", "Beauty salon"], care_24_7: true, badge: null },
    { id: "6", name: "Lakeview Skilled Nursing", type: "Skilled Nursing", city: "Renton", state: "WA", starting_price: 7200, rating: 4.4, review_count: 78, beds_available: 5, distance_miles: 14.8, img: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80", certifications: ["Medicare", "Medicaid", "State Licensed", "Joint Commission"], amenities: ["Rehab gym", "Medical staff 24/7", "Speech therapy"], care_24_7: true, badge: null },
];

const CARE_TYPES = ["Assisted Living", "Memory Care", "Independent Living", "Adult Family Home", "Skilled Nursing"];
const AMENITIES = ["Chef meals", "Fitness center", "Garden", "Pool", "Transportation", "Physical therapy", "Memory activities", "Pet friendly"];
const CERTS = ["Medicare", "Medicaid", "Joint Commission", "CARF", "State Licensed"];

export default function SearchPage() {
    const [facilities, setFacilities] = useState(MOCK_FACILITIES);
    const [saved, setSaved] = useState([]);
    const [sortBy, setSortBy] = useState("distance");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ types: [], maxPrice: 8000, minRating: 0, amenities: [], certifications: [], available: false, care24: false });
    const [expandedFilters, setExpandedFilters] = useState({ type: true, price: true, rating: true, amenities: false, certs: false });
    const urlParams = new URLSearchParams(window.location.search);
    const locationQuery = urlParams.get("location") || "";
    const typeQuery = urlParams.get("type") || "";

    useEffect(() => {
        if (typeQuery) setFilters(f => ({ ...f, types: [typeQuery] }));
    }, []);

    const toggleFilter = (key, val) => {
        setFilters(f => ({
            ...f,
            [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val]
        }));
    };

    const filtered = MOCK_FACILITIES
        .filter(f => {
            if (filters.types.length && !filters.types.includes(f.type)) return false;
            if (f.starting_price > filters.maxPrice) return false;
            if (f.rating < filters.minRating) return false;
            if (filters.available && f.beds_available === 0) return false;
            if (filters.care24 && !f.care_24_7) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === "price") return a.starting_price - b.starting_price;
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "reviews") return b.review_count - a.review_count;
            return a.distance_miles - b.distance_miles;
        });

    const toggleSaved = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

    const FilterSection = ({ title, keyName, children }) => (
        <div className="border-b border-[#F0EDE7] pb-4 mb-4">
            <button
                className="flex items-center justify-between w-full text-sm font-semibold text-[#2D3142] mb-3"
                onClick={() => setExpandedFilters(e => ({ ...e, [keyName]: !e[keyName] }))}
            >
                {title}
                {expandedFilters[keyName] ? <ChevronUp className="w-4 h-4 text-[#8B8B8B]" /> : <ChevronDown className="w-4 h-4 text-[#8B8B8B]" />}
            </button>
            {expandedFilters[keyName] && children}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            {/* Search Header */}
            <div className="bg-white border-b border-[#E8E4DD] py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                        <div className="flex-1 flex items-center gap-3 bg-[#FAF8F5] border border-[#E8E4DD] rounded-xl px-4 py-3">
                            <MapPin className="w-4 h-4 text-[#4A7C59] shrink-0" />
                            <input defaultValue={locationQuery} placeholder="Seattle, WA" className="w-full bg-transparent text-[#2D3142] text-sm outline-none" />
                        </div>
                        <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#E8E4DD] rounded-xl px-4 py-3 min-w-44">
                            <Search className="w-4 h-4 text-[#8B8B8B]" />
                            <select className="bg-transparent text-[#2D3142] text-sm outline-none appearance-none w-full">
                                <option value="">All Care Types</option>
                                {CARE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <button className="btn-primary text-sm px-6 py-3 flex items-center gap-2">
                            <Search className="w-4 h-4" /> Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Mobile filter toggle */}
                <div className="md:hidden mb-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-white border border-[#E8E4DD] rounded-xl px-4 py-3 text-sm font-semibold text-[#2D3142] w-full justify-center"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar */}
                    <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
                        <div className="bg-white rounded-2xl p-5 card-shadow sticky top-24">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-semibold text-[#2D3142] text-base">Filters</h3>
                                <button onClick={() => setFilters({ types: [], maxPrice: 8000, minRating: 0, amenities: [], certifications: [], available: false, care24: false })} className="text-xs text-[#4A7C59] font-medium hover:underline">Clear all</button>
                            </div>

                            <FilterSection title="Care Type" keyName="type">
                                <div className="space-y-2">
                                    {CARE_TYPES.map(t => (
                                        <label key={t} className="flex items-center gap-2 cursor-pointer group">
                                            <input type="checkbox" checked={filters.types.includes(t)} onChange={() => toggleFilter("types", t)} className="accent-[#4A7C59] w-4 h-4" />
                                            <span className="text-sm text-[#6B6B6B] group-hover:text-[#2D3142]">{t}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Monthly Budget" keyName="price">
                                <div>
                                    <div className="flex justify-between text-xs text-[#8B8B8B] mb-2">
                                        <span>$2,000</span>
                                        <span className="font-semibold text-[#4A7C59]">${filters.maxPrice.toLocaleString()}/mo</span>
                                    </div>
                                    <input
                                        type="range" min={2000} max={12000} step={100}
                                        value={filters.maxPrice}
                                        onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
                                        className="w-full accent-[#4A7C59]"
                                    />
                                    <div className="flex justify-between text-xs text-[#8B8B8B] mt-1"><span>$2k</span><span>$12k</span></div>
                                </div>
                            </FilterSection>

                            <FilterSection title="Minimum Rating" keyName="rating">
                                <div className="space-y-2">
                                    {[4.5, 4.0, 3.5, 0].map(r => (
                                        <label key={r} className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="rating" checked={filters.minRating === r} onChange={() => setFilters(f => ({ ...f, minRating: r }))} className="accent-[#4A7C59]" />
                                            <span className="text-sm text-[#6B6B6B] flex items-center gap-1">
                                                {r === 0 ? "Any rating" : <><Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" /> {r}+ Stars</>}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Amenities" keyName="amenities">
                                <div className="space-y-2">
                                    {AMENITIES.slice(0, 6).map(a => (
                                        <label key={a} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={filters.amenities.includes(a)} onChange={() => toggleFilter("amenities", a)} className="accent-[#4A7C59] w-4 h-4" />
                                            <span className="text-sm text-[#6B6B6B]">{a}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            <div className="space-y-2 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={filters.available} onChange={e => setFilters(f => ({ ...f, available: e.target.checked }))} className="accent-[#4A7C59] w-4 h-4" />
                                    <span className="text-sm text-[#6B6B6B]">Available now only</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={filters.care24} onChange={e => setFilters(f => ({ ...f, care24: e.target.checked }))} className="accent-[#4A7C59] w-4 h-4" />
                                    <span className="text-sm text-[#6B6B6B]">24/7 care available</span>
                                </label>
                            </div>
                        </div>
                    </aside>

                    {/* Results */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-[#6B6B6B] text-sm"><span className="font-semibold text-[#2D3142]">{filtered.length} facilities</span> found{locationQuery ? ` near ${locationQuery}` : ""}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-[#8B8B8B]">Sort:</span>
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm bg-white border border-[#E8E4DD] rounded-lg px-3 py-1.5 text-[#2D3142] outline-none">
                                    <option value="distance">Distance</option>
                                    <option value="rating">Rating</option>
                                    <option value="price">Price (Low-High)</option>
                                    <option value="reviews">Most Reviewed</option>
                                </select>
                            </div>
                        </div>

                        {/* Active filters */}
                        {(filters.types.length > 0 || filters.care24 || filters.available) && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {filters.types.map(t => (
                                    <button key={t} onClick={() => toggleFilter("types", t)} className="flex items-center gap-1 bg-[#EBF3ED] text-[#4A7C59] text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[#D0E8D6] transition-colors">
                                        {t} <X className="w-3 h-3" />
                                    </button>
                                ))}
                                {filters.care24 && <button onClick={() => setFilters(f => ({ ...f, care24: false }))} className="flex items-center gap-1 bg-[#EBF3ED] text-[#4A7C59] text-xs font-medium px-3 py-1.5 rounded-full"><span>24/7 Care</span><X className="w-3 h-3" /></button>}
                            </div>
                        )}

                        <div className="space-y-4">
                            {filtered.map(f => (
                                <div key={f.id} className="bg-white rounded-2xl overflow-hidden card-shadow transition-smooth card-shadow-hover flex flex-col md:flex-row">
                                    <div className="relative md:w-64 h-48 md:h-auto shrink-0 overflow-hidden">
                                        <img src={f.img} alt={f.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                        {f.badge && <span className="absolute top-3 left-3 bg-[#4A7C59] text-white text-xs font-semibold px-3 py-1 rounded-full">{f.badge}</span>}
                                    </div>
                                    <div className="flex-1 p-5">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                                    <h3 className="font-semibold text-[#2D3142] text-lg">{f.name}</h3>
                                                    <span className="text-xs font-medium bg-[#EBF3ED] text-[#4A7C59] px-2 py-0.5 rounded-full">{f.type}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-[#8B8B8B]">
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{f.city}, {f.state}</span>
                                                    <span className="flex items-center gap-1"><Navigation className="w-3 h-3" />{f.distance_miles} mi</span>
                                                </div>
                                            </div>
                                            <button onClick={() => toggleSaved(f.id)} className="p-2 rounded-full hover:bg-[#FAF8F5] transition-colors shrink-0">
                                                <Heart className={`w-5 h-5 ${saved.includes(f.id) ? 'fill-[#E05B5B] text-[#E05B5B]' : 'text-[#C0BBB5]'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4 mt-3 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                                                <span className="font-semibold text-[#2D3142] text-sm">{f.rating}</span>
                                                <span className="text-[#8B8B8B] text-xs">({f.review_count} reviews)</span>
                                            </div>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${f.beds_available > 0 ? 'bg-[#EBF3ED] text-[#4A7C59]' : 'bg-[#FEE2E2] text-[#EF4444]'}`}>
                                                <Bed className="w-3 h-3 inline mr-1" />
                                                {f.beds_available > 0 ? `${f.beds_available} beds available` : 'Waitlist only'}
                                            </span>
                                            {f.care_24_7 && <span className="text-xs bg-[#EBF1F8] text-[#5B7FA6] px-2 py-0.5 rounded-full font-medium">24/7 Care</span>}
                                        </div>

                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {f.certifications.map(c => <span key={c} className="text-xs bg-[#F5F2ED] text-[#6B6B6B] px-2 py-0.5 rounded-full">{c}</span>)}
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#F0EDE7]">
                                            <div>
                                                <span className="font-bold text-[#2D3142] text-xl">${f.starting_price.toLocaleString()}</span>
                                                <span className="text-[#8B8B8B] text-sm">/month starting</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <a href={`tel:1-800-555-0${f.id}00`}>
                                                    <button className="btn-secondary text-sm px-3 py-2 flex items-center gap-1">
                                                        <Phone className="w-3 h-3" /> Call
                                                    </button>
                                                </a>
                                                <Link to={createPageUrl("FacilityDetail")}>
                                                    <button className="btn-primary text-sm px-4 py-2">View Details</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}