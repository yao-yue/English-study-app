import React, { useState, useEffect } from 'react';
import { Modal, message, Button, Table, Input, Row, Col, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { confirm } = Modal;



function Word(props) {

  const [list, setList] = useState([])
  //上传配置
  const UpLoadconfig = {
    name: 'file',
    action: 'http://127.0.0.1:7001/upload',  //上传的地址
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //得到文章列表
  const getList = async () => {
    // const res = await getArticleList()
    // 公开课、专项课、系统提分课
    const res = {
      list: [
        {
          "id": 1,
          "wordName": "vacant",
          "phonetic": "[ˈveikənt]",
          "vioce": "http://res.iciba.com/resource/amp3/oxford/0/e0/72/e0725637cb42ae9e775b6d0c8fa041da.mp3",
          "wordExplain": "adj. 空的；（职位等）空缺的；茫然的"
        },
        {
          "id": 2,
          "wordName": "linen",
          "phonetic": "[ˈlinin]",
          "vioce": "http://res.iciba.com/resource/amp3/oxford/0/ea/b7/eab7384fed26f209f8d4de9c927e3327.mp3",
          "wordExplain": "n. 亚麻布，亚麻布制品；家庭日用织品"
        },
        {
          "id": 3,
          "wordName": "hectic",
          "phonetic": "[ˈhektɪk]",
          "vioce": "http://res.iciba.com/resource/amp3/oxford/0/83/a2/83a25f53e60eb12112bc778a6302e5db.mp3",
          "wordExplain": "adj. 紧张忙碌的；忙乱的"
        },
        {
          "id": 4,
          "wordName": "fossil",
          "phonetic": "[ˈfɔsl]",
          "vioce": "http://res.iciba.com/resource/amp3/0/0/bd/2a/bd2ad056056683306b5730e3f2e8ff13.mp3",
          "wordExplain": "n. 化石"
        },
        {
          "id": 5,
          "wordName": "modish",
          "phonetic": "[ˈməʊdɪʃ]",
          "vioce": "http://res.iciba.com/resource/amp3/oxford/0/cc/1d/cc1d6be1b16c50a1a7519ff0f5ae2bb5.mp3",
          "wordExplain": "adj. 时髦的"
        },
        {
          "id": 6,
          "wordName": "distraction",
          "phonetic": "[dɪˈstrækʃən]",
          "vioce": "http://res.iciba.com/resource/amp3/oxford/0/00/4e/004ee62d9877e92ebf6128f7989028d1.mp3",
          "wordExplain": "n. 娱乐，消遣；分心的事物"
        },
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
      title: '单词名称',
      dataIndex: 'wordName',
      key: 'wordName',
    },
    {
      title: '音标',
      dataIndex: 'phonetic',
      key: 'phonetic',
    },
    {
      title: '单词发音',
      dataIndex: 'vioce',
      key: 'vioce',
      render: (vioce) => (
        <audio src={vioce} controls="controls" style={{ width: "120px", height: "40px", outline: "none" }}></audio>
      )
    },
    {
      title: '单词释义',
      dataIndex: 'wordExplain',
      key: 'wordExplain',
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
      <Row style={{ marginBottom: '10px' }}>
        <Col span={5} >
          <Input />
        </Col>
        <Col span={3} >
          <Button style={{ marginLeft: '10px' }} type="primary">搜索</Button>
        </Col>
        <Col span={3} push={13}>
          <Upload {...UpLoadconfig}>
            <Button><UploadOutlined /> 上传单词</Button>
          </Upload>
          {/* <form method="POST" action="http:127.0.0.1:7001/upload?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
        title: <input name="title" />
        file: <input name="file" type="file" />
        <button type="submit">Upload</button>
      </form> */}
        </Col>
      </Row>
      <Table dataSource={list} columns={columns} />
    </div>
  )
}


export default Word