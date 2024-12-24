'use server'

export async function fetchGoogleFonts() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_FONTS_API_KEY}`
    )
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch fonts')
    }
    
    return data
  } catch (error) {
    console.error('Error fetching fonts:', error)
    throw error
  }
}

