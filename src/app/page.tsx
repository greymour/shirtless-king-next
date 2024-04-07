'use client'
import Image from "next/image";
import { Heading } from "src/components/atoms"
import { FormEvent, FormEventHandler, useState} from 'react'
import { API_URL } from "src/utils/constants";
// @TODO: add login stuff here
export default function Home() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<null|string>(null)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.includes('@') || !password.includes('.')) {
      setEmailError('Please enter a valid email address')
    }
    const res = await fetch(API_URL.LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      })
    });
    if (res.ok && res.status === 200) {

    } else {

    }
    // figure out how tf to do this
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono  lg:flex flex-col">
        <Heading>Shirtless King</Heading>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative h-24">
          <label className="flex flex-col">
            Email
            <input className="text-black" value={email} type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          {emailError && <p className='text-red absolute top-auto bottom-0'>{emailError}</p>}
          </div>

          <label className="flex flex-col py-4">
            Password
            <input className="text-black" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit" disabled={!email || !password} className="bg-purple-500 disabled:bg-slate-400 hover:bg-purple-700">Sign in</button>
        </form>
      </div>
    </main>
  );
}
