import { DriverType } from "./drivertype";
import { RunningMode } from "./RunningMode";
import { V1Options } from "uuid/interfaces";

export default class DriverProperty {
    private remoteUrl: string ="";
	private _isRemoteMode: boolean= false;
	private driverType: DriverType = DriverType.Chrome;
	private driverExecutable: string ="";
	private runningMode: RunningMode = RunningMode.Local;
	private capabilities: string = "";
	private arguments: string ="";
  private provider: string = "";
    
    public agetCapabilities(): string {
		return  this.capabilities;
    }
    public setCapabilities(capabilities: string): void {
		this.capabilities = capabilities;
    }
    public getDriverExecutable(): string{
		return this.driverExecutable;
    }
    public setDriverExecutable(driverExecutable: string): void{
		this.driverExecutable = driverExecutable;
    }
    public getRunningMode(): RunningMode{
		return this.runningMode;
    }
    public setRunningMode(runningMode: RunningMode): void {
		this.runningMode = runningMode;
    }
    public isRemoteMode(): boolean {
		if (this.getRunningMode() != null && this.getRunningMode()== RunningMode.Remote) {
			this._isRemoteMode = true;
		}
		return this._isRemoteMode;
    }
    public getRemoteUrl(): string{
		return this.remoteUrl;
    }
    public  setRemoteUrl(remoteUrl: string): void {
		this.remoteUrl = remoteUrl;
    }
    public getDriverType(): DriverType{
		return this.driverType;
    }
    
	public setDriverType(driverType: DriverType): void {
		this.driverType = driverType;
    }
    public getArguments(): string {
		return this.arguments;
    }
    public setArguments(arg: string):void {
		this.arguments = arg;
    }
    public getProvider(): string {
		return this.provider;
    }
    public setProvider(provider: string) {
		this.provider = provider;
	}
}