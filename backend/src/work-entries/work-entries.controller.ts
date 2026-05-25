import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateWorkEntryDto } from './dto/create-work-entry.dto';
import { UpdateWorkEntryDto } from './dto/update-work-entry.dto';
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

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateWorkEntryDto,
  ) {
    return this.workEntriesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.workEntriesService.softDelete(id);
  }
}
