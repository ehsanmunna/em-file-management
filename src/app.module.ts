import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file/file-entity/file-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT, 10),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      host: 'localhost', // or your SQL Server host
      port: 1433, // Default MSSQL port
      username: 'sa',
      password: 'Start777',
      database: 'file-management',
      synchronize: true, // Set to false in production
      entities: [FileEntity],
      logging: true,
      extra: {
        trustServerCertificate: true, // Required for local development
      },
    }),
    FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
