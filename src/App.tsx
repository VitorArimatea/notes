import logo from './assets/logo-nlw-expert.svg';
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card';

export function App() {
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 '>
      <img src={logo} alt="NLW Expert" />
      
      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque por suas notas...'
          className='w-full text-3xl font-semibold tracking-tight placeholder:text-slate-300 bg-transparent outline-none'  
        />
      </form>
      
      <div className='h-px w-full bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>

        <NewNoteCard />
        
        <NoteCard note={{
          date: new Date(),
          content: "No app do NLW vamos criar um layout incrível, assim podemos entregar a melhor experiência para a comunidade. Na aplicação React vamos criar um projeto que permite o usuário salvar notas em texto ou áudio."
        }}/>
      </div>
    </div>
  )
}

