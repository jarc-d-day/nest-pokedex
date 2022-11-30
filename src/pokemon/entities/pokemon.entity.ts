import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    // id: string // Mondo lo proporcionar

    @Prop({ unique: true, index: true, })
    no: number;

    @Prop({ unique: true, index: true, })
    name: string;   
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
