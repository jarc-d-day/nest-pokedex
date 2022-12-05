//import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{
    @IsOptional()
    @IsPositive()
    @IsNumber()
    //@Type(() => Number) // 97. Transform DTOs, forma opcional
    @Min( 1 )
    limit?: number;

    @IsOptional()
    @IsNumber()
    //@Type(() => Number) // 97. Transform DTOs, forma opcional
    offset?: number;
}