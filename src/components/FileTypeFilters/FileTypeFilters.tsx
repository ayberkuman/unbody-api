import { FileType } from '@/types/data.types'
import {
  AudioFileIcon,
  FolderIcon,
  ImageIcon,
  PdfFileIcon,
  VideoFileIcon,
} from '../icons'

const FILTERS: {
  name: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  type: FileType
}[] = [
  {
    name: 'Docs',
    icon: FolderIcon,
    type: 'document',
  },
  {
    name: 'PDF',
    icon: PdfFileIcon,
    type: 'pdf',
  },
  {
    name: 'Images',
    icon: ImageIcon,
    type: 'image',
  },
  {
    name: 'MP3/Audio',
    icon: AudioFileIcon,
    type: 'audio',
  },
  {
    name: 'MP4/Video',
    icon: VideoFileIcon,
    type: 'video',
  },
]

type FileTypeFiltersProps = {
  selectedTypes: FileType[]
  onTypeChange: (types: FileType[]) => void
  compact?: boolean
}

export const FileTypeFilters: React.FC<FileTypeFiltersProps> = ({
  selectedTypes,
  onTypeChange,
  compact,
}) => {
  const toggleFilter = (type: FileType | 'reset') => {
    if (type === 'reset') {
      onTypeChange([])
      return
    }
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    onTypeChange(newTypes)
  }
  return (
    <div
      className={`flex justify-center items-center gap-4 ${compact && 'hidden'}`}
    >
      {FILTERS.map((filter) => (
        <button
          key={filter.name}
          className={`flex items-center gap-2 rounded-full px-3 py-1 shadow-md hover:shadow-lg transition-all duration-100 ${
            selectedTypes.includes(filter.type) ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => toggleFilter(filter.type)}
        >
          <filter.icon />
          <span>{filter.name}</span>
        </button>
      ))}
      <button
        className={`flex items-center gap-2 rounded-full px-3 py-1 shadow-md hover:shadow-lg transition-all duration-100`}
        onClick={() => toggleFilter('reset')}
      >
        <span>Reset</span>
      </button>
    </div>
  )
}
