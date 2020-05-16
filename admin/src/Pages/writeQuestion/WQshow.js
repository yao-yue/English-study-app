
import React, { useState, useEffect, useRef } from 'react';
import { Modal, message, Button, Table, Input, Row, Col ,Select} from 'antd';
import { getWriteQuestionList, addWriteQuestion, editWriteQuestionById, searchWriteQuestionByType, deleteWriteQuestionById } from '../../api'
//富文本编辑器
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const moment = require('moment')
const { Search } = Input;
const { Option} = Select


function WQshow(props) {

  const [list, setList] = useState([])
  const [modelVisible, setModelVisible] = useState(false)
  const [currentEssay, setCurrentEssay] = useState('')
  const [searchType, setSearchType] = useState('type')

  //得到写作真题
  const getList = async () => {
    const res = await getWriteQuestionList()
    // 公开课、专项课、系统提分课
    const list = res.wqList ? res.wqList : []
    list.map(item => {
      item.streamLineEssay = item.modelEssay.slice(0, 20) + '...'
      item.key = item.id
    })
    setList(list)
  }

  //删除写作真题
  const deleteWQ = async (id) => {
    const res = await deleteWriteQuestionById(id)
    if (res.status === 200) {
      message.success('删除成功')
      getList()
    }
  }

  //通过id更新当前文章以便查看
  const fillCurrentEssay = (id) => {
    const essay = list.filter(item => {
      return item.id === id
    }).pop().modelEssay
    setCurrentEssay(essay)
  }
 
  //监听option
  const handleOptionChange = (value) => {
    setSearchType(value)
  }

  //搜索真题
  const searchWQ = async(value) => {
    if(!searchType) {
      message.error('请选择搜索类型')
      return 
    }
    const params = {
      [searchType]: value
    }
    const res = await searchWriteQuestionByType(params)
    if(res.status === 404) {
      message.error('没有此资源')
    }else if(res.status === 200) {
      const list = res.data
      list.map(item => {
        item.streamLineEssay = item.modelEssay.slice(0, 20) + '...'
        item.key = item.id
      })
      setList(list)
    }
  }


  useEffect(() => {
    getList()
  }, [])



  const columns = [
    {
      title: '真题出自时间',
      dataIndex: 'sourceTime',
      key: 'sourceTime',
    },
    {
      title: '主题',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',

    },
    {
      title: '范文',
      dataIndex: 'streamLineEssay',
      key: 'streamLineEssay',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      render: (id) => (
        <div>
          <Button type="primary" onClick={() => {
            props.history.push('/index/writeQuestion/editWQ', {
              data: list.filter(item => {
                return item.id === id
              })
            }
            )
          }}>编辑</Button>&nbsp;
          <Button onClick={() => { deleteWQ(id) }}>删除</Button>
          <Button onClick={() => {
            setModelVisible(true)
            fillCurrentEssay(id)
          }
          }>范文详情</Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Row style={{ marginBottom: '10px' }}>
        <Col span={10} >
          <Input.Group compact>
            <Select defaultValue="选择搜索类型" onChange={handleOptionChange}>
              <Option value="type">按类型搜索</Option>
              <Option value="topic">按主题搜索</Option>
              <Option value="sourceTime">按真题年份搜索</Option>
            </Select>
            <Search
            style={{ width: '50%' }}
            enterButton="Search"
            onSearch={(value) => {
              searchWQ(value)
            }
            }
          />
          </Input.Group>
        </Col>
        <Col span={3} push={11}>
          <Button type="primary" onClick={() => {
            props.history.push('/index/writeQuestion/addWQ')
          }}>添加真题</Button>
        </Col>
      </Row>
      <Table dataSource={list} columns={columns} />
      <Modal
        title="范文详情"
        visible={modelVisible}
        onCancel={() => {
          setModelVisible(false)
        }}
        footer={null}>
          <div dangerouslySetInnerHTML={{__html: currentEssay}}></div>
      </Modal>
    </div>
  )
}


export default WQshow