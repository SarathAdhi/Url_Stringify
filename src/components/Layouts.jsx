import Head from "next/head";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Free URL shortener. Url Minifier helps you create and share any links long urls to short. Say bye to long URLs"
        ></meta>
        <meta
          property="og:title"
          content="URL Shortener - Short URLs &amp; Custom Free Link Shortener | Url Minifier"
        ></meta>
        <meta property="og:url" content="https://urlminifier.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="UrlMinifier"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen h-min-screen space-y-5 flex justify-center">
        {children}
      </main>
    </>
  );
}
