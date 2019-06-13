import { IClickable } from "../control-base/i-clickable";

export interface IFrame{

    switchToFrameById(id: string): Promise<void>;
    switchToFrame(index: number): Promise<void>;

}