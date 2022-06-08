import { HeartIcon } from '@heroicons/react/outline'
import { useState } from 'react'

const MAX_TWEET_CHAR = 140

function TweetForm() {
  const [text, setText] = useState('') // << joguei em um estado para pegar o texto do input
  function changeText(e) {
    setText(e.target.value) // Alterando o evento para guardar o que digito no textarea
  }
  console.log(text)

  return (
    <div className="border-b border-silver p-4 space-y-6">
      <div className="flex space-x-5">
      <img src="/src/imagens/avatar.png" className="w-7"/>
      <h1 className="font-bold text-lg-xl">Página Inicial</h1>
      </div>

      <form className="pl-12 text-lg flex flex-col">
        <textarea
        value={text}
        name="text" 
        placeholder="O que está acontecendo?"
        className="bg-transparent outline-none disabled:opacity-50"
        onChange={changeText}
        />
        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{text.length}</span> / <span className="text-birdBlue">{ MAX_TWEET_CHAR }</span>
          
          </span>
        <button className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50" disabled={text.length > MAX_TWEET_CHAR}>Tweet</button>
        </div>
      </form>

    </div>
  )
}




function Tweet({ name, username, avatar, children }) {
  return (
    // <Title title="olá mundo"></Title> // Tem letra maiuscula é um componente do REACT
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div>
        <img src={avatar} />
      </div>
      <div className="space-y-1">
        <span className="font-bold text-sm">{name}</span> {' '}
        <span className="text-sm text-silver">@{username}</span>

        <p>{children}</p>

        <div className="flex space-x-1 text-silver text-sm items-center">
          <HeartIcon className="w-6 stroke-1 stroke-silver" />
          <span>1.2k</span>
        </div>
      </div>
    </div>

  )
}



export function Home() {
  return (
    <>
    <TweetForm />
      <div>
        <Tweet name="Elon Musk" username="elonmusk" avatar="/src/imagens/avatar.png">
          Lets Make Twitter Maximun Fun!
        </Tweet>
        <Tweet name="Vinicius Silva" username="viniciusfabi1" avatar="/src/imagens/avatar.png">
          Lets Make Twitter Maximun Fun!
        </Tweet>

      </div>
    </>
  )
}