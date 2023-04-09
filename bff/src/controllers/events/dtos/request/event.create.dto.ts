import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
  IsDate,
  IsOptional,
  IsNumber,
  IsLatitude,
  IsLongitude,
} from "class-validator";
import { Type } from "class-transformer";

export class EventCreationDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  place: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateTime: Date;

  @IsUrl(undefined, { each: true })
  images: string[];

  @IsPositive()
  @IsNotEmpty()
  capacity: number;
}
