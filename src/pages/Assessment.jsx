import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ChevronRight, ChevronLeft, CheckCircle, Heart, AlertCircle, User, Activity, Brain, DollarSign, MapPin, Clock } from "lucide-react";

const STEPS = [
    { id: 1, title: "About Your Loved One", icon: <User className="w-5 h-5" /> },
    { id: 2, title: "Mobility & Physical Health", icon: <Activity className="w-5 h-5" /> },
    { id: 3, title: "Cognitive & Memory", icon: <Brain className="w-5 h-5" /> },
    { id: 4, title: "Daily Living Activities", icon: <Heart className="w-5 h-5" /> },
    { id: 5, title: "Preferences & Budget", icon: <DollarSign className="w-5 h-5" /> },
];

const MEDICAL_CONDITIONS = ["Diabetes", "Heart disease", "COPD", "Arthritis", "Parkinson's disease", "Stroke history", "Cancer (active/remission)", "Kidney disease", "Depression/Anxiety", "Other"];
const ADL_NEEDS = ["Bathing & grooming", "Dressing", "Toileting", "Medication management", "Meal preparation", "Housekeeping", "Transportation", "Managing finances", "Social activities", "24-hour supervision"];

export default function Assessment() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        lovedOneName: "",
        lovedOneAge: "",
        relationship: "",
        mobility: "",
        medicalConditions: [],
        cognitive: "",
        adlNeeds: [],
        urgency: "",
        budget: "",
        location: "",
        insurance: [],
        specialNeeds: "",
    });

    const update = (key, val) => setData(d => ({ ...d, [key]: val }));
    const toggleArr = (key, val) => setData(d => ({ ...d, [key]: d[key].includes(val) ? d[key].filter(x => x !== val) : [...d[key], val] }));

    const getRecommendation = () => {
        if (data.cognitive === "Severe Dementia/Alzheimer's") return "Memory Care";
        if (data.mobility === "Bedridden" || data.medicalConditions.length > 3) return "Skilled Nursing";
        if (data.mobility === "Fully Independent" && data.cognitive === "No Impairment") return "Independent Living";
        if (data.adlNeeds.length <= 2) return "Adult Family Home";
        return "Assisted Living";
    };

    const handleFinish = () => {
        navigate(`${createPageUrl("Search")}?type=${encodeURIComponent(getRecommendation())}&location=${encodeURIComponent(data.location)}`);
    };

    const canContinue = () => {
        if (step === 1) return data.lovedOneName && data.lovedOneAge && data.relationship;
        if (step === 2) return data.mobility;
        if (step === 3) return data.cognitive;
        if (step === 4) return true;
        if (step === 5) return data.urgency && data.location;
        return true;
    };

    const OptionCard = ({ label, selected, onClick, desc }) => (
        <button
            onClick={onClick}
            className={`w-full text-left border-2 rounded-xl p-4 transition-all ${selected ? 'border-[#4A7C59] bg-[#EBF3ED]' : 'border-[#E8E4DD] bg-white hover:border-[#B5D4BC]'}`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${selected ? 'border-[#4A7C59] bg-[#4A7C59]' : 'border-[#D0CCC6]'}`}>
                    {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                    <div className={`text-sm font-semibold ${selected ? 'text-[#4A7C59]' : 'text-[#2D3142]'}`}>{label}</div>
                    {desc && <div className="text-xs text-[#8B8B8B] mt-0.5">{desc}</div>}
                </div>
            </div>
        </button>
    );

    const CheckCard = ({ label, selected, onClick }) => (
        <button
            onClick={onClick}
            className={`text-left border-2 rounded-xl p-3 transition-all ${selected ? 'border-[#4A7C59] bg-[#EBF3ED]' : 'border-[#E8E4DD] bg-white hover:border-[#B5D4BC]'}`}
        >
            <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${selected ? 'border-[#4A7C59] bg-[#4A7C59]' : 'border-[#D0CCC6]'}`}>
                    {selected && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12"><path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
                </div>
                <span className={`text-sm ${selected ? 'text-[#4A7C59] font-medium' : 'text-[#6B6B6B]'}`}>{label}</span>
            </div>
        </button>
    );

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-[#EBF3ED] text-[#4A7C59] px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Heart className="w-4 h-4 fill-[#4A7C59]" />
                        Free Care Assessment
                    </div>
                    <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#2D3142] mb-3">Find the right care for your loved one</h1>
                    <p className="text-[#6B6B6B] text-lg">Answer a few questions and we'll match you with the best care options.</p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#2D3142]">Step {step} of {STEPS.length}</span>
                        <span className="text-sm text-[#8B8B8B]">{Math.round((step / STEPS.length) * 100)}% complete</span>
                    </div>
                    <div className="w-full bg-[#E8E4DD] rounded-full h-2">
                        <div
                            className="bg-[#4A7C59] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(step / STEPS.length) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-3">
                        {STEPS.map(s => (
                            <div key={s.id} className={`flex items-center gap-1 text-xs font-medium transition-colors ${s.id === step ? 'text-[#4A7C59]' : s.id < step ? 'text-[#4A7C59]/60' : 'text-[#C0BBB5]'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${s.id < step ? 'bg-[#4A7C59] text-white' : s.id === step ? 'bg-[#EBF3ED] text-[#4A7C59] ring-2 ring-[#4A7C59]' : 'bg-[#E8E4DD] text-[#C0BBB5]'}`}>
                                    {s.id < step ? <CheckCircle className="w-3.5 h-3.5" /> : <span className="text-xs">{s.id}</span>}
                                </div>
                                <span className="hidden sm:block">{s.title.split(" ")[0]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-2xl p-6 md:p-8 card-shadow mb-6">
                    <h2 className="font-display text-2xl font-semibold text-[#2D3142] mb-1 flex items-center gap-2">
                        <span className="text-[#4A7C59]">{STEPS[step - 1].icon}</span>
                        {STEPS[step - 1].title}
                    </h2>
                    <p className="text-[#8B8B8B] text-sm mb-6">This helps us match your loved one with the right level of care.</p>

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#2D3142] mb-2">Your loved one's name *</label>
                                <input value={data.lovedOneName} onChange={e => update("lovedOneName", e.target.value)} className="w-full border border-[#E8E4DD] rounded-xl px-4 py-3 text-sm text-[#2D3142] outline-none focus:border-[#4A7C59] transition-colors" placeholder="First name is fine" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#2D3142] mb-2">Their age *</label>
                                <input type="number" value={data.lovedOneAge} onChange={e => update("lovedOneAge", e.target.value)} className="w-full border border-[#E8E4DD] rounded-xl px-4 py-3 text-sm text-[#2D3142] outline-none focus:border-[#4A7C59] transition-colors" placeholder="e.g. 78" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#2D3142] mb-3">Your relationship to them *</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Son/Daughter", "Spouse/Partner", "Sibling", "Friend", "Healthcare proxy", "Other"].map(r => (
                                        <OptionCard key={r} label={r} selected={data.relationship === r} onClick={() => update("relationship", r)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#2D3142] mb-3">Mobility level *</label>
                                <div className="space-y-2">
                                    {[
                                        { val: "Fully Independent", desc: "Walks without assistance" },
                                        { val: "Needs Minimal Assistance", desc: "Occasionally needs help" },
                                        { val: "Uses Walker/Cane", desc: "Needs mobility aids" },
                                        { val: "Uses Wheelchair", desc: "Primarily uses wheelchair" },
                                        { val: "Bedridden", desc: "Requires full-time in-bed care" },
                                    ].map(item => (
                                        <OptionCard key={item.val} label={item.val} desc={item.desc} selected={data.mobility === item.val} onClick={() => update("mobility", item.val)} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#2D3142] mb-3">Any medical conditions? (select all that apply)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {MEDICAL_CONDITIONS.map(c => (
                                        <CheckCard key={c} label={c} selected={data.medicalConditions.includes(c)} onClick={() => toggleArr("medicalConditions", c)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div>
                            <label className="block text-sm font-semibold text-[#2D3142] mb-3">Cognitive & memory status *</label>
                            <div className="space-y-2">
                                {[
                                    { val: "No Impairment", desc: "Fully alert and oriented" },
                                    { val: "Mild Forgetfulness", desc: "Occasional memory lapses, still independent" },
                                    { val: "Moderate Memory Issues", desc: "Needs reminders, some confusion" },
                                    { val: "Severe Dementia/Alzheimer's", desc: "Significant memory loss, requires specialized care" },
                                ].map(item => (
                                    <OptionCard key={item.val} label={item.val} desc={item.desc} selected={data.cognitive === item.val} onClick={() => update("cognitive", item.val)} />
                                ))}
                            </div>
                            {data.cognitive === "Severe Dementia/Alzheimer's" && (
                                <div className="mt-4 flex items-start gap-3 bg-[#EBF1F8] rounded-xl p-4">
                                    <AlertCircle className="w-5 h-5 text-[#5B7FA6] shrink-0 mt-0.5" />
                                    <p className="text-[#5B7FA6] text-sm">Based on this, we'll prioritize <strong>Memory Care</strong> communities with specialized dementia programming and secure environments.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 4 */}
                    {step === 4 && (
                        <div>
                            <label className="block text-sm font-semibold text-[#2D3142] mb-3">Which daily activities does your loved one need help with?</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {ADL_NEEDS.map(a => (
                                    <CheckCard key={a} label={a} selected={data.adlNeeds.includes(a)} onClick={() => toggleArr("adlNeeds", a)} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 5 */}
                    {step === 5 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-[#2D3142] mb-3">Timeline for placement *</label>
                                <div className="space-y-2">
                                    {[
                                        { val: "Urgent (within 2 weeks)", icon: <AlertCircle className="w-4 h-4 text-[#E05B5B]" /> },
                                        { val: "Soon (1-3 months)", icon: <Clock className="w-4 h-4 text-[#C67C3A]" /> },
                                        { val: "Planning ahead (3-6 months)", icon: <CheckCircle className="w-4 h-4 text-[#4A7C59]" /> },
                                        { val: "Just exploring", icon: <Heart className="w-4 h-4 text-[#5B7FA6]" /> },
                                    ].map(item => (
                                        <OptionCard key={item.val} label={item.val} selected={data.urgency === item.val} onClick={() => update("urgency", item.val)} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#2D3142] mb-2">Preferred location *</label>
                                <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#E8E4DD] rounded-xl px-4 py-3">
                                    <MapPin className="w-4 h-4 text-[#4A7C59]" />
                                    <input value={data.location} onChange={e => update("location", e.target.value)} className="bg-transparent text-sm text-[#2D3142] outline-none flex-1" placeholder="City, state, or ZIP code" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#2D3142] mb-2">Monthly budget (approximate)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Under $3,000", "$3,000 – $5,000", "$5,000 – $7,000", "$7,000+"].map(b => (
                                        <OptionCard key={b} label={b} selected={data.budget === b} onClick={() => update("budget", b)} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#2D3142] mb-3">Insurance / payment method (select all)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Medicare", "Medicaid", "Private pay", "Long-term care insurance", "Veterans benefits", "Unsure"].map(ins => (
                                        <CheckCard key={ins} label={ins} selected={data.insurance.includes(ins)} onClick={() => toggleArr("insurance", ins)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setStep(s => s - 1)}
                        disabled={step === 1}
                        className="flex items-center gap-2 text-sm font-semibold text-[#8B8B8B] hover:text-[#2D3142] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>

                    {step < STEPS.length ? (
                        <button
                            onClick={() => setStep(s => s + 1)}
                            disabled={!canContinue()}
                            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleFinish}
                            disabled={!canContinue()}
                            className="btn-primary flex items-center gap-2 bg-[#4A7C59] disabled:opacity-50 disabled:cursor-not-allowed text-base px-8 py-3"
                        >
                            <CheckCircle className="w-4 h-4" /> See My Matches
                        </button>
                    )}
                </div>

                {/* Result Preview (last step only) */}
                {step === STEPS.length && data.cognitive && data.mobility && (
                    <div className="mt-5 bg-[#EBF3ED] rounded-2xl p-5 text-center">
                        <p className="text-sm text-[#6B6B6B] mb-1">Based on your answers, we recommend:</p>
                        <p className="font-display text-2xl font-semibold text-[#4A7C59]">{getRecommendation()}</p>
                        <p className="text-sm text-[#6B6B6B] mt-1">We'll show you verified facilities that specialize in this care level.</p>
                    </div>
                )}
            </div>
        </div>
    );
}