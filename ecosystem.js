// ============================================================
//  BCP_ECOSYSTEM — Danh sách hệ sinh thái đối tác của BCP
// ============================================================
//  ⚠️  THAY TOÀN BỘ nội dung mẫu bên dưới bằng đối tác THẬT của BCP.
//  Agent 2 (Ecosystem) CHỈ được đề xuất partner có trong danh sách này.
//  Danh sách càng đúng & đủ, đề xuất càng đáng tin trước C-level.
//
//  Mỗi entry:
//    partner_name        : tên đối tác
//    category            : "Technology partner" | "Vendor" | "Complementary solution"
//    capabilities[]      : năng lực chính (để khớp với pain point / nhu cầu)
//    industries_served[] : ngành phục vụ tốt
//    notes               : ghi chú chiến lược (đối tác chiến lược / giao dịch...)
// ============================================================

export const BCP_ECOSYSTEM = [
  {
    partner_name: "[Đối tác Data Platform A]",
    category: "Technology partner",
    capabilities: ["Data Platform", "Data warehouse", "BI & analytics"],
    industries_served: ["Manufacturing", "Retail", "Logistics"],
    notes: "Đối tác chiến lược — ưu tiên giới thiệu cho nhu cầu dữ liệu",
  },
  {
    partner_name: "[Đối tác ERP B]",
    category: "Vendor",
    capabilities: ["ERP", "ERP integration", "MES"],
    industries_served: ["Manufacturing"],
    notes: "Phù hợp DN sản xuất quy mô vừa",
  },
  {
    partner_name: "[Đối tác AI/Automation C]",
    category: "Technology partner",
    capabilities: ["RPA", "AI Assistant", "Process automation", "Demand forecasting"],
    industries_served: ["Manufacturing", "Retail", "Finance"],
    notes: "Mạnh về tự động hoá quy trình",
  },
  {
    partner_name: "[Đối tác hạ tầng Cloud D]",
    category: "Complementary solution",
    capabilities: ["Cloud infrastructure", "Security", "DevOps"],
    industries_served: ["All"],
    notes: "Nền tảng hạ tầng cho các giải pháp trên",
  },
];
