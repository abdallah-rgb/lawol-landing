import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { SearchInterface } from '@/components/features/SearchInterface'

const { pushMock } = vi.hoisted(() => {
  return { pushMock: vi.fn() }
})

vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({ push: pushMock })
  }
})

describe('Écran clé VIN', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    pushMock.mockClear()
  })

  it('affiche les deux options après saisie VIN', async () => {
    render(<SearchInterface isOpen={true} onClose={() => {}} />)
    const vinTab = screen.getByRole('button', { name: /Par VIN/i })
    fireEvent.click(vinTab)
    const input = screen.getByPlaceholderText(/Ex: WVWZZZ3CZ/i)
    fireEvent.change(input, { target: { value: 'WVWZZZ3CZKA123456' } })
    const submit = screen.getByRole('button', { name: /Rechercher/i })
    fireEvent.click(submit)
    await act(async () => {
      vi.advanceTimersByTime(4500)
    })
    expect(screen.getByText(/Que souhaitez-vous faire/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Identifier une pièce précise/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Explorer les pièces compatibles/i })).toBeInTheDocument()
  })

  it('déclenche le Cas A et affiche les choix d\'identification', async () => {
    render(<SearchInterface isOpen={true} onClose={() => {}} />)
    const vinTab = screen.getByRole('button', { name: /Par VIN/i })
    fireEvent.click(vinTab)
    const input = screen.getByPlaceholderText(/Ex: WVWZZZ3CZ/i)
    fireEvent.change(input, { target: { value: 'WVWZZZ3CZKA123456' } })
    const submit = screen.getByRole('button', { name: /Rechercher/i })
    fireEvent.click(submit)
    await act(async () => {
      vi.advanceTimersByTime(4500)
    })
    const caseA = screen.getByRole('button', { name: /Identifier une pièce précise/i })
    fireEvent.click(caseA)
    expect(screen.getByText(/Comment souhaitez-vous identifier la pièce/i)).toBeInTheDocument()
    
    // Test navigation to manual entry
    const manualBtn = screen.getByRole('button', { name: /Entrer une référence OEM ou MPN/i })
    fireEvent.click(manualBtn)
    expect(screen.getByText(/Saisie manuelle/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Saisie de pièce/i)).toBeInTheDocument()
  })

  it('déclenche le Cas B et affiche les catégories', async () => {
    render(<SearchInterface isOpen={true} onClose={() => {}} />)
    const vinTab = screen.getByRole('button', { name: /Par VIN/i })
    fireEvent.click(vinTab)
    const input = screen.getByPlaceholderText(/Ex: WVWZZZ3CZ/i)
    fireEvent.change(input, { target: { value: 'WVWZZZ3CZKA123456' } })
    const submit = screen.getByRole('button', { name: /Rechercher/i })
    fireEvent.click(submit)
    await act(async () => {
      vi.advanceTimersByTime(4500)
    })
    const caseB = screen.getByRole('button', { name: /Explorer les pièces compatibles/i })
    fireEvent.click(caseB)
    expect(screen.getByText(/Familles de pièces/i)).toBeInTheDocument()
  })

  it('gère le flux photo dans le Cas A avec redirection automatique', async () => {
    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
    
    render(<SearchInterface isOpen={true} onClose={() => {}} />)
    
    // 1. Enter VIN
    const vinTab = screen.getByRole('button', { name: /Par VIN/i })
    fireEvent.click(vinTab)
    const input = screen.getByPlaceholderText(/Ex: WVWZZZ3CZ/i)
    fireEvent.change(input, { target: { value: 'WVWZZZ3CZKA123456' } })
    const submit = screen.getByRole('button', { name: /Rechercher/i })
    fireEvent.click(submit)
    
    // Wait for VIN analysis
    await act(async () => {
      vi.advanceTimersByTime(4500)
    })

    // 2. Select "Identifier une pièce précise"
    const caseA = screen.getByRole('button', { name: /Identifier une pièce précise/i })
    fireEvent.click(caseA)

    // 3. Select "Prendre une photo"
    const photoBtn = screen.getByRole('button', { name: /Prendre une photo de la pièce/i })
    fireEvent.click(photoBtn)
    
    expect(screen.getByText(/Prendre une photo/i)).toBeInTheDocument()

    // 4. Upload file
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(fileInput).toBeInTheDocument()
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    
    await act(async () => {
        fireEvent.change(fileInput, { target: { files: [file] } })
    })

    // 5. Wait for image analysis (scanning -> analyzing -> complete)
    // 2s scanning + 2s analyzing = 4s
    await act(async () => {
      vi.advanceTimersByTime(4500)
    })

    // Check if result is displayed
          expect(screen.getByText(/Pièce Identifiée/i)).toBeInTheDocument()
          expect(screen.getByText(/Compatibilité confirmée/i)).toBeInTheDocument()
          // Verify image is displayed
          const partImages = screen.getAllByAltText(/Part/i)
          expect(partImages.length).toBeGreaterThan(0)
          // Ensure at least one is the result image
          const resultImage = partImages.find(img => img.getAttribute('alt') === 'Part')
          expect(resultImage).toBeInTheDocument()
          expect(resultImage).toHaveAttribute('src', 'mock-url')

          // 6. Wait for auto-redirect (3s)
    await act(async () => {
      vi.advanceTimersByTime(3500)
    })

    // Verify redirection
    expect(pushMock).toHaveBeenCalledWith(expect.stringContaining('/resultats?q=Filtre+%C3%A0+Huile+%28Bosch%29&vehicle=audi_rs6&source=vin_photo'))
  })
})
