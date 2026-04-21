import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';

@Controller('players')
export class PlayersController {
  @Get()
  findAll() {
    return 'Find All Players';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `Find One Player ${id}`;
  }

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto): string {
    console.log(createPlayerDto);
    return 'Create Player';
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return `Update Player ${id}`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `Remove Player ${id}`;
  }
}
