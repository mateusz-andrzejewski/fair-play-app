import { Injectable } from '@nestjs/common';
import { Player } from '@fair-play-app/types';

@Injectable()
export class AppService {
  getData(): { message: Player } {
    return {
      message: {
        id: 'test',
        firstName: 'Testowy',
        lastName: 'Gracz',
        skillRate: 10,
        isApproved: true,
        createdAt: '',
        udpatedAt: '',
      },
    };
  }
}
