import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkTypeDto } from './dto/create-work-type.dto';

@Injectable()
export class WorkTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.workType.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(dto: CreateWorkTypeDto) {
    return await this.prisma.workType.create({
      data: {
        name: dto.name.trim(),
      },
    });
  }
}
