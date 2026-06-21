"use client";

import React, { useState, useEffect } from "react";
import {
  Search, Loader2, Check, Circle, AlertTriangle, Building2, Network,
  MessageSquare, Presentation, Download, TrendingUp, Users, Target, Info,
} from "lucide-react";
import { PROSPECTS } from "@/data/prospects";

const C = {
  ink: "#0E1B2C", bg: "#F5F6F8", surface: "#FFFFFF", border: "#E4E7EC",
  text: "#101828", sub: "#475467", faint: "#98A2B3",
  teal: "#0E7C66", tealBg: "#E6F4F0", amber: "#B54708", amberBg: "#FEF0E6",
  blue: "#175CD3", blueBg: "#EAF1FD", red: "#B42318", redBg: "#FEECEB",
};
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const arr = (x) => (Array.isArray(x) ? x : []);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const STAGES = [
  { key: "a1", label: "Hồ sơ DN", icon: Building2 },
  { key: "a2", label: "Hệ sinh thái", icon: Network },
  { key: "a3", label: "Tiếp cận", icon: MessageSquare },
  { key: "a4", label: "Boardroom & ROI", icon: Presentation },
];

const CONF = {
  Low: { c: C.amber, bg: C.amberBg, t: "Cần xác minh" },
  Medium: { c: C.blue, bg: C.blueBg, t: "Trung bình" },
  High: { c: C.teal, bg: C.tealBg, t: "Cao" },
};
function ConfBadge({ level }) {
  const m = CONF[level] || CONF.Low;
  return <span style={{ fontSize: 11, color: m.c, background: m.bg, padding: "3px 9px", borderRadius: 6, whiteSpace: "nowrap" }}>Độ tin cậy: {m.t}</span>;
}
function Pill({ children, c, bg }) {
  return <span style={{ fontSize: 11, color: c, background: bg, padding: "3px 9px", borderRadius: 6 }}>{children}</span>;
}
function Card({ children, accent }) {
  return <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderLeft: accent ? `3px solid ${accent}` : `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", marginBottom: 14 }}>{children}</div>;
}
function SectionHead({ n, title, conf }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{ fontFamily: MONO, fontSize: 12, color: C.faint }}>{n}</span>
      <h3 style={{ fontSize: 16, fontWeight: 500, color: C.text, margin: 0, flex: 1 }}>{title}</h3>
      {conf && <ConfBadge level={conf} />}
    </div>
  );
}
const sevColor = (s) => (s === "High" ? C.red : s === "Medium" ? C.amber : C.sub);

function ReportA1({ d }) {
  const tiles = [["Ngành", d.industry?.primary || "—"], ["Quy mô", d.size?.tier || "—"], ["Digital maturity", d.digital_maturity?.level || "—"], ["AI readiness", d.ai_readiness?.level || "—"]];
  const sc = d.opportunity_score || {};
  const tier = sc.total >= 80 ? "A" : sc.total >= 60 ? "B" : sc.total >= 40 ? "C" : "D";
  return (
    <Card accent={C.teal}>
      <SectionHead n="01" title="Hồ sơ doanh nghiệp" conf={sc.confidence} />
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 320px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 10, marginBottom: 14 }}>
            {tiles.map(([l, v]) => (
              <div key={l} style={{ background: C.bg, borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 11, color: C.sub }}>{l}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>Pain points</div>
          {arr(d.pain_points).map((p, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{p.title}</span>{" "}
              <Pill c={sevColor(p.severity)} bg={C.bg}>{p.severity}</Pill>
              <div style={{ fontSize: 12, color: C.sub }}>{p.description}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: "0 0 200px", background: C.ink, borderRadius: 12, padding: 16, color: "#fff" }}>
          <div style={{ fontSize: 11, color: "#9DB0C7" }}>Opportunity score</div>
          <div style={{ fontFamily: MONO, fontSize: 40, fontWeight: 500, lineHeight: 1.1 }}>{sc.total ?? "—"}<span style={{ fontSize: 14, color: "#9DB0C7" }}>/100</span></div>
          <Pill c="#fff" bg={C.teal}>Tier {tier}</Pill>
          <div style={{ fontSize: 12, color: "#C7D2DF", marginTop: 10 }}>{sc.summary}</div>
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>Vì sao điểm này — breakdown</div>
        {arr(sc.components).map((c, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: C.text }}>{c.dimension} <span style={{ color: C.faint }}>· w{c.weight}</span></span>
              <span style={{ fontFamily: MONO, color: C.sub }}>{c.score}</span>
            </div>
            <div style={{ height: 5, background: C.bg, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${Math.max(0, Math.min(100, c.score))}%`, height: "100%", background: C.teal }} />
            </div>
            <div style={{ fontSize: 11, color: C.faint, marginTop: 2 }}>{c.reasoning}</div>
          </div>
        ))}
      </div>
      {arr(d.data_gaps).length > 0 && (
        <div style={{ marginTop: 12, fontSize: 12, color: C.amber, display: "flex", gap: 6 }}>
          <Info size={14} /> <span>Chưa rõ: {arr(d.data_gaps).join(" · ")}</span>
        </div>
      )}
    </Card>
  );
}

