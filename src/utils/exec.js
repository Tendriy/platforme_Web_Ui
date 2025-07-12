export async function exec(
  asyncFn, 
  setLoading = () => {},  
  setError = () => {}
) {
  setLoading(true)
  setError(null)
  try {
    const result = await asyncFn()
    setLoading(false)
    return result
  } catch (err) {
    setError(err.response?.data?.message || err.message || 'Erreur inconnue')
    setLoading(false)
    return null
  }
}
