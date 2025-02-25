import { Column } from "typeorm";

export class FileSearchEntity {
    
    @Column()
    filename: string;
    
    @Column()
    mimetype: string;
    }
    