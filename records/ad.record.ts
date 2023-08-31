import {AdEntity} from "../types/ad/ad-entity";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket[]];

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

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);
    }

}