import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { PlayersModule } from './players/player.module';

@Module({
  imports: [CoreModule, PlayersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
