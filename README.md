# 丽常生 - 肠癌早筛智能Agent

通过对话式AI评估用户结直肠癌风险，推荐是否需要进行丽常生粪便多靶点DNA检测。

## 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS → 部署到 Vercel
- **后端**: FastAPI + Python → 部署到 Render
- **Agent**: LangGraph（多步骤AI管道）
- **LLM**: DeepSeek API
- **数据库**: Supabase (PostgreSQL)

## 项目结构

```
lichangsheng-agent/
├── frontend/                # Next.js 前端
│   ├── src/
│   │   ├── app/            # 页面路由
│   │   ├── components/     # UI组件
│   │   ├── lib/            # 工具函数/API调用
│   │   └── types/          # TypeScript类型
│   ├── public/             # 静态资源
│   ├── package.json
│   ├── tailwind.config.ts
│   └── .env.example
├── backend/                 # FastAPI 后端
│   ├── app/
│   │   ├── agent/          # LangGraph Agent逻辑
│   │   ├── api/            # API路由
│   │   ├── models/         # 数据模型
│   │   └── services/       # 业务服务
│   ├── requirements.txt
│   └── .env.example
├── .gitignore
└── README.md
```

## 快速启动

### 1. 克隆项目

```bash
cd lichangsheng-agent
```

### 2. 启动后端

```bash
cd backend

# 创建虚拟环境
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入你的 DEEPSEEK_API_KEY 和 Supabase 配置

# 启动服务
uvicorn app.main:app --reload --port 8000
```

后端运行在 http://localhost:8000，API文档在 http://localhost:8000/docs

### 3. 启动前端

```bash
cd frontend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local

# 启动开发服务器
npm run dev
```

前端运行在 http://localhost:3000

## 环境变量

### 后端 (.env)

| 变量 | 说明 |
|------|------|
| DEEPSEEK_API_KEY | DeepSeek API密钥 |
| SUPABASE_URL | Supabase项目URL |
| SUPABASE_ANON_KEY | Supabase匿名密钥 |

### 前端 (.env.local)

| 变量 | 说明 |
|------|------|
| NEXT_PUBLIC_APP_NAME | 应用名称（丽常生） |
| NEXT_PUBLIC_API_URL | 后端API地址 |

## 部署

- **前端**: 连接GitHub仓库到Vercel，自动部署
- **后端**: 连接GitHub仓库到Render，选择Web Service类型，启动命令 `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
