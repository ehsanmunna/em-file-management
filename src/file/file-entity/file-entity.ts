
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FileSearchEntity } from './search.dto';

@Entity()
export class FileEntity extends FileSearchEntity {
@PrimaryGeneratedColumn()
id: number;

@Column()
path: string;
}