import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'user' | 'model';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}

interface ChatState {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  updateMessage: (id: string, update: Partial<ChatMessage>) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [
        {
          id: 'welcome',
          role: 'model',
          content: "Hi! 👋 I'm your Python AI Tutor. I'm here to help you master **IF-ELSE statements**. What would you like to learn about today?"
        }
      ],
      addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
      updateMessage: (id, update) => set((state) => ({
        messages: state.messages.map((msg) => 
          msg.id === id ? { ...msg, ...update } : msg
        )
      })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'python-lesson-chat',
    }
  )
);
