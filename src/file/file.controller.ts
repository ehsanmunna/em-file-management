import { Controller, Post, UseInterceptors, UploadedFile, Res, Get, Param, StreamableFile, Query } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';
import { PaginationDto } from 'src/dto/pagination.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileService } from './file/file.service';

@ApiTags('local-file-storage')
@Controller('file')
export class FileController {
  
  constructor(private readonly fileService: FileService) { }

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file);
      return await this.fileService.saveFile(file.filename, file.mimetype, file.path);    
    } catch (error) {
      console.log(error);
    }
  }

  @Get('download/:filename')
  @ApiOperation({ summary: 'Download a file' })
  @ApiResponse({ status: 200, description: 'File downloaded successfully.' })
  @ApiResponse({ status: 404, description: 'File not found.' })
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    return res.download(filePath);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file by ID' })
  @ApiResponse({ status: 200, description: 'File retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'File not found.' })
  async getFileById(@Param('id') id: number) {
    return await this.fileService.getFileById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get files with pagination' })
  @ApiResponse({ status: 200, description: 'Files retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getFiles(@Query() paginationDto: PaginationDto) {
    return await this.fileService.getFiles(paginationDto);
  }

  @Get('stream/:filename')
  @ApiOperation({ summary: 'Stream a file' })
  @ApiResponse({ status: 200, description: 'File streamed successfully.' })
  @ApiResponse({ status: 404, description: 'File not found.' })
  async streamFile(@Param('filename') filename: string): Promise<StreamableFile> {
    const stream = await this.fileService.getFileStream(filename);
    return new StreamableFile(stream);
  }
}