import Head from "next/head";

export default function Layouts({ title, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main className="h-screen bg-teal-300 flex justify-center">{children}</main>
        </>
    )
}
