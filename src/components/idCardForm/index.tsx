import React, {useCallback, useEffect, useState} from 'react'
import {Button, Card, Dialog, Divider, Form, ImageUploader, Input, Space, Toast} from 'antd-mobile'
import {sleep} from "antd-mobile/es/utils/sleep";
import {PictureOutline} from "antd-mobile-icons";
import {ImageUploadItem} from "antd-mobile/es/components/image-uploader";

import {certificateFamilyDocument, registerCustomerAndFamily, uploadIdCardFile} from "../../apis";
import {DemoBlock} from "../demoBlock";
import {
    CustomerAndFamilyInfoRequest,
    FamilyDocumentInfo,
    FamilyInfoRequest,
    IdCardResponse
} from "../../apis/dto/IdCard";


export const IdCardForm = ()  => {
    const [form] = Form.useForm();
    const [fileList, setFileList]
        = useState<ImageUploadItem[]>([]);
    const [idCardData, setIdCardData] = useState<IdCardResponse>(
        {
            customerName: "",
            customerPersonalNum: "",
            customerAddress: "",
        }
    );
    const [familiesInfo, setFamiliesInfo] = useState<FamilyDocumentInfo[]>([]);

    function submitImage() {
        if (fileList.length <= 0) {
            Dialog.alert({
                content: "이미지를 선택해주세요.",
                confirmText: "확인"
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", fileList[0].extra);

        uploadIdCardFile(formData).then((response) => {
                if (response?.status === 200) {
                    setIdCardData(response.data);
                    form.setFieldsValue(response.data);
                }
            }
        )

        Toast.show({
            content: '처리중..',
            icon: 'loading',
        })
    }

    const getFamiliesInfoList = useCallback(
        () => {
            const formValues = form.getFieldsValue();
            const request = {
                customerName: formValues.customerName,
                customerPersonalNum: formValues.customerPersonalNum,
                customerPhoneNum: formValues.customerPhoneNum,
                fatherName: formValues.fatherName
            }

            certificateFamilyDocument(request).then((response) => {
                if (response?.status === 200) {
                    console.log("response.data.familyInfo", response.data.familyInfo);
                    setFamiliesInfo([...response.data.familyInfo]);
                    // TODO form 정보를 수정할 수 없는 Card 형식의 정보로 만들기
                } else {
                    console.log("가족관계증명서 인증 실패;");
                    console.log("response : \n", response);
                }
            })

            Toast.show({
                content: '처리중..',
                icon: 'loading',
                duration: 15000
            })
        }, []
    );


    const submitCustomerAndFamily = useCallback(
        () => {
            const formValues = form.getFieldsValue();
            const request: CustomerAndFamilyInfoRequest = {
                customerInfo: {
                    customerName: formValues.customerName,
                    customerPersonalNum: formValues.customerPersonalNum,
                    customerAddress: formValues.customerAddress,
                    customerPhoneNum: formValues.customerPhoneNum
                },
                familyInfoList: convertFamiliesInfo()
            };

            registerCustomerAndFamily(request).then((response) => {
                    if (response?.status === 200) {
                        console.log("본인 및 가족 고객 등록 완료");
                    }
                }
            )

            Toast.show({
                content: '등록되었습니다.',
                duration: 5000,
                icon: 'success',
            })

            // file, form 초기화
            setFileList([]);
            setFamiliesInfo([]);
            form.resetFields();
        }, [familiesInfo]
    );

    const convertFamiliesInfo = (): FamilyInfoRequest[] => {
        console.log("convertFamiliesInfo", familiesInfo);
        return familiesInfo.map((familyInfo) => ({
            familyName: familyInfo.name,
            familyPersonalNum: familyInfo.personalNum,
            div: familyInfo.div,
            sex: familyInfo.sex
        }));
    };

    async function handleFileUpload(file: File) {
        await sleep(3000);
        return {
            // 실제 서버에는 존재하지 않고, 해당 브라우저에서만 사용 가능한 URL
            url: URL.createObjectURL(file),
            extra: file
        }
    }

    function handleOnDelete() {
        return Dialog.confirm({
            content: '삭제하시겠습니까?',
            cancelText: '취소',
            confirmText: '삭제',
        })
    }

    const validateMessages = {
        required: "필수입력요소입니다."
    }

    return (
        <DemoBlock title='' padding='0'>
            {/*  TODO 이미지 처리가 "上传中..."로 뜨는 이슈  */}
            <ImageUploader
                value={fileList}
                maxCount={1}
                upload={handleFileUpload}
                onChange={setFileList}
                onDelete={handleOnDelete}
            >
                <div
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: 20,
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#999999',
                    }}
                >
                    <PictureOutline style={{ fontSize: 32 }} />
                </div>
            </ImageUploader>
            <Space wrap align='center'>
                <Button
                    block
                    type='submit'
                    color='warning'
                    size='mini'
                    onClick={submitImage}
                >
                    신분증 사진 업로드
                </Button>
            </Space>
            <Form
                name={'idCard'}
                layout='horizontal'
                mode='card'
                form={form}
                validateMessages={validateMessages}
                onFinish={getFamiliesInfoList}
                footer={
                    <Button
                        block
                        type='submit'
                        color='warning'
                        size='middle'
                    >가족관계 불러오기
                    </Button>
                }
            >
                <Form.Header>고객정보 (본인)</Form.Header>
                <Form.Item
                    label='이름'
                    name='customerName'
                    rules={[
                        { required: true },
                        { type: 'string' },
                    ]}
                >
                    <Input placeholder="이름"/>
                </Form.Item>
                <Form.Item
                    label='주소'
                    name='customerAddress'
                    rules={[
                        { required: true },
                        { type: 'string' },
                    ]}
                >
                    <Input placeholder="주소"/>
                </Form.Item>
                <Form.Item
                    label='주민등록번호'
                    name='customerPersonalNum'
                    rules={[
                        { required: true },
                        { type: 'string' },
                        {
                            pattern: /^\d{6}-\d{7}$/,
                            message: "주민등록번호 형식이 올바르지 않습니다."  // https://e2e2e2.tistory.com/21
                        }
                    ]}
                >
                    <Input placeholder='000000-0000000'/>
                </Form.Item>
                <Form.Item
                    label='전화번호'
                    name='customerPhoneNum'
                    rules={[
                        { required: true },
                        { type: 'string' },
                        {
                            pattern: /^\d{2,3}-\d{4}-\d{4}$/,
                            message: "전화번호 형식이 올바르지 않습니다."
                        }
                    ]}
                >
                    <Input placeholder='000-0000-0000'/>
                </Form.Item>
                <Form.Item
                    label='부(父) 성함'
                    name='fatherName'
                    rules={[
                        { required: true },
                        { type: 'string' },
                    ]}
                >
                    <Input placeholder='이름' />
                </Form.Item>
            </Form>
            <Divider>가족관계</Divider>
            <DemoBlock title='' background='orange'>
                {familiesInfo.map((familyInfo, index) => (
                    <DemoBlock key={index} title='' background='orange'>
                        <Card
                            headerStyle={{
                                color: 'black',
                            }}
                            bodyClassName={"customBody"}
                            title={familyInfo.name}
                        >
                            관계: {familyInfo.div}
                            <br />
                            성별: {familyInfo.sex}
                            <br />
                            주민등록번호: {familyInfo.personalNum}
                        </Card>
                    </DemoBlock>
                ))}
            </DemoBlock>
            <Divider />
            <Button
                block
                type='submit'
                color='warning'
                size='middle'
                // TODO
                onClick={submitCustomerAndFamily}
            >고객정보 등록
            </Button>
        </DemoBlock>
    )
}

export default IdCardForm;