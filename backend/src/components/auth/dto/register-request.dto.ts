import { IsNotEmpty, IsString, IsIn, IsBoolean, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class RegisterRequestDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly bio: string;

  readonly avatars: string[];

  location?: {
    latitude: number;
    longitude: number;
  };
}
