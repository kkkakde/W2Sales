export class ProductDetails {
    Product_Id:number;
    Product_Name: string;
    Product_Desc: string;
    IsActive: Boolean;
    Created_Date: Date;
    Created_By: number;
    Modified_Date: Date;
    Modified_By: number;
}

export class SalesPhaseStructure {
    label: string;
    Negotiation_count: number;
    Proposal_count: number;
    Qualification_count: number;
}