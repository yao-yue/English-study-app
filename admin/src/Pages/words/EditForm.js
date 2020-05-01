import React, { useEffect} from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import {editWordById, getWordList} from '../../api'
const { TextArea } = Input

function EditForm(props) {
    const word = props.word
    const id = word.id

    //表单域的数据收集
    const [wordForm] = Form.useForm();

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const onFinish = async(values) => {
        if(values.wordName !== word.wordName || 
            values.wordExplain !== word.wordExplain ||
            values.phonetic !== word.phonetic ||
            values.vioce !== word.vioce) {
            const res = await editWordById(id, values)
            if(res.status === 200) {
                message.success(res.msg)
                //假装延迟
                props.getList()
                setTimeout(() => {props.setShowModel(false)}, 300)
            }else {
                message.error('更新失败')
            }
        }else {
            message.info('数据未改动')
        }
       
        
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        console.log('数据重置')
        wordForm.setFieldsValue(word);
    }
    //添加了这个之后就不会出现数据不同步的问题了
    useEffect(() => {
        wordForm.setFieldsValue(word);
    }, [word])

    return (
        <Form
            {...layout}
            name="wordForm"
            form={wordForm}
            initialValues={word}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="单词名称"
                name="wordName"
            >
                <Input initialvalues={word.wordName} />
            </Form.Item>

            <Form.Item
                label="单词音标"
                name="phonetic"
            >
                <Input initialvalues={word.phonetic} />
            </Form.Item>
            <Form.Item
                label="音频链接"
                name="vioce"
            >
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }} initialvalues={word.vioce} />
            </Form.Item>
            <Form.Item
                label="单词释义"
                name="wordExplain"
            >
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }} initialvalues={word.wordExplain} />
            </Form.Item>
            <Form.Item wrapperCol={ {offset: 8, span: 16 }} >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset} style={{marginLeft:'20px'}}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}

export default EditForm



