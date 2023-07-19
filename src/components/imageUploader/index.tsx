import React, {FC, useState} from 'react'
import {ImageUploadItem} from 'antd-mobile/es/components/image-uploader'
import {Button, Dialog, ImageUploader, Space, Toast} from 'antd-mobile'
import {PictureOutline} from 'antd-mobile-icons'
import {DemoBlock} from "../demoBlock";
import {uploadIdCardFile} from "../../apis";
import {sleep} from "antd-mobile/es/utils/sleep";


const CustomUploadButton: FC = () => {
    const [fileList, setFileList]
        = useState<ImageUploadItem[]>([])
    const [idCardData, setIdCardData] = useState({
        customerName: "",
        customerPersonalNum: "",
        customerAddress: "",
    })

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
        console.log("formData: ", formData);

        uploadIdCardFile(formData).then((response) => {
                if (response.status === 200) {
                    console.log("uploadIdCardFile", response.data);
                    setIdCardData(response.data);
                }
            }
        )

        Toast.show({
            content: '처리중..',
            icon: 'loading',
        })
    }

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
                    color='primary'
                    size='mini'
                    onClick={submitImage}
                >
                    신분증 사진 업로드
                </Button>
            </Space>
        </DemoBlock>
    )
}