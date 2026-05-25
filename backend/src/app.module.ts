import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { WorkEntriesModule } from './work-entries/work-entries.module';
import { WorkTypesModule } from './work-types/work-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    WorkEntriesModule,
    WorkTypesModule,
  ],
})
export class AppModule {}
