import { FindOptionsWhere, Like } from "typeorm";
import { BaseQuery } from "../base/base.query";
import { CrashpadEntity } from "./crashpad.entity";

export class CrashpadQuery extends BaseQuery {
    nameLike?: string;
    type?: string;
    descriptionLike?: string;

    public toQueryWhere(): FindOptionsWhere<CrashpadQuery> {
        const queryWhere: FindOptionsWhere<CrashpadEntity> = super.toQueryWhere();

        return queryWhere;
    }
}