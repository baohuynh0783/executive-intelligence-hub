# AI Executive Intelligence Hub — BCP

Web app multi-agent: khách quét QR → xem hồ sơ doanh nghiệp → 4 báo cáo executive (Company Intelligence · Ecosystem · Engagement · Boardroom + ROI) hiện dần.

Dành cho dev: bộ code này **sẵn-sàng-deploy**. Việc còn lại là (1) nạp API key, (2) nạp dữ liệu prospect/đối tác/ROI thật, (3) deploy.

---

## 1. Chạy local (5 phút)

```bash
npm install
cp .env.example .env.local      # rồi điền GEMINI_API_KEY (xem mục 3)
npm run dev                      # mở http://localhost:3000
```

App chạy được NGAY cả khi chưa có key — vì prospect `daiviet` đã có kết quả dựng sẵn (prebaked). Chọn nó trong dropdown để xem full luồng. Để phân tích công ty mới (live) thì cần key.

---

## 2. Hai chế độ vận hành

| Chế độ | Khi nào | Cần API key? | Rủi ro |
|---|---|---|---|
| Curated (prebaked) | Prospect đã chuẩn bị + duyệt trước | Không | Thấp nhất — KHUYẾN NGHỊ cho event |
| Live | Công ty lạ nhập tại chỗ | Có | Phụ thuộc mạng + chi phí |

Cơ chế trong `app/api/analyze/route.js`: **prebaked trước → live → fallback demo nếu live lỗi** (chống sập trước C-level).

---

## 3. Cấu hình (.env.local)

```
GEMINI_API_KEY=...                  # lấy từ Google AI Studio        # bắt buộc cho chế độ live
GEMINI_MODEL=gemini-2.5-flash       # tuỳ chọn
FALLBACK_TO_DEMO=true               # live lỗi → rơi về prebaked, không sập
FALLBACK_PROSPECT_ID=daiviet
```

API key (Gemini) chỉ nằm trên server (`lib/anthropic.js` đọc process.env), KHÔNG bao giờ ra client. Provider hiện tại: Google Gemini.

---

## 4. Nạp dữ liệu thật (việc của BCP, không phải dev tự bịa)

Sửa các file trong `data/`:

- `data/prospects.js` — hồ sơ prospect. Mỗi prospect có `input` (pre-fill) + tuỳ chọn `prebaked` (kết quả 4 agent đã duyệt). **Thêm các prospect sẽ tới event tại đây.**
- `data/ecosystem.js` — danh sách đối tác THẬT của BCP. Agent 2 chỉ đề xuất trong danh sách này.
- `data/benchmarks.js` — benchmark ROI (nên seed từ dự án thật của BCP).
- `data/cases.js` — case thành công thật.

Cách tạo `prebaked` nhanh: chạy live cho prospect → mở DevTools → Network → copy JSON `data` của từng call `/api/analyze` → review/sửa tay → dán vào `prospects.js`.

⚠️ Nội dung prebaked mẫu (`daiviet`) dùng partner/ROI MINH HOẠ — phải review & thay bằng dữ liệu thật trước event.

---

## 5. Deploy lên Vercel

```bash
# Đẩy code lên GitHub, rồi:
# 1. vercel.com → New Project → import repo
# 2. Environment Variables → thêm GEMINI_API_KEY (+ các biến mục 3)
# 3. Deploy
```

Hoặc dùng Vercel CLI: `npm i -g vercel && vercel`.

---

## 6. QR cho event

Mỗi prospect → một QR trỏ tới: `https://<app>.vercel.app/?p=<prospect_id>`
(vd `?p=daiviet`). App tự pre-fill và dùng kết quả đã duyệt.

QR chung (không có `?p=`) → mở màn nhập để khách lạ tự gõ (chế độ live).

---

## 7. Checklist trước event (QUAN TRỌNG)

- [ ] Đã nạp & DUYỆT prebaked cho mọi prospect dự kiến tới
- [ ] Đã thay đối tác/ROI minh hoạ bằng dữ liệu thật
- [ ] `FALLBACK_TO_DEMO=true` (chống sập)
- [ ] Test trên mạng yếu (bật 4G hotspot dự phòng tại booth)
- [ ] In QR cho từng prospect + 1 QR chung
- [ ] Tổng duyệt full luồng trên thiết bị sẽ dùng tại booth

---

## 8. Cấu trúc

```
app/
  page.jsx              giao diện dashboard (client)
  api/analyze/route.js  API server: chạy 1 agent / call
lib/
  prompts.js            system prompt 4 agent (cắm dữ liệu thư viện)
  anthropic.js          gọi Gemini API + trích JSON
data/
  prospects.js          hồ sơ + kết quả prebaked
  ecosystem.js          đối tác BCP (allowed-list cho Agent 2)
  benchmarks.js         benchmark ROI (Agent 4)
  cases.js              case thành công
```

## 9. Còn thiếu / có thể bổ sung sau

- Nút "Xuất PDF" hiện là placeholder — nối server-side render (Puppeteer) sau.
- Toggle EN/VN chưa làm (đã để dành ở giai đoạn sau).
- Streaming token thật (hiện hiện-dần theo từng agent, đã đủ cho demo).
