import React, { useState, useEffect } from 'react';
import { Modal, message, Button, Table, Input, Row, Col, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getWordList, batchDeleteWord, deleteWordById, searchWordByName, searchWordById, wordDeduplication } from '../../api'
import EditForm from './EditForm'
const { confirm } = Modal;
const { Search} = Input



function Word(props) {

  const [list, setList] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [currentEditWord, setCurrentEditWord] = useState({})
  //上传配置
  const UpLoadconfig = {
    name: 'file',
    action: 'http://127.0.0.1:7001/admin/uploadWord',  //上传的地址
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        //重新拉取单词数据
        getList()
        setTimeout(() => {
          if(list.length === 0 ) {
            message.info('如果上传文件较大，请稍后刷新页面')
          }
        }, 1000)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //获取单词列表
  const getList = async () => {
    const result = await getWordList()
    const wordList = result.wordList ? result.wordList : ''
    if (result.status === 200) {
      for (let item of wordList) {
        item.key = item.id
      }
      setList(wordList)
    } else if (result.status === 404) {
      //更新页面
      setList([])
      message.info('单词库空空如也')
    } else {
      message.error('网络错误,获取单词列表失败')
    }
  }
  //清除所有单词
  const clearList = async () => {
    console.log('hello')
    confirm({
      title: '确定要清空单词库?',
      content: '如果你点击OK按钮，数据库中的单词将会全部删除，无法恢复。',
      async onOk() {
        const res = await batchDeleteWord()
        if (res.status === 200) {
          message.success('单词删除成功')
          //重新拉取数据，更新页面
          getList()
        } else {
          message.error(res.msg)
        }
      },
      onCancel() {
        message.success('已撤销删除')
      },
    })
  }
  //通过id删除单词
  const deleteWord = async (id) => {
    const res = await deleteWordById(id)
    if (res.status === 200) {
      //重新拉取数据，更新页面
      getList()
      message.success('删除成功')
    } else {
      message.error(res.msg)
    }
  }
  //通过名称搜索单词
  const wordName2data = async(wordName) => {
    const res = await searchWordByName(wordName)
    if(res.status === 200) {
      let word = res.word
      word.key = 1
      setList([word])
    }else {
      message.error('没有这个单词')
    }
  }
  //通过id获取单词信息，并填充到编辑表单
  const id2Word = async(id) => {
    const res = await searchWordById(id)
    if(res.word) {
      setCurrentEditWord(res.word)
      setShowModel(true)
    }
  }

  useEffect(() => {
    getList()
  }, [])


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
          <Button type="primary" onClick={() => {
            id2Word(id)
          }}>编辑</Button>&nbsp;
          <Button onClick={() => deleteWord(id)}>删除</Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Row style={{ marginBottom: '10px' }}>
        <Col span={6} >
          <Search
            enterButton="Search"
            onSearch={value => wordName2data(value)}
          />
        </Col>
        <Col span={3} push={11}>
          <Button danger onClick={clearList}>清除所有单词</Button>
        </Col>
        <Col span={3} push={11}>
          <Upload {...UpLoadconfig}>
            <Button type="primary"><UploadOutlined /> 上传单词</Button>
          </Upload>
        </Col>
      </Row>
      <Table dataSource={list} columns={columns} />
      <Modal
          title="编辑单词"
          visible={showModel}
          footer={null}
          onCancel={() => {setShowModel(false)}}
        >
          <EditForm
            word={currentEditWord}
            setShowModel={setShowModel}
            getList={getList}
          />
        </Modal>
    </div>
  )
}


export default Word