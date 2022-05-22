import React from 'react';
import Router from 'next/router';
import { collection, getDocs } from "firebase/firestore";
import db from '../../backend/db';
import { useEffect } from 'react';

export async function getServerSideProps(context) {

    const urlId = context.query.id;
    const URL_Col = collection(db, 'urls');
    const URL_Snapshot = await getDocs(URL_Col);
    const neededURL = URL_Snapshot.docs.map(doc => doc.data()).filter((data) => {
        return data.shortUrlCode === urlId;
    }).map((data) => {
        return data;
    })

    return {
        props: {
            data: neededURL
        }
    }
}

export default function Url({ data }) {
    useEffect(() => {
        async function routePath() {
            if (data.length != 0)
                await Router.push(data[0].fullUrl);
            else
                alert("The ID doesn't exist in the Database")
        }
        routePath();
        console.log(data)
    }, [])
    return (
        <div></div>
    )
}