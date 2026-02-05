import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement('img', props)
  },
}))

