import { Module } from '@nestjs/common';
import { PlayersController } from './controllers/players.controller';
import { PlayersService } from './services/players.service';

@Module({
  imports: [],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
