import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { CrashpadDto } from "./crashpad.dto";

@Entity('t_crashpad')
export class CrashpadEntity extends BaseEntity {
    @Column({
        comment: '产品名称'
    })
    productName?: string;
    @Column({
        comment: '版本'
    })
    version?: string;
    @Column({
        comment: 'guid'
    })
    guid?: string;
    @Column({
        comment: '系统架构'
    })
    osarch?: string;
    @Column({
        comment: 'pid'
    })
    pid?: string;
    @Column({
        comment: '平台简写'
    })
    plat?: string;
    @Column({
        comment: '平台'
    })
    platform?: string;
    @Column({
        comment: '进程类型'
    })
    process_type?: string;
    @Column({
        comment: '基础产品的名称'
    })
    prod?: string;
    @Column({
        comment: 'ptype'
    })
    ptype?: string;
    @Column({
        comment: 'Electron版本'
    })
    ver?: string;
    @Column({
        comment: '崩溃诊断文件路径'
    })
    dmpsPath?: string;

    static createCrashpad(this: new () => CrashpadEntity, data: Partial<CrashpadDto>): CrashpadEntity {
        const crashpadEntity = new this();

        data.productName && (crashpadEntity.productName = data.productName.join(',')),
        data.version && (crashpadEntity.version = data.version.join(',')),
        data.guid && (crashpadEntity.guid = data.guid.join(',')),
        data.osarch && (crashpadEntity.osarch = data.osarch.join(',')),
        data.pid && (crashpadEntity.pid = data.pid.join(',')),
        data.plat && (crashpadEntity.plat = data.plat.join(',')),
        data.platform && (crashpadEntity.platform = data.platform.join(',')),
        data.process_type && (crashpadEntity.process_type = data.process_type.join(',')),
        data.prod && (crashpadEntity.prod = data.prod.join(',')),
        data.ptype && (crashpadEntity.ptype = data.ptype.join(',')),
        data.ver && (crashpadEntity.ver = data.ver.join(',')),
        data.dmpsPath && (crashpadEntity.dmpsPath = data.dmpsPath.join(','))

        return super.create<CrashpadEntity>(crashpadEntity);
    }

    static updateCrashpad(this: new () => CrashpadEntity, crashpadEntity: CrashpadEntity, data: Partial<CrashpadDto>): CrashpadEntity {
        data.productName && (crashpadEntity.productName = data.productName.join(',')),
        data.version && (crashpadEntity.version = data.version.join(',')),
        data.guid && (crashpadEntity.guid = data.guid.join(',')),
        data.osarch && (crashpadEntity.osarch = data.osarch.join(',')),
        data.pid && (crashpadEntity.pid = data.pid.join(',')),
        data.plat && (crashpadEntity.plat = data.plat.join(',')),
        data.platform && (crashpadEntity.platform = data.platform.join(',')),
        data.process_type && (crashpadEntity.process_type = data.process_type.join(',')),
        data.prod && (crashpadEntity.prod = data.prod.join(',')),
        data.ptype && (crashpadEntity.ptype = data.ptype.join(',')),
        data.ver && (crashpadEntity.ver = data.ver.join(',')),
        data.dmpsPath && (crashpadEntity.dmpsPath = data.dmpsPath.join(','))

        return super.update<CrashpadEntity>(crashpadEntity, { ...crashpadEntity, notes: data.notes });
    }
}