import * as util from 'util';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { IncomingMessage, ServerResponse } from 'http';
import * as multiparty from 'multiparty';
import { Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { CrashpadDto } from './crashpad.dto';
import { PageQuery } from 'src/base/page.query';
import { CrashpadQuery } from './crashpad.query';
import ResultVO from 'src/base/result.vo';
import { IPageVO } from 'src/base/page.vo';
import { CrashpadEntity } from './crashpad.entity';

@Controller("client")
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post('crashpad-upload')
    uploadCrashpad(@Req() req: IncomingMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            const uploadDir = path.join(process.cwd(), "client_crash_reporter");
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

            const handleCrashpad = (error: Error, fields: any, files: any) => {
                if (error) return reject(error);

                this.clientService.create(new CrashpadDto(
                    fields._productName,
                    fields._version,
                    fields.guid,
                    fields.osarch,
                    fields.pid,
                    fields.plat,
                    fields.platform,
                    fields.process_type,
                    fields.prod,
                    fields.ptype,
                    fields.ver,
                    files.upload_file_minidump.map(file => file.path)
                ));
                resolve(util.inspect({ fields, files }));
            };

            if (req.headers['content-encoding'] === 'gzip') {
                const gunzip = zlib.createGunzip();
                req.pipe(gunzip);
                (gunzip as any).headers = req.headers;

                const form = new multiparty.Form({ uploadDir });
                form.parse(gunzip as any, handleCrashpad);
            } else {
                const form = new multiparty.Form({ uploadDir });
                form.parse(req, handleCrashpad);
            }
        });
    }

    @Get('crashpad')
    async getCrashpadByPage(@Query() pageQuery: PageQuery<CrashpadQuery>): Promise<ResultVO<IPageVO<CrashpadEntity>>> {
        try {
            pageQuery.query = CrashpadQuery.create<CrashpadQuery>(pageQuery.query);
            const crashpadEntityPage = await this.clientService.findByPage(pageQuery);
            return ResultVO.success<IPageVO<CrashpadEntity>>(crashpadEntityPage);
        } catch (error) {
            return new ResultVO<IPageVO<CrashpadEntity>>(500, error.message, error);
        }
    }

    @Post('crashpad/:id/analysis')
    async analysisCrashpadById(@Param("id") id: number, @Res() res: ServerResponse) {
        try {
            this.clientService.analysisCrashpadById(id, res);
        } catch (error) {
            return new ResultVO<void>(500, error.message, error);
        }
    }
}
