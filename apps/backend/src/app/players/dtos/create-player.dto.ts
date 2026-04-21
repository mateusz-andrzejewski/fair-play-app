import { PreferredPostionEnum } from '@fair-play-app/types';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsOptional()
  @IsString()
  nickname!: string;

  @IsNotEmpty()
  @IsInt()
  skillRate!: number;

  @IsNotEmpty()
  @IsEnum(PreferredPostionEnum)
  preferredPostion!: PreferredPostionEnum;

  @IsNotEmpty()
  @IsBoolean()
  isApproved!: boolean;
}
