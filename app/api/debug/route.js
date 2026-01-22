export async function GET() {
  return Response.json({
    environment: {
      hasApiKey: !!process.env.TMDB_API_KEY,
      hasApiUrl: !!process.env.TMDB_API_BASE_URL,
      nodeEnv: process.env.NODE_ENV,
      apiUrl: process.env.TMDB_API_BASE_URL,
    },
    timestamp: new Date().toISOString(),
  });
}
