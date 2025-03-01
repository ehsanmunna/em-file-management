import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { FileSearchEntity } from 'src/file/file-entity/search.dto';
import { Column } from 'typeorm';
export class PaginationDto extends FileSearchEntity {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiProperty({ description: 'number of page', required: true, default: 1 })
    @Column()
    page: number = 1;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @ApiProperty({ description: 'number of page size', required: true, default: 10 })
    @Column()
    limit: number = 10;
  }