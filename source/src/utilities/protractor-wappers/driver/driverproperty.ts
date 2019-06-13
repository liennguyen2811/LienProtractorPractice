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
    
    public async getCapabilities(): Promise<string> {
		return await this.capabilities;
    }
    public async setCapabilities(capabilities: string): Promise<void> {
		this.capabilities = capabilities;
    }
    public async getDriverExecutable(): Promise<string> {
		return await this.driverExecutable;
    }
    public async setDriverExecutable(driverExecutable: string): Promise<void> {
		this.driverExecutable = driverExecutable;
    }
    public async getRunningMode(): Promise<RunningMode>{
		return await this.runningMode;
    }
    public async setRunningMode(runningMode: RunningMode): Promise<void> {
		this.runningMode = runningMode;
    }
    public async isRemoteMode(): Promise<boolean> {
		if (this.getRunningMode() != null && await this.getRunningMode()== RunningMode.Remote) {
			this._isRemoteMode = true;
		}
		return this._isRemoteMode;
    }
    public async getRemoteUrl(): Promise<string> {
		return await this.remoteUrl;
    }
    public async setRemoteUrl(remoteUrl: string): Promise<void> {
		this.remoteUrl = remoteUrl;
    }
    public async  getDriverType(): Promise<DriverType> {
		return await this.driverType;
    }
    
	public async setDriverType(driverType: DriverType): Promise<void> {
		this.driverType = driverType;
    }
    public async getArguments(): Promise<string> {
		return await this.arguments;
    }
    public async setArguments(arg: string):Promise<void> {
		this.arguments = arg;
    }
    public async getProvider(): Promise<string> {
		return this.provider;
    }
    public async  setProvider(provider: string) {
		this.provider = provider;
	}
}