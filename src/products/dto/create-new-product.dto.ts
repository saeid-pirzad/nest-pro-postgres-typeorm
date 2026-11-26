import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateNewProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  sescription?: string;

  @IsNumber()
  @IsPositive()
  @Min(1000, {
    message: 'you must enter value greater then 1000 for price value ',
  })
  price: number;

  @IsInt()
  @IsPositive()
  @Min(1, { message: 'you must enter value greater then 1 for stock value' })
  stock: number;
}
