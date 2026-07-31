import { Message } from "@/types/chat";
import { EstimateResponse } from "@/types/estimate";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendMessage(messages: Message[]): Promise<string> {
  const response = await axios.post(`${API_URL}/api/chat`, { messages });
  return response.data.reply;
}

export async function submitEstimate(userInput: string): Promise<EstimateResponse> {
  const response = await axios.post(`${API_URL}/api/estimate`, {
    user_input: userInput,
  });
  return response.data;
}
