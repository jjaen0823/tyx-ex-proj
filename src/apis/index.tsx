import apiInstance from "./apiInstance";
import {API_PREFIX} from "../consts/const";
import {AxiosResponse} from "axios";
import {
    CustomerAndFamilyInfoRequest,
    CustomerInfoRequest,
    FamilyDocumentInfoRequest,
    FamilyDocumentInfoResponse,
    IdCardResponse
} from "./dto/IdCard";


export const getTest = async (): Promise<AxiosResponse<string>> => {
    return await apiInstance.get(API_PREFIX + "/documents/test");
}

export const uploadIdCardFile = async (payload: FormData): Promise<AxiosResponse<IdCardResponse>> => {
    return await apiInstance.post(API_PREFIX + "/id-cards/files", payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const registerCustomer = async (payload: CustomerInfoRequest): Promise<AxiosResponse<string>> => {
    return await apiInstance.post(API_PREFIX + "/customers", payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export const registerCustomerAndFamily = async (payload: CustomerAndFamilyInfoRequest): Promise<AxiosResponse<string>> => {
    return await apiInstance.post(API_PREFIX + "/customers/families", payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const certificateFamilyDocument = async (payload: FamilyDocumentInfoRequest): Promise<AxiosResponse<FamilyDocumentInfoResponse>> => {
    return await apiInstance.post(API_PREFIX + "/documents/families", payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


/**
 * async, await
 * : javascript 비동기 처리 패턴
 *
 * 1. async
 * - Promise 반환
 *
 * 2. await
 * - callback 함수 처리 없이 비동기 처리 가능
 *
 */