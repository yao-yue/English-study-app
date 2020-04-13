import React, { useState, useEffect } from 'react';
import '../static/css/ArticleList.css'
import { Modal, message, Button,Table} from 'antd';
import { getArticleList,delArticleById } from '../api'
const { confirm } = Modal;


function ArticleList(props) {

    const [list, setList] = useState([])

    //得到文章列表
    const getList = async() => {
        const res = await getArticleList()
        if(res.list) {
            for(let item of res.list) {
                item.key = item.id
            }
            setList(res.list)
        }else {
            message.error('网络错误')
        }
    }
    useEffect(() => {
        getList()
    }, [])

    //删除文章的方法
    const delArticle = (id) => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            async onOk() {
                const res = await delArticleById(id)
                if(res.delSuccess) {
                    message.success('文章删除成功')
                    getList()
                }else {
                    message.error('网络错误')
                }
            },
            onCancel() {
                message.success('已撤销删除')
            },
        });
    }

    //修改文章
    const updateArticle = (id, checked) => {
        props.history.push('/index/add/' + id)
    }


    const columns = [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '类别',
          dataIndex: 'typeName',
          key: 'typeName',
        },
        {
          title: '发布时间',
          dataIndex: 'addTime',
          key: 'showTime',
        },
        {
          title: '浏览量',
          dataIndex: 'viewCount',
          key: 'viewCount',

        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'action',
          render: (id) => (
            <div>
                <Button type="primary" onClick={() => {updateArticle(id)}}>修改</Button>&nbsp;
                <Button onClick={() => {delArticle(id)}}>删除</Button>
            </div>
          ),
        },
      ];
    return (
        <div>
            <Table dataSource={list} columns={columns}/>
        </div>
    )
}


export default ArticleList