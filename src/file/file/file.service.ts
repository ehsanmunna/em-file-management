import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join } from 'path';
import { createReadStream } from 'fs';
import { FileEntity } from '../file-entity/file-entity';
import { PaginationDto } from 'src/dto/pagination.dto';

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
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.fileRepository.findAndCount({
      skip,
      take: limit,
    });
    

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
    
    // const filePath = join(__dirname, '../../uploads', file.filename);
    const filePath = join(process.cwd(), 'uploads', filename);
    return createReadStream(filePath);
  }
}
