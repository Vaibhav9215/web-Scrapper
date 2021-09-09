let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let url = "https://www.imdb.com/title/tt0242519/?ref_=tt_sims_tt";
request(url, cb);
function cb(error, response, html) {
  if (error) {
    console.log(error);
  }
  else if (response.statusCode == 404) {
    console.log("Page not found")
  } else {
    //  console.log("html:" ,html);
    dataExtracter(html);
  }
}
function dataExtracter(html) {
  let searchTool = cheerio.load(html);
  console.log("helloo")
  let title = searchTool('h1[class="TitleHeader__TitleText-sc-1wu6n3d-0 dxSWFG"]').text().trim();
  let rating = searchTool('span[class="AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV"]');
  let summary = searchTool('span[class="GenresAndPlot__TextContainerBreakpointXS_TO_M-cum89p-0 dcFkRD"]').text().trim();
  let releaseDate = searchTool('span[class="TitleBlockMetaData__ListItemText-sc-12ein40-2 jedhex"]').text();
  console.log("title:", title);
  console.log("rating:", rating);
  console.log("summary:", summary);
  console.log("releaseDate:", releaseDate);
}