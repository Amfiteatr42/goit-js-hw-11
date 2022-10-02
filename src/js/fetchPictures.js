export async function fetchPictures(url) {
  const response = await fetch(url);
  return await response.json();
}
// fetchPictures(
//   `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
// );
