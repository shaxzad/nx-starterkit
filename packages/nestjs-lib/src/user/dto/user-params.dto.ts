import { IsString } from 'class-validator';

export class UserParamsDto {
  @IsString()
  id: string;
}