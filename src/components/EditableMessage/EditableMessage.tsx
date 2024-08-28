import React, { useEffect, useRef, useState } from 'react'
import { CheckIcon, PenIcon, XIcon } from '../icons'

interface EditableMessageProps {
  initialMessage: string
  onSave: (newMessage: string) => void
  onCancel: () => void
}

export const EditableMessage: React.FC<EditableMessageProps> = ({
  initialMessage,
  onSave,
  onCancel,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedMessage, setEditedMessage] = useState(initialMessage)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(
        editedMessage.length,
        editedMessage.length,
      )
    }
  }, [isEditing])

  const handleSave = () => {
    onSave(editedMessage)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedMessage(initialMessage)
    setIsEditing(false)
    onCancel()
  }

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between">
        <div className="whitespace-pre-wrap break-words">{initialMessage}</div>
        <button
          onClick={() => setIsEditing(true)}
          className="hover:bg-slate-100 p-1 rounded-md"
        >
          <PenIcon className="text-gray-500" width={24} height={24} />
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        ref={textareaRef}
        value={editedMessage}
        onChange={(e) => setEditedMessage(e.target.value)}
        className="w-full p-2 border rounded-md"
        rows={3}
      />
      <div className="flex justify-end gap-2">
        <button
          className="hover:bg-slate-100 p-1 rounded-md"
          onClick={handleCancel}
        >
          <XIcon className="text-gray-500" width={24} height={24} />
        </button>
        <button
          className="hover:bg-slate-100 p-1 rounded-md"
          onClick={handleSave}
        >
          <CheckIcon className="text-gray-500" width={24} height={24} />
        </button>
      </div>
    </div>
  )
}
