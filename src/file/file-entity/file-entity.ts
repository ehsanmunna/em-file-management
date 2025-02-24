
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileEntity {
@PrimaryGeneratedColumn()
id: number;

@Column()
filename: string;

@Column()
path: string;

@Column()
mimetype: string;
}

