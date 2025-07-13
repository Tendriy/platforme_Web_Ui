function makeFullUrl(url, isAuthGoogle = false) {
  const baseURL = import.meta.env.VITE_BACKEND_URL || ""
  return isAuthGoogle && url ? url : `${baseURL}${url}`
}

export default makeFullUrl