// import axios and cheerio
const axios = require('axios');
const cheerio = require('cheerio');

exports.scrap = async (url) => {
  console.log('scraping...');
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const title = $('title').text();
  const description = $('meta[name="description"]').attr('content');
  const image = $('meta[property="og:image"]').attr('content');
  // const url = $('meta[property="og:url"]').attr('content');
  const siteName = $('meta[property="og:site_name"]').attr('content');

  // scrap all images
  const images = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    images.push(src);
  });

  return {
    title,
    description,
    image,
    siteName,
    images,
  };
};
