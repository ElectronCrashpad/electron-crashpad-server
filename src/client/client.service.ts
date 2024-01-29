/* eslint-disable prettier/prettier */
import * as fs from 'fs';
import * as path from 'path';
import * as minidump from 'minidump';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CrashpadEntity } from "./crashpad.entity";
import { Repository, In } from "typeorm";
import { CrashpadDto } from "./crashpad.dto";
import { PageQuery } from "src/base/page.query";
import { CrashpadQuery } from "./crashpad.query";
import { IPageVO } from "src/base/page.vo";
import { ServerResponse } from 'http';
import ResultVO from 'src/base/result.vo';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(CrashpadEntity)
        private readonly crashpadRepository: Repository<CrashpadEntity>
    ) {}

    async findAll(): Promise<CrashpadEntity[]> {
        return await this.crashpadRepository.find();
    }

    async findOne(id: number): Promise<CrashpadEntity> {
        return await this.crashpadRepository.findOne({ where: { id } });
    }

    async create(cardDto: CrashpadDto): Promise<CrashpadEntity> {
        const crashpadEntity = CrashpadEntity.createCrashpad(cardDto);
        return await this.crashpadRepository.save(crashpadEntity);
    }

    async update(id: number, cardDto: CrashpadDto): Promise<CrashpadEntity> {
        const crashpadEntity = await this.findOne(id);
        return await this.crashpadRepository.save(CrashpadEntity.updateCrashpad(crashpadEntity, cardDto));
    }

    async delete(id: number): Promise<CrashpadEntity> {
        const player = await this.findOne(id);
        return await this.crashpadRepository.remove(player);
    }

    async findByPage(pageQuery: PageQuery<CrashpadQuery>): Promise<IPageVO<CrashpadEntity>> {
        const { page, size, sort, order, query } = pageQuery;
        const queryWhere = query.toQueryWhere();
        const [data, total] = await this.crashpadRepository.findAndCount({
            where: queryWhere,
            skip: (page && size) && (page - 1) * size,
            take: size,
            order: {
                [sort]: order
            }
        });
        return {
            page,
            size,
            total,
            data,
            success: true
        }
    }

    async findByIds(ids: number[]): Promise<CrashpadEntity[]> {
        return await this.crashpadRepository.find({ where: { id: In(ids) } });
    }

    async analysisCrashpadById(id: number, res: ServerResponse) {
        try {
            const crashpad = await this.crashpadRepository.findOne({where: {id}});
    
            for (const dmpPath of crashpad.dmpsPath.split(',')) {
                const dumpBuffer = await new Promise<Buffer>((resolve, reject) => {
                    const basePath = path.join(dmpPath);
                    if (!fs.existsSync(basePath)) return reject(new Error(`path: ${basePath} is not exists`));
                    
                    minidump.walkStack(basePath, (error, result) => {
                        if (error) return reject(error);
    
                        resolve(result);
                    });
                })
    
                res.write(dumpBuffer);
            }
    
            res.end();
        } catch (error) {
            res.emit('error', new ResultVO<void>(500, error.message, error));
            res.end();
        }
    }
}