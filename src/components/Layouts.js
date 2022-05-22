import Head from "next/head";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="w-full h-screen h-min-screen bg-teal-300 flex justify-center">
        {children}
      </main>
    </>
  );
}
