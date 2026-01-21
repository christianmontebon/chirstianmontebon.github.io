interface TypingIndicatorProps {
  className?: string
}

export default function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <span className={`inline-flex items-end gap-1 ${className ?? ''}`}>
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </span>
  )
}

