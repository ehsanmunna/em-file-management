import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PaginationDto } from 'src/dto/pagination.dto';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { FileEntity } from '../file-entity/file-entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async saveFile(filename: string, mimetype: string, path: string) {
    const file = this.fileRepository.create({ filename, mimetype, path });
    return await this.fileRepository.save(file);
  }

  async getFileById(id: number) {
    return await this.fileRepository.findOne({ where: { id } });
  }

  async getFiles(paginationDto: PaginationDto) {
    const { page, limit, filename, mimetype } = paginationDto;
    const skip = (page - 1) * limit;
    const params: FindManyOptions<FileEntity> = {
      skip,
      take: limit,
      where: {},
    }
    if (filename) {
      params.where = {
        filename: Like(`%${filename}%`),
      };
    }
    if (mimetype) {
      params.where = {
        ...params.where,
        ...{mimetype: mimetype}
      };
    }

    const [data, total] = await this.fileRepository.findAndCount(params);
    

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }

  async getFileStream(filename: string) {
    const file = await this.fileRepository.findOne({ where: { filename } });
    if (!file) throw new Error('File not found');
    const filePath = join(process.cwd(), 'uploads', filename);
    return createReadStream(filePath);
  }
}
