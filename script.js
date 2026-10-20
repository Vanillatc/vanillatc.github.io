"use strict";

const chinese = {
  skip: "跳至正文",
  navEducation: "教育经历",
  navProjects: "项目经历",
  navContact: "联系方式",
  role: "研究生 · 人工智能",
  xmu: "厦门大学",
  location: "中国 · 福建厦门",
  bio: "我目前是厦门大学人工智能专业研究生，本科就读于温州大学大数据专业。我的项目经历涵盖时空预测、相似性检索，以及微服务系统的根因定位。",
  focusLabel: "关注方向",
  focus1: "机器学习",
  focus2: "时空建模",
  focus3: "智能软件系统",
  education: "教育经历",
  current: "在读",
  graduate: "研究生 · 人工智能",
  xmuLocation: "中国 · 福建省厦门市",
  wzu: "温州大学",
  undergraduate: "本科 · 大数据",
  wzuLocation: "中国 · 浙江省温州市",
  projects: "项目经历",
  p3Date: "2025.03 - 2025.08",
  lead: "项目负责人",
  p3Title: "结合深度学习的电商微服务系统根因定位",
  p3Description: "融合多模态运维数据，构建反映请求执行路径的事件图。探索使用 Transformer 建模正常与异常执行模式，通过图分析与可疑度排序识别异常，并结合大语言模型进行根因推理和语义去重。",
  eventGraphs: "事件图",
  p2Date: "2024.10 - 2025.01",
  researchContributor: "项目调研",
  p2Title: "基于 DeepLSH 的软件缺陷报告重复性检测",
  p2Description: "调研深度哈希方法在软件崩溃报告近重复检测中的应用。围绕重复性检测与哈希函数开展文献研究，并参与已有方法的复现及其向软件报告领域的适配。",
  deepHashing: "深度哈希",
  similaritySearch: "相似性检索",
  p1Date: "2024.03 - 2024.06",
  p1Title: "基于注意力 LSTM 的交通碰撞预测",
  p1Description: "使用纽约与芝加哥的真实时空数据集开展有监督交通碰撞预测。引入空间注意力、update-decay 机制和动态加权损失，处理类别不平衡与交通模式变化，并结合自适应平滑和 streaming 后处理。",
  spatialAttention: "空间注意力",
  spatiotemporalData: "时空数据",
  contact: "联系方式",
  contactAffiliation: "厦门大学 · 人工智能专业研究生",
};

const nodes = Array.from(document.querySelectorAll("[data-text]"));
const english = Object.fromEntries(nodes.map((node) => [node.dataset.text, node.textContent]));
const copyButton = document.querySelector("#copy-email");
const status = document.querySelector("#copy-status");
let language = "en";
let statusTimer;

function setLanguage(next) {
  language = next === "zh" ? "zh" : "en";
  const messages = language === "zh" ? chinese : english;
  nodes.forEach((node) => {
    node.textContent = messages[node.dataset.text] || english[node.dataset.text];
  });
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  document.querySelector("nav").setAttribute("aria-label", language === "zh" ? "主导航" : "Main navigation");
  const copyLabel = language === "zh" ? "复制邮箱地址" : "Copy email address";
  copyButton.title = copyLabel;
  copyButton.setAttribute("aria-label", copyLabel);
  status.textContent = "";
  try { localStorage.setItem("cheng-tang-language", language); } catch { /* Storage is optional. */ }
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

copyButton.addEventListener("click", async () => {
  clearTimeout(statusTimer);
  try {
    await navigator.clipboard.writeText("36920261153392@stu.xmu.edu.cn");
    status.textContent = language === "zh" ? "邮箱地址已复制。" : "Email address copied.";
  } catch {
    status.textContent = language === "zh"
      ? "请选中邮箱地址后复制。"
      : "Please select the email address to copy it.";
  }
  statusTimer = setTimeout(() => { status.textContent = ""; }, 4500);
});

try {
  if (localStorage.getItem("cheng-tang-language") === "zh") setLanguage("zh");
} catch { /* The English page also works without local storage. */ }

if (window.lucide) window.lucide.createIcons();
