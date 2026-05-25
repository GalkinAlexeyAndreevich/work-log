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
        include: { workType: true },
        orderBy: { completedAt: 'desc' },
      })
      .then((entries) => entries.map(mapWorkEntry));
  }

  async create(dto: CreateWorkEntryDto) {
    await this.ensureWorkTypeExists(dto.workTypeId);

    return this.prisma.workEntry
      .create({
        data: {
          completedAt: new Date(dto.completedAt),
          workTypeId: dto.workTypeId,
          volume: dto.volume,
          unit: dto.unit.trim(),
          executorName: dto.executorName.trim(),
          isDeleted: false,
        },
        include: { workType: true },
      })
      .then(mapWorkEntry);
  }

  async update(id: string, dto: UpdateWorkEntryDto) {
    await this.ensureWorkTypeExists(dto.workTypeId);

    const { count } = await this.prisma.workEntry.updateMany({
      where: { id, isDeleted: false },
      data: {
        completedAt: new Date(dto.completedAt),
        workTypeId: dto.workTypeId,
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
        include: { workType: true },
      })
      .then((entry) => {
        if (!entry || entry.isDeleted) {
          throw new NotFoundException('Запись не найдена');
        }

        return mapWorkEntry(entry);
      });
  }

  private async ensureWorkTypeExists(workTypeId: string) {
    const workType = await this.prisma.workType.findUnique({
      where: { id: workTypeId },
    });

    if (!workType) {
      throw new NotFoundException('Вид работ не найден');
    }
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
