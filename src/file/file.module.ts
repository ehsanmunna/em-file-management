import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileEntity } from './file-entity/file-entity';
import { FileService } from './file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}