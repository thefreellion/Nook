import { useState } from "react";
import { Key, Link2 } from "lucide-react";

const ENTITIES = {
    User: {
        x: 60, y: 200,
        color: "#5B7FA6", bg: "#EBF1F8", border: "#5B7FA6",
        fields: [
            { name: "id", type: "string", pk: true },
            { name: "email", type: "string" },
            { name: "full_name", type: "string" },
            { name: "role", type: "enum" },
            { name: "created_date", type: "datetime" },
        ],
    },
    Facility: {
        x: 420, y: 60,
        color: "#4A7C59", bg: "#EBF3ED", border: "#4A7C59",
        fields: [
            { name: "id", type: "string", pk: true },
            { name: "name", type: "string" },
            { name: "type", type: "enum" },
            { name: "city", type: "string" },
            { name: "state", type: "string" },
            { name: "starting_price", type: "number" },
            { name: "beds_available", type: "number" },
            { name: "rating", type: "number" },
            { name: "care_24_7", type: "boolean" },
            { name: "amenities", type: "array" },
        ],
    },
    TourRequest: {
        x: 760, y: 200,
        color: "#8B5FA6", bg: "#F5EBF8", border: "#8B5FA6",
        fields: [
            { name: "id", type: "string", pk: true },
            { name: "facility_id", type: "string", fk: true },
            { name: "user_email", type: "string", fk: true },
            { name: "user_name", type: "string" },
            { name: "preferred_date", type: "date" },
            { name: "tour_type", type: "enum" },
            { name: "status", type: "enum" },
            { name: "loved_one_name", type: "string" },
        ],
    },
    SavedFacility: {
        x: 60, y: 520,
        color: "#E05B5B", bg: "#FEE2E2", border: "#E05B5B",
        fields: [
            { name: "id", type: "string", pk: true },
            { name: "created_by", type: "string", fk: true },
            { name: "facility_id", type: "string", fk: true },
            { name: "facility_name", type: "string" },
            { name: "notes", type: "string" },
            { name: "compare", type: "boolean" },
        ],
    },
    Message: {
        x: 420, y: 560,
        color: "#6B6B6B", bg: "#F5F2ED", border: "#6B6B6B",
        fields: [
            { name: "id", type: "string", pk: true },
            { name: "facility_id", type: "string", fk: true },
            { name: "sender_email", type: "string", fk: true },
            { name: "sender_name", type: "string" },
            { name: "content", type: "string" },
            { name: "is_from_facility", type: "boolean" },
            { name: "read", type: "boolean" },
        ],
    },
    Assessment: {
        x: 760, y: 520,
        color: "#C67C3A", bg: "#FBF3E8", border: "#C67C3A",
        fields: [
            { name: "id", type: "string", pk: true },
            { name: "created_by", type: "string", fk: true },
            { name: "loved_one_name", type: "string" },
            { name: "loved_one_age", type: "number" },
            { name: "mobility", type: "enum" },
            { name: "cognitive_status", type: "enum" },
            { name: "care_level_recommended", type: "string" },
            { name: "timeline", type: "enum" },
        ],
    },
};

const CARD_W = 200;
const ROW_H = 22;
const HEADER_H = 34;

function getCardHeight(entity) {
    return HEADER_H + entity.fields.length * ROW_H + 8;
}

// Returns the center-right or center-left port of an entity card
function port(name, side = "right") {
    const e = ENTITIES[name];
    const h = getCardHeight(e);
    const cx = side === "right" ? e.x + CARD_W : e.x;
    const cy = e.y + h / 2;
    return { x: cx, y: cy };
}

const TYPE_COLOR = {
    string: "#4A7C59",
    number: "#5B7FA6",
    boolean: "#C67C3A",
    array: "#8B5FA6",
    enum: "#8B5FA6",
    datetime: "#8B8B8B",
    date: "#8B8B8B",
};

