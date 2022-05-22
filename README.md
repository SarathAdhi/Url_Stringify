## Tech Stack

- [NextJS](https://nextjs.org/)
- [NextJS Server side rendering](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

#### 1. EnvironmentFirst, install all the packages:

```bash
npm install
# or
yarn install
```

#### 2. Now, run the development server:

```bash
npm run dev
# or
yarn dev
```

#### 3. Configure your backend ([Firebase](https://firebase.google.com/))
Go to `src\backend\db.js`
```js script
const firebaseConfig = {
    apiKey: (your api key),             // Store in Environment Variable
    authDomain: (your auth domain),
    projectId: (your project id),
    storageBucket: (your storage Bucket),
    messagingSenderId: (your messaging Sender Id),
    appId: (your app Id),
    measurementId: (your measuremen tId), // Optional
};
```