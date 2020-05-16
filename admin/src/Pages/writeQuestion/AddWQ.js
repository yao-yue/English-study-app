import React, { useState, useEffect } from 'react'
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { addWriteQuestion, } from '../../api'
import moment from 'moment';
//富文本编辑器
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;




function AddWQ(props) {
    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 16 },
    };
    //表单域的数据收集
    const [wqForm] = Form.useForm();
    const [writeQuestion, setWriteQuestion] = useState({})
    //富文本编辑器   
    //内容转化方式    BraftEditor.createEditorState(htmlContent)
    //               htmlContent = editorState.toHTML()
    const [editorState, setEditState] = useState(null)

    //表单动作处理
    const onFinish = async (values) => {
        if(!values.sourceTime || !values.topic || !values.type || !values.content ) {
            message.error('表单未填写完整,请检查')
            return 
        }
        const wqPack = values
        wqPack.sourceTime = wqPack.sourceTime.format('Y-MM-DD')
        wqPack.modelEssay = wqPack.modelEssay.toHTML()
        const res = await addWriteQuestion(wqPack)
        if(res.code === 200) {
            message.success('提交成功')
            props.history.replace('/index/writeQuestion')
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {

    }

    const handleOptionChange = (value) => {
        console.log(`selected ${value}`);
    }

    //富文本相关
    const handleEditorChange = (editorState) => {
        setEditState(editorState)
    }

    //处理数据同步问题
    useEffect(() => {
        wqForm.setFieldsValue(writeQuestion);
    }, [writeQuestion])

    useEffect(() => {
        //初始化
    }, [])
    return (
        <div>
            <Form
                {...layout}
                name="wqForm"
                form={wqForm}
                initialValues={writeQuestion}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="真题出自时间"
                    name="sourceTime"
                >
                    {/* <DatePicker initialvalues={moment('2015-01-01', dateFormat)} format={dateFormat} /> */}
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                    label="真题主题"
                    name="topic"
                >
                    <Select defaultValue="选择主题" style={{ width: 240 }} onChange={handleOptionChange}>
                        <Option value="社会发展/生活">社会发展/生活</Option>
                        <Option value="环境/动物保护">环境/动物保护</Option>
                        <Option value="教育">教育</Option>
                        <Option value="媒体">媒体</Option>
                        <Option value="职业工作">职业工作</Option>
                        <Option value="犯罪">犯罪</Option>
                        <Option value="政府职能">政府职能</Option>
                        <Option value="多元化/国际化">多元化/国际化</Option>
                        <Option value="科技">科技</Option>
                        <Option value="旅游">旅游</Option>
                        <Option value="文化">文化</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="真题类型"
                    name="type"
                >
                    <Select defaultValue="请选择类型" style={{ width: 240 }} onChange={handleOptionChange}>
                        <Option value="A类大作文">A类大作文</Option>
                        <Option value="A类小作文">A类小作文</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="真题题目"
                    name="content"
                >
                    <Input.TextArea autoSize={{minRows: 4, maxRows: 6}} />
                </Form.Item>
                <Form.Item
                    label="真题范文"
                    name="modelEssay"
                >
                     <BraftEditor
                        style={{border:'2px solid #e1e1e1'}}
                        value={editorState}
                        onChange={handleEditorChange}
                        onSave={() => {
                            message.success('ctrl + s, 成功保存')
                        }}
                    />
                    {/* <Input.TextArea autoSize={{minRows: 10, maxRows: 20}} /> */}
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

export default AddWQ