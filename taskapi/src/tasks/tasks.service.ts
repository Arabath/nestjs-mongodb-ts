import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Task } from 'src/schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto'
import { UpdateTaskDto } from '../dto/update-task.dto'

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

    async findAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async findOne(id: string): Promise<Task> {
        return this.taskModel.findById(id).exec();
    }

    async create(createTask: CreateTaskDto) {
        const newTask = new this.taskModel(createTask);
        return newTask.save();
    }

    async update(id:string, task: UpdateTaskDto) {
        return this.taskModel.findByIdAndUpdate(id, task)
    }

    async delete(id:string) {
        return this.taskModel.findByIdAndDelete(id)
    }


}