function ReportA2({ d }) {
  return (
    <Card accent={C.blue}>
      <SectionHead n="02" title="Hệ sinh thái — ưu tiên tiếp cận" />
      {arr(d.recommended_partners).map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontFamily: MONO, width: 22, color: C.blue, fontWeight: 500 }}>{p.rank}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{p.partner_name}</span>
              <Pill c={C.sub} bg={C.bg}>{p.category}</Pill>
              <ConfBadge level={p.confidence} />
            </div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>{p.fit_rationale}</div>
            {p.bcp_role && <div style={{ fontSize: 11, color: C.faint, marginTop: 2 }}>Vai trò BCP: {p.bcp_role}</div>}
          </div>
        </div>
      ))}
      {arr(d.similar_success_cases).length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>Case tương tự</div>
          {arr(d.similar_success_cases).map((c, i) => (
            <div key={i} style={{ fontSize: 12, color: C.sub, marginBottom: 4 }}>
              <span style={{ fontWeight: 500, color: C.text }}>{c.case_name}</span> · {c.what_was_done} <span style={{ color: C.faint }}>({c.relevance})</span>
            </div>
          ))}
        </div>
      )}
      {d.priority_summary && <div style={{ fontSize: 12, color: C.text, marginTop: 12, lineHeight: 1.6 }}>{d.priority_summary}</div>}
    </Card>
  );
}

function ReportA3({ d }) {
  const pb = d.conversation_playbook || {};
  return (
    <Card accent={C.amber}>
      <SectionHead n="03" title="Chiến lược tiếp cận" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 10, marginBottom: 14 }}>
        {arr(d.stakeholder_map).map((s, i) => (
          <div key={i} style={{ background: C.bg, borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <Users size={14} color={C.amber} /><span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{s.role}</span>
            </div>
            <div style={{ fontSize: 11, color: C.sub }}>Quan tâm: {arr(s.priorities).join(", ")}</div>
            <div style={{ fontSize: 11, color: C.sub }}>Đòn bẩy: {arr(s.hot_buttons).join(", ")}</div>
            {arr(s.likely_objections).length > 0 && <div style={{ fontSize: 11, color: C.faint }}>Phản đối: {arr(s.likely_objections).join(", ")}</div>}
          </div>
        ))}
      </div>
      <div style={{ background: C.ink, borderRadius: 10, padding: 14, color: "#fff", marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "#9DB0C7" }}>Mở đầu (15 phút)</div>
        <div style={{ fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>{pb.opening_hook}</div>
      </div>
      <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>Điểm thảo luận</div>
      {arr(pb.key_discussion_points).map((k, i) => (
        <div key={i} style={{ fontSize: 13, color: C.text, marginBottom: 5 }}>• {k.point} <span style={{ fontSize: 11, color: C.faint }}>↳ {k.tied_to}</span></div>
      ))}
      {arr(pb.questions_to_ask).length > 0 && <div style={{ fontSize: 12, color: C.sub, marginTop: 10 }}>Câu hỏi nên đặt: {arr(pb.questions_to_ask).join(" · ")}</div>}
      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {arr(d.suggested_next_steps).map((s, i) => (
          <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{s.step} <Pill c={C.sub} bg={C.bg}>{s.effort}</Pill></div>
            <div style={{ fontSize: 11, color: C.sub }}>{s.why}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReportA4({ d }) {
  const inv = d.investment_summary || {};
  return (
    <Card accent={C.ink}>
      <SectionHead n="04" title="Boardroom & lộ trình 90 ngày" />
      <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>Phòng họp sẽ hỏi gì</div>
      {arr(d.boardroom_debate).map((b, i) => (
        <div key={i} style={{ fontSize: 12, marginBottom: 5 }}>
          <span style={{ fontWeight: 500, color: C.text }}>{b.persona}</span>{" "}
          <Pill c={b.stance === "Skeptic" ? C.red : b.stance === "Champion" ? C.teal : C.amber} bg={C.bg}>{b.stance}</Pill>{" "}
          <span style={{ color: C.sub }}>“{b.likely_question}”</span>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px,1fr))", gap: 10, margin: "14px 0" }}>
        {arr(d.roi_scenarios).map((s, i) => (
          <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, color: C.sub }}>{s.scenario}</div>
            <div style={{ fontFamily: MONO, fontSize: 22, fontWeight: 500, color: C.text }}>{s.roi_pct || "—"}</div>
            {s.payback_period && <div style={{ fontSize: 11, color: C.faint }}>Hoàn vốn: {s.payback_period}</div>}
            <div style={{ marginTop: 6 }}><ConfBadge level={s.confidence} /></div>
            <div style={{ fontSize: 11, color: C.sub, marginTop: 8 }}>Giả định:</div>
            {arr(s.key_assumptions).map((a, j) => <div key={j} style={{ fontSize: 11, color: C.sub }}>• {a}</div>)}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>Lộ trình 90 ngày</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px,1fr))", gap: 10 }}>
        {arr(d.roadmap_90d).map((p, i) => (
          <div key={i} style={{ background: C.bg, borderRadius: 8, padding: 12 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, color: C.ink, fontWeight: 500 }}>{p.phase}</div>
            {arr(p.objectives).map((o, j) => <div key={j} style={{ fontSize: 12, color: C.text }}>• {o}</div>)}
            {p.success_metric && <div style={{ fontSize: 11, color: C.teal, marginTop: 4 }}>KPI: {p.success_metric}</div>}
          </div>
        ))}
      </div>
      {inv.est_band && (
        <div style={{ marginTop: 12, fontSize: 13, color: C.text }}>
          <TrendingUp size={14} color={C.ink} style={{ verticalAlign: -2 }} /> Khoảng đầu tư: <b>{inv.est_band}</b>
          <span style={{ fontSize: 12, color: C.sub }}> — {inv.basis}</span>
        </div>
      )}
      {d.executive_takeaway && (
        <div style={{ marginTop: 12, background: C.ink, color: "#fff", borderRadius: 10, padding: 14, fontSize: 14, lineHeight: 1.6 }}>
          <Target size={14} color="#9DB0C7" style={{ verticalAlign: -2 }} /> {d.executive_takeaway}
        </div>
      )}
    </Card>
  );
}

const RENDER = { a1: ReportA1, a2: ReportA2, a3: ReportA3, a4: ReportA4 };
const EMPTY = { a1: null, a2: null, a3: null, a4: null };
const PENDING = { a1: "pending", a2: "pending", a3: "pending", a4: "pending" };

export default function Page() {
  const [view, setView] = useState("input");
  const [prospectId, setProspectId] = useState("");
  const [inp, setInp] = useState({ name: "", website: "", notes: "" });
  const [status, setStatus] = useState({ ...PENDING });
  const [results, setResults] = useState({ ...EMPTY });
  const [sources, setSources] = useState({});
  const [errs, setErrs] = useState({});

  // Pre-fill từ QR: /?p=<prospect_id>
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("p");
    if (id && PROSPECTS[id]) {
      setProspectId(id);
      setInp({ ...PROSPECTS[id].input });
    } else {
      const first = Object.keys(PROSPECTS)[0];
      if (first) { setProspectId(first); setInp({ ...PROSPECTS[first].input }); }
    }
  }, []);

  function pick(id) {
    setProspectId(id);
    if (id && PROSPECTS[id]) setInp({ ...PROSPECTS[id].input });
  }

  async function run() {
    setView("dash");
    setStatus({ ...PENDING });
    setResults({ ...EMPTY });
    setSources({});
    setErrs({});
    const profile = { name: inp.name, website: inp.website, source_material: { notes: inp.notes }, locale: "vi" };
    const upstream = {};
    for (const st of STAGES) {
      setStatus((p) => ({ ...p, [st.key]: "running" }));
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage: st.key, profile, upstream, prospectId: prospectId || null }),
        });
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.error || "Lỗi không xác định");
        // Hiệu ứng "đang suy nghĩ" khi trả kết quả dựng sẵn
        if (json.source !== "live") await sleep(700);
        upstream[st.key] = json.data;
        setResults((p) => ({ ...p, [st.key]: json.data }));
        setSources((p) => ({ ...p, [st.key]: json.source }));
        setStatus((p) => ({ ...p, [st.key]: "done" }));
      } catch (e) {
        setErrs((p) => ({ ...p, [st.key]: e.message || "Lỗi" }));
        setStatus((p) => ({ ...p, [st.key]: "error" }));
        break;
      }
    }
  }

  const sc = results.a1?.opportunity_score;
  const tier = sc ? (sc.total >= 80 ? "A" : sc.total >= 60 ? "B" : sc.total >= 40 ? "C" : "D") : null;
  const usedFallback = Object.values(sources).includes("fallback");

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ background: C.ink, color: "#fff", padding: "14px 22px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: 7, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Network size={17} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 500 }}>AI Executive Intelligence Hub</div>
          <div style={{ fontSize: 11, color: "#9DB0C7" }}>BCP · multi-agent prospect intelligence</div>
        </div>
        {view === "dash" && (
          <button onClick={() => setView("input")} style={{ background: "transparent", border: "1px solid #2C3E55", color: "#C7D2DF", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer" }}>
            Phân tích DN khác
          </button>
        )}
      </div>

      <div style={{ padding: 22 }}>
        {view === "input" ? (
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <Card>
              <h3 style={{ fontSize: 16, fontWeight: 500, margin: "0 0 4px" }}>Phân tích doanh nghiệp</h3>
              <p style={{ fontSize: 13, color: C.sub, marginTop: 0 }}>Chọn prospect đã chuẩn bị, hoặc nhập công ty mới.</p>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: C.sub, display: "block", marginBottom: 4 }}>Prospect đã chuẩn bị (curated)</label>
                <select value={prospectId} onChange={(e) => pick(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, background: "#fff" }}>
                  <option value="">— Công ty mới (chạy live) —</option>
                  {Object.entries(PROSPECTS).map(([id, p]) => (
                    <option key={id} value={id}>{p.input.name}{p.prebaked ? " ✓ đã duyệt" : ""}</option>
                  ))}
                </select>
              </div>

              {[["Tên công ty", "name"], ["Website", "website"]].map(([l, k]) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, color: C.sub, display: "block", marginBottom: 4 }}>{l}</label>
                  <input value={inp[k]} onChange={(e) => setInp({ ...inp, [k]: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14 }} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: C.sub, display: "block", marginBottom: 4 }}>Ghi chú sales / mô tả</label>
                <textarea value={inp.notes} onChange={(e) => setInp({ ...inp, notes: e.target.value })} rows={5}
                  style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, resize: "vertical" }} />
              </div>
              <button onClick={run} disabled={!inp.name}
                style={{ width: "100%", background: C.ink, color: "#fff", border: "none", borderRadius: 8, padding: 11, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Search size={16} /> Chạy pipeline 4 agent
              </button>
            </Card>
          </div>
        ) : (
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{inp.name}</div>
                <div style={{ fontSize: 12, color: C.sub }}>{inp.website}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {sc && (
                  <>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: C.sub }}>Opportunity</div>
                      <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 500 }}>{sc.total}</div>
                    </div>
                    <Pill c="#fff" bg={C.teal}>Tier {tier}</Pill>
                  </>
                )}
                <button style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 10px", cursor: "pointer", display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: C.sub }}>
                  <Download size={15} /> Xuất PDF
                </button>
              </div>
            </div>

            {usedFallback && (
              <div style={{ fontSize: 12, color: C.amber, background: C.amberBg, padding: "8px 12px", borderRadius: 8, marginBottom: 12 }}>
                Đang dùng kết quả dự phòng (live không khả dụng).
              </div>
            )}

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {STAGES.map((st, i) => {
                const s = status[st.key];
                const Icn = st.icon;
                const map = { done: { c: C.teal, bg: C.tealBg }, running: { c: C.blue, bg: C.blueBg }, error: { c: C.red, bg: C.redBg }, pending: { c: C.faint, bg: C.surface } };
                const m = map[s];
                return (
                  <div key={st.key} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: m.c, background: m.bg, border: s === "pending" ? `1px solid ${C.border}` : "none", padding: "7px 13px", borderRadius: 8 }}>
                    {s === "done" ? <Check size={15} /> : s === "running" ? <Loader2 size={15} className="spin" /> : s === "error" ? <AlertTriangle size={15} /> : <Icn size={15} />}
                    <span style={{ fontFamily: MONO, fontSize: 11 }}>{i + 1}</span> {st.label}
                  </div>
                );
              })}
            </div>

            {STAGES.map((st) => {
              const R = RENDER[st.key];
              if (results[st.key]) return <R key={st.key} d={results[st.key]} />;
              if (status[st.key] === "running") return (
                <Card key={st.key}><div style={{ display: "flex", gap: 8, alignItems: "center", color: C.blue, fontSize: 14 }}><Loader2 size={16} className="spin" /> Đang chạy {st.label}…</div></Card>
              );
              if (status[st.key] === "error") return (
                <Card key={st.key} accent={C.red}><div style={{ color: C.red, fontSize: 13, display: "flex", gap: 8 }}><AlertTriangle size={16} /> <span>{st.label}: {errs[st.key]} — thử chạy lại.</span></div></Card>
              );
              return (
                <div key={st.key} style={{ border: `1px dashed ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 14, opacity: 0.6, fontSize: 13, color: C.faint, display: "flex", gap: 8, alignItems: "center" }}>
                  <Circle size={14} /> {st.label} — chờ bước trước
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
