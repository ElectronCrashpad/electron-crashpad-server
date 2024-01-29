import * as fs from 'fs';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';

const dbFilePath = path.join(process.cwd(), 'db_electron_crash_reporter');

if(!fs.existsSync(dbFilePath)) fs.writeFileSync(dbFilePath, "");

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqljs',
    location: path.join(process.cwd(), 'db_electron_crash_reporter'),
    autoSave: true,
    autoLoadEntities: true,
    synchronize: true
  }), ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
