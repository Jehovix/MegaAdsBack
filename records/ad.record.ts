import {AdEntity} from "../types/ad/ad-entity";
import {ValidationError} from "../utils/errors";

interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

export class AdRecord implements AdEntity {
    public id: string;
    public lat: number;
    public description: string;
    public lon: number;
    public name: string;
    public price: number;
    public url: string;

    constructor(obj: AdEntity) {
        if(!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenie nie może być pusta, ani przekraczać 100 znaków');
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenie nie może przekraczać 1000 znaków');
        }

        if (obj.price < 0 || obj.price > 999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 999999');

        }
        //  @TODO: Check if URL is valid!
        if(!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogłoszenie nie może być pusty, ani przekraczać 100 znaków');
        }
        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number'){
            throw new ValidationError('Nie można zlokalizować ogłoszenia.');
        }

        this.name = obj.name
        this.description = obj.description
        this.price = obj.price
        this.url = obj.url
        this.lat = obj.lat
        this.lon = obj.lon
    }

}