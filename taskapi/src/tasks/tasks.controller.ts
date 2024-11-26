import {
  Body,
  ConflictException,
  NotFoundException,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  Put,
  Controller,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Get()
  async findAll() {
    return this.taskservice.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskservice.findOne(id);
    if (!task) throw new NotFoundException('Task does not exist!');
    return task;
  }

  @Post()
  async create(@Body() body: CreateTaskDto) {
    try {
      return await this.taskservice.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists');
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const task = await this.taskservice.delete(id);
    if (!task) throw new NotFoundException('Task does not exist!');
    return task;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    const task = await this.taskservice.update(id, body);
    if (!task) throw new NotFoundException('Task does not exist!');
    return task;
  }
}
