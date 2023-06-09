const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '6e9e0b771bc4fbbcb2b5c88680807489',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;