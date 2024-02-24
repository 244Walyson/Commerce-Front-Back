import { useState } from 'react';
import './styles.css'

type myFunction = {
  (value: string): void
}

type props = {
   onsearchValue: myFunction;
}

const SearchBar = ({onsearchValue}: props) => {

  const [inputValue, setInputValue] = useState<string>('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    onsearchValue(inputValue)
  }

  const hadleClearClick = () => {
    setInputValue('')
    onsearchValue(inputValue)
  }

  return (
    <form className="dsc-search-bar" onSubmit={handleSubmit}>
          <button type="submit">🔎︎</button>
          <input value={inputValue} onChange={(e)=>(setInputValue(e.target.value))} type="text" placeholder="Nome do produto" />
          <button onClick={hadleClearClick}>🗙</button>
        </form>
  )
}

export default SearchBar