import { Controller, Post, UseInterceptors, UploadedFile, Res, Get, Param, StreamableFile, Query } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { join } from 'path';
import { Response } from 'express';
import { FileService } from './file/file.service';
import { PaginationDto } from 'src/dto/pagination.dto';

@Controller('file')
export class FileController {
  
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',
     {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      }
    })
  }
))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file);
      return await this.fileService.saveFile(file.filename, file.mimetype, file.path);    
    } catch (error) {
      console.log(error);
      
    }
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    return res.download(filePath);
  }

  @Get(':id')
  async getFileById(@Param('id') id: number) {
    return await this.fileService.getFileById(id);
  }

  @Get()
  async getFiles(@Query() paginationDto: PaginationDto) {
    return await this.fileService.getFiles(paginationDto);
  }

  @Get('stream/:filename')
  async streamFile(@Param('filename') filename: string): Promise<StreamableFile> {
    const stream = await this.fileService.getFileStream(filename);
    return new StreamableFile(stream);
  }
}