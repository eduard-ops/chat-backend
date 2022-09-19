import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagesEntity } from './messages.entity';

@Injectable()
export class AppServise {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
  ) {}

  async getAll() {
    return await this.messageRepository.find();
  }

  async addMessage(name: string, text: string) {
    await this.messageRepository.create({ name, text });
    return this.getAll();
  }
}
