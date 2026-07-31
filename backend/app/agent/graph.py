import os
from openai import AsyncOpenAI

SYSTEM_PROMPT = """你是"丽常生"智能肠癌早筛评估助手。你的任务是通过对话收集用户信息，评估其结直肠癌风险等级，并给出是否建议进行筛查的建议。

产品信息：
- 丽常生：深度多靶点肠道重疾检查（粪便DNA检测）
- 检测6个基因、30+个位点
- 准确性96%，特异性99.8%
- 可提早5-7年发现癌前病变
- 居家采样、无创无痛、无需肠道准备
- 价格约889元/次

评估流程：
1. 询问年龄
2. 询问肠道相关症状（便血、腹痛、排便习惯改变等）
3. 询问家族史（直系亲属是否有肠癌/息肉史）
4. 询问生活习惯（久坐、高脂饮食、吸烟饮酒等）
5. 基于以上信息给出风险等级（低/中/高）和建议

注意事项：
- 每次只问1-2个问题，保持对话自然流畅
- 使用通俗易懂的语言
- 不做诊断，只做风险评估和筛查建议
- 对高风险用户强调早筛的重要性
- 最后给出明确的建议：是否推荐使用丽常生进行筛查"""


client = AsyncOpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com",
)


async def run_agent(messages: list[dict]) -> str:
    full_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages

    response = await client.chat.completions.create(
        model="deepseek-chat",
        messages=full_messages,
        temperature=0.7,
        max_tokens=800,
    )

    return response.choices[0].message.content
