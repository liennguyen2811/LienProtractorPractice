export interface ISelect {
    isSelected(timeoutInSecond: number): Promise<boolean>
}