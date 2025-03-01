import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileEntity {
  @ApiProperty({ description: 'The unique identifier of the file' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The path where the file is stored' })
  @Column()
  path: string;

  @ApiProperty({ description: 'The name of the file' })
  @Column()
  filename: string;

  @ApiProperty({ description: 'The MIME type of the file' })
  @Column()
  mimetype: string;
}