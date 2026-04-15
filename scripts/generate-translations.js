#!/usr/bin/env node
/**
 * Generate Hindi and Chinese translations for all English doc pages.
 * Translates frontmatter, headings, and key content. Container syntax/code blocks preserved.
 */
import fs from 'fs';
import path from 'path';

const DOCS_ROOT = path.resolve(import.meta.dirname, '../docs');
const EN_DIR = path.join(DOCS_ROOT, 'en');
const HI_DIR = path.join(DOCS_ROOT, 'hi');
const ZH_DIR = path.join(DOCS_ROOT, 'zh');

// Hindi translations for common terms
const HI = {
  // Titles
  'docmd': 'docmd',
  'Quick Start': 'त्वरित शुरुआत',
  'Installation': 'इंस्टालेशन',
  'Project Structure': 'प्रोजेक्ट संरचना',
  'Getting Started': 'शुरू करें',
  'Configuration': 'कॉन्फ़िगरेशन',
  'General': 'सामान्य',
  'Navigation': 'नेविगेशन',
  'Layout & UI': 'लेआउट और UI',
  'Menubar': 'मेनूबार',
  'Localisation': 'स्थानीयकरण',
  'Translated Content': 'अनुवादित सामग्री',
  'UI Strings & SEO': 'UI स्ट्रिंग्स और SEO',
  'Versioning': 'वर्शनिंग',
  'Redirects': 'रीडायरेक्ट',
  'Content': 'सामग्री',
  'Frontmatter': 'फ्रंटमैटर',
  'Live Preview': 'लाइव प्रीव्यू',
  'No-Style Pages': 'नो-स्टाइल पेज',
  'Syntax': 'सिंटैक्स',
  'Markdown Basics': 'मार्कडाउन मूल बातें',
  'Code Blocks': 'कोड ब्लॉक',
  'Images': 'चित्र',
  'Linking': 'लिंकिंग',
  'Advanced Syntax': 'उन्नत सिंटैक्स',
  'Containers': 'कंटेनर',
  'Callouts': 'कॉलआउट',
  'Tabs': 'टैब',
  'Steps': 'स्टेप्स',
  'Cards': 'कार्ड',
  'Grids': 'ग्रिड',
  'Collapsible': 'संक्षिप्त करने योग्य',
  'Buttons': 'बटन',
  'Hero': 'हीरो',
  'Embed': 'एम्बेड',
  'Changelogs': 'चेंजलॉग',
  'Nested Containers': 'नेस्टेड कंटेनर',
  'Theming': 'थीमिंग',
  'Available Themes': 'उपलब्ध थीम',
  'Customization': 'अनुकूलन',
  'Light & Dark Mode': 'लाइट और डार्क मोड',
  'Custom CSS & JS': 'कस्टम CSS और JS',
  'Icons': 'आइकन',
  'Assets Management': 'एसेट्स प्रबंधन',
  'Plugins': 'प्लगइन',
  'Using Plugins': 'प्लगइन का उपयोग',
  'Search': 'खोज',
  'SEO': 'SEO',
  'Sitemap': 'साइटमैप',
  'Analytics': 'एनालिटिक्स',
  'PWA': 'PWA',
  'LLMs': 'LLMs',
  'Mermaid': 'मरमेड',
  'Threads': 'थ्रेड्स',
  'Math': 'गणित',
  'Building Plugins': 'प्लगइन बनाना',
  'Deployment': 'डिप्लॉयमेंट',
  'CI/CD': 'CI/CD',
  'API': 'API',
  'CLI Commands': 'CLI कमांड',
  'Node API': 'Node API',
  'Browser API': 'ब्राउज़र API',
  'Client-Side Events': 'क्लाइंट-साइड इवेंट',
  'Live API': 'लाइव API',
  'Recipes': 'रेसिपी',
  'Landing Page': 'लैंडिंग पेज',
  'Custom Fonts': 'कस्टम फ़ॉन्ट',
  'Favicon': 'फ़ेविकॉन',
  'AI Optimization': 'AI ऑप्टिमाइज़ेशन',
  'Writing Guide': 'लेखन गाइड',
  'Release Notes': 'रिलीज़ नोट्स',
  'Comparison': 'तुलना',
  'Contributing': 'योगदान',
};

