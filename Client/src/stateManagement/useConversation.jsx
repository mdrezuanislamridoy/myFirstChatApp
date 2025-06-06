import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) =>
    set((state) => ({
      ...state,
      messages: Array.isArray(messages) ? messages : [],
    })),
}));

export default useConversation;
