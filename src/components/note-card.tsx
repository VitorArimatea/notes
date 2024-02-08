import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

interface NoteCardProps {
  note: {
    date: Date
    content: string
  }
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger 
        className='flex flex-col text-left align-items-flex-start  bg-slate-800 rounded-md p-5 gap-3 text-sm overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400 outline-none'
      > 
        <span className='text-slate-300 font-medium'>{formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}</span>
        <p className='text-slate-400 leading-6'>{note.content}</p>
            
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 outline-none rounded-md flex flex-col overflow-hidden'>
          
          <Dialog.Close className='absolute right-0 bg-slate-800 text-slate-500 p-1.5 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.Close>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-slate-300 font-medium'>
              {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
            </span>
            <p className='text-slate-400 leading-6'>
              {note.content}
            </p>
          </div>

          <button 
            type="button"
            className='w-full bg-slate-800 text-slate-300 py-4 text-sm font-medium group'  
          >
            Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
          </button>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ) 
}