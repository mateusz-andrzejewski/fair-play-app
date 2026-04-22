import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { PlayersService } from '../services/players.service';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { FindPlayersQueryDto } from '../dtos/find-players.dto';

@Controller('players')
export class PlayersController {

  constructor(private _playersService: PlayersService) {}
  
  @Get()
  findAll(@Query() query: FindPlayersQueryDto) {
    return this._playersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this._playersService.findOne(id);
  }

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this._playersService.create(createPlayerDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this._playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this._playersService.remove(id);
  }
}
