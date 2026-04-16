import { Injectable } from '@nestjs/common';
import { IPlayer, PreferredPostionEnum } from '@fair-play-app/types';

@Injectable()
export class AppService {
  getData(): { message: IPlayer } {
    return {
      message: {
        id: 1,
        firstName: 'Testowy',
        lastName: 'Gracz',
        skillRate: 10,
        isApproved: true,
        createdAt: '',
        udpatedAt: '',
        preferredPosition: PreferredPostionEnum.DEFENDER,
      },
    };
  }
}
