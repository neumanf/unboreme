import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { getRandomMovie } from '../../Services/imdbService';

export default class MoviesController {
    public async search({ request }: HttpContextContract) {
        const { category } = request.body();

        const movie = await getRandomMovie(category);

        return movie;
    }
}
