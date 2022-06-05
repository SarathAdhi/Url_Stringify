import React from "react";
import Link from 'next/link'

export default function GetLocalStorageItems({ usersLocalStorage, setUsersLocalStorage, websiteUrl }) {
  return (
    <>
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
    </>
  );
}
