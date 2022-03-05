import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ImdbService from 'App/Services/imdbService';

export default class SearchController {
    public async search({ request }: HttpContextContract) {
        const imdbService = new ImdbService();
        const { types, genres } = request.body();

        const data = await imdbService.search(types, genres);

        if (!data) throw new Error('An unexpected error has occurred');

        return { data };
    }
}
