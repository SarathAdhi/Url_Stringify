import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../backend/db";
import Link from "next/link";
import Layout from "../components/Layouts.jsx";

export default function Home() {
  const [fullUrl, setFullUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [minifiedUrl, setMinifiedUrl] = useState("");
  const [usersLocalStorage, setUsersLocalStorage] = useState([]);

  const urlsCollectionRef = collection(db, "urls");

  useEffect(() => {
    setWebsiteUrl(location.host);
    if (localStorage.getItem("url_minifier_storage")) {
      var localUrlStorage = JSON.parse(
        localStorage.getItem("url_minifier_storage")
      );
      setUsersLocalStorage(localUrlStorage);
    }
  }, []);

  function storeDataInLocalStorage(object) {
    if (localStorage.getItem("url_minifier_storage")) {
      var localUrlStorage = JSON.parse(
        localStorage.getItem("url_minifier_storage")
      );
      localUrlStorage.push(object);
      localStorage.setItem(
        "url_minifier_storage",
        JSON.stringify(localUrlStorage)
      );
      setUsersLocalStorage(localUrlStorage);
    } else {
      localStorage.setItem("url_minifier_storage", JSON.stringify([object]));
      setUsersLocalStorage([object]);
    }
  }

  async function createNewUrl() {
    const uid = new Date().getTime().toString(36);
    const date = new Date();
    const newObject = {
      fullUrl: fullUrl,
      shortUrlCode: uid,
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
    };
    await addDoc(urlsCollectionRef, newObject);

    setMinifiedUrl(uid);
    storeDataInLocalStorage(newObject);
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
    else {
      setMinifiedUrl(neededURL[0].shortUrlCode);
      storeDataInLocalStorage(neededURL[0]);
    }
  }

  function isUrlValid() {
    setMinifiedUrl("");
    if (fullUrl === "") {
      alert("Invalid URL");
      return false;
    }
    var res = fullUrl.match(/(http(s)?:\/\/.)/g);
    if (res) isThisUrlAlreadyExist();
    else alert("Invalid URL");
  }

  return (
    <Layout title="URL Minifier">
      <div className="w-full mt-10 flex items-center flex-col">
        <div className="w-11/12 lg:w-1/2 py-10 px-5 flex justify-center items-center flex-col bg-white/20 shadow-blur backdrop-blur-xl border-[1px] border-white/20 rounded-xl">
          <h1 className="text-center font-semibold underline text-4xl mb-10">
            URL MINIFIER
          </h1>
          <div className="w-11/12 flex justify-center flex-col gap-y-3 items-center flex-wrap">
            <input
              type="text"
              placeholder="Enter the URL"
              className="p-2 w-full border-[1px] border-slate-800 rounded-lg focus:outline-none"
              onChange={(e) => setFullUrl(e.target.value)}
            />
            <button
              className="px-2 py-1 rounded-lg bg-green-500 text-black border-[1px] border-slate-800 duration-300 hover:bg-emerald-500"
              onClick={isUrlValid}
            >
              Submit
            </button>
          </div>
          {minifiedUrl && (
            <h2 className="mt-5 text-lg sm:text-xl text-blue-600 underline text-center">
              <Link href={`/id/${minifiedUrl}`}>
                <a target="_blank">{websiteUrl + "/id/" + minifiedUrl}</a>
              </Link>
            </h2>
          )}
        </div>
        {usersLocalStorage.length != 0 && (
          <div className="w-11/12 lg:w-1/2 mt-5 py-8 px-5 flex justify-center items-center flex-col bg-white/20 shadow-blur backdrop-blur-xl border-[1px] border-white/20 rounded-xl">
            <div className="flex flex-col justify-center items-center gap-5">
              <button
                className="bg-red-500 rounded-xl font-bold border-[1px] border-black p-1 w-28"
                onClick={() => {
                  localStorage.setItem("url_minifier_storage", "");
                  setUsersLocalStorage("");
                }}
              >
                CLEAR ALL
              </button>
              {usersLocalStorage.map((url, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white/50 px-5 py-2 rounded-xl flex flex-col justify-center items-center text-center"
                  >
                    <p className="break-all font-medium">{url.fullUrl}</p>
                    <Link href={`/id/${url.shortUrlCode}`}>
                      <a
                        target="_blank"
                        className="text-center font-semibold mt-1 text-blue-800 underline w-min px-2 py-1 rounded-lg"
                      >
                        {websiteUrl + "/id/" + url.shortUrlCode}
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
