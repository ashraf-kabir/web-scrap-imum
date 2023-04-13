const { scrap } = require('../services/webScrapService.js');

exports.webScrap = async (req, res) => {
  // const { url } = req.query;
  const url = 'https://www.otomoto.pl/';
  const data = await scrap(url);
  res.send(data);
};
