import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)           // password is depend on length ,so useState
  const [numbers, setNumbers] = useState(false)       // password is depend on numbers ,so useState
  const [charecter, setCharecter] = useState(false)    // password is depend on charecter ,so useState
  const [password, setPassword] = useState("")        // 

  // use refhook 
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbers) str += "0123456789"
    if (charecter) str += "!~@#$%^&*()"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1) // it giving a random index

      pass += str.charAt(char)
    }
    setPassword(pass)







  }, [length, numbers, charecter, setPassword])      // ye array main wo dete ha, if change hoga koi ismain to optimize kro

  const copyPasswordToClipBoeard = useCallback(() => {

    passwordref.current?.select();// this is for highlighting the selected password
    passwordref.current?.setSelectionRange(0,6); // this is for highlighting , only in range 

    window.navigator.clipboard.writeText(password)  // it is used to copy the password into clipboard

  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numbers, charecter, passwordGenerator])  // if inmain se (" ye jo array ha ") kisimain bhi ched chaad ho , dobara se run krdo
  return (
    <>
      <div className="w-full max-w-md mx-auto 
       shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 py-3 px-2 ">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-amber-50 ">
          <input type="text" value={password}
            className="online-none w-full py-1 px-3 "

            placeholder="Password"
            readOnly
            ref={passwordref}



          >


          </input>
          <button
            onClick={copyPasswordToClipBoeard}
            className=" hover:bg-blue-400 outline-none bg-blue-700 text-white  px-3 py-0.5 shrink-0"
          >Copy</button>
        </div>

        <div className=" flex text-sm gap-x-2">

          <div className="flex item-center gap-x-1">
            <input type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numbers}
              id="numberinput"
              onChange={() => { setNumbers((prev) => !prev) }}


            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charecter}
              id="charecterinput"
              onChange={() => { setCharecter((prev) => !prev) }}


            />
            <label htmlFor="charecterinput">Charecters</label>
          </div>
        </div>


      </div>
    </>
  )
}

export default App
