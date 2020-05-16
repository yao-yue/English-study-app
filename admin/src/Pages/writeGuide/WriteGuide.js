import React, { useState, useEffect } from 'react'

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getWriteGuideList, editWriteGuideById, addWriteGuide } from '../../api'
//富文本编辑器
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
const { Option } = Select;


function WriteGuide(props) {
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    //表单域的数据收集
    const [wgForm] = Form.useForm();
    const [initData, setInitData] = useState({})
    const [drawerVisable, setDrawerViseable] = useState(false)
    const [currentDrawer, setCurrentDrawer] = useState('')
    const [basicKnowledge, setBasicKnowledge] = useState([])
    const [reviewMethod, setReviewMethod] = useState([])
    const [solveSkill, setSolveSkill] = useState([])
    const [actualCombatSkill, setActualCombatSkill] = useState([])
    const frame = {
        basicKnowledge: ['写作考试介绍', '写作评分标准', '写作考试难度分析', '写作误区与答疑', '写作题库规律'],
        reviewMethod: ["范文学习法", "题库母体训练法", "视角写作法", "模板写作法"],
        solveSkill: ["大作文Opinion题型技巧", "大作文Report题型技巧", "大作文审题技巧", "大作文导入段的非模板写法", "大作文立论方法", "大作文主体段写法", "大作文结尾段多种写法", "A类小作文技巧", "G类小作文技巧"],
        actualCombatSkill: ["考场第一环一一审题", "考场也可用模板", "大小作文谁先写", "大作文时间分配表", "小作文信息审核表", "写作烂句大盘点"]
    }
    const [currentFrame, setCurrentFrame] = useState(frame.basicKnowledge)
    const [formInitData, setFormInitData] = useState({})
    //富文本编辑器   
    //内容转化方式    BraftEditor.createEditorState(htmlContent)
    //               htmlContent = editorState.toHTML()
    const [editorState, setEditState] = useState(null)


    //表单动作处理
    const onFinish = async (values) => {
        let list = []
        for (let item of Object.values(values)) {
            if (!item) {
                message.error('表单填写不完整，请检查后提交')
                list = []
                return
            }
            item = item.toHTML()
            list.push(item)
        }
        setDrawerViseable(false)
        if (currentDrawer === '考试入门知识') {
            setBasicKnowledge(list)

        } else if (currentDrawer === '基本复习方法') {
            setReviewMethod(list)
        }
        else if (currentDrawer === '题型解题技巧') {
            setSolveSkill(list)
        }
        else if (currentDrawer === '考场实战技巧') {
            setActualCombatSkill(list)
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        console.log('数据重置')
        wgForm.setFieldsValue({});
    }
    const formClean = () => {
        wgForm.resetFields();
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log('数据清理了')
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    }
    //提交到数据库
    const submitData = async () => {
        if (basicKnowledge.length === 0) {
            message.error('考试入门知识未完善')
            return
        }
        if (reviewMethod.length === 0) {
            message.error('基本复习方法未完善')
            return
        }
        if (solveSkill.length === 0) {
            message.error('题型解题技巧未完善')
            return
        }
        if (actualCombatSkill.length === 0) {
            message.error('考场实战技巧未完善')
            return
        }
        const wgData = {
            basicKnowledge,
            reviewMethod,
            solveSkill,
            actualCombatSkill
        }
        let temp = []
        for (let key in wgData) {
            for (let inkey in wgData[key]) {
                if (typeof (wgData[key][inkey]) !== 'string') {
                    wgData[key][inkey] = wgData[key][inkey].toHTML()
                }
                if (wgData[key][inkey].length > 20000) {
                    const str = wgData[key][inkey].replace(/\,/,'escapeComma')
                    //原地操作会有问题， 用一个变量保存一下再赋值比较好
                    wgData[key][inkey] = str
                }
                temp.push(wgData[key][inkey])
            }
            wgData[key] = temp
            temp = []
        }
        const res = await editWriteGuideById(initData.id, wgData)
        if (res.status === 200) {
            message.success('更新成功')
        }
    }

    //处理数据同步问题
    useEffect(() => {
        wgForm.setFieldsValue(formInitData);
    }, [formInitData])


    const getInitData = async () => {
        const res = await getWriteGuideList()
        const initData = res.writeGuideList ? res.writeGuideList[0] : []
        let tempObj = {}
        for (let key in initData) {
            if (initData[key].length) {
                initData[key].forEach((ele, index) => {
                    // replace(/base64,/,'escapeComma9958')
                    let escape = ele.replace(/\'/g, '')
                    if(escape.length > 20000) {
                        const estemp = escape.replace(/escapeComma/, ',')
                        escape = estemp
                    }
                    tempObj[index] = BraftEditor.createEditorState(escape)
                })
                initData[key] = tempObj
                tempObj = {}
            }
        }

        setInitData(initData)
        setBasicKnowledge(initData.basicKnowledge)
        setReviewMethod(initData.reviewMethod)
        setSolveSkill(initData.solveSkill)
        setActualCombatSkill(initData.actualCombatSkill)
    }

    //富文本编辑器
    const handleEditorChange = async (value) => {
        // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        // console.log(value.toHTML())
        // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    }

    useEffect(() => {
        //初始化操作
        getInitData()
    }, [])

    return (
        <div>
            <Row gutter={[16, 24]}>
                <Col span={14}>
                    <Button type="primary" onClick={() => {
                        setDrawerViseable(true)
                        setCurrentDrawer('考试入门知识')
                        // formClean()
                        setFormInitData(initData.basicKnowledge)
                    }}>
                        <PlusOutlined /> 考试入门知识</Button>
                </Col>
                <Col span={14}>
                    <Button type="primary" onClick={() => {
                        setDrawerViseable(true)
                        setCurrentDrawer('基本复习方法')
                        setCurrentFrame(frame.reviewMethod)
                        // formClean()
                        setFormInitData(initData.reviewMethod)
                    }}>
                        <PlusOutlined /> 基本复习方法</Button>
                </Col>
                <Col span={14}>
                    <Button type="primary" onClick={() => {
                        setDrawerViseable(true)
                        setCurrentDrawer('题型解题技巧')
                        setCurrentFrame(frame.solveSkill)
                        // formClean()
                        setFormInitData(initData.solveSkill)
                    }}>
                        <PlusOutlined /> 题型解题技巧</Button>
                </Col>
                <Col span={14}>
                    <Button type="primary" onClick={() => {
                        setDrawerViseable(true)
                        setCurrentDrawer('考场实战技巧')
                        setCurrentFrame(frame.actualCombatSkill)
                        // formClean()
                        setFormInitData(initData.actualCombatSkill)
                    }}>
                        <PlusOutlined /> 考场实战技巧</Button>
                </Col>
                <Col span={14}>
                    <Button onClick={() => {
                        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                        console.log('提交到数据库')
                        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                        submitData()
                    }}>提交</Button>
                </Col>
            </Row>
            <Drawer
                title={currentDrawer}
                width={800}
                onClose={() => setDrawerViseable(false)}
                visible={drawerVisable}
                bodyStyle={{ paddingBottom: 80 }}
                footer={null}
            >
                <Form
                    {...layout}
                    layout="vertical"
                    hideRequiredMark
                    name="wgForm"
                    form={wgForm}
                    initialValues={formInitData}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={[24, 24]}>
                        {currentFrame.map((item, index) => {
                            return (
                                <Col span={24} key={index}>
                                    <Form.Item
                                        label={item}
                                        name={index}
                                    >
                                        <BraftEditor
                                            style={{ border: '1px solid #e1e1e1', width: '700px' }}
                                            value={editorState}
                                            // defaultValue={formInitData[`${index}`]}
                                            onChange={handleEditorChange}
                                            onSave={() => {
                                                message.success('ctrl + s, 成功保存')
                                            }}
                                        />
                                        {/* <Input.TextArea rows={4} initialvalues={formInitData[`${index}`]} /> */}
                                    </Form.Item>
                                </Col>
                            )
                        })}
                    </Row>
                    <Form.Item wrapperCol={{ offset: 0, span: 16 }} >
                        <Button type="primary" htmlType="submit">
                            Submit
                </Button>
                        <Button htmlType="button" onClick={onReset} style={{ marginLeft: '20px' }}>
                            Reset
                </Button>
                    </Form.Item>
                </Form>
            </Drawer>

        </div>
    )
}

export default WriteGuide

