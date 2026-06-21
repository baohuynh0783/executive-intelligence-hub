"use client";

import React, { useState, useEffect } from "react";
import { Check, AlertTriangle, ArrowUpRight, ArrowRight } from "lucide-react";
import { PROSPECTS } from "@/data/prospects";

const T = {
  ink: "#15191F", inkDeep: "#0E1217",
  paper: "#ECECE8", surface: "#FBFAF7",
  line: "rgba(21,25,31,0.12)", lineSoft: "rgba(21,25,31,0.07)",
  brass: "#A0824C", brassDeep: "#7E6438",
  text: "#1A1F26", sub: "#5A636E", faint: "#9AA1AB",
  pos: "#2F6B53", warn: "#9A6B2E", neg: "#9A4B3C",
  onInk: "#F4F2EC", onInkSub: "#A7AEB8",
};
const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";
const arr = (x) => (Array.isArray(x) ? x : []);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const STAGES = [
  { key: "a1", label: "Hồ sơ doanh nghiệp" },
  { key: "a2", label: "Hệ sinh thái" },
  { key: "a3", label: "Chiến lược tiếp cận" },
  { key: "a4", label: "Boardroom & ROI" },
];
const CAPTIONS = {
  a1: ["Đọc hồ sơ doanh nghiệp", "Đánh giá mức độ trưởng thành số", "Định lượng cơ hội hợp tác"],
  a2: ["Đối chiếu hệ sinh thái đối tác", "Xếp hạng mức độ phù hợp", "Tìm case tương đồng"],
  a3: ["Lập bản đồ các bên ra quyết định", "Soạn kịch bản tiếp cận 15 phút", "Xác định bước đi tiếp theo"],
  a4: ["Mô phỏng phản ứng phòng họp", "Dựng các kịch bản ROI", "Phác lộ trình 90 ngày"],
};
const EMPTY = { a1: null, a2: null, a3: null, a4: null };
const PENDING = { a1: "pending", a2: "pending", a3: "pending", a4: "pending" };

function ConfDot({ level }) {
  const m = { Low: [T.warn, "Cần xác minh"], Medium: [T.brass, "Trung bình"], High: [T.pos, "Cao"] }[level] || [T.warn, "Cần xác minh"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: 0.3, textTransform: "uppercase", color: T.sub }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m[0] }} /> {m[1]}
    </span>
  );
}

function Eyebrow({ n, title, conf }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontFamily: SERIF, fontSize: 15, color: T.brass, fontWeight: 500 }}>{n}</span>
          <h3 style={{ fontFamily: SERIF, fontSize: 23, fontWeight: 500, color: T.text, margin: 0, letterSpacing: -0.2 }}>{title}</h3>
        </div>
        {conf && <ConfDot level={conf} />}
      </div>
      <div style={{ height: 1, background: T.line, marginTop: 14 }} />
    </div>
  );
}

const Section = ({ children }) => (
  <section className="rv" style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 4, padding: "30px 34px", marginBottom: 18 }}>
    {children}
  </section>
);

