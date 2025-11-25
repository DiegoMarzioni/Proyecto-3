import { IsDateString, IsString, IsInt, Min } from "class-validator";

export class CreateAppointmentDto {
  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsInt()
  @Min(1)
  userId: number;
}