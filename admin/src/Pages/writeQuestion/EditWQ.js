import React, { useState, useEffect } from 'react'
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { editWriteQuestionById, addWriteQuestion } from '../../api'
import moment from 'moment';
//富文本编辑器
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const { Option } = Select;
const dateFormat = 'Y-MM-DD'




function EditWQ(props) {
    const datapack = props.location.state
    const initData = datapack.data[0]
    const initEditorState = BraftEditor.createEditorState(initData.modelEssay)
    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 16 },
    };
    //表单域的数据收集
    const [wqForm] = Form.useForm();
    const [writeQuestion, setWriteQuestion] = useState(initData)
    const [timeItem, setTimeItem] = useState('')
    //富文本编辑器   
    //内容转化方式    BraftEditor.createEditorState(htmlContent)  //这个只是那个富文本编辑器需要,展示不需要这个
    //               htmlContent = editorState.toHTML()
    const [editorState, setEditState] = useState(null)

    //表单动作处理
    const onFinish = async (values) => {
        values.sourceTime = timeItem ? timeItem : initData.sourceTime
        if (!values.sourceTime || !values.topic || !values.type || !values.content) {
            message.error('表单未填写完整,请检查')
            return
        }
        const wqPack = values
        // wqPack.sourceTime = wqPack.sourceTime.format('Y-MM-DD')
        wqPack.modelEssay = wqPack.modelEssay.toHTML()
        const res = await editWriteQuestionById(initData.id, wqPack)
        if (res.status === 200) {
            message.success('修改成功')
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
        //初始化操作
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
                >
                    <DatePicker onChange={(date, dateString) => {
                        //用记录更新
                        setTimeItem(dateString)
                    }} defaultValue={moment(writeQuestion.sourceTime, dateFormat)} format={dateFormat} />&nbsp;
                </Form.Item>
                <Form.Item
                    label="真题主题"
                    name="topic"
                >
                    <Select initialvalues={writeQuestion.topic} style={{ width: 240 }} onChange={handleOptionChange}>
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
                    <Select initialvalues={writeQuestion.type} style={{ width: 240 }} onChange={handleOptionChange}>
                        <Option value="A类大作文">A类大作文</Option>
                        <Option value="A类小作文">A类小作文</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="真题题目"
                    name="content"
                >
                    <Input.TextArea initialvalues={writeQuestion.content} autoSize={{ minRows: 4, maxRows: 6 }} />
                </Form.Item>
                <Form.Item
                    label="真题范文"
                    name="modelEssay"
                >
                   <BraftEditor
                        style={{border:'2px solid #e1e1e1'}}
                        defaultValue={initEditorState}
                        value={editorState}
                        onChange={handleEditorChange}
                        onSave={() => {
                            message.success('ctrl + s, 成功保存')
                        }}
                    />
                    {/* <Input.TextArea initialvalues={writeQuestion.modelEssay} autoSize={{ minRows: 10, maxRows: 20 }} /> */}
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