import React, { useState } from 'react'
import { Upload, Modal, message, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

//图片操作
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
function Carousel() {
    //逻辑state
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const fileListInit = [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-5',
        name: 'image.png',
        status: 'error',
    },]
    const [fileList, setFileList] = useState(fileListInit)
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const handleChange = ({ fileList }) => setFileList(fileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );


    const list = [
        {
            img: 'http://ww1.sinaimg.cn/large/006x4mSygy1gef2m6sqi8j30dw0dpgm4.jpg',
            key: 1,
        },
        {
            img: 'http://ww1.sinaimg.cn/large/006x4mSygy1gef2tba4uoj30dw08q3yw.jpg',
            key: 2
        },
        {
            img: 'http://ww1.sinaimg.cn/large/006x4mSygy1gef2tba4uoj30dw08q3yw.jpg',
            key: 3
        }
    ]
    const columns = [
        {
            title: '轮播图展示',
            dataIndex: 'img',
            key: 'img',
            render: (img) => (
                <div>
                    <img src={img} alt="首页轮播图" style={{ width: "200px", height: "100%" }} />
                </div>
            ),
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <div>
                    <Button onClick={() => console.log('delete')}>删除</Button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <Table dataSource={list} columns={columns} />

            <h2>上传图片</h2>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default Carousel