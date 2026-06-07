"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { mockAiStream, SUGGESTED_QUESTIONS } from "@/lib/mockAi";

export default function ChatPanel({ rfqTitle }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const cancelRef = useRef(null);

  function appendMessage(role, content) {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, role, content }]);
  }

  function sendQuestion(question) {
    const text = question.trim();
    if (!text || streaming) return;

    appendMessage("user", text);
    setInput("");
    setStreaming(true);

    let aiContent = "";
    const aiId = `ai-${Date.now()}`;
    setMessages((prev) => [...prev, { id: aiId, role: "assistant", content: "" }]);

    cancelRef.current = mockAiStream(
      text,
      (char) => {
        aiContent += char;
        setMessages((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, content: aiContent } : m))
        );
      },
      () => setStreaming(false)
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendQuestion(input);
  }

  return (
    <div className="flex h-[min(520px,calc(100dvh-14rem))] min-h-[320px] flex-col rounded-xl border border-procurime-border bg-white sm:min-h-[400px]">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-sm text-procurime-muted">
            {rfqTitle} için soru sorun veya önerilen sorulardan birini seçin.
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
              msg.role === "user"
                ? "ml-auto bg-buyer text-white"
                : "bg-procurime-bg text-procurime-text"
            }`}
          >
            {msg.content || (streaming && msg.role === "assistant" ? "..." : "")}
          </div>
        ))}
      </div>

      <div className="border-t border-procurime-border p-3">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              disabled={streaming}
              onClick={() => sendQuestion(q)}
              className="rounded-full border border-procurime-border bg-buyer-light px-3 py-1 text-xs text-buyer hover:border-buyer disabled:opacity-50 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            disabled={streaming}
            className="flex-1 rounded-lg border border-procurime-border px-3 py-2 text-sm outline-none focus:border-buyer"
          />
          <Button type="submit" disabled={streaming}>
            Gönder
          </Button>
        </form>
      </div>
    </div>
  );
}
