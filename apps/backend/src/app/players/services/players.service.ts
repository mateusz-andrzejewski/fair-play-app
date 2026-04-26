import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../core/prisma.service';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { FindPlayersQueryDto } from '../dtos/find-players.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { Prisma, Player } from 'apps/backend/generated/prisma/client';

@Injectable()
export class PlayersService {
  constructor(private _prismaService: PrismaService) {}

  async findAll(findPlayersQueryDto: FindPlayersQueryDto) {
    try {
      const {
        firstName,
        lastName,
        preferredPosition,
        isApproved,
        page = 1,
        limit = 1,
        sortBy = 'lastName',
        sortOrder = 'asc',
      } = findPlayersQueryDto;

      const allowedSortFields: Array<
        keyof Prisma.PlayerOrderByWithRelationInput
      > = [
        'firstName',
        'lastName',
        'nickname',
        'skillRate',
        'preferredPosition',
        'isApproved',
        'createdAt',
        'updatedAt',
      ];

      if (
        !allowedSortFields.includes(
          sortBy as keyof Prisma.PlayerOrderByWithRelationInput,
        )
      ) {
        throw new BadRequestException(`Invalid sortBy field: ${sortBy}`);
      }

      if (!['asc', 'desc'].includes(sortOrder)) {
        throw new BadRequestException(`Invalid sortOrder value: ${sortOrder}`);
      }

      const where: Prisma.PlayerWhereInput = {
        ...(firstName && {
          firstName: {
            contains: firstName,
            mode: 'insensitive',
          },
        }),

        ...(lastName && {
          lastName: {
            contains: lastName,
            mode: 'insensitive',
          },
        }),

        ...(preferredPosition && { preferredPosition }),

        ...(isApproved !== undefined && isApproved !== null && { isApproved }),
      };

      const skip = (page - 1) * limit;

      const [data, count] = await this._prismaService.$transaction([
        this._prismaService.player.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            [sortBy]: sortOrder,
          },
        }),
        this._prismaService.player.count({
          where,
        }),
      ]);

      return {
        data,
        meta: {
          page,
          limit,
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          hasPreviousPage: page > 1,
          hasNextPage: page < count / limit - 1,
        },
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException('Players cannot be fetch');
    }
  }

  async findOne(id: number): Promise<Player> {
    try {
      const player = await this._prismaService.player.findUnique({
        where: { id },
      });
      if (!player) {
        throw new NotFoundException(`Player with ID ${id} not found.`);
      }
      return player;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException('Failed to find player.');
    }
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    try {
      const player = await this._prismaService.player.create({
        data: createPlayerDto,
      });
      return player;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create player.');
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    try {
      const player = await this._prismaService.player.update({
        where: { id },
        data: updatePlayerDto,
      });
      if (!player) {
        throw new NotFoundException(`Player with ID ${id} not found.`);
      }
      return player;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(error);
      throw new NotFoundException('Failed to update player.');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this._prismaService.player.delete({
        where: { id },
      });
      if (!result) {
        throw new NotFoundException(`Player with ID ${id} not found.`);
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Failed to delete player.');
    }
  }
}
