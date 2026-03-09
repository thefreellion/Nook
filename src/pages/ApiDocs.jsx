import { useState } from "react";
import { Code, Copy, CheckCheck, ChevronDown, ChevronRight, Zap, Database, Shield, BookOpen } from "lucide-react";

const ENTITY_NAMES = ["Facility", "TourRequest", "SavedFacility", "Message", "Assessment", "ChatMessage"];

const ENDPOINTS = [
    {
        method: "GET", path: "/{entity}/list", label: "List all records",
        description: "Fetch all records for the entity, with optional sort and limit.",
        code: `import { base44 } from "@/api/base44Client";

// List all facilities (default limit: 50)
const facilities = await base44.entities.Facility.list();

// With sort and limit
const recent = await base44.entities.Facility.list("-created_date", 20);`,
        returns: "Array of entity objects",
        params: [
            { name: "sort", type: "string", required: false, desc: "Field to sort by. Prefix with - for descending (e.g. \"-created_date\")" },
            { name: "limit", type: "number", required: false, desc: "Max records to return (default: 50)" },
        ],
    },
    {
        method: "GET", path: "/{entity}/filter", label: "Filter records",
        description: "Fetch records matching a query filter.",
        code: `// Filter facilities by type and state
const results = await base44.entities.Facility.filter(
  { type: "Assisted Living", state: "WA" },
  "-rating",
  10
);

// Filter with comparison operators
const affordable = await base44.entities.Facility.filter(
  { starting_price: { $lte: 5000 }, care_24_7: true },
  "starting_price"
);

// Filter tour requests for current user
const myTours = await base44.entities.TourRequest.filter(
  { user_email: user.email, status: "Pending" }
);`,
        returns: "Array of matching entity objects",
        params: [
            { name: "query", type: "object", required: true, desc: "MongoDB-style filter object. Supports $eq, $ne, $gt, $gte, $lt, $lte, $in, $or" },
            { name: "sort", type: "string", required: false, desc: "Sort field (prefix - for descending)" },
            { name: "limit", type: "number", required: false, desc: "Max records to return" },
        ],
    },
    {
        method: "POST", path: "/{entity}/create", label: "Create a record",
        description: "Create a single new entity record.",
        code: `// Create a tour request
const tour = await base44.entities.TourRequest.create({
  facility_id: "abc123",
  facility_name: "Sunrise Gardens",
  user_name: "Linda Patterson",
  user_email: "linda@email.com",
  preferred_date: "2026-03-14",
  preferred_time: "10:00 AM",
  tour_type: "In-Person",
  status: "Pending"
});

// Save a facility to dashboard
const saved = await base44.entities.SavedFacility.create({
  facility_id: facility.id,
  facility_name: facility.name,
  compare: false
});`,
        returns: "Created entity object with id and created_date",
        params: [
            { name: "data", type: "object", required: true, desc: "Entity fields to create. Required fields must be included." },
        ],
    },
    {
        method: "PUT", path: "/{entity}/{id}", label: "Update a record",
        description: "Update specific fields on an existing record by ID.",
        code: `// Confirm a tour request
await base44.entities.TourRequest.update(tourId, {
  status: "Confirmed"
});

// Mark message as read
await base44.entities.Message.update(messageId, {
  read: true
});

// Update facility bed availability
await base44.entities.Facility.update(facilityId, {
  beds_available: 2,
  rating: 4.9
});`,
        returns: "Updated entity object",
        params: [
            { name: "id", type: "string", required: true, desc: "The entity record ID to update" },
            { name: "data", type: "object", required: true, desc: "Partial object with fields to update. Other fields remain unchanged." },
        ],
    },
    {
        method: "DELETE", path: "/{entity}/{id}", label: "Delete a record",
        description: "Permanently delete a record by ID.",
        code: `// Remove a saved facility
await base44.entities.SavedFacility.delete(savedId);

// Cancel and delete a tour request
await base44.entities.TourRequest.delete(tourId);`,
        returns: "{ success: true }",
        params: [
            { name: "id", type: "string", required: true, desc: "The entity record ID to delete" },
        ],
    },
    {
        method: "POST", path: "/{entity}/bulkCreate", label: "Bulk create records",
        description: "Create multiple records in a single operation.",
        code: `// Bulk import facilities
await base44.entities.Facility.bulkCreate([
  { name: "Sunrise Gardens", type: "Assisted Living", city: "Seattle", state: "WA", starting_price: 4200 },
  { name: "Meadowbrook", type: "Memory Care", city: "Bellevue", state: "WA", starting_price: 5800 },
]);`,
        returns: "Array of created entity objects",
        params: [
            { name: "data", type: "array", required: true, desc: "Array of entity objects to create" },
        ],
    },
    {
        method: "GET", path: "/{entity}/schema", label: "Get entity schema",
        description: "Returns the JSON schema of the entity (excludes built-in fields). Useful for dynamic form rendering.",
        code: `// Get schema for dynamic form
const schema = await base44.entities.Facility.schema();

// Use with a form renderer
<JsonSchemaForm schema={schema} onSubmit={handleSubmit} />`,
        returns: "JSON Schema object",
        params: [],
    },
    {
        method: "SUB", path: "/{entity}/subscribe", label: "Real-time subscription",
        description: "Subscribe to live changes on an entity (create, update, delete).",
        code: `// Subscribe to real-time facility updates
const unsubscribe = base44.entities.Facility.subscribe((event) => {
  if (event.type === "create") {
    setFacilities(prev => [...prev, event.data]);
  } else if (event.type === "update") {
    setFacilities(prev => prev.map(f => f.id === event.id ? event.data : f));
  } else if (event.type === "delete") {
    setFacilities(prev => prev.filter(f => f.id !== event.id));
  }
});

// Always cleanup on unmount
useEffect(() => {
  const unsub = base44.entities.TourRequest.subscribe(handleEvent);
  return unsub;  // called on unmount
}, []);`,
        returns: "unsubscribe function",
        params: [
            { name: "callback", type: "function", required: true, desc: "Function called with event: { id, type: 'create'|'update'|'delete', data }" },
        ],
    },
];

