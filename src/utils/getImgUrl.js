function getImgUrl(name) {
  return new URL(`../assets/books/${name}`, import.meta.url);
}

function getImgUrlNews(name) {
  return new URL(`../assets/news/${name}.png`, import.meta.url);
}

export { getImgUrl, getImgUrlNews };
