import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkTypeDto } from './dto/create-work-type.dto';

@Injectable()
export class WorkTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.workType.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(dto: CreateWorkTypeDto) {
    try {
      return await this.prisma.workType.create({
        data: {
          name: dto.name.trim(),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Такой вид работ уже существует');
      }

      throw error;
    }
  }
}
