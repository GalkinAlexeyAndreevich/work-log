import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkEntryDto } from './dto/create-work-entry.dto';
import { mapWorkEntry } from './work-entry.mapper';

@Injectable()
export class WorkEntriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.workEntry
      .findMany({
        orderBy: { completedAt: 'desc' },
      })
      .then((entries) => entries.map(mapWorkEntry));
  }

  async create(dto: CreateWorkEntryDto) {
    return this.prisma.workEntry
      .create({
        data: {
          completedAt: new Date(dto.completedAt),
          workTypeName: dto.workTypeName.trim(),
          volume: dto.volume,
          unit: dto.unit.trim(),
          executorName: dto.executorName.trim(),
        },
      })
      .then(mapWorkEntry);
  }
}
