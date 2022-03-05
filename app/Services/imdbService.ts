import axios from 'axios';
import cheerio from 'cheerio';
import { IImdbData } from 'App/Interfaces/IImdbData';

export default class ImdbService {
    public async search(types: string[], genres: string[]) {
        const randomCategoryId = this.getRandomNumber(0, types.length);
        const randomCategory = types[randomCategoryId];
        const genresQuery = genres.map((genre) => genre.toLowerCase()).join(',');

        let data: IImdbData | null;

        switch (randomCategory) {
            case 'movie':
                data = await this.getRandomTitle(genresQuery, 'movie');
                break;
            case 'series':
                data = await this.getRandomTitle(genresQuery, 'series');
                break;
            default:
                data = null;
                break;
        }

        return data;
    }

    private async getRandomTitle(genres: string, type: string): Promise<IImdbData> {
        let res = await axios.get(
            `https://www.imdb.com/search/title/?genres=${genres}${
                type === 'series' ? '&title_type=tv_series' : ''
            }`
        );
        let $ = cheerio.load(res.data);

        const titles = $('.desc').first().text();
        const titlesTotal = titles.match(/.*of\s([\d|,]+)\stitles/)?.[1].replace(',', '') ?? '1';
        const randomPage = Math.floor(Math.random() * (parseInt(titlesTotal) / 50 - 1) + 1);

        res = await axios.get(
            `https://www.imdb.com/search/title/?genres=${genres}&start=${randomPage}&ref_=adv_nxt`
        );
        $ = cheerio.load(res.data);

        const title = $(
            'div.lister-item:nth-child(1) > div:nth-child(3) > h3:nth-child(1) > a:nth-child(2)'
        ).text();
        const url =
            'https://www.imdb.com' +
            $(
                'div.lister-item:nth-child(1) > div:nth-child(3) > h3:nth-child(1) > a:nth-child(2)'
            ).attr('href');
        const imgUrl = $(
            'div.lister-item:nth-child(1) > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)'
        ).attr('src');
        const year = $('.lister-item-year').first().text();
        const rating = $('.ratings-imdb-rating').first().text().trim();
        const description = $('div.lister-item:nth-child(1) > div:nth-child(3) > p:nth-child(4)')
            .text()
            .trim();
        const categories = $('.genre').first().text().trim();
        const duration = $('.runtime').first().text().trim();
        const director = $(
            'div.lister-item:nth-child(1) > div:nth-child(3) > p:nth-child(5) > a:nth-child(1)'
        )
            .text()
            .trim();

        return {
            title,
            url,
            img_url: imgUrl,
            year,
            rating,
            description,
            categories,
            duration,
            director,
        };
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
