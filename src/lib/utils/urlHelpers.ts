/**
 * Remove RSS-related route parameters from URLs to clean up links
 * @param url - The URL to clean
 * @returns Cleaned URL without RSS parameters
 */
export function removeRssRouteParameters(url: string): string {
  try {
    const urlObj = new URL(url);

    // List of RSS-related parameters to remove
    const rssParams = [
      'rss',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'fc',
      'ff',
      'v',
      'feed',
      'type',
      'fmt',
      'limit',
      'name',
      'utm_campaign',
    ];

    // Remove RSS-related parameters
    rssParams.forEach((param) => {
      if (urlObj.searchParams.has(param)) {
        urlObj.searchParams.delete(param);
      }
    });

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
