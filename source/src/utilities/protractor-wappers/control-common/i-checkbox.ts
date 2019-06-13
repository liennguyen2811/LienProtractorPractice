import { IEditable } from "../control-base/i-editable";

export interface Icheckbox extends IEditable{
    setCheckBox(state: boolean, timeoutInSecond: number): Promise<this>;

}