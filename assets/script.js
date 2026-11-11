const roadmaps = {
  "4": {
    groups: [
      { start: 1, end: 1, range: "Tuần 1", title: "Giới thiệu mở đầu và Chương 1", description: "Thông tin học phần, lập nhóm, bức tranh kỹ thuật, vai trò kỹ sư và đạo đức nghề nghiệp ở mức tổng quan.", legend: "Tuần 1 · Mở đầu và Chương 1" },
      { start: 2, end: 2, range: "Tuần 2", title: "Chương 2 — Điện tử Viễn thông (tổng quan)", description: "Vai trò của ngành, linh kiện và mô hình AIoT 5 lớp.", legend: "Tuần 2 · Chương 2" },
      { start: 3, end: 4, range: "Tuần 3–4", title: "Chương 3 — Công cụ và quy trình thiết kế", description: "5W2H, SMART, 5 Whys, quy trình EDP 9 bước, hướng dẫn nhật ký kỹ thuật; chốt đề tài và báo cáo A3.", legend: "Tuần 3–4 · Chương 3" },
      { start: 5, end: 8, range: "Tuần 5–8", title: "Project — ý tưởng, thiết kế, mạch thử", description: "Khảo sát nhu cầu, yêu cầu kỹ thuật, sơ đồ khối, chọn linh kiện, mô phỏng và mạch PoC.", legend: "Tuần 5–8 · Project", project: true },
      { start: 9, end: 9, range: "Tuần 9", title: "Thực tập nhận thức tại doanh nghiệp", description: "Trải nghiệm thực tế doanh nghiệp ngành Điện tử – Viễn thông, xen trong giai đoạn project.", legend: "Tuần 9 · Thực tập", project: true },
      { start: 10, end: 13, range: "Tuần 10–13", title: "Project — tích hợp, kiểm thử, cải tiến", description: "Lắp ráp, đo đạc và tính sai số, cải tiến theo bằng chứng, kiểm thử độ ổn định.", legend: "Tuần 10–13 · Project", project: true },
      { start: 14, end: 15, range: "Tuần 14–15", title: "Hoàn thiện và bảo vệ đồ án nhóm", description: "Báo cáo, slide, demo và vấn đáp.", legend: "Tuần 14–15 · Bảo vệ", project: true }
    ],
    chapters: { 1: "TUẦN 1", 2: "TUẦN 2", 3: "TUẦN 3–4", 4: "TUẦN 5–15" },
    summary: "Lý thuyết 4 tuần (Tuần 1–4), project 11 tuần (Tuần 5–15)."
  },
  "8": {
    groups: [
      { start: 1, end: 1, range: "Tuần 1", title: "Giới thiệu mở đầu", description: "Thông tin học phần, lập nhóm, định hướng nghề nghiệp và mô hình IKIGAI.", legend: "Tuần 1 · Mở đầu" },
      { start: 2, end: 3, range: "Tuần 2–3", title: "Chương 1 — Giới thiệu chung về các lĩnh vực kỹ thuật", description: "Các lĩnh vực kỹ thuật, nghề nghiệp kỹ sư và đạo đức nghề nghiệp.", legend: "Tuần 2–3 · Chương 1" },
      { start: 4, end: 6, range: "Tuần 4–6", title: "Chương 2 — Hệ thống và thiết bị Điện tử Viễn thông", description: "Đại lượng điện, linh kiện, mạng, mô hình AIoT và hệ sinh thái IoT.", legend: "Tuần 4–6 · Chương 2" },
      { start: 7, end: 8, range: "Tuần 7–8", title: "Chương 3 — Công cụ và quy trình thiết kế", description: "Công cụ phân tích vấn đề, quy trình EDP, xác nhận phần cứng; bắt đầu khảo sát cho đồ án.", legend: "Tuần 7–8 · Chương 3" },
      { start: 9, end: 9, range: "Tuần 9", title: "Thực tập nhận thức, khởi động project", description: "Trải nghiệm thực tế doanh nghiệp, đồng thời chốt đề tài và kế hoạch project.", legend: "Tuần 9 · Thực tập", project: true },
      { start: 10, end: 13, range: "Tuần 10–13", title: "Project — thiết kế, lắp ráp, kiểm thử", description: "Sơ đồ khối, mạch thử, tích hợp, đo đạc và tính sai số, cải tiến.", legend: "Tuần 10–13 · Project", project: true },
      { start: 14, end: 15, range: "Tuần 14–15", title: "Hoàn thiện và bảo vệ đồ án nhóm", description: "Báo cáo, slide, demo và vấn đáp.", legend: "Tuần 14–15 · Bảo vệ", project: true }
    ],
    chapters: { 1: "TUẦN 2–3", 2: "TUẦN 4–6", 3: "TUẦN 7–8", 4: "TUẦN 9–15" },
    summary: "Lý thuyết 8 tuần (Tuần 1–8), project 7 tuần (Tuần 9–15)."
  }
};

const weekButtons = [...document.querySelectorAll(".week-button")];
const detailWeek = document.querySelector("#detail-week");
const detailRange = document.querySelector("#detail-range");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");
const legend = document.querySelector("#roadmap-legend");
const modeButtons = [...document.querySelectorAll(".mode-button")];
const modeSummary = document.querySelector("#mode-summary");
let currentMode = "8";
let currentWeek = 1;

function groupOf(week) {
  return roadmaps[currentMode].groups.find((item) => week >= item.start && week <= item.end);
}

function showWeek(week) {
  const group = groupOf(week);
  currentWeek = week;
  weekButtons.forEach((item) => {
    const selected = Number(item.dataset.week) === week;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  detailWeek.textContent = String(week).padStart(2, "0");
  detailRange.textContent = group.range + (group.project ? " · Giai đoạn project" : " · Giai đoạn lý thuyết");
  detailTitle.textContent = group.title;
  detailDescription.textContent = group.description;
}

function applyMode(mode) {
  currentMode = mode;
  const map = roadmaps[mode];
  modeButtons.forEach((item) => {
    const selected = item.dataset.mode === mode;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  modeSummary.textContent = map.summary;
  weekButtons.forEach((item) => {
    const week = Number(item.dataset.week);
    const group = groupOf(week);
    item.classList.toggle("is-project", Boolean(group.project));
    item.setAttribute("aria-label", `Tuần ${week}: ${group.title}`);
  });
  legend.innerHTML = "";
  map.groups.forEach((group) => {
    const span = document.createElement("span");
    const dot = document.createElement("i");
    if (group.project) dot.className = "project-dot";
    span.append(dot, " " + group.legend);
    legend.append(span);
  });
  document.querySelectorAll("[data-chapter-weeks]").forEach((node) => {
    const chapter = node.dataset.chapterWeeks;
    node.textContent = `CHƯƠNG 0${chapter} · ${map.chapters[chapter]}`;
  });
  showWeek(currentWeek);
}

weekButtons.forEach((button) => button.addEventListener("click", () => showWeek(Number(button.dataset.week))));
modeButtons.forEach((button) => button.addEventListener("click", () => applyMode(button.dataset.mode)));
applyMode(currentMode);

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
