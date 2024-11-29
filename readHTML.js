const cheerio = require("cheerio");
const fs = require("fs");
const sendEmail = require("./sendEmail");
// const axios = require("axios")

function readHtml(HTML) {
    const $ = cheerio.load(HTML);
    const li = ($(".list-group-item"));
    const linkText = $(".list-group-item a");

    let allResulDeclar = li.length;
    try {
        fs.readFile("./result.txt", "utf-8",async (err, data) => {

            if (allResulDeclar === Number(data)) {
                let resultlenth = allResulDeclar - Number(data);

                const resultPDf = process.env.PDFLink + ($(linkText[0]).attr("href"));
                const text = ($(linkText[0]).text());
                return await sendEmail(text, resultPDf, allResulDeclar, data, resultlenth);
            } else {
                let resultlenth = allResulDeclar - Number(data);
                for (let i = 0; i < resultlenth; i++) {
                    const resultPDf = process.env.PDFLink + ($(linkText[i]).attr("href"));
                    const text = ($(linkText[i]).text());
                    return await sendEmail(text, resultPDf, allResulDeclar, data, resultlenth);
                }
            }
            fs.writeFile("./result.txt", String(allResulDeclar), (err, data) => { });

        })
    } catch (error) {
    }
}
// function getRequset() {
//     axios.get('')
//         .then((res) => {
//             console.log(res)
//         }).catch((e) => {
//             confirm.log(e)
//         })
// }
module.exports = readHtml