// Smooth bezier path between two points
function bezier(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1) * 0.5;
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

// All relationships: [fromEntity, toEntity, label, fromSide, toSide]
const RELATIONS = [
    ["User", "TourRequest", "1:N via user_email", "right", "left"],
    ["User", "SavedFacility", "1:N via created_by", "bottom", "top"],
    ["User", "Assessment", "1:N via created_by", "right", "left"],
    ["User", "Message", "1:N via sender_email", "bottom", "top"],
    ["Facility", "TourRequest", "1:N via facility_id", "right", "left"],
    ["Facility", "SavedFacility", "1:N via facility_id", "bottom", "top"],
    ["Facility", "Message", "1:N via facility_id", "bottom", "top"],
];

function getPort(name, side) {
    const e = ENTITIES[name];
    const h = getCardHeight(e);
    if (side === "right") return { x: e.x + CARD_W, y: e.y + h / 2 };
    if (side === "left") return { x: e.x, y: e.y + h / 2 };
    if (side === "bottom") return { x: e.x + CARD_W / 2, y: e.y + h };
    if (side === "top") return { x: e.x + CARD_W / 2, y: e.y };
    return { x: e.x + CARD_W, y: e.y + h / 2 };
}

function bezierPath(p1, p2) {
    const dx = Math.abs(p2.x - p1.x) * 0.45;
    const dy = Math.abs(p2.y - p1.y) * 0.45;
    // horizontal dominant
    if (Math.abs(p2.x - p1.x) > Math.abs(p2.y - p1.y)) {
        return `M ${p1.x} ${p1.y} C ${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${p2.x} ${p2.y}`;
    }
    return `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y + dy}, ${p2.x} ${p2.y - dy}, ${p2.x} ${p2.y}`;
}

function EntityBox({ name, entity, selected, onClick }) {
    const h = getCardHeight(entity);
    return (
        <g
            onClick={() => onClick(name)}
            style={{ cursor: "pointer" }}
            className="entity-group"
        >
            {/* Shadow */}
            <rect x={entity.x + 3} y={entity.y + 4} width={CARD_W} height={h} rx={10} fill="rgba(45,49,66,0.08)" />
            {/* Card body */}
            <rect
                x={entity.x} y={entity.y} width={CARD_W} height={h} rx={10}
                fill="white"
                stroke={selected ? entity.border : "#E8E4DD"}
                strokeWidth={selected ? 2.5 : 1.5}
            />
            {/* Header */}
            <rect x={entity.x} y={entity.y} width={CARD_W} height={HEADER_H} rx={10} fill={entity.bg} />
            <rect x={entity.x} y={entity.y + HEADER_H - 10} width={CARD_W} height={10} fill={entity.bg} />
            <text x={entity.x + 12} y={entity.y + HEADER_H - 10} dominantBaseline="auto" fontSize={13} fontWeight="700" fill={entity.color} fontFamily="'Inter', sans-serif">
                {name}
            </text>

            {/* Fields */}
            {entity.fields.map((f, i) => {
                const fy = entity.y + HEADER_H + 6 + i * ROW_H;
                return (
                    <g key={f.name}>
                        {/* PK/FK icon */}
                        {f.pk && (
                            <text x={entity.x + 10} y={fy + 13} fontSize={9} fill="#F59E0B" fontFamily="monospace">PK</text>
                        )}
                        {f.fk && !f.pk && (
                            <text x={entity.x + 10} y={fy + 13} fontSize={9} fill="#5B7FA6" fontFamily="monospace">FK</text>
                        )}
                        {/* Field name */}
                        <text
                            x={entity.x + 30} y={fy + 13}
                            fontSize={11} fill={f.pk ? "#2D3142" : "#6B6B6B"}
                            fontWeight={f.pk ? "600" : "400"}
                            fontFamily="'Inter', monospace"
                        >
                            {f.name}
                        </text>
                        {/* Type */}
                        <text
                            x={entity.x + CARD_W - 8} y={fy + 13}
                            textAnchor="end"
                            fontSize={10}
                            fill={TYPE_COLOR[f.type] || "#8B8B8B"}
                            fontFamily="monospace"
                        >
                            {f.type}
                        </text>
                        {/* Row divider */}
                        {i < entity.fields.length - 1 && (
                            <line x1={entity.x + 1} y1={fy + ROW_H} x2={entity.x + CARD_W - 1} y2={fy + ROW_H} stroke="#F0EDE7" strokeWidth={1} />
                        )}
                    </g>
                );
            })}

            {/* Port dots */}
            {["left", "right", "top", "bottom"].map(side => {
                const p = getPort(name, side);
                return <circle key={side} cx={p.x} cy={p.y} r={3} fill={entity.color} opacity={selected ? 1 : 0.3} />;
            })}
        </g>
    );
}

