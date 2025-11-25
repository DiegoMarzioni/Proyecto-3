import { IsString, MinLength } from "class-validator";

export class CreateCredentialDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}