import '../styles/globals.css'
import type { AppProps } from 'next/app'

// const { BASE_URI } = process.env
// if (!BASE_URI) {
//     throw new Error(
//         'Please define the BASE_URI environment variable inside .env.local'
//     )
// }

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
export default MyApp
