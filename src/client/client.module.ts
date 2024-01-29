import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrashpadEntity } from './crashpad.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CrashpadEntity])],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService]
})
export class ClientModule { }