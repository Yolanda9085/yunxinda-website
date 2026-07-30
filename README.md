# 云心达 - 纯前端版本

这是一个完全的前端应用，已从原始的 Next.js 全栈项目转换而来。

## 快速开始

### 本地开发
```bash
npm install
npm run dev
```

访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
npm start
```

## 部署到 Vercel

### 方式一：直接部署（推荐）

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 创建仓库名 `yunxinda-website`
   - 选择 "Public"
   - 点击 "Create repository"

2. **推送代码到 GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/yunxinda-website.git
   git branch -M main
   git push -u origin main
   ```

3. **在 Vercel 中部署**
   - 访问 https://vercel.com
   - 点击 "Import Project"
   - 选择从 GitHub 导入
   - 选择 `yunxinda-website` 仓库
   - 点击 "Deploy"

### 方式二：Vercel CLI 部署

```bash
npm install -g vercel
vercel
```

## 功能

- ✅ 纯前端应用（无后端 API）
- ✅ 响应式设计
- ✅ 客户端表单验证
- ✅ 本地存储提交记录
- ✅ 支持无障碍访问 (WCAG AA)
- ✅ 可实时更新

## 项目结构

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx       # 主页面
│   │   ├── layout.tsx     # 布局
│   │   └── globals.css    # 全局样式
│   └── components/        # 组件（可选）
├── public/                # 静态文件
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 技术栈

- Next.js 15
- React 19
- TypeScript
- 原生 CSS（无框架依赖）

## 表单数据

表单数据目前存储在浏览器本地存储中（localStorage），可在浏览器开发者工具中查看。

若要集成真实邮件服务，可选择：
- EmailJS
- Formspree
- AWS SES
- SendGrid

## 许可证

MIT
