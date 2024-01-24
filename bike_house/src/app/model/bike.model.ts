import { bikeType } from "./type.model";
export class BikeListing {
    public bikeName!: string;
    public description!: string;
    public price!: number;
    public contactInfo!: string;
    public condition!: string;
    public features: string[];
    public bikeType!: bikeType;
    public frameSize!: number;
    public year!: number;
    public location!: string;
    public image!: string;
    public owner?: string;

    constructor() {
        this.features = [];
    }
}
