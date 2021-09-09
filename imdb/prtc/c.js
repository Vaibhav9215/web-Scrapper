//let url =  "https://www.imdb.com/title/tt0242519/?ref_=tt_sims_tt"
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let json2csv = require("json2csv").Parser;
const movie = "https://www.imdb.com/title/tt0242519/?ref_=tt_sims_tt";
//const { monitorEventLoopDelay } = require("perf_hooks");
(async () => {
    let imdbData = [ ]
    let response = await request({
        uri: movie,
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8", //class="TitleBlock__Container"-sc-1nlhx7j-3 itQvtY"
        },
        gzip: true
    });
    let searchTool = cheerio.load(response);
    let title = searchTool('h1[class="TitleHeader__TitleText-sc-1wu6n3d-0 dxSWFG"]').text().trim();
    let rating = searchTool('span[class="AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV"]').text().trim();
    let summary = searchTool('span[class="GenresAndPlot__TextContainerBreakpointXS_TO_M-cum89p-0 dcFkRD"]').text().trim();
    let releaseDate = searchTool('span[class="TitleBlockMetaData__ListItemText-sc-12ein40-2 jedhex"]').text().trim();
    console.log(title);
    imdbData.push({
        title,
        rating,
        summary,
        releaseDate,
  });
    const j2cp = new json2csv()
    const csv = j2cp.parse(imdbData)
    fs.writeFileSync("./imdb.csv", csv, "utf-8");
}
)();