export interface IPageVO<T> {
    page: number;
    size: number;
    total: number;
    success: boolean;
    data: T[];
}