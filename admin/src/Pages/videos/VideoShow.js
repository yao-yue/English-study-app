
import React, { useState, useEffect,useRef } from 'react';
import { Modal, message, Button, Table, Input, Row, Col } from 'antd';
import { getVideoList , deleteVideoById, ossDelete, searchVideoByType} from '../../api'
const moment = require('moment')
const { Search} = Input;



function VideoShow(props) {

  const [list, setList] = useState([])
  const [modelVisible, setModelVisible] = useState(false)
  const [currentPlay, setCurrentPlay] = useState('')
  //视频控件
  const videoEl = useRef(null);

  //得到文章列表
  const getList = async () => {
    const res = await getVideoList()
    // 公开课、专项课、系统提分课
    const videoList = res.videoList ? res.videoList : []
    if (videoList.length > 0) {
      for (let item of videoList) {
        item.key = item.id
        item.addTime = moment.unix(item.addTime).format("LLL")
      }
      setList(videoList)
    } else {
      message.error('网络错误')
    }
  }
  const lookVideo =(id) => {
    let targetUrl 
    list.forEach(item => {
        if(item.id === id ) {
            targetUrl = item.file
        }
    })
    setCurrentPlay(targetUrl)
    setModelVisible(true)
  }
  //删除视频
  const deleteVideo = async(id) => {
    const res = await deleteVideoById(id)
    const tartget = list.filter(item => item.id === id)
    const videoName = tartget[0].file.match(/[^\/]+$/)[0].split('?')[0]
    const imgName = tartget[0].showImg.match(/[^\/]+$/)[0].split('?')[0]
    const res1 = await ossDelete({type: 'video',filename: videoName})
    const res2 = await ossDelete({type: 'videoImg',filename: imgName})
    //除了删除数据库还要删除oss中的数据
    if(res.status === 200) {
      message.success('删除成功')
      //重新拉取数据
      getList()
    }
  }
  //搜索
  const searchVideo = async(type) => {
    const res = await searchVideoByType(type)
    if(res.status !== 200) {
      message.error(res.msg)
      return 
    }
    if(res.status === 200) {
      const videoList = res.videoList
      videoList.map((item,index) => {
        item.key = index+1
      })
      setList(res.videoList)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  

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
          <Button type="primary" onClick={() => {
            props.history.push('/index/video/editVideo', {data: list.filter(item => {
              return item.id === id
          })}
          )
          }}>编辑</Button>&nbsp;
          <Button onClick={() => { deleteVideo(id)}}>删除</Button>
          <Button onClick={() => { lookVideo(id)}}>查看</Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Row style={{marginBottom:'10px'}}>
        <Col span={1}><span style={{color:"blue",display:'inline-block', fontSize:'14px', marginTop:'-4px'}}>类别搜索</span></Col>
        <Col span={6} >
        <Search
            enterButton="Search"
            onSearch={value => searchVideo(value)}
          />
        </Col>
        <Col span={3} push={14}>
          <Button type="primary" onClick={() => {
              props.history.push('/index/video/addVideo')
          }}>添加课程</Button>
        </Col>
      </Row>
      <Table dataSource={list} columns={columns} />
      <Modal  
        title="视频查看"
        visible={modelVisible}
        onCancel={() => {setModelVisible(false)
            //关闭后暂停视频
            videoEl.current.pause()
        }}
        footer={null}>
          <video ref={videoEl} width="480" height="360" controls src={currentPlay} autoPlay></video>
      </Modal>
    </div>
  )
}


export default VideoShow