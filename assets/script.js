const weekGroups = [
  { start: 1, end: 1, range: "Tuần 1", title: "Giới thiệu mở đầu", description: "Thông tin học phần, định hướng nghề nghiệp và mô hình IKIGAI." },
  { start: 2, end: 3, range: "Tuần 2–3", title: "Chương 1 — Giới thiệu chung về các lĩnh vực kỹ thuật", description: "Các lĩnh vực kỹ thuật, nghề nghiệp kỹ sư và đạo đức nghề nghiệp." },
  { start: 4, end: 8, range: "Tuần 4–8", title: "Chương 2 — Hệ thống và thiết bị Điện tử Viễn thông", description: "Đại lượng điện, linh kiện, mạng và hệ sinh thái IoT." },
  { start: 9, end: 9, range: "Tuần 9", title: "Thực tập nhận thức tại doanh nghiệp", description: "Trải nghiệm thực tế doanh nghiệp ngành Điện tử – Viễn thông." },
  { start: 10, end: 13, range: "Tuần 10–13", title: "Chương 3 — Công cụ và các phương pháp thiết kế kỹ thuật", description: "Công cụ phân tích vấn đề, quy trình thiết kế và xác nhận phần cứng." },
  { start: 14, end: 15, range: "Tuần 14–15", title: "Chương 4 — Triển khai và đánh giá đồ án nhóm (Team Project)", description: "Tổ chức nhóm, triển khai đồ án, báo cáo và thuyết trình." }
];

const weekButtons = [...document.querySelectorAll(".week-button")];
const detailWeek = document.querySelector("#detail-week");
const detailRange = document.querySelector("#detail-range");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");

weekButtons.forEach((button) => {
  const week = Number(button.dataset.week);
  const group = weekGroups.find((item) => week >= item.start && week <= item.end);
  button.setAttribute("aria-label", `Tuần ${week}: ${group.title}`);
  button.addEventListener("click", () => {
    weekButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    detailWeek.textContent = String(week).padStart(2, "0");
    detailRange.textContent = group.range;
    detailTitle.textContent = group.title;
    detailDescription.textContent = group.description;
  });
});

const tabs = [...document.querySelectorAll(".chapter-tab")];
function activateTab(tab, focus = false) {
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute("aria-controls")).hidden = !active;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      activateTab(tabs[next], true);
    }
  });
});
