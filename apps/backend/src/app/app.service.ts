import { Injectable } from '@nestjs/common';
import { IPlayer, PreferredPositionEnum } from '@fair-play-app/types';

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
        updatedAt: '',
        preferredPosition: PreferredPositionEnum.DEFENDER,
      },
    };
  }
}
