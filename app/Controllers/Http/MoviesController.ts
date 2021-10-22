import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ImdbService from 'App/Services/imdbService';

export default class MoviesController {
    public async search({ request }: HttpContextContract) {
        const { category } = request.body();

        const imdbService = new ImdbService();
        const movie = await imdbService.getRandomMovie(category);

        return { data: movie };
    }
}
