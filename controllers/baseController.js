const { scrap } = require('../services/webScrapService.js');

exports.webScrap = async (req, res) => {
  // const { url } = req.query;
  // const url = 'https://www.otomoto.pl/';
  const url =
    'https://www.otomoto.pl/ciezarowe/uzytkowe/mercedes-benz/od-2014/q-actros?search%5Bfilter_enum_damaged%5D=0&search%5Border%5D=created_at%3Adesc';
  const data = await scrap(url);
  res.send(data);
};
