import { AnimatedText } from '@/components/AnimatedText'
import { SearchBar } from '@/components/SearchBar'
import { FileType } from '@/types/data.types'
import clsx from 'clsx'
import React from 'react'
import { FileTypeFilters } from '../FileTypeFilters'
import { SearchResult, SearchResultProps } from '../SearchResult'

export type SearchProps = {
  query?: string
  onQueryChange?: (query: string) => void

  searching?: boolean
  results?: SearchResultProps['files']
  onSearch?: (query: string) => void

  selectedFiles?: SearchResultProps['selected']
  onSelect?: SearchResultProps['onSelect']

  compact?: boolean

  selectedFileTypes: FileType[]
  onFileTypesChange: (types: FileType[]) => void
}

export const Search: React.FC<SearchProps> = ({
  query,
  onQueryChange,
  searching,
  results,
  onSearch,
  selectedFiles,
  onSelect,
  compact,
  selectedFileTypes,
  onFileTypesChange,
}) => {
  /*  const handleFileTypeChange = (types: FileType[]) => {
    if (onFileTypesChange) {
      onFileTypesChange(types)
    }
  } */

  const filteredResults = results?.filter(
    (file) =>
      selectedFileTypes.length === 0 || selectedFileTypes.includes(file.type),
  )
  return (
    <div className="flex flex-col">
      <SearchBar
        className={clsx(
          'transition',
          'mb-10',
          compact && ['opacity-0', 'invisible', 'h-0', 'mb-0'],
        )}
        value={query}
        pending={searching}
        onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
        onSubmit={() => {
          onSearch && onSearch(query || '')
        }}
      />
      <FileTypeFilters
        selectedTypes={selectedFileTypes}
        onTypeChange={onFileTypesChange}
        compact={compact}
      />
      <div>
        {typeof filteredResults !== 'undefined' && (
          <SearchResult
            title={
              <div className="flex flex-row items-center gap-2">
                <AnimatedText
                  maxTime={500}
                  text={compact ? query! : 'Search results'}
                />
              </div>
            }
            description={
              <AnimatedText
                maxTime={500}
                text={
                  compact
                    ? `Ask me anything to help with your studies!`
                    : `Select at least one file to start a new conversation.`
                }
              />
            }
            selected={selectedFiles}
            onSelect={onSelect}
            files={filteredResults}
            hideList={compact}
            compactOverview={compact}
          />
        )}
      </div>
    </div>
  )
}
