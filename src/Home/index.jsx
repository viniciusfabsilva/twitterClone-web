import { HeartIcon, DotsHorizontalIcon, TrashIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useEffect } from 'react'

const MAX_TWEET_CHAR = 140

function TweetForm({ loggedInUser, onSuccess }) {
  const formik = useFormik({

    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        headers: {
          'authorization': `Bearer ${loggedInUser.accessToken}`
        },
        data: {
          text: values.text
        },
      })

      form.setFieldValue('text', '')
      onSuccess()
    },
    initialValues: {
      text: ''
    }
  })
  // << joguei em um estado para pegar o texto do input



  return (
    <div className="border-b border-silver p-4 space-y-6 my-0 mx-auto w-2/5 border-x">
      <div className="flex space-x-5">
        <img src="\src\images\avatar.png" className="w-7" />
        <h1 className="font-bold text-lg-xl">Página Inicial</h1>
      </div>

      <form className="pl-12 text-lg flex flex-col" onSubmit={formik.handleSubmit}>
        <textarea
          value={formik.values.text}
          name="text"
          placeholder="O que está acontecendo?"
          className="bg-transparent outline-none disabled:opacity-50"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />
        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{formik.values.text.length}</span> / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>

          </span>
          <button type="submit"
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting}>Tweet</button>
        </div>
      </form>

    </div>
  )
}

function DivDropdown({ loggedInUser, id, updateTimeline }) {
  const [data, setData] = useState([])

  function updateTimelineData(data) {
    setData(data)
    updateTimeline(data)
  }

  async function deleteTweet(ids) {
    const res = await axios.delete(`${import.meta.env.VITE_API_HOST}/tweets/?id=${ids}`, {
      headers: {
        'authorization': `Bearer ${loggedInUser.accessToken}`
      }
    })
    setData(res.data)
    if(res.status === 200) {
      updateTimeline(res.data)
    }
  } //
  // quando deletar o tweet, recarregar a tela
  
  

  

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)




  return (
    <div className="flex space-x-2">
      <div className="relative">
        <button className="bg-transparent border-0 text-birdBlue font-bold text-sm" onClick={handleClick}>
          <DotsHorizontalIcon className="w-5 stroke-1 stroke-silver float-right cursor-pointer hover:rounded-full hover:bg-birdBlue hover:bg-opacity-20 hover:stroke-birdBlue" />
        </button>
        {show && (
          <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-50">
            <div className="py-1">
              <a href="#" onClick={() => { deleteTweet(id) }} className="flex px-4 py-2 text-sm text-white hover:bg-gray-900">
                <TrashIcon className="w-5 stroke-1 stroke-red-500 mr-2" /><span className="text-red-500">Excluir</span>
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-900">
                <span className="text-white">Seguidores</span>
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-900">
                <span className="text-white">Seguindo</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



export function Tweet({ name, username, avatar, children, id, loggedInUser, updateTimeline }) {



  return (
    // <Title title="olá mundo"></Title> // Tem letra maiuscula é um componente do REACT
    <div className="flex space-x-3 p-4 border-b border-silver my-0 mx-auto w-2/5 border-x">
      <div>
        <img src={avatar} />
      </div>
      <div className="space-y-1 w-590">
        <div className="flex max justify-between">
          <div>
            <span className="font-bold text-sm mr-1">{name}</span> {' '}
            <span className="text-sm text-silver">@{username}</span>
          </div>
          <DivDropdown loggedInUser={loggedInUser} id={id} updateTimeline={updateTimeline} />
        </div>

        <p>{children}</p>

        <div className="flex space-x-1 text-silver text-sm items-center">
          <HeartIcon className="w-6 stroke-1 stroke-silver" />
          <span>1.2k</span>
        </div>
      </div>
    </div>

  )
}

export function Home({ loggedInUser }) {
  const [data, setData] = useState([]) // << joguei em um estado para entender que ele precisa renderizar novamente

  async function getData() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers: {
        'authorization': `Bearer ${loggedInUser.accessToken}`
      }
    })
    setData(res.data)
  }
  useEffect(() => {
    getData()
  }, []) //

  return (
    <>
      <TweetForm loggedInUser={loggedInUser} onSuccess={getData} />
      <div>
        <Tweet name="Elon Musk" username="elonmusk" avatar="\src\images\avatar.png">
          Lets Make Twitter Maximun Fun!
        </Tweet>

        {data.length && data.map(tweet => (
          <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar="\src\images\avatar.png" id={tweet.id} loggedInUser={loggedInUser}>
            {tweet.text}
          </Tweet>
        ))}


      </div>
    </>
  )
}