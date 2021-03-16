import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
