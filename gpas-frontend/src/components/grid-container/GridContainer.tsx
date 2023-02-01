import React from 'react'
import { ImageContainer } from '../image-container/ImageContainer'

type Props = {}

export const GridContainer = (props: Props) => {
    
  return (
    <div>
        <ImageContainer
            imageSrc="https://images.unsplash.com/photo-1616166330003-8b8b1b2b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            imageAlt="A photo of a cat"
        />
    </div>
  )
}