import { ChatMessages } from '@/components/ChatMessages'
import { MessageBar } from '@/components/MessageBar'
import { Search } from '@/components/Search'
import { ChatLayout } from '@/layouts/ChatLayout/Chat.layout'
import { useSearch } from '@/queries/useSearch'
import { ApiChatMessage, chatApi } from '@/services/api'
import { FileType } from '@/types/data.types'
import { populateDirs } from '@/utils/populateDirs.util'
import React, { useEffect, useMemo, useState } from 'react'

export type HomePageProps = React.HTMLProps<HTMLDivElement>

export const HomePage: React.FC<HomePageProps> = ({ className, ...props }) => {
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [messages, setMessages] = useState<ApiChatMessage[]>([])
  const [generating, setGenerating] = useState(false)
  const [selectedFileTypes, setSelectedFileTypes] = useState<FileType[]>([])

  const search = useSearch(
    { query },
    {
      cacheTime: 0,
      enabled: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  const fileList = useMemo(
    () => populateDirs(search.data?.files || []),
    [search.data],
  )

  const onSearch = async () => {
    search.refetch()
  }

  const onPrompt = async (prompt: string) => {
    setGenerating(true)

    setMessages((value) => [
      ...value,
      {
        role: 'user',
        message: prompt,
      },
    ])

    const { message } = await chatApi({
      prompt,
      files: fileList.filter((f) => selectedFiles.includes(f.id)),
      history: messages,
    })

    setGenerating(false)
    setMessages((value) => [...value, message])
    setPrompt('')
  }

  useEffect(() => {
    setSelectedFiles([])
  }, [search.data])

  useEffect(() => {
    onSearch()
  }, [])

  const handleFileTypesChange = (types: FileType[]) => {
    setSelectedFileTypes(types)
  }

  const handleEditMessage = async (index: number, newMessage: string) => {
    setGenerating(true)

    const updatedMessages = messages.slice(0, index + 1)
    updatedMessages[index] = {
      role: 'user',
      message: newMessage,
    }

    setMessages(updatedMessages)

    const { message: aiResponse } = await chatApi({
      prompt: newMessage,
      files: fileList.filter((f) => selectedFiles.includes(f.id)),
      history: updatedMessages.slice(0, -1),
    })

    setGenerating(false)
    setMessages([...updatedMessages, aiResponse])
  }

  return (
    <ChatLayout
      messageBar={
        <MessageBar
          hide={selectedFiles.length === 0}
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={(prompt) => onPrompt(prompt)}
          loading={generating}
          disabled={generating}
        />
      }
    >
      <Search
        compact={messages.length > 0}
        searching={search.isFetching}
        query={query}
        onQueryChange={(v) => setQuery(v)}
        onSearch={onSearch}
        results={fileList}
        onSelect={(selected) => setSelectedFiles(selected)}
        selectedFiles={selectedFiles}
        onFileTypesChange={handleFileTypesChange}
        selectedFileTypes={selectedFileTypes}
      />
      <ChatMessages
        className="py-[20px]"
        data={messages.map((msg) => ({
          role: msg.role,
          message: msg.message,
        }))}
        onEditMessage={handleEditMessage}
      />
    </ChatLayout>
  )
}
