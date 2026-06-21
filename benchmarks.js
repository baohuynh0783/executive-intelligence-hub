// ============================================================
//  ROI_BENCHMARKS — Thư viện benchmark ROI (Agent 4)
// ============================================================
//  ⚠️  Nguồn ĐÁNG TIN nhất là kết quả dự án THẬT của BCP. Hãy seed từ
//  portfolio của bạn trước (SJK, HNH, các deal cũ...). Số ngành ngoài
//  chỉ nên dùng làm tham chiếu phụ và rất dễ bị C-level bắt bẻ.
//
//  Nếu để TRỐNG ([]), Agent 4 sẽ coi mọi con số là "ước tính, cần kiểm
//  chứng" và hạ confidence — an toàn nhưng kém thuyết phục.
//
//  Mỗi entry:
//    use_case          : bài toán (vd "Demand forecasting")
//    industry          : ngành
//    typical_roi_range : khoảng ROI dạng chuỗi, vd "12–20%"
//    typical_payback   : thời gian hoàn vốn, vd "9–14 tháng"
//    basis_note        : NGUỒN của con số (case BCP / nghiên cứu trích dẫn)
// ============================================================

export const ROI_BENCHMARKS = [
  {
    use_case: "Data Platform & analytics",
    industry: "Manufacturing",
    typical_roi_range: "12–20%",
    typical_payback: "10–16 tháng",
    basis_note: "[Nguồn — thay bằng case/dữ liệu thật của BCP]",
  },
  {
    use_case: "Demand forecasting (AI)",
    industry: "Manufacturing",
    typical_roi_range: "15–25%",
    typical_payback: "8–14 tháng",
    basis_note: "[Nguồn — thay bằng case/dữ liệu thật của BCP]",
  },
  {
    use_case: "Process automation (RPA)",
    industry: "All",
    typical_roi_range: "20–35%",
    typical_payback: "6–12 tháng",
    basis_note: "[Nguồn — thay bằng case/dữ liệu thật của BCP]",
  },
];
