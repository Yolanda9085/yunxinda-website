# 🚀 部署快速指南

## 你已完成的工作
✅ 已删除后端 API 路由
✅ 已转换为纯前端 React 应用
✅ 已创建客户端表单处理（数据存储在浏览器 localStorage）
✅ 已初始化本地 git 仓库
✅ 已通过构建测试

## 下一步：部署到 Vercel（免费）

### 快速部署（3 步）

**第 1 步：创建 GitHub 仓库**
- 访问 https://github.com/new
- 仓库名输入：`yunxinda-website`
- 选择 Public
- 点击 "Create repository"
- 复制仓库 HTTPS URL

**第 2 步：推送代码**
```bash
cd c:/Users/Asus/Desktop/公司网站
git remote add origin [粘贴你的仓库URL]
git branch -M main
git push -u origin main
```

**第 3 步：Vercel 自动部署**
- 访问 https://vercel.com
- 用 GitHub 账号登录
- 点击 "New Project"
- 选择 `yunxinda-website` 仓库
- 使用默认配置，点击 "Deploy"

⏱️ 等待 2-3 分钟，你的网站就上线了！

---

## 部署后的网址格式
```
https://yunxinda-website.vercel.app
```

## 实时更新
每次你推送代码到 GitHub，Vercel 会自动：
1. 检测更新
2. 构建新版本
3. 部署到网站
4. 1-2 分钟内生效

---

## 常见问题

**Q: 可以自定义域名吗？**
A: 可以。在 Vercel 项目设置里添加自己的域名

**Q: 表单数据存在哪里？**
A: 存储在用户浏览器的 localStorage，刷新不丢失

**Q: 如何添加真实邮件通知？**
A: 可集成 EmailJS 或 Formspree（免费方案可用）

**Q: 需要服务器吗？**
A: 不需要，完全是静态前端应用，Vercel 免费托管

---

## 当前项目信息

**Git 状态**
```bash
$ git log --oneline
6f22dab docs: 添加 README 和部署说明
[已提交，等待推送到 GitHub]
```

**本地测试**
```bash
npm run dev      # 启动开发服务器 (http://localhost:3000)
npm run build    # 构建生产版本 ✓ 成功
npm start        # 启动生产服务器
```

---

## 肠道健康早筛 H5 页面部署说明

`public/h5-screening.html` 是独立的移动端 H5 互动页面，和主站 `public/index.html` 是同级的静态文件，走同一套部署流程：

1. 本地改完后直接 `git add public/h5-screening.html` 提交
2. 推送到 GitHub（`Yolanda9085/yunxinda-website`）
3. Vercel 自动检测更新并部署（因为 `vercel.json` 里 `outputDirectory` 指向 `public`，不需要走 Next.js 构建）

部署完成后访问地址：
```
https://yunxinda-website.vercel.app/h5-screening.html
```

这个页面不依赖 `index.html` 里的任何样式或脚本，颜色变量、动画逻辑都是独立内嵌在文件里的，改动它不会影响主站。适合直接在朋友圈、社群或短信里分享这个链接做专题传播。

---

祝部署顺利！🎉