const AUTH_METHODS = [
    { method: "GET", label: "me()", desc: "Get current authenticated user", code: `const user = await base44.auth.me();` },
    { method: "PUT", label: "updateMe(data)", desc: "Update current user's profile data", code: `await base44.auth.updateMe({ role: "admin" });` },
    { method: "GET", label: "isAuthenticated()", desc: "Check if user is logged in", code: `const loggedIn = await base44.auth.isAuthenticated();` },
    { method: "POST", label: "logout(redirectUrl?)", desc: "Log out and redirect", code: `base44.auth.logout("/");` },
    { method: "POST", label: "redirectToLogin(nextUrl?)", desc: "Redirect to login page", code: `base44.auth.redirectToLogin(window.location.pathname);` },
];

const METHOD_COLORS = {
    GET: "bg-[#EBF3ED] text-[#4A7C59]",
    POST: "bg-[#EBF1F8] text-[#5B7FA6]",
    PUT: "bg-[#FBF3E8] text-[#C67C3A]",
    DELETE: "bg-[#FEE2E2] text-[#EF4444]",
    SUB: "bg-[#F5EBF8] text-[#8B5FA6]",
};

function CodeBlock({ code }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="relative bg-[#1E2235] rounded-xl overflow-hidden">
            <button onClick={copy} className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                {copied ? <CheckCheck className="w-3.5 h-3.5 text-[#6B9E78]" /> : <Copy className="w-3.5 h-3.5 text-white/50" />}
            </button>
            <pre className="p-4 text-xs text-[#B8C4D0] overflow-x-auto leading-relaxed font-mono">{code}</pre>
        </div>
    );
}

