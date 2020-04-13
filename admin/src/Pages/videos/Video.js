import React, { useState, useEffect } from 'react';
import '../../static/css/ArticleList.css'
import { Modal, message, Button, Table, Input, Row, Col } from 'antd';
// import { getArticleList,delArticleById } from '../api'
const { confirm } = Modal;


function Video(props) {

  const [list, setList] = useState([])

  //得到文章列表
  const getList = async () => {
    // const res = await getArticleList()
    // 公开课、专项课、系统提分课
    const res = {
      list: [
        {
          id: 1,
          file: '视频文件',
          type: '公开课',
          timeLength: '9分钟',
          title: '填空题做题技巧-时间对比',
          showImg: 'http://ww1.sinaimg.cn/large/006x4mSygy1gdpggssetrj306e04s0sw.jpg',
          addTime: '2020-4-8'
        },
        {
          id: 2,
          file: '视频文件',
          type: '专项课',
          timeLength: '6分钟',
          title: '雅思口语P1--当季新题高分预料分享',
          showImg: 'http://ww1.sinaimg.cn/large/006x4mSygy1gdpgh1dauej306e04s3yk.jpg',
          addTime: '2020-4-5'
        },
        {
          id: 3,
          file: '视频文件',
          type: '专项课',
          timeLength: '11分钟',
          title: '雅思听力精准定位--带你进入高分快车道',
          showImg: 'http://ww1.sinaimg.cn/large/006x4mSygy1gdpglw95e5j30hs0b8t92.jpg',
          addTime: '2020-4-5'
        },
        {
          id: 4,
          file: '视频文件',
          type: '公开课',
          timeLength: '10分钟',
          title: '雅思阅读段落信息配对--考点分析预判答案',
          showImg: 'http://ww1.sinaimg.cn/large/006x4mSygy1gdpgnntrvbj30hs0b80t7.jpg',
          addTime: '2020-4-5'
        }
      ]
    }
    if (res.list) {
      for (let item of res.list) {
        item.key = item.id
      }
      setList(res.list)
    } else {
      message.error('网络错误')
    }
  }
  useEffect(() => {
    getList()
  }, [])

  //删除文章的方法

  const columns = [
    {
      title: '视频首图',
      dataIndex: 'showImg',
      key: 'showImg',
      render: (showImg) => (
        <div>
          <img style={{ width: "60px", height: "100%" }} src={showImg} />
        </div>
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '添加时间',
      dataIndex: 'addTime',
      key: 'addTime',
    },
    {
      title: '视频长度',
      dataIndex: 'timeLength',
      key: 'timeLength',

    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      render: (id) => (
        <div>
          <Button type="primary" onClick={() => { }}>编辑</Button>&nbsp;
          <Button onClick={() => { }}>删除</Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Row style={{marginBottom:'10px'}}>
        <Col span={5} >
          <Input /> 
        </Col>
        <Col span={3} >
           <Button style={{marginLeft:'10px'}} type="primary">搜索</Button>
        </Col>
        <Col span={3} push={13}>
          <Button type="primary">添加课程</Button>
        </Col>
      </Row>
      <Table dataSource={list} columns={columns} />
    </div>
  )
}


export default Video