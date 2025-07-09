/**
 * Remove RSS-related route parameters from URLs to clean up links
 * @param url - The URL to clean
 * @returns Cleaned URL without RSS parameters
 */
export function removeRssRouteParameters(url: string): string {
  try {
    const urlObj = new URL(url);

    if (urlObj.searchParams.get('rss')) {
      urlObj.searchParams.delete('rss');
    }

    return urlObj.toString();
  } catch (error) {
    // If URL parsing fails, return original URL
    console.warn(
      `Failed to parse URL for RSS parameter removal: ${url}`,
      error,
    );
    return url;
  }
}
