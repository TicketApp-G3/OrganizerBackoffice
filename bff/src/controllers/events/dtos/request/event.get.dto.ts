import {
  IsAfterDateArgConstraint,
  IsAfterNowConstraint,
} from "@shared/validators";
import { Type } from "class-transformer";
import {
  IsDataURI,
  IsDate,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Validate,
} from "class-validator";

export class GetEventDto {
  @IsString()
  @IsOptional()
  ownerId: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  status: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Validate(IsAfterNowConstraint)
  public startDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Validate(IsAfterNowConstraint)
  @Validate(IsAfterDateArgConstraint, ["startDate"])
  public endDate?: Date;

  @IsNumber()
  @IsLatitude()
  @IsOptional()
  latitude: number;

  @IsNumber()
  @IsLongitude()
  @IsOptional()
  longitude: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  radius: number;

  //TODO: busqueda por destacados
}
