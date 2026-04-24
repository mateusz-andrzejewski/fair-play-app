import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../core/prisma.service";
import { Player, Prisma } from "apps/backend/generated/prisma/client";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { UpdatePlayerDto } from "../dtos/update-player.dto";
import { FindPlayersQueryDto } from "../dtos/find-players.dto";

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
                limit = 10,
                sortBy = 'lastName',
                sortOrder = 'asc'
            } = findPlayersQueryDto;

            const allowedSortFields: Array<keyof Prisma.PlayerOrderByWithRelationInput> = [
                'firstName',
                'lastName',
                'skillRate',
                'preferredPosition',
                'isApproved',
                'createdAt',
            ];

            if (!allowedSortFields.includes(sortBy as keyof Prisma.PlayerOrderByWithRelationInput)) {
                throw new BadRequestException(`Invalid sortBy field: ${sortBy}`);
            }

            if (sortOrder !== 'asc' && sortOrder !== 'desc') {
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
                ...(preferredPosition && {
                preferredPosition,
                }),
                ...(typeof isApproved === 'boolean' && {
                isApproved,
                }),
            };

              const skip = (page - 1) * limit;

              const [data, total] = await this._prismaService.$transaction([
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
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasPreviousPage: page > 1,
                hasNextPage: page < Math.ceil(total / limit),
                },
            };
            
        } catch (error: unknown) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            console.error(error);
            throw new InternalServerErrorException('Failed to find players.');
        }
    }

    async findOne(id: number): Promise<Player> {
        try {
            const player = await this._prismaService.player.findUnique({
            where: { id }
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
    
    async create(createPlayerDto: CreatePlayerDto):Promise<Player> {
        try {
            const player = await this._prismaService.player.create({
                data: createPlayerDto
            });
            return player;
        } catch (error: unknown) { 
            console.error(error);
            throw new InternalServerErrorException('Failed to create player.')
        }
    }

    async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
        try {
            const player = await this._prismaService.player.update({
                where: { id },
                data: updatePlayerDto
            })
            if (!player) {
                throw new NotFoundException(`Player with ID ${id} not found.`)
            }
            return player
        } catch (error: unknown) {
            if (error instanceof NotFoundException) {
                throw error
            }
            console.error(error);
            throw new NotFoundException('Failed to update player.')
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const result = await this._prismaService.player.delete({
            where: { id }
        })
        if (!result) {
            throw new NotFoundException(`Player with ID ${id} not found.`)
        }
    }
        catch (error: unknown) {
            if (error instanceof NotFoundException) {
                throw error
            }
            console.error(error);
            throw new InternalServerErrorException('Failed to delete player.')
        }
    }
}