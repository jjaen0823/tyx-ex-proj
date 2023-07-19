export interface IdCardResponse {
    customerName: string;
    customerPersonalNum: string;
    customerAddress: string;
}
export interface CustomerInfoRequest {
    customerName: string;
    customerPersonalNum: string;
    customerAddress: string;
    customerPhoneNum: string;
}

export interface FamilyInfoRequest {
    familyName: string;
    familyPersonalNum: string;
    div: string;
    sex: string;
}

export interface CustomerAndFamilyInfoRequest {
    customerInfo: CustomerInfoRequest;
    familyInfoList: FamilyInfoRequest[];
}

export interface FamilyDocumentInfoRequest {
    customerName: string;
    customerPersonalNum: string;
    customerPhoneNum: string;
    fatherName: string;
}

export interface FamilyDocumentInfoResponse {
    familyInfo: FamilyDocumentInfo[];
}

export interface FamilyDocumentInfo {
    div: string;
    name: string;
    sex: string;
    personalNum: string;
}