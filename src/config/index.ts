export const HOST = process.env.NEXT_PUBLIC_BACKEND || "http://localhost"
export const PORT = process.env.NEXT_PUBLIC_PORT || ":8080"

export const BASEURL = `${HOST}${PORT}`