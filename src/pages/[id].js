import React from 'react';
import { useRouter } from 'next/router';

export const Url = () => {
    const router = useRouter()
    const { shortUrlCode } = router.query
    console.log(shortUrlCode)
    return (
        <div>Url</div>
    )
}
