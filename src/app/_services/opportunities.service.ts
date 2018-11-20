import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class Opportunities {
    constructor( private http: HttpClient) { }

// Opportunity List
GetOpportunitiesList() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/GetOpportunityList`, {});
}
// Add Opportunity
getOpportunitySourceList() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/GetOpportunitySourceList`, {});
}
getOpportunityTypeList() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/GetOpportunityTypeList`, {});
}
getChanceofSuccessList() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Chance_Of_Success`, {});
}
getSalesPhaseList() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Sales_Phase`, {});
}
getStatusList() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Status`, {});
}
AddOpportunity(body) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/AddOpportunity`, body);
}
// Update Opportunity
UpdateopportunityDetails(PK_Opportunity_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Opportunity_Details?PK_Opportunity_Id=` + PK_Opportunity_Id , {});
}
// Get ContactPerson Details
Get_ContactPerson_Details(FK_Customer_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_ContactPerson_Details?FK_Customer_Id=` + FK_Customer_Id , {});
}
// Get DocumentList
Get_Document_List(FK_Opportunity_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Document_List?FK_Opportunity_Id=` + FK_Opportunity_Id , {});
}
// Opportunity Competitor Details
Get_OpportunityCompetitorDetails(FK_Opportunity_Id) {
return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_OpportunityCompetitorDetails?FK_Opportunity_Id=` + FK_Opportunity_Id , {});
}
// Visit Details
Get_OpportunityVisitDetails(FK_Opportunity_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_OpportunityVisitDetails?FK_Opportunity_Id=` + FK_Opportunity_Id , {});
}
//
Delete_Document(PK_Document_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Delete_Document?PK_Document_Id=` + PK_Document_Id , {});
}
// Add Document
Add_Document(body) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Add_Document`, body );
}
// Add Competitor
AddCompetitor(body) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/AddCompetitor`, body );
}
Get_Competitor_Type_List() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Competitor_Type_List`, {});
}
Get_Competitor_List(FKCompetitorTypeId) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Competitor_List?FK_Competitor_Type_Id=` + FKCompetitorTypeId, {});
}
Delete_Competitor(PKCompetitorId) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Delete_Competitor?PK_Competitor_Id=` + PKCompetitorId, {});
}
// Quotation
Get_Quotation_List(FK_Opportunity_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Quotation_List?FK_Opportunity_Id=` + FK_Opportunity_Id , {});
}
Add_Quotation(body) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Add_Quotation`, body);
}
Delete_Quotation(PK_Quotation_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Delete_Quotation?PK_Quotation_Id=` + PK_Quotation_Id,{});
}
// Visit
Get_Visit_Type_List() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Visit_Type_List`, {});
}
AddVisits(body) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/AddVisits`, body);
}
DeleteVisits(PK_Visit) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/DeleteVisits?PK_Visit=` + PK_Visit , {});
}
// Product
Get_Oppor_Prod(PK_Opportunity_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Oppor_Prod?PK_Opportunity_Id=` + PK_Opportunity_Id , {});
}
Get_Range_List() {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Range_List`, {});
}
Get_Sub_Range_List(FK_Range_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Sub_Range_List?FK_Range_Id=` + FK_Range_Id , {});
}
Get_Product_List(FK_Sub_Range_Id) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Get_Product_List?FK_Sub_Range_Id=` + FK_Sub_Range_Id , {});
}
Add_opporProduct(body) {
    return this.http.post(`${environment.apiUrl}Api_Opportunity/Add_opporProduct`, body);
}
}