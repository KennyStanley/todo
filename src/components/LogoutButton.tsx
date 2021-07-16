import cookie from 'js-cookie'

export default function LogoutButton({ revalidate }: any) {
    return (
        <button
            onClick={() => {
                cookie.remove('token')
                revalidate()
            }}
            className="bg-red-600 px-0.5 py-1.5 rounded text-white text-md w-full"
        >
            Logout
        </button>
    )
}
