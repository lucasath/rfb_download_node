import axios from "axios";
import cheerio from "cheerio";

class Urls {
    url_base: any;
    constructor(){
        this.url_base = process.env.URL_BASE;
    }
    
    async get_links(): Promise<Array<any>>{
        const request = await axios.get(this.url_base)
        const $ = cheerio.load(request.data);
        const getFile = (anchor: any) => ({url: `${this.url_base}${$(anchor).attr('href')}`, date: new Date($(anchor).parent().next().text().trim())})
        const onlyRFBFiles = (fileName: any) => fileName.url.match(/.zip/)

        const anchors = $('tbody a').get()
    
        const result = anchors.map(getFile).filter(onlyRFBFiles)

        return result;

    }

}

export { Urls };
