import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { PlayerModule } from './players/player.module';

@Module({
  imports: [CoreModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
