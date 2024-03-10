import { IsNotEmpty, IsString, IsIn, IsBoolean, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class LoginRequestDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
