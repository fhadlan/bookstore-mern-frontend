function getImgUrl(name) {
  return `http://localhost:3128/${name}`;
}

function getImgUrlNews(name) {
  return new URL(`../assets/news/${name}.png`, import.meta.url);
}

export { getImgUrl, getImgUrlNews };
