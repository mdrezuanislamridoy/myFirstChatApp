# My Learnings

- ## zustand :

  zustand is a state management library for React. It is a lightweight and easy-to-use library that allows you to manage your application's state in a simple and efficient way.

  ```
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
  ```

- ## Custom Contexts

  I've learned here more about context . where to use and how to use it .
  `I've learned here some more about custom Hooks . How to create . and where to create .`

- ## Get DotEnv Variables
  ```
  import.meta.env.NAME
  ```
