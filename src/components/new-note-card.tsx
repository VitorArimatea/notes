import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void 
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') {
      return
    }

    onNoteCreated(content)

    setContent('')
    setShouldShowOnboarding(true)

    toast.success('Nota criada com sucesso!')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert('Infelizmente seu navegador não suporta a API de gravação!')
      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()
    
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.log(event)
    } 

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    } 
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='text-left flex flex-col align-top bg-slate-700 rounded-md p-5 space-y-3 text-sm hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400 outline-none'> 
        <span className='text-slate-200 font-medium'>Adicionar nota</span>
        <p className='text-slate-400 leading-6'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 outline-none md:rounded-md flex flex-col overflow-hidden'>
          
          <Dialog.Close className='absolute right-0 bg-slate-800 text-slate-500 p-1.5 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className='flex flex-col flex-1'>

            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-slate-300 font-medium text-sm'>
                Adicionar nota
              </span>
              
              {shouldShowOnboarding ? (
                <p className='text-slate-400 leading-6 text-sm'>
                Comece <button type="button" onClick={handleStartRecording} className='text-lime-400 font-medium hover:underline'>gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className='text-lime-400 font-medium hover:underline'>utilize apenas texto</button>.
              </p>
              ) : (
                <textarea 
                  autoFocus
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  onChange={handleContentChanged} 
                  value={content}
                />  
              )}
            </div>
            
            {isRecording ? ( 
              <button 
                onClick={handleStopRecording}
                type="button"
                className='w-full flex items-center justify-center gap-2 bg-slate-900 text-slate-300 py-4 text-sm font-medium hover:text-slate-100'  
              >
                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                Gravando! (Clique p/ interromper)
              </button> 
              ): (
              <button 
                onClick={handleSaveNote}
                type="button" 
                className='w-full bg-lime-400 text-[#1A2E05] py-4 text-sm font-medium hover:bg-lime-500'  
              >
                Salvar nota
              </button> 
            )}

            
          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}