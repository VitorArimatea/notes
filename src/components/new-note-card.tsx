export function NewNoteCard() {
  return (
    <button className='text-left flex flex-col align-top bg-slate-700 rounded-md p-5 space-y-3 text-sm'> 
      <span className='text-slate-200 font-medium'>Adicionar nota</span>
      <p className='text-slate-400 leading-6'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
    </button>
  )
}