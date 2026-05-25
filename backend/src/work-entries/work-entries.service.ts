import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkEntryDto } from './dto/create-work-entry.dto';
import { UpdateWorkEntryDto } from './dto/update-work-entry.dto';
import { mapWorkEntry } from './work-entry.mapper';

@Injectable()
export class WorkEntriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.workEntry
      .findMany({
        where: { isDeleted: false },
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
          isDeleted: false,
        },
      })
      .then(mapWorkEntry);
  }

  async update(id: string, dto: UpdateWorkEntryDto) {
    const { count } = await this.prisma.workEntry.updateMany({
      where: { id, isDeleted: false },
      data: {
        completedAt: new Date(dto.completedAt),
        workTypeName: dto.workTypeName.trim(),
        volume: dto.volume,
        unit: dto.unit.trim(),
        executorName: dto.executorName.trim(),
      },
    });

    if (count === 0) {
      throw new NotFoundException('Запись не найдена');
    }

    return this.prisma.workEntry
      .findUnique({
        where: { id },
      })
      .then((entry) => {
        if (!entry || entry.isDeleted) {
          throw new NotFoundException('Запись не найдена');
        }

        return mapWorkEntry(entry);
      });
  }

  async softDelete(id: string) {
    const { count } = await this.prisma.workEntry.updateMany({
      where: { id, isDeleted: false },
      data: { isDeleted: true },
    });

    if (count === 0) {
      throw new NotFoundException('Запись не найдена');
    }
  }
}
