import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class FileSearchEntity {
  @ApiProperty({ description: 'The name of the file', required: false })
  @Column({ nullable: true })
  filename?: string;

  @ApiProperty({ description: 'The MIME type of the file', required: false })
  @Column({ nullable: true })
  mimetype?: string;
}