function EndpointCard({ ep }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white rounded-2xl overflow-hidden card-shadow">
            <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-4 p-5 hover:bg-[#FAF8F5] transition-colors text-left">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${METHOD_COLORS[ep.method]}`}>{ep.method}</span>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#2D3142] text-sm">{ep.label}</p>
                    <p className="text-[#8B8B8B] text-xs font-mono truncate">{ep.path}</p>
                </div>
                {open ? <ChevronDown className="w-4 h-4 text-[#8B8B8B] shrink-0" /> : <ChevronRight className="w-4 h-4 text-[#8B8B8B] shrink-0" />}
            </button>
            {open && (
                <div className="px-5 pb-5 space-y-4 border-t border-[#F0EDE7]">
                    <p className="text-sm text-[#6B6B6B] mt-4">{ep.description}</p>

                    {ep.params.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-[#2D3142] uppercase tracking-wide mb-2">Parameters</p>
                            <div className="space-y-1.5">
                                {ep.params.map(p => (
                                    <div key={p.name} className="flex items-start gap-3 text-xs">
                                        <code className="bg-[#FAF8F5] text-[#4A7C59] px-2 py-0.5 rounded font-mono shrink-0">{p.name}</code>
                                        <span className="text-[#5B7FA6] shrink-0">{p.type}</span>
                                        {p.required && <span className="bg-[#FEE2E2] text-[#EF4444] px-1.5 py-0.5 rounded shrink-0">required</span>}
                                        <span className="text-[#8B8B8B]">{p.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <p className="text-xs font-semibold text-[#2D3142] uppercase tracking-wide mb-2">Returns</p>
                        <code className="text-xs text-[#6B6B6B] bg-[#FAF8F5] px-3 py-1.5 rounded-lg block">{ep.returns}</code>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-[#2D3142] uppercase tracking-wide mb-2">Example</p>
                        <CodeBlock code={ep.code} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ApiDocs() {
    const [activeEntity, setActiveEntity] = useState("Facility");

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center">
                            <Code className="w-5 h-5 text-[#4A7C59]" />
                        </div>
                        <div>
                            <h1 className="font-display text-3xl font-semibold text-[#2D3142]">API Reference</h1>
                            <p className="text-[#8B8B8B] text-sm">Nook · Base44 SDK · v1.0</p>
                        </div>
                    </div>
                    <p className="text-[#6B6B6B] text-base max-w-2xl">All data operations are performed through the Base44 entities SDK. Import the client and call methods on any entity. Authentication, validation, and real-time sync are handled automatically.</p>
                </div>

                {/* Import */}
                <div className="mb-10">
                    <h2 className="font-semibold text-[#2D3142] mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-[#F59E0B]" /> Getting started</h2>
                    <CodeBlock code={`import { base44 } from "@/api/base44Client";

// Available entity namespaces:
// base44.entities.Facility
// base44.entities.TourRequest
// base44.entities.SavedFacility
// base44.entities.Message
// base44.entities.Assessment
// base44.entities.ChatMessage
// base44.entities.User  (built-in)
// base44.auth            (authentication)
// base44.integrations.Core  (LLM, email, file upload)`} />
                </div>

                {/* Entity selector */}
                <div className="mb-8">
                    <h2 className="font-semibold text-[#2D3142] mb-3 flex items-center gap-2"><Database className="w-4 h-4 text-[#5B7FA6]" /> Entity Methods</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {ENTITY_NAMES.map(e => (
                            <button
                                key={e}
                                onClick={() => setActiveEntity(e)}
                                className={`text-sm font-medium px-4 py-2 rounded-xl transition-all ${activeEntity === e ? 'bg-[#4A7C59] text-white' : 'bg-white text-[#6B6B6B] border border-[#E8E4DD] hover:border-[#4A7C59]'}`}
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                    <div className="mb-4 p-4 bg-white rounded-2xl card-shadow text-sm">
                        <span className="text-[#8B8B8B]">Selected entity:</span>
                        <code className="ml-2 font-mono font-semibold text-[#4A7C59]">base44.entities.{activeEntity}</code>
                    </div>
                    <div className="space-y-3">
                        {ENDPOINTS.map(ep => (
                            <EndpointCard key={ep.label} ep={{ ...ep, code: ep.code.replace(/Facility/g, activeEntity) }} />
                        ))}
                    </div>
                </div>

                {/* Auth */}
                <div className="mb-10">
                    <h2 className="font-semibold text-[#2D3142] mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-[#5B7FA6]" /> Authentication API</h2>
                    <div className="space-y-3">
                        {AUTH_METHODS.map(m => (
                            <div key={m.label} className="bg-white rounded-2xl p-5 card-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${METHOD_COLORS[m.method]}`}>{m.method}</span>
                                    <code className="font-mono text-sm font-semibold text-[#2D3142]">base44.auth.{m.label}</code>
                                </div>
                                <p className="text-[#6B6B6B] text-sm mb-3">{m.desc}</p>
                                <CodeBlock code={m.code} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RLS */}
                <div className="bg-[#EBF1F8] rounded-2xl p-6">
                    <h2 className="font-semibold text-[#2D3142] mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#5B7FA6]" /> Security & Access Control</h2>
                    <div className="space-y-3 text-sm text-[#6B6B6B]">
                        <p>Base44 enforces Row-Level Security (RLS) automatically:</p>
                        <ul className="space-y-2 list-none">
                            {[
                                "Users can only read/write their own records (created_by = user.email)",
                                "Admin users can access all records of any entity",
                                "Facility admins can read/write TourRequests for their facility",
                                "Messages are scoped to the sender and the receiving facility admin",
                                "User entity: only admins can list all users; regular users see only themselves",
                            ].map(rule => (
                                <li key={rule} className="flex items-start gap-2">
                                    <span className="text-[#5B7FA6] font-bold shrink-0">→</span> {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}