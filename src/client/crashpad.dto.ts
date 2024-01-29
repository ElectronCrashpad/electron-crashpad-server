export class CrashpadDto {
    constructor(
        public productName?: string[],
        public version?: string[],
        public guid?: string[],
        public osarch?: string[],
        public pid?: string[],
        public plat?: string[],
        public platform?: string[],
        public process_type?: string[],
        public prod?: string[],
        public ptype?: string[],
        public ver?: string[],
        public dmpsPath?: string[],
        public notes?: string
    ) { }
}