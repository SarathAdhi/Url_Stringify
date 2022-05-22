import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../backend/db";
import Link from "next/link";
import Layouts from "../components/Layouts";

export default function Home() {
  const [fullUrl, setFullUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [minifiedUrl, setMinifiedUrl] = useState("");

  const urlsCollectionRef = collection(db, "urls");

  useEffect(() => {
    setWebsiteUrl(location.host);
  }, []);

  async function createNewUrl() {
    const uid = new Date().getTime().toString(36);
    const date = new Date();
    await addDoc(urlsCollectionRef, {
      fullUrl: fullUrl,
      shortUrlCode: uid,
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
    });
    setMinifiedUrl(uid);
  }

  async function isThisUrlAlreadyExist() {
    const URL_Snapshot = await getDocs(urlsCollectionRef);
    const neededURL = URL_Snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => {
        return data.fullUrl === fullUrl;
      })
      .map((data) => {
        return data;
      });

    if (neededURL.length === 0) createNewUrl();
    else setMinifiedUrl(neededURL[0].shortUrlCode);
  }

  function isUrlValid() {
    setMinifiedUrl('')
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    var res = !!pattern.test(fullUrl);
    if (res) isThisUrlAlreadyExist();
    else alert("Invalid URL");
  }

  return (
    <Layouts title="URL Minifier">
      <div className="m-40">
      <h1 className="text-center font-semibold underline text-4xl mb-10">URL MINIFIER</h1>
        <input
          type="text"
          placeholder="Enter the URL"
          className="p-2 w-96 border-[1px] border-slate-800 rounded-lg focus:outline-none"
          onChange={(e) => setFullUrl(e.target.value)}
        />
        <button
          className="p-2 ml-2 rounded-lg bg-green-500 text-black border-[1px] border-slate-800 duration-300 hover:bg-emerald-500"
          onClick={isUrlValid}
        >
          Submit
        </button>
        {minifiedUrl && (
          <h2 className="mt-16 text-xl text-blue-600 underline text-center">
            <Link href={`/id/${minifiedUrl}`}>
              <a target="_blank">{websiteUrl + "/id/" + minifiedUrl}</a>
            </Link>
          </h2>
        )}
      </div>
    </Layouts>
  );
}
