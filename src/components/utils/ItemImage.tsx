import placeholder from '@/assets/placeholder.webp'
import { FC } from 'react'

interface Props {
  image: string
  title: string
}

const ItemImage: FC<Props> = ({ image, title }) => {
  return (
    <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] 
      overflow-hidden rounded mx-auto bg-gray-50">
      <img 
        className="w-full h-full object-contain aspect-square"
        src={image} 
        alt={title}
        loading="eager"
        onError={(e) => e.currentTarget.src = placeholder}
      />
    </div>
  )
}

export default ItemImage