// ============================================================
//  PROSPECTS — Hồ sơ prospect curated (dựng sẵn cho event)
// ============================================================
//  Mỗi prospect có:
//    input     : dữ liệu pre-fill khi quét QR (?p=<id>)
//    prebaked  : kết quả 4 agent ĐÃ CHẠY & ĐÃ DUYỆT (tuỳ chọn)
//
//  → Có "prebaked": app trả ngay kết quả đã duyệt (an toàn, không gọi AI,
//    không phụ thuộc mạng). ĐÂY LÀ CHẾ ĐỘ NÊN DÙNG TẠI EVENT.
//  → Không có "prebaked": app chạy AI live trên "input".
//
//  ⚠️  QUAN TRỌNG: BCP phải REVIEW & DUYỆT nội dung prebaked trước event.
//      Partner / con số ROI dưới đây là MINH HOẠ — thay bằng dữ liệu thật.
//
//  Cách tạo prebaked nhanh: chạy app ở chế độ live cho prospect, copy
//  JSON từ console/network, sửa tay cho chuẩn, dán vào đây.
// ============================================================

export const PROSPECTS = {
  bcp: {
    input: {
      name: "Busines Connecting Platform",
      website: "bcp.global",
      notes:
        "AI-powered business matching platform that revolutionizes B2B connections through advanced algorithms and verified profiles.",
    },
    prebaked: {
      a1: {
        industry: { primary: "Manufacturing", sub_sectors: ["Cơ khí chính xác", "Linh kiện công nghiệp"] },
        size: { employee_range: "1.000–1.500", tier: "Mid-market" },
        digital_maturity: {
          level: "Medium",
          signals: ["Đã có ERP nhưng phiên bản cũ", "Dữ liệu phân tán giữa 3 nhà máy", "Phòng IT nhỏ"],
        },
        ai_readiness: {
          level: "High",
          signals: ["Ban lãnh đạo chủ động quan tâm AI/tự động hoá", "Có bài toán dự báo nhu cầu rõ ràng"],
        },
        pain_points: [
          { title: "Dữ liệu sản xuất phân tán", description: "3 nhà máy chưa hợp nhất dữ liệu, khó nhìn toàn cảnh.", severity: "High" },
          { title: "Dự báo nhu cầu kém", description: "Lập kế hoạch sản xuất thiếu chính xác, tồn kho/thiếu hàng.", severity: "High" },
          { title: "ERP cũ", description: "Hệ thống lỗi thời, khó tích hợp công cụ mới.", severity: "Medium" },
        ],
        potential_needs: [
          { need: "Data Platform", rationale: "Hợp nhất dữ liệu 3 nhà máy làm nền cho phân tích." },
          { need: "AI demand forecasting", rationale: "Cải thiện độ chính xác kế hoạch sản xuất." },
          { need: "ERP integration", rationale: "Kết nối ERP cũ với lớp dữ liệu/AI mới." },
        ],
        opportunity_score: {
          total: 84,
          components: [
            { dimension: "Need fit", weight: 0.3, score: 90, reasoning: "Nhu cầu Data Platform + forecasting khớp thẳng năng lực BCP." },
            { dimension: "Digital & AI readiness", weight: 0.25, score: 80, reasoning: "Maturity Medium nhưng readiness cao, lãnh đạo ủng hộ." },
            { dimension: "Size / budget", weight: 0.2, score: 85, reasoning: "Mid-market đang mở rộng, có tín hiệu ngân sách." },
            { dimension: "Initiative momentum", weight: 0.15, score: 80, reasoning: "Đang mở rộng công suất, chủ động tìm giải pháp." },
            { dimension: "Accessibility", weight: 0.1, score: 75, reasoning: "Lãnh đạo quan tâm trực tiếp, tiếp cận được." },
          ],
          confidence: "Medium",
          summary: "Cơ hội Tier A: nhu cầu rõ, readiness cao, lãnh đạo ủng hộ.",
        },
        data_gaps: ["Doanh thu cụ thể", "Ngân sách CĐS dự kiến", "Cơ cấu ra quyết định chi tiết"],
      },
      a2: {
        recommended_partners: [
          { rank: 1, partner_name: "[Đối tác Data Platform A]", category: "Technology partner", fit_rationale: "Giải quyết pain point 'dữ liệu sản xuất phân tán'.", relevant_solutions: ["Data Platform", "BI & analytics"], bcp_role: "BCP tư vấn kiến trúc & điều phối triển khai.", confidence: "Medium" },
          { rank: 2, partner_name: "[Đối tác AI/Automation C]", category: "Technology partner", fit_rationale: "Phục vụ nhu cầu 'AI demand forecasting'.", relevant_solutions: ["Demand forecasting", "Process automation"], bcp_role: "BCP scoping bài toán & quản trị dự án.", confidence: "Medium" },
          { rank: 3, partner_name: "[Đối tác ERP B]", category: "Vendor", fit_rationale: "Xử lý pain point 'ERP cũ' qua tích hợp/nâng cấp.", relevant_solutions: ["ERP integration"], bcp_role: "BCP làm cầu nối tích hợp.", confidence: "Low" },
        ],
        similar_success_cases: [],
        priority_summary: "Ưu tiên kết nối Data Platform trước (nền cho mọi thứ), rồi tới AI forecasting. ⚠️ Partner là minh hoạ — thay bằng đối tác thật của BCP.",
      },
      a3: {
        stakeholder_map: [
          { role: "CEO / Chủ DN", priorities: ["Tăng trưởng", "Mở rộng năng lực sản xuất"], hot_buttons: ["Nhìn toàn cảnh dữ liệu để ra quyết định nhanh"], likely_objections: ["Lo gián đoạn sản xuất khi triển khai"] },
          { role: "Phụ trách vận hành / Nhà máy", priorities: ["Hiệu suất", "Giảm tồn kho"], hot_buttons: ["Dự báo nhu cầu chính xác hơn"], likely_objections: ["Đội ngũ chưa quen công cụ mới"] },
          { role: "IT (giả định — quy mô nhỏ)", priorities: ["Tích hợp ổn định"], hot_buttons: ["Không phải thay ERP toàn bộ"], likely_objections: ["Nguồn lực IT mỏng"] },
        ],
        conversation_playbook: {
          opening_hook: "Chúng tôi thấy Đại Việt đang mở rộng công suất — giai đoạn này dữ liệu phân tán giữa các nhà máy và dự báo nhu cầu thường là nút thắt lớn nhất.",
          key_discussion_points: [
            { point: "Hợp nhất dữ liệu 3 nhà máy thành một nền tảng", tied_to: "Dữ liệu sản xuất phân tán" },
            { point: "AI dự báo nhu cầu để giảm tồn kho/thiếu hàng", tied_to: "Dự báo nhu cầu kém" },
            { point: "Tích hợp dần thay vì thay ERP toàn bộ", tied_to: "ERP cũ" },
          ],
          proof_points: [],
          questions_to_ask: ["Hiện kế hoạch sản xuất sai lệch khoảng bao nhiêu %?", "Dữ liệu 3 nhà máy đang tổng hợp thủ công thế nào?"],
        },
        suggested_next_steps: [
          { step: "AI Readiness Assessment", why: "Đánh giá nhanh nền dữ liệu, tạo lộ trình cụ thể.", effort: "Low" },
          { step: "Discovery Session", why: "Đào sâu bài toán dự báo với đội vận hành.", effort: "Medium" },
        ],
        positioning_summary: "BCP là đối tác điều phối giải pháp dữ liệu + AI theo từng giai đoạn, không bắt thay toàn bộ hệ thống.",
      },
      a4: {
        boardroom_debate: [
          { persona: "CEO / Chủ DN", stance: "Champion", key_concern: "Đầu tư này có giúp mở rộng nhanh hơn không?", likely_question: "Bao lâu thì thấy kết quả?" },
          { persona: "Phụ trách tài chính", stance: "Cautious", key_concern: "Hoàn vốn & rủi ro", likely_question: "ROI dựa trên giả định nào?" },
          { persona: "Phụ trách vận hành", stance: "Cautious", key_concern: "Gián đoạn sản xuất", likely_question: "Triển khai có ảnh hưởng dây chuyền không?" },
        ],
        roi_scenarios: [
          { scenario: "Conservative", roi_pct: "10–14%", payback_period: "14–18 tháng", drivers: ["Giảm tồn kho nhờ dự báo tốt hơn"], key_assumptions: ["Chỉ triển khai 1 nhà máy giai đoạn đầu", "Áp dụng từng phần"], confidence: "Low" },
          { scenario: "Expected", roi_pct: "15–20%", payback_period: "10–14 tháng", drivers: ["Hợp nhất dữ liệu + forecasting", "Giảm sai lệch kế hoạch"], key_assumptions: ["Triển khai đúng tiến độ", "Đội vận hành áp dụng đều"], confidence: "Medium" },
          { scenario: "Aggressive", roi_pct: "22–30%", payback_period: "8–12 tháng", drivers: ["Mở rộng 3 nhà máy", "Tự động hoá thêm quy trình"], key_assumptions: ["Áp dụng toàn diện", "Mọi điều kiện thuận lợi"], confidence: "Low" },
        ],
        roadmap_90d: [
          { phase: "Day 0–30", objectives: ["Đánh giá nền dữ liệu", "Chốt phạm vi pilot 1 nhà máy"], deliverables: ["Báo cáo AI readiness", "Kế hoạch pilot"], success_metric: "Phê duyệt phạm vi pilot" },
          { phase: "Day 31–60", objectives: ["Dựng Data Platform pilot", "Kết nối dữ liệu nhà máy đầu"], deliverables: ["Data Platform pilot chạy"], success_metric: "Dữ liệu 1 nhà máy lên nền tảng" },
          { phase: "Day 61–90", objectives: ["Thử mô hình dự báo", "Đo kết quả vs baseline"], deliverables: ["Báo cáo kết quả forecasting"], success_metric: "Cải thiện độ chính xác dự báo (mục tiêu cần kiểm chứng)" },
        ],
        investment_summary: { est_band: "Theo từng giai đoạn — bắt đầu từ pilot quy mô nhỏ", basis: "Khung phỏng theo dự án CĐS sản xuất quy mô tương tự; cần báo giá chi tiết." },
        executive_takeaway: "Bắt đầu nhỏ với một pilot dữ liệu + dự báo ở một nhà máy; chứng minh ROI rồi mới mở rộng — đúng khẩu vị thận trọng và dòng tiền của DN sản xuất.",
      },
    },
  },

  // Thêm prospect khác tại đây. Tối thiểu cần "input"; thêm "prebaked" để
  // an toàn tuyệt đối tại event. Ví dụ prospect chỉ-live (không prebaked):
  //
  // techco: {
  //   input: { name: "...", website: "...", notes: "..." },
  // },
};
