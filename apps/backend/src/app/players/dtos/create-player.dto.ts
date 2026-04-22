import { PreferredPositionEnum } from '@fair-play-app/types';
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
  @IsEnum(PreferredPositionEnum)
  preferredPosition!: PreferredPositionEnum;

  @IsNotEmpty()
  @IsBoolean()
  isApproved!: boolean;
}
