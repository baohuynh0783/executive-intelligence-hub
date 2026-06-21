// ============================================================
//  lib/anthropic.js — Gọi Google Gemini (AI Studio) server-side.
//  Giữ tên hàm callAnthropic để route.js không phải đổi.
//  KEY chỉ tồn tại trên server (process.env), KHÔNG bao giờ lộ ra client.
// ============================================================

export function extractJSON(text) {
  let t = (text || "").replace(/```json/gi, "").replace(/```/g, "").trim();
  const s = t.indexOf("{");
  const e = t.lastIndexOf("}");
  if (s === -1 || e === -1) throw new Error("Mô hình không trả về JSON hợp lệ.");
  return JSON.parse(t.slice(s, e + 1));
}

export async function callAnthropic(system, userContent) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Chưa cấu hình GEMINI_API_KEY.");

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: userContent }] }],
      generationConfig: {
        maxOutputTokens: 4000,
        responseMimeType: "application/json",
      },
    }),
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data?.error?.message || `Lỗi API (HTTP ${res.status}).`);
  }
  const text = (data.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text)
    .join("\n");
  return extractJSON(text);
}
