import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from '../backend/db'
import Link from 'next/link';

export default function Home() {
  const [datasFromDB, setDatasFromDB] = useState([]);
  const [fullUrl, setFullUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [minifiedUrl, setMinifiedUrl] = useState('');

  const usersCollectionRef = collection(db, "urls")

  async function getDatas() {
    const URLCol = collection(db, 'urls');
    const URLSnapshot = await getDocs(URLCol);
    const URLList = URLSnapshot.docs.map(doc => doc.data());
    setDatasFromDB(URLList);
  }

  useEffect(() => {
    setWebsiteUrl(location.host)
    getDatas();
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
        <input type="text" placeholder='Enter the URL' className='p-2 w-96 border-[1px] border-slate-800 rounded-lg focus:outline-none' onChange={(e) => setFullUrl(e.target.value)} />
        <button className='p-2 ml-2 rounded-lg bg-green-500 text-black border-[1px] border-slate-800 duration-300 hover:bg-emerald-500' onClick={createNewUrl}>Submit</button>

        {
          minifiedUrl && (
            <h2 className='mt-20 text-blue-600 underline text-center'>
              <Link href={`/${minifiedUrl}`}>
                <a>{websiteUrl + "/" + minifiedUrl}</a>
              </Link>
            </h2>
          )
        }
      </div>
    </div>
  )
}
