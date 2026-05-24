import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWorkEntryDto } from './dto/create-work-entry.dto';
import { WorkEntriesService } from './work-entries.service';

@Controller('work-entries')
export class WorkEntriesController {
  constructor(private readonly workEntriesService: WorkEntriesService) {}

  @Get()
  findAll() {
    return this.workEntriesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateWorkEntryDto) {
    return this.workEntriesService.create(dto);
  }
}
