import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';
import { addVideo } from '../../api'

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



function EditWQ(props) {
    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 16 },
    };
    //表单域的数据收集
    const [videoForm] = Form.useForm();
    const [video, setVideo] = useState({})
    const [videoImg, setVideoImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [imgName, setImgName] = useState('')
    const [videoName, setVideoName] = useState('')

    //表单动作处理
    const onFinish = async (values) => {
        if(!imgName || !videoName) {
            message.error('数据填写不完整')
            return
        }
        const video = {
            ...values,
            file: videoName,
            showImg: imgName,
            addTime: new Date().getTime().toString().slice(0,10)
        }
        const result = await addVideo(video)
        if(result.code === 200) {
            props.history.replace('/index/video')
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        console.log('数据重置')
        videoForm.setFieldsValue(video);
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
        action:"http://127.0.0.1:7001/admin/uploadVideo",
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

    //处理数据同步问题
    useEffect(() => {
        videoForm.setFieldsValue(video);
    }, [video])
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
                    <Input />
                </Form.Item>
                <Form.Item
                    label="视频类型"
                name="type"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="视频时长"
                name="timeLength"
                >
                    <Input suffix="秒"/> 
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

export default EditWQ