// import axios and cheerio
const axios = require('axios');
const cheerio = require('cheerio');

exports.scrap = async (url) => {
  // console.log('scraping...');
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  // const title = $('title').text();
  // const description = $('meta[name="description"]').attr('content');

  // scrap from data-testid="search-results" of main tag
  const results = [];
  const main = $('main');
  // main tag contains articles
  const articles = main.find('article');
  console.log(articles.length);
  // loop through articles, each articles has h2, which is title, push title to results
  articles.each((i, article) => {
    const id = i + 1;
    const title = $(article).find('h2').text();
    const link = $(article).find('a').attr('href');
    const img = $(article).find('img').attr('src');

    // get the text of p tag having eayvfn612 eayvfn620 ooa-1sok604 er34gjf0 classes for description
    // const description = $(article)
    //   .find('p.eayvfn612.eayvfn620.ooa-1sok604.er34gjf0')
    //   .text();
    // find p tag text from article
    const description = $(article).find('p').text();

    // get the text of ul having class names "eayvfn612 eayvfn620 ooa-q46dc5 er34gjf0" first li for location, second li for when_added
    const ul = $(article).find('ul.eayvfn612.eayvfn620.ooa-q46dc5.er34gjf0');
    let location = $(ul).find('li').first().text(); // refine it and only keep the text
    const when_added = $(ul).find('li').last().text();

    // div class ooa-1nihvj5 eayvfn615 contains ul
    const ul2 = $(article).find('div.ooa-1nihvj5.eayvfn615').find('ul');
    const year = $(ul2).find('li').first().text();
    const driven_distance = $(ul2).find('li').eq(1).text();
    const cc = $(ul2).find('li').eq(2).text();
    const fuel_type = $(ul2).find('li').last().text();

    const price = $(article).find('span.ooa-1bmnxg7.eayvfn611').text();

    // find the text of span class name fin_link_list_span_price which has 2 nested font tags, it's div class fin_link_list_inside
    const price_from_just = $(article)
      .find('div.fin_link_list_inside')
      .children('span.fin_link_list_span_price')
      .text();

    // fin_link_list_inside
    let testStr = $(article)
      .find('div.fin_link_list_main')
      .find('div.fin_link_list_inside')
      .find('span.fin_link_list_span_1')
      .find('span.fin_link_list_span_price')
      .find('font')
      .find('font')
      .text();

    results.push({
      id,
      title,
      link,
      img,
      location,
      when_added,
      description,
      year,
      driven_distance,
      cc,
      fuel_type,
      price,
      price_from_just: testStr,
    });
  });

  return {
    error: false,
    results,
  };
};
