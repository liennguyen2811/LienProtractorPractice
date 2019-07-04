import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class ConfigInfo{
    @JsonProperty("browser", String)
    browser: string = "";
    @JsonProperty("elementTimeout",Number)
    elementTimeout: number = 0;
    @JsonProperty("pageTimeout", Number)
    pageTimeout: number = 0;
    @JsonProperty("testTimeout", Number)
    testTimeout: number = 0;
}