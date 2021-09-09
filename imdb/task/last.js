let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let url = "https://www.imdb.com/title/tt0242519/?ref_=tt_sims_tt";
request(url, cb);
function cb(error, response, html) {
  if (error) {
    //Print the error if one occured
    console.log(error);
  }
  else if (response.statusCode == 404) {
    console.log("Page not found")
  } else {
    //  console.log("html:" ,html);
console.log("hello");
    dataExtracter(html);
  }
}
function dataExtracter(html) {
  // search tool
  //  let imdbData= [];
  let searchTool = cheerio.load(html);


let title = searchTool('h1[class="TitleHeader__TitleText-sc-1wu6n3d-0 dxSWFG"]').text().trim();
let rating = searchTool('span[class="AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV"]').text().trim();
let summary = searchTool('span[class="GenresAndPlot__TextContainerBreakpointXS_TO_M-cum89p-0 dcFkRD"]').text().trim();
let releaseDate = searchTool('span[class="TitleBlockMetaData__ListItemText-sc-12ein40-2 jedhex"]').text().trim();
console.log("title:", title);
console.log("rating:", rating); //"TitleBlock_TitleContainer-sc-1n1hx7j-1 jxsVNT"
console.log("summary:", summary);
console.log("releaseDate:", releaseDate);
}