function ReportA1({ d }) {
  const sc = d.opportunity_score || {};
  const tier = sc.total >= 80 ? "A" : sc.total >= 60 ? "B" : sc.total >= 40 ? "C" : "D";
  const attrs = [
    ["Ngành", d.industry?.primary], ["Quy mô", d.size?.tier],
    ["Mức độ số hoá", d.digital_maturity?.level], ["AI readiness", d.ai_readiness?.level],
  ];
  return (
    <Section>
      <Eyebrow n="01" title="Hồ sơ doanh nghiệp" conf={sc.confidence} />
      <div style={{ display: "flex", gap: 34, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 340px", minWidth: 280 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 28px", marginBottom: 26 }}>
            {attrs.map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: T.faint, marginBottom: 3 }}>{l}</div>
                <div style={{ fontSize: 17, color: T.text }}>{v || "—"}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: T.faint, marginBottom: 10 }}>Pain points</div>
          {arr(d.pain_points).map((p, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 15, color: T.text, fontWeight: 500 }}>{p.title}</span>
                <span style={{ fontSize: 10, letterSpacing: 0.4, textTransform: "uppercase", color: p.severity === "High" ? T.neg : p.severity === "Medium" ? T.warn : T.faint }}>{p.severity}</span>
              </div>
              <div style={{ fontSize: 13.5, color: T.sub, lineHeight: 1.6 }}>{p.description}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: "0 0 196px", background: T.inkDeep, borderRadius: 4, padding: "24px 22px", color: T.onInk, alignSelf: "flex-start" }}>
          <div style={{ fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase", color: T.onInkSub }}>Opportunity score</div>
          <div style={{ fontFamily: SERIF, fontSize: 58, fontWeight: 400, lineHeight: 1, margin: "6px 0 2px", fontFeatureSettings: "'tnum'" }}>
            {sc.total ?? "—"}<span style={{ fontSize: 17, color: T.onInkSub }}> /100</span>
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 14, color: T.brass, letterSpacing: 0.5, marginBottom: 12 }}>Tier {tier}</div>
          <div style={{ fontSize: 12.5, color: T.onInkSub, lineHeight: 1.65 }}>{sc.summary}</div>
        </div>
      </div>
      <div style={{ marginTop: 26, paddingTop: 20, borderTop: `1px solid ${T.lineSoft}` }}>
        <div style={{ fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: T.faint, marginBottom: 14 }}>Cơ sở điểm số</div>
        {arr(sc.components).map((c, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
              <span style={{ fontSize: 13.5, color: T.text }}>{c.dimension}<span style={{ color: T.faint, fontSize: 12 }}> · trọng số {c.weight}</span></span>
              <span style={{ fontFamily: SERIF, fontSize: 16, color: T.brassDeep, fontFeatureSettings: "'tnum'" }}>{c.score}</span>
            </div>
            <div style={{ height: 3, background: T.lineSoft, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${Math.max(0, Math.min(100, c.score))}%`, height: "100%", background: T.brass }} />
            </div>
            <div style={{ fontSize: 12.5, color: T.sub, marginTop: 5, lineHeight: 1.55 }}>{c.reasoning}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ReportA2({ d }) {
  return (
    <Section>
      <Eyebrow n="02" title="Hệ sinh thái — ưu tiên tiếp cận" />
      {arr(d.recommended_partners).map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 20, padding: "16px 0", borderBottom: i < arr(d.recommended_partners).length - 1 ? `1px solid ${T.lineSoft}` : "none" }}>
          <span style={{ fontFamily: SERIF, fontSize: 26, color: T.brass, fontWeight: 400, lineHeight: 1, width: 30 }}>{p.rank}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 16, color: T.text, fontWeight: 500 }}>{p.partner_name}</span>
              <span style={{ fontSize: 11, letterSpacing: 0.3, textTransform: "uppercase", color: T.faint }}>{p.category}</span>
              <ConfDot level={p.confidence} />
            </div>
            <div style={{ fontSize: 13.5, color: T.sub, marginTop: 4, lineHeight: 1.6 }}>{p.fit_rationale}</div>
            {p.bcp_role && <div style={{ fontSize: 12.5, color: T.faint, marginTop: 3 }}>Vai trò BCP — {p.bcp_role}</div>}
          </div>
        </div>
      ))}
      {d.priority_summary && <div style={{ fontSize: 13.5, color: T.text, marginTop: 18, lineHeight: 1.7 }}>{d.priority_summary}</div>}
    </Section>
  );
}

function ReportA3({ d }) {
  const pb = d.conversation_playbook || {};
  return (
    <Section>
      <Eyebrow n="03" title="Chiến lược tiếp cận" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 24, marginBottom: 26 }}>
        {arr(d.stakeholder_map).map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 6 }}>{s.role}</div>
            <div style={{ fontSize: 12.5, color: T.sub, lineHeight: 1.6 }}>Quan tâm: {arr(s.priorities).join(", ")}</div>
            <div style={{ fontSize: 12.5, color: T.sub, lineHeight: 1.6 }}>Đòn bẩy: {arr(s.hot_buttons).join(", ")}</div>
          </div>
        ))}
      </div>
      <blockquote style={{ margin: 0, padding: "4px 0 4px 22px", borderLeft: `2px solid ${T.brass}`, marginBottom: 24 }}>
        <div style={{ fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>Mở đầu cuộc trò chuyện</div>
        <div style={{ fontFamily: SERIF, fontSize: 19, color: T.text, lineHeight: 1.5, fontStyle: "italic" }}>“{pb.opening_hook}”</div>
      </blockquote>
      <div style={{ fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: T.faint, marginBottom: 10 }}>Điểm thảo luận</div>
      {arr(pb.key_discussion_points).map((k, i) => (
        <div key={i} style={{ fontSize: 14, color: T.text, marginBottom: 7, lineHeight: 1.55 }}>
          {k.point}<span style={{ fontSize: 12, color: T.faint }}>  ↳ {k.tied_to}</span>
        </div>
      ))}
      <div style={{ marginTop: 22, display: "flex", gap: 22, flexWrap: "wrap" }}>
        {arr(d.suggested_next_steps).map((s, i) => (
          <div key={i} style={{ flex: "1 1 200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 14, color: T.text, fontWeight: 500 }}>
              <ArrowRight size={14} color={T.brass} /> {s.step}
            </div>
            <div style={{ fontSize: 12.5, color: T.sub, marginTop: 3, lineHeight: 1.55 }}>{s.why}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ReportA4({ d }) {
  const inv = d.investment_summary || {};
  return (
    <Section>
      <Eyebrow n="04" title="Boardroom & lộ trình 90 ngày" />
      <div style={{ fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: T.faint, marginBottom: 12 }}>Phòng họp sẽ hỏi</div>
      {arr(d.boardroom_debate).map((b, i) => (
        <div key={i} style={{ fontSize: 14, color: T.text, marginBottom: 7, lineHeight: 1.55 }}>
          <span style={{ fontWeight: 600 }}>{b.persona}</span>
          <span style={{ fontSize: 11, letterSpacing: 0.3, textTransform: "uppercase", color: b.stance === "Skeptic" ? T.neg : b.stance === "Champion" ? T.pos : T.warn }}>  {b.stance}</span>
          <span style={{ color: T.sub }}> — “{b.likely_question}”</span>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 22, margin: "24px 0", paddingTop: 22, borderTop: `1px solid ${T.lineSoft}` }}>
        {arr(d.roi_scenarios).map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: T.faint }}>{s.scenario}</div>
            <div style={{ fontFamily: SERIF, fontSize: 30, color: T.text, lineHeight: 1.1, margin: "2px 0" }}>{s.roi_pct || "—"}</div>
            {s.payback_period && <div style={{ fontSize: 12, color: T.faint }}>Hoàn vốn {s.payback_period}</div>}
            <div style={{ marginTop: 6 }}><ConfDot level={s.confidence} /></div>
            <div style={{ marginTop: 8 }}>
              {arr(s.key_assumptions).map((a, j) => <div key={j} style={{ fontSize: 12, color: T.sub, lineHeight: 1.5 }}>· {a}</div>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: T.faint, marginBottom: 12 }}>Lộ trình 90 ngày</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 22 }}>
        {arr(d.roadmap_90d).map((p, i) => (
          <div key={i} style={{ borderTop: `2px solid ${T.brass}`, paddingTop: 10 }}>
            <div style={{ fontFamily: SERIF, fontSize: 15, color: T.text }}>{p.phase}</div>
            {arr(p.objectives).map((o, j) => <div key={j} style={{ fontSize: 13, color: T.sub, lineHeight: 1.55, marginTop: 3 }}>{o}</div>)}
            {p.success_metric && <div style={{ fontSize: 12, color: T.brassDeep, marginTop: 6 }}>KPI: {p.success_metric}</div>}
          </div>
        ))}
      </div>
      {inv.est_band && (
        <div style={{ fontSize: 13.5, color: T.text, marginTop: 22, lineHeight: 1.6 }}>
          Khoảng đầu tư: <span style={{ fontWeight: 600 }}>{inv.est_band}</span> <span style={{ color: T.sub }}>— {inv.basis}</span>
        </div>
      )}
      {d.executive_takeaway && (
        <div style={{ marginTop: 22, background: T.inkDeep, color: T.onInk, borderRadius: 4, padding: "24px 28px" }}>
          <div style={{ fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase", color: T.brass, marginBottom: 8 }}>Executive takeaway</div>
          <div style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.55, fontStyle: "italic" }}>{d.executive_takeaway}</div>
        </div>
      )}
    </Section>
  );
}

const RENDER = { a1: ReportA1, a2: ReportA2, a3: ReportA3, a4: ReportA4 };

export default function Page() {
  const [view, setView] = useState("input");
  const [prospectId, setProspectId] = useState("");
  const [inp, setInp] = useState({ name: "", website: "", notes: "" });
  const [status, setStatus] = useState({ ...PENDING });
  const [results, setResults] = useState({ ...EMPTY });
  const [sources, setSources] = useState({});
  const [errs, setErrs] = useState({});
  const [cap, setCap] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("p");
    if (id && PROSPECTS[id]) { setProspectId(id); setInp({ ...PROSPECTS[id].input }); }
    else { const f = Object.keys(PROSPECTS)[0]; if (f) { setProspectId(f); setInp({ ...PROSPECTS[f].input }); } }
  }, []);

  const running = STAGES.find((s) => status[s.key] === "running")?.key;
  useEffect(() => {
    if (!running) { setCap(""); return; }
    const list = CAPTIONS[running];
    let i = 0; setCap(list[0]);
    const t = setInterval(() => { i = (i + 1) % list.length; setCap(list[i]); }, 1900);
    return () => clearInterval(t);
  }, [running]);

  function pick(id) { setProspectId(id); if (id && PROSPECTS[id]) setInp({ ...PROSPECTS[id].input }); }

  async function run() {
    setView("dash"); setStatus({ ...PENDING }); setResults({ ...EMPTY }); setSources({}); setErrs({});
    const profile = { name: inp.name, website: inp.website, source_material: { notes: inp.notes }, locale: "vi" };
    const upstream = {};
    for (const st of STAGES) {
      setStatus((p) => ({ ...p, [st.key]: "running" }));
      try {
        const res = await fetch("/api/analyze", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage: st.key, profile, upstream, prospectId: prospectId || null }),
        });
        const json = await res.json();
        if (!res.ok || json.error) throw new Error(json.error || "Lỗi không xác định");
        if (json.source !== "live") await sleep(950);
        upstream[st.key] = json.data;
        setResults((p) => ({ ...p, [st.key]: json.data }));
        setSources((p) => ({ ...p, [st.key]: json.source }));
        setStatus((p) => ({ ...p, [st.key]: "done" }));
      } catch (e) {
        setErrs((p) => ({ ...p, [st.key]: e.message || "Lỗi" }));
        setStatus((p) => ({ ...p, [st.key]: "error" })); break;
      }
    }
  }

  const sc = results.a1?.opportunity_score;
  const tier = sc ? (sc.total >= 80 ? "A" : sc.total >= 60 ? "B" : sc.total >= 40 ? "C" : "D") : null;
  const usedFallback = Object.values(sources).includes("fallback");

  return (
    <div style={{ minHeight: "100vh", color: T.text }}>
      <header style={{ background: T.inkDeep, color: T.onInk, padding: "16px 30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 500, letterSpacing: 0.2 }}>Executive Intelligence Hub</div>
          <div style={{ fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase", color: T.onInkSub, marginTop: 1 }}>BCP · Prospect Intelligence</div>
        </div>
        {view === "dash" && (
          <button onClick={() => setView("input")} style={{ background: "transparent", border: `1px solid rgba(255,255,255,0.18)`, color: T.onInkSub, borderRadius: 3, padding: "8px 16px", fontSize: 12.5, cursor: "pointer", letterSpacing: 0.3 }}>
            Phân tích DN khác
          </button>
        )}
      </header>

      <div style={{ padding: "40px 24px 80px" }}>
        {view === "input" ? (
          <div style={{ maxWidth: 540, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <h1 style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 500, color: T.text, margin: 0, letterSpacing: -0.5 }}>Phân tích doanh nghiệp</h1>
              <p style={{ fontSize: 14, color: T.sub, marginTop: 8 }}>Bốn agent chạy tuần tự để dựng bản brief chiến lược.</p>
            </div>
            <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 4, padding: "28px 30px" }}>
              <Field label="Prospect đã chuẩn bị">
                <select value={prospectId} onChange={(e) => pick(e.target.value)} style={inputStyle}>
                  <option value="">— Công ty mới (chạy live) —</option>
                  {Object.entries(PROSPECTS).map(([id, p]) => (
                    <option key={id} value={id}>{p.input.name}{p.prebaked ? " · đã duyệt" : ""}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tên công ty"><input value={inp.name} onChange={(e) => setInp({ ...inp, name: e.target.value })} style={inputStyle} /></Field>
              <Field label="Website"><input value={inp.website} onChange={(e) => setInp({ ...inp, website: e.target.value })} style={inputStyle} /></Field>
              <Field label="Ghi chú / mô tả (càng kỹ, phân tích càng sắc)">
                <textarea value={inp.notes} onChange={(e) => setInp({ ...inp, notes: e.target.value })} rows={5} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
              </Field>
              <button onClick={run} disabled={!inp.name} style={{ width: "100%", background: T.ink, color: T.onInk, border: "none", borderRadius: 3, padding: "13px", fontSize: 14, cursor: inp.name ? "pointer" : "not-allowed", opacity: inp.name ? 1 : 0.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: 0.3, marginTop: 6 }}>
                Khởi chạy phân tích <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 8 }}>
              <div>
                <h1 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 500, color: T.text, margin: 0, letterSpacing: -0.4 }}>{inp.name}</h1>
                <div style={{ fontSize: 13, color: T.sub }}>{inp.website}</div>
              </div>
              <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                {sc && (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, letterSpacing: 0.6, textTransform: "uppercase", color: T.faint }}>Opportunity · Tier {tier}</div>
                    <div style={{ fontFamily: SERIF, fontSize: 30, color: T.text, lineHeight: 1, fontFeatureSettings: "'tnum'" }}>{sc.total}</div>
                  </div>
                )}
                <button style={{ background: "transparent", border: `1px solid ${T.line}`, borderRadius: 3, padding: "9px 14px", cursor: "pointer", fontSize: 12.5, color: T.sub, display: "flex", gap: 7, alignItems: "center" }}>
                  Xuất PDF <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            <div style={{ display: "flex", borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, margin: "20px 0 6px" }}>
              {STAGES.map((st, i) => {
                const s = status[st.key];
                const c = s === "done" ? T.text : s === "running" ? T.brassDeep : s === "error" ? T.neg : T.faint;
                return (
                  <div key={st.key} style={{ flex: 1, padding: "14px 10px", borderLeft: i ? `1px solid ${T.lineSoft}` : "none", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ fontFamily: SERIF, fontSize: 12, color: s === "pending" ? T.faint : T.brass }}>{String(i + 1).padStart(2, "0")}</span>
                      {s === "done" && <Check size={13} color={T.pos} />}
                      {s === "error" && <AlertTriangle size={13} color={T.neg} />}
                    </div>
                    <div style={{ fontSize: 12.5, color: c, marginTop: 3, fontWeight: s === "running" ? 600 : 400 }}>{st.label}</div>
                    {s === "running" && <div className="track" style={{ position: "absolute", left: 0, bottom: -1, height: 2, width: "100%" }} />}
                  </div>
                );
              })}
            </div>

            <div style={{ height: 30, display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              {running && (
                <>
                  <span className="blink" style={{ width: 6, height: 6, borderRadius: "50%", background: T.brass }} />
                  <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: T.sub }}>{cap}…</span>
                </>
              )}
              {!running && Object.values(status).every((s) => s === "done") && (
                <span style={{ fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase", color: T.faint }}>Hoàn tất phân tích</span>
              )}
            </div>

            {usedFallback && (
              <div style={{ fontSize: 12.5, color: T.warn, border: `1px solid ${T.line}`, borderRadius: 3, padding: "10px 14px", marginBottom: 16 }}>
                Đang dùng kết quả dự phòng — phân tích live không khả dụng.
              </div>
            )}

            {STAGES.map((st) => {
              const R = RENDER[st.key];
              if (results[st.key]) return <R key={st.key} d={results[st.key]} />;
              if (status[st.key] === "running")
                return (
                  <section key={st.key} style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 4, padding: "30px 34px", marginBottom: 18 }}>
                    <div style={{ height: 14, width: "42%", background: T.lineSoft, borderRadius: 2, marginBottom: 18 }} className="pulse" />
                    {[88, 70, 80].map((w, i) => <div key={i} className="pulse" style={{ height: 10, width: `${w}%`, background: T.lineSoft, borderRadius: 2, marginBottom: 10 }} />)}
                  </section>
                );
              if (status[st.key] === "error")
                return (
                  <section key={st.key} style={{ border: `1px solid ${T.line}`, borderRadius: 4, padding: "24px 30px", marginBottom: 18 }}>
                    <div style={{ fontSize: 13.5, color: T.neg, display: "flex", gap: 9, alignItems: "center" }}>
                      <AlertTriangle size={16} /> <span>{st.label}: {errs[st.key]}</span>
                    </div>
                  </section>
                );
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 13px", border: `1px solid ${T.line}`,
  borderRadius: 3, fontSize: 14, background: "#fff", color: T.text, outline: "none",
};
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <label style={{ fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: T.faint, display: "block", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}
