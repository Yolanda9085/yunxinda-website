from fastapi import APIRouter
from pydantic import BaseModel
from app.agent.graph import run_agent

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


class ChatResponse(BaseModel):
    reply: str


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    messages = [{"role": m.role, "content": m.content} for m in request.messages]
    reply = await run_agent(messages)
    return ChatResponse(reply=reply)
