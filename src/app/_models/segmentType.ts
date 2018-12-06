export class SegmentType {
    W2S_List_Id: number;
    List_Code: string;
    List_Desc: string
}


export class SubRangeDetails {
    PK_SubRange_Id: number = 0;
    FK_W2S_List_Id: string;
    SubRange_Name: string;
    SubRange_Description: string;
    IsActive: Boolean;
    Created_Date:  Date;
    Created_By: number;
    Modified_Date:  Date;
    Modified_By: number;
   
}