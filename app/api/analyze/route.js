// ============================================================
//  POST /api/analyze  — chạy MỘT agent cho mỗi lần gọi
//  Body: { stage, profile, upstream, prospectId }
//  Client gọi tuần tự a1→a2→a3→a4 (tạo hiệu ứng hiện dần).
//
//  Thứ tự xử lý mỗi stage:
//    1) Có prebaked cho prospect này  → trả ngay (curated, an toàn nhất)
//    2) Có API key                    → chạy AI live
//    3) Live lỗi + FALLBACK_TO_DEMO   → rơi về prebaked của prospect dự phòng
// ============================================================

import { PROSPECTS } from "@/data/prospects";
import { systemPrompt } from "@/lib/prompts";
import { callAnthropic } from "@/lib/anthropic";

export const runtime = "nodejs";

function buildUserContent(stage, profile, upstream) {
  const ctx = { profile, ...(upstream || {}) };
  return "DỮ LIỆU (JSON):\n" + JSON.stringify(ctx);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body không hợp lệ." }, { status: 400 });
  }

  const { stage, profile, upstream, prospectId } = body || {};
  if (!stage || !["a1", "a2", "a3", "a4"].includes(stage)) {
    return Response.json({ error: "Thiếu/sai 'stage'." }, { status: 400 });
  }

  // 1) Curated: trả kết quả đã duyệt
  const prebaked = prospectId ? PROSPECTS[prospectId]?.prebaked?.[stage] : null;
  if (prebaked) {
    return Response.json({ source: "curated", data: prebaked });
  }

  // 2) Live
  try {
    const sys = systemPrompt(stage);
    const user = buildUserContent(stage, profile, upstream);
    const data = await callAnthropic(sys, user);
    return Response.json({ source: "live", data });
  } catch (e) {
    // 3) Fallback demo (chống sập tại event)
    const fb = process.env.FALLBACK_TO_DEMO === "true";
    const fid = process.env.FALLBACK_PROSPECT_ID || "daiviet";
    const fbData = fb ? PROSPECTS[fid]?.prebaked?.[stage] : null;
    if (fbData) {
      return Response.json({ source: "fallback", data: fbData });
    }
    return Response.json({ error: e.message || "Lỗi xử lý." }, { status: 502 });
  }
}