const SVG_W = 1060;
const SVG_H = 820;

export default function ERD() {
    const [selected, setSelected] = useState(null);
    const [hoveredRel, setHoveredRel] = useState(null);

    const handleClick = (name) => setSelected(s => s === name ? null : name);

    const selectedEntity = selected ? ENTITIES[selected] : null;

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="font-display text-3xl font-semibold text-[#2D3142] mb-1">Entity Relationship Diagram</h1>
                    <p className="text-[#8B8B8B] text-sm">Nook data model · Click an entity to inspect · Hover lines to see relationships</p>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 items-center mb-5 bg-white rounded-2xl px-5 py-3 card-shadow text-xs text-[#6B6B6B]">
                    <div className="flex items-center gap-1.5"><span className="font-mono font-bold text-[#F59E0B]">PK</span> Primary Key</div>
                    <div className="flex items-center gap-1.5"><span className="font-mono font-bold text-[#5B7FA6]">FK</span> Foreign Key</div>
                    <div className="flex items-center gap-1.5"><span className="w-8 h-0.5 bg-[#4A7C59] inline-block" /> 1:N relationship</div>
                    <div className="flex flex-wrap gap-2 ml-auto">
                        {Object.entries(ENTITIES).map(([name, e]) => (
                            <span key={name} className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: e.bg, color: e.color }}>{name}</span>
                        ))}
                    </div>
                </div>

                <div className="flex gap-5 flex-col lg:flex-row">
                    {/* SVG Diagram */}
                    <div className="flex-1 bg-white rounded-2xl card-shadow overflow-auto">
                        <svg
                            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                            width="100%"
                            style={{ minWidth: 600, display: "block" }}
                        >
                            <defs>
                                <marker id="arrow-sage" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L8,3 z" fill="#4A7C59" opacity="0.7" />
                                </marker>
                                <marker id="arrow-slate" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L8,3 z" fill="#5B7FA6" opacity="0.7" />
                                </marker>
                                <marker id="arrow-hover" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L8,3 z" fill="#2D3142" />
                                </marker>
                            </defs>

                            {/* Background grid */}
                            <defs>
                                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F0EDE7" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width={SVG_W} height={SVG_H} fill="url(#grid)" />

                            {/* Relationship lines */}
                            {RELATIONS.map((rel, i) => {
                                const [from, to, label, fromSide, toSide] = rel;
                                const p1 = getPort(from, fromSide);
                                const p2 = getPort(to, toSide);
                                const path = bezierPath(p1, p2);
                                const isHovered = hoveredRel === i;
                                const isRelated = selected && (from === selected || to === selected);
                                const mx = (p1.x + p2.x) / 2;
                                const my = (p1.y + p2.y) / 2;

                                return (
                                    <g key={i}>
                                        {/* Hit area */}
                                        <path
                                            d={path}
                                            fill="none"
                                            stroke="transparent"
                                            strokeWidth={16}
                                            style={{ cursor: "pointer" }}
                                            onMouseEnter={() => setHoveredRel(i)}
                                            onMouseLeave={() => setHoveredRel(null)}
                                        />
                                        {/* Visible line */}
                                        <path
                                            d={path}
                                            fill="none"
                                            stroke={isHovered || isRelated ? "#2D3142" : "#B5CADA"}
                                            strokeWidth={isHovered || isRelated ? 2 : 1.5}
                                            strokeDasharray={isHovered ? "none" : "5,3"}
                                            markerEnd={isHovered || isRelated ? "url(#arrow-hover)" : "url(#arrow-slate)"}
                                            opacity={selected && !isRelated ? 0.2 : 1}
                                            style={{ transition: "all 0.15s ease" }}
                                        />
                                        {/* Label on hover */}
                                        {isHovered && (
                                            <g>
                                                <rect x={mx - 60} y={my - 11} width={120} height={20} rx={6} fill="#2D3142" />
                                                <text x={mx} y={my + 3} textAnchor="middle" fontSize={9} fill="white" fontFamily="'Inter', sans-serif">{label}</text>
                                            </g>
                                        )}
                                    </g>
                                );
                            })}

                            {/* Entity boxes */}
                            {Object.entries(ENTITIES).map(([name, entity]) => (
                                <EntityBox
                                    key={name}
                                    name={name}
                                    entity={entity}
                                    selected={selected === name}
                                    onClick={handleClick}
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Side panel */}
                    <div className="w-full lg:w-64 shrink-0">
                        {selectedEntity ? (
                            <div className="bg-white rounded-2xl card-shadow overflow-hidden sticky top-24">
                                <div className="p-4 border-b border-[#F0EDE7]" style={{ borderTopWidth: 4, borderTopColor: selectedEntity.border, borderTopStyle: "solid" }}>
                                    <h3 className="font-semibold text-[#2D3142] text-base">{selected}</h3>
                                    <p className="text-[#8B8B8B] text-xs mt-0.5">{selectedEntity.fields.length} fields</p>
                                </div>
                                <div className="p-4 space-y-2">
                                    {selectedEntity.fields.map(f => (
                                        <div key={f.name} className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                {f.pk && <span className="text-[9px] font-bold text-[#F59E0B] shrink-0">PK</span>}
                                                {f.fk && !f.pk && <span className="text-[9px] font-bold text-[#5B7FA6] shrink-0">FK</span>}
                                                <span className="font-mono text-xs text-[#2D3142] truncate">{f.name}</span>
                                            </div>
                                            <span className="text-[10px] font-mono shrink-0" style={{ color: TYPE_COLOR[f.type] || "#8B8B8B" }}>{f.type}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-4 pb-4">
                                    <p className="text-[10px] font-semibold text-[#8B8B8B] uppercase tracking-wide mb-2">Connected to</p>
                                    {RELATIONS.filter(r => r[0] === selected || r[1] === selected).map((r, i) => (
                                        <div key={i} className="text-xs text-[#6B6B6B] flex items-center gap-1 mb-1">
                                            <Link2 className="w-3 h-3 text-[#5B7FA6]" />
                                            <span className="font-semibold text-[#2D3142]">{r[0] === selected ? r[1] : r[0]}</span>
                                            <span className="text-[#B0ADA8]">1:N</span>
                                        </div>
                                    ))}
                                    {RELATIONS.filter(r => r[0] === selected || r[1] === selected).length === 0 && (
                                        <p className="text-xs text-[#B0ADA8]">No direct relationships</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl card-shadow p-6 text-center">
                                <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center mx-auto mb-3">
                                    <Key className="w-5 h-5 text-[#4A7C59]" />
                                </div>
                                <p className="font-semibold text-[#2D3142] text-sm mb-1">Click an entity</p>
                                <p className="text-[#8B8B8B] text-xs">Select any table in the diagram to inspect its fields and relationships.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}