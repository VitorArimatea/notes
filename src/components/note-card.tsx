export function NoteCard() {
  return (
    <button className='flex flex-col align-top text-left align-items-flex-start  bg-slate-800 rounded-md p-5 space-y-3 text-sm overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400 outline-none'> 
      <span className='text-slate-300 font-medium'>Há 3 dias</span>
      <p className='text-slate-400 leading-6'>No app do NLW vamos criar um layout incrível, assim podemos entregar a melhor experiência para a comunidade. Na aplicação React vamos criar um projeto que permite o usuário salvar notas em texto ou áudio.</p>
          
      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
    </button>
  ) 
}