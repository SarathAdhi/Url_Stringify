import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from '../backend/db'

export default function Home() {
  const [datasFromDB, setDatasFromDB] = useState([]);
  const [fullUrl, setFullUrl] = useState('');
  const [minifiedUrl, setMinifiedUrl] = useState('');

  const usersCollectionRef = collection(db, "urls")

  async function getDatas() {
    const URLCol = collection(db, 'urls');
    const URLSnapshot = await getDocs(URLCol);
    const URLList = URLSnapshot.docs.map(doc => doc.data());
    setDatasFromDB(URLList);
  }

  useEffect(() => {
    getDatas()
  }, [])

  async function createNewUrl() {
    const uid = (new Date().getTime()).toString(36);
    setMinifiedUrl(uid)
    const date = new Date();
    await addDoc(usersCollectionRef, {
      fullUrl: fullUrl,
      shortUrlCode: uid,
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    })
  }

  return (
    <div className='h-screen bg-teal-300 flex justify-center'>
      <div className='m-40'>
        <input type="text" placeholder='Enter the URL' className='p-2 w-96 border-[1px] border-slate-800 rounded-lg' onChange={(e) => setFullUrl(e.target.value)} />
        <button className='p-2 ml-2 rounded-lg bg-gray-500 text-white' onClick={createNewUrl}>Submit</button>

        <h2 className='mt-20 text-blue-600 underline text-center'><a href='#'>{minifiedUrl}</a></h2>
      </div>
    </div>
  )
}