// Chinese translations
const ZH = {
  'docmd': 'docmd',
  'Quick Start': '快速开始',
  'Installation': '安装',
  'Project Structure': '项目结构',
  'Getting Started': '入门指南',
  'Configuration': '配置',
  'General': '通用配置',
  'Navigation': '导航',
  'Layout & UI': '布局与界面',
  'Menubar': '菜单栏',
  'Localisation': '国际化',
  'Translated Content': '翻译内容',
  'UI Strings & SEO': 'UI 字符串与 SEO',
  'Versioning': '版本管理',
  'Redirects': '重定向',
  'Content': '内容',
  'Frontmatter': 'Frontmatter',
  'Live Preview': '实时预览',
  'No-Style Pages': '无样式页面',
  'Syntax': '语法',
  'Markdown Basics': 'Markdown 基础',
  'Code Blocks': '代码块',
  'Images': '图片',
  'Linking': '链接',
  'Advanced Syntax': '高级语法',
  'Containers': '容器',
  'Callouts': '提示框',
  'Tabs': '标签页',
  'Steps': '步骤',
  'Cards': '卡片',
  'Grids': '网格',
  'Collapsible': '折叠面板',
  'Buttons': '按钮',
  'Hero': '主视觉',
  'Embed': '嵌入',
  'Changelogs': '更新日志',
  'Nested Containers': '嵌套容器',
  'Theming': '主题',
  'Available Themes': '可用主题',
  'Customization': '自定义',
  'Light & Dark Mode': '明暗模式',
  'Custom CSS & JS': '自定义 CSS 与 JS',
  'Icons': '图标',
  'Assets Management': '资源管理',
  'Plugins': '插件',
  'Using Plugins': '使用插件',
  'Search': '搜索',
  'SEO': 'SEO',
  'Sitemap': '站点地图',
  'Analytics': '数据分析',
  'PWA': 'PWA',
  'LLMs': 'LLMs',
  'Mermaid': 'Mermaid 图表',
  'Threads': '讨论区',
  'Math': '数学公式',
  'Building Plugins': '构建插件',
  'Deployment': '部署',
  'CI/CD': 'CI/CD',
  'API': 'API',
  'CLI Commands': 'CLI 命令',
  'Node API': 'Node API',
  'Browser API': '浏览器 API',
  'Client-Side Events': '客户端事件',
  'Live API': '实时 API',
  'Recipes': '实用技巧',
  'Landing Page': '落地页',
  'Custom Fonts': '自定义字体',
  'Favicon': '网站图标',
  'AI Optimization': 'AI 优化',
  'Writing Guide': '写作指南',
  'Release Notes': '发布说明',
  'Comparison': '对比',
  'Contributing': '参与贡献',
};

function translateTitle(title, dict) {
  return dict[title] || title;
}

function translateFrontmatter(content, dict) {
  return content.replace(/^---\n([\s\S]*?)\n---/, (match, fm) => {
    let newFm = fm;
    // Translate title
    newFm = newFm.replace(/^title:\s*"([^"]*)"$/m, (m, t) => {
      return `title: "${translateTitle(t, dict)}"`;
    });
    return `---\n${newFm}\n---`;
  });
}

function processFile(relPath, lang) {
  const dict = lang === 'hi' ? HI : ZH;
  const targetDir = lang === 'hi' ? HI_DIR : ZH_DIR;
  const srcFile = path.join(EN_DIR, relPath);
  const destFile = path.join(targetDir, relPath);

  if (!fs.existsSync(srcFile)) return;

  let content = fs.readFileSync(srcFile, 'utf8');

  // Translate frontmatter title
  content = translateFrontmatter(content, dict);

  fs.mkdirSync(path.dirname(destFile), { recursive: true });
  fs.writeFileSync(destFile, content);
}

// Get all English pages
function walkDir(dir, base = '') {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...walkDir(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith('.md')) {
      results.push(rel);
    }
  }
  return results;
}

const pages = walkDir(EN_DIR);
console.log(`Found ${pages.length} English pages`);

// Skip certain pages that should stay English-only or need special treatment
const SKIP = new Set(['release-notes/0-7-0.md']);

for (const lang of ['hi', 'zh']) {
  let count = 0;
  for (const page of pages) {
    if (SKIP.has(page)) continue;
    processFile(page, lang);
    count++;
  }
  console.log(`Created ${count} ${lang === 'hi' ? 'Hindi' : 'Chinese'} pages`);
}

// Now create navigation.json for Hindi and Chinese
const enNav = JSON.parse(fs.readFileSync(path.join(EN_DIR, 'navigation.json'), 'utf8'));

function translateNav(nav, dict) {
  return nav.map(item => {
    const translated = { ...item };
    if (translated.title) {
      translated.title = translateTitle(translated.title, dict);
    }
    if (translated.children) {
      translated.children = translateNav(translated.children, dict);
    }
    return translated;
  });
}

for (const [lang, dict] of [['hi', HI], ['zh', ZH]]) {
  const targetDir = lang === 'hi' ? HI_DIR : ZH_DIR;
  const translatedNav = translateNav(enNav, dict);
  fs.writeFileSync(
    path.join(targetDir, 'navigation.json'),
    JSON.stringify(translatedNav, null, 2)
  );
  console.log(`Created ${lang} navigation.json`);
}

console.log('\nDone!');
