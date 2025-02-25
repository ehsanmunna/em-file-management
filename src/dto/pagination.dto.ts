import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { FileEntity } from 'src/file/file-entity/file-entity';
import { FileSearchEntity } from 'src/file/file-entity/search.dto';
export class PaginationDto extends FileSearchEntity {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
  }