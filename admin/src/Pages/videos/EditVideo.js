import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, Upload, Select } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { editVideoById } from '../../api'

const { Option } = Select;
//图片处理函数
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}



function EditVideo(props) {
    const datapack = props.location.state
    const initData = datapack.data[0]
    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 16 },
    };
    //表单域的数据收集
    const [videoForm] = Form.useForm();
    const [video, setVideo] = useState(initData)
    const [videoImg, setVideoImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [imgName, setImgName] = useState('')
    const [videoName, setVideoName] = useState('')


    //表单动作处理
    const onFinish = async (values) => {
        const video = {
            ...values,
            file: videoName ? videoName : initData.file,
            showImg: imgName ? imgName : initData.showImg,
            addTime: new Date().getTime().toString().slice(0, 10)
        }
        //对url进行转义，获取文件名
        video.file = video.file.match(/[^\/]+$/)[0].split('?')[0]
        video.showImg = video.showImg.match(/[^\/]+$/)[0].split('?')[0]
        const result = await editVideoById(initData.id, video)
        if (result.status === 200) {
            props.history.replace('/index/video')
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        console.log('数据重置')
        videoForm.setFieldsValue({});
    }

    //上传图片相关
    const handleChange = (info) => {

        //获取文件名以便存储 
        const imgName = info.file.response ? info.file.response.data.filename : ''
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setLoading(false)
                setVideoImg(imageUrl)
                setImgName(imgName)
            }
            );
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    //上传视频相关
    const uploadVideoProps = {
        name: 'file',
        action: "http://127.0.0.1:7001/admin/uploadVideo",
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                //获取文件名以便存储 
                const videoName = info.file.response ? info.file.response.data.filename : ''
                setVideoName(videoName)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    //select框
    const handleOptionChange = (value) => {
        console.log(`selected ${value}`);
    }

    //处理数据同步问题
    useEffect(() => {
        videoForm.setFieldsValue(video);
    }, [video])

    //初始化
    useEffect(() => {
        videoForm.setFieldsValue(video)
        setVideoImg(video.showImg)
    }, [])
    return (
        <div>
            <Form
                {...layout}
                name="videoForm"
                form={videoForm}
                initialValues={video}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="视频标题"
                    name="title"
                >
                    <Input initialvalues={video.title} />
                </Form.Item>
                <Form.Item
                    label="视频类型"
                    name="type"
                >
                    <Select placeholder={video.type} style={{ width: 240 }} onChange={handleOptionChange}>
                        <Option value="公开课">公开课</Option>
                        <Option value="训练营">训练营</Option>
                        <Option value="录播课">录播课</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="视频老师"
                    name="teacher"
                >
                    <Input initialvalues={video.teacher} />
                </Form.Item>
                <Form.Item
                    label="视频标签"
                    name="tag"
                >
                    <Input initialvalues={video.tag} />
                </Form.Item>
                <Form.Item
                    label="视频时长"
                    name="timeLength"
                >
                    <Input initialvalues={video.timeLength} suffix="秒" />
                </Form.Item>
                <Form.Item
                    label="视频首图"
                >
                    <Upload
                        // name="videoImg"
                        listType="picture-card"
                        className="videoImg-uploader"
                        showUploadList={false}
                        action="http://127.0.0.1:7001/admin/uploadVideoImg"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {videoImg ? <img src={videoImg} alt="videoImg" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="视频资源"
                >
                    <Upload {...uploadVideoProps}>
                        <Button><UploadOutlined /> 上传视频</Button>
                    </Upload>,
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                    <Button type="primary" htmlType="submit">
                        Submit
                </Button>
                    <Button htmlType="button" onClick={onReset} style={{ marginLeft: '20px' }}>
                        Reset
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditVideo