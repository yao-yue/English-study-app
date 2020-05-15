import React, { useState, useEffect } from 'react'
import { Upload, Modal, message, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getCarousel, deleteCarouselByName } from '../../api'
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
    //自我逻辑
    const [carouselList, setCarouselList] = useState([])
    //逻辑state
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const fileListInit = [
        // {
        //     uid: '-4',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-5',
        //     name: 'image.png',
        //     status: 'error',
        // },
    ]
    const [fileList, setFileList] = useState([])
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList)
        if (fileList.length < carouselList.length) {
            //找到删除了的图片进行删除
            // const filename = carouselList.pop().name
            carouselList.forEach(item => {
                if(fileList.indexOf(item) < 0) {
                    deleteCarousel(item.name)
                }
            })
            
        } else if (fileList.length > carouselList.length || fileList.length === 0) {
            getCarouselList()
        }

    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const getCarouselList = async () => {
        const result = await getCarousel()
        const list = result.data.list ? result.data.list : []
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                list[i] = {
                    url: list[i],
                    key: i + 1,
                    uid: -(i + 1),
                    name: list[i].match(/[^\/]+$/)[0].split('?')[0],
                    status: 'done'
                }
            }
            setCarouselList(list)
            setFileList(list)
        } else if (list.length === 0) {
            setCarouselList([])
            setFileList([])
        }
    }
    const deleteCarousel = async (filename) => {
        const res = await deleteCarouselByName(filename)
        //删除之后要重新拉取下数据
        getCarouselList()
    }

    useEffect(() => {
        getCarouselList()
    }, [])
    useEffect(() => {
        //监听fileList， 以免有的时候异步的时候出问题
        getCarouselList()
    }, [fileList])
    const columns = [
        {
            title: '轮播图展示',
            dataIndex: 'url',
            key: 'url',
            render: (url) => (
                <div>
                    <img src={url} alt="首页轮播图" style={{ width: "200px", height: "100%" }} />
                </div>
            ),
        },
        {
            title: '操作',
            dataIndex: 'name',
            key: 'action',
            render: (name) => (
                <div>
                    <Button onClick={() => deleteCarousel(name)}>删除</Button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <Table dataSource={carouselList} columns={columns} />

            <h2>上传图片</h2>
            <Upload
                action="http://127.0.0.1:7001/admin/addCarousel"
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