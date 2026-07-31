# 部署指南

## 架构概览

```
用户浏览器 → Vercel（前端） → Render（后端） → DeepSeek API
```

- 前端：Next.js 部署到 Vercel
- 后端：FastAPI 部署到 Render
- AI 模型：DeepSeek API（外部服务）

---

## 一、后端部署（Render）

### 1. 准备 GitHub 仓库

将 `backend/` 目录推送到 GitHub 仓库（可以是 monorepo 的子目录）。

### 2. 在 Render 创建 Web Service

1. 登录 https://render.com
2. New → Web Service → 连接 GitHub 仓库
3. 配置：
   - **Name**: `lichangsheng-api`
   - **Root Directory**: `backend`（如果是 monorepo）
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 3. 设置环境变量

在 Render Dashboard → Environment 中添加：

| 变量 | 值 |
|------|------|
| `DEEPSEEK_API_KEY` | sk-xxxxxxxxxxxxxxxx |
| `ALLOWED_ORIGINS` | https://your-app.vercel.app |
| `PYTHON_VERSION` | 3.11 |

### 4. 验证部署

```bash
curl https://your-api.onrender.com/health
# 应返回: {"status":"ok","service":"lichangsheng-agent"}
```

---

## 二、前端部署（Vercel）

### 1. 在 Vercel 导入项目

1. 登录 https://vercel.com
2. New Project → Import Git Repository
3. 配置：
   - **Root Directory**: `frontend`（如果是 monorepo）
   - **Framework Preset**: Next.js（自动检测）

### 2. 设置环境变量

在 Vercel Dashboard → Settings → Environment Variables 中添加：

| 变量 | 值 |
|------|------|
| `NEXT_PUBLIC_API_URL` | `https://your-api.onrender.com` |

### 3. 部署

Vercel 会自动构建和部署。每次推送到 main 分支都会自动重新部署。

---

## 三、联调验证

### 本地联调

```bash
# 终端1 - 启动后端
cd backend
python -m uvicorn app.main:app --reload --port 8000

# 终端2 - 启动前端
cd frontend
npm run dev
```

打开 http://localhost:3000，完成3个问题后应收到AI评估结果。

### 生产环境验证

1. 打开 Vercel 部署的前端 URL
2. 完成评估流程
3. 检查 Render 后端日志确认收到请求
4. 如有 CORS 错误，确认 Render 的 `ALLOWED_ORIGINS` 包含 Vercel 域名

---

## 四、常见问题

### CORS 错误
确保后端环境变量 `ALLOWED_ORIGINS` 包含前端的完整域名（含 https://），多个域名用逗号分隔。

### 后端响应慢（首次请求）
Render 免费版有冷启动（约30秒）。首次请求会较慢，后续请求正常（3-8秒，取决于 DeepSeek API 响应速度）。

### API Key 无效
确认 DeepSeek API Key 正确且有余额。可在后端本地测试：
```bash
curl -X POST http://localhost:8000/api/estimate \
  -H "Content-Type: application/json" \
  -d "{\"user_input\": \"50岁男性，无症状\"}"
```

---

## 五、API 接口说明

### POST /api/estimate

风险评估管道（LangGraph 4步流程）。

**请求体：**
```json
{
  "user_input": "55岁男性，近期偶有便血，父亲有肠癌病史，长期久坐办公"
}
```

**响应体：**
```json
{
  "risk_level": "高",
  "risk_factors": ["年龄>50", "家族史阳性", "便血症状", "久坐"],
  "cost_range": "30-100万元",
  "survival_rate": "90%以上",
  "recommendation": "建议您尽快安排筛查...",
  "screening_cost": "889元/次"
}
```

### POST /api/chat

对话式评估（多轮对话）。

**请求体：**
```json
{
  "messages": [
    {"role": "user", "content": "我今年55岁"}
  ]
}
```

**响应体：**
```json
{
  "reply": "了解。请问您近期有没有..."
}
```

### GET /health

健康检查。

**响应体：**
```json
{"status": "ok", "service": "lichangsheng-agent"}
```
