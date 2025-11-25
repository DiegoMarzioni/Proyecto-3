import { IsString, IsEmail, IsDateString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateCredentialDto } from "./CreateCredentialDto";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  nDni: string;

  @ValidateNested()
  @Type(() => CreateCredentialDto)
  credential: CreateCredentialDto;
}