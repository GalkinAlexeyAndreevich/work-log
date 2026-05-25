import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWorkTypeDto } from './dto/create-work-type.dto';
import { WorkTypesService } from './work-types.service';

@Controller('work-types')
export class WorkTypesController {
  constructor(private readonly workTypesService: WorkTypesService) {}

  @Get()
  findAll() {
    return this.workTypesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateWorkTypeDto) {
    return this.workTypesService.create(dto);
  }
}
