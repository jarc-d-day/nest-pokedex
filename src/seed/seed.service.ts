import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
    
    constructor(
        @InjectModel( Pokemon.name )
        private readonly pokemonModel: Model<Pokemon>,

        private readonly http: AxiosAdapter
    ) {}    



    async executeSeed() { // 3er metodo: .insertMany()
        await this.pokemonModel.deleteMany({}) // delete * from pokemons

        const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=600');

        //const pokemonToInsert: { name: string, no: number }[] = [];
        const pokemonToInsert: CreatePokemonDto[] = [];

        data.results.forEach( ( {name, url} ) => {
            const segments = url.split('/');
            
            const no = +segments[ segments.length - 2 ];

            pokemonToInsert.push({ name, no });
        });

        await this.pokemonModel.insertMany( pokemonToInsert );
        
        return 'Seed executed';
    }











    // async executeSeed() { // 2do metodo: Promise.all
    //     await this.pokemonModel.deleteMany({}) // delete * from pokemons

    //     const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    //     const insertPromisesArray = [];

    //     data.results.forEach( ( {name, url} ) => {
    //         const segments = url.split('/');
            
    //         const no = +segments[ segments.length - 2 ];

    //         insertPromisesArray.push( this.pokemonModel.create( {no, name} ) );
    //     });

    //     await Promise.all( insertPromisesArray );
        
    //     return 'Seed executed';
    // }




    // async executeSeed() { // 1er insercion dentro del forEach
    //     await this.pokemonModel.deleteMany({}) // delete * from pokemons

    //     const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    //     data.results.forEach( async ( {name, url} ) => {
    //         const segments = url.split('/');
            
    //         const no = +segments[ segments.length - 2 ];

    //         const pokemon = await this.pokemonModel.create( {no, name} );
    //     } )
        
    //     return 'Seed executed';
    // }


}
