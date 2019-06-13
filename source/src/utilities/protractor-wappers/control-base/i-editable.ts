export interface IEditable {
    type(value: any, timeoutInSecond: number): Promise<this>;
    clear(timeoutInSecond: number): Promise<this>;
}