import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AddVideo from './AddVideo'
import VideoShow from './VideoShow'
import EditVideo from './EditVideo'

function Video() {
  return (
    <Switch>
      <Route path='/index/video' component={VideoShow} exact /> {/*路径完全匹配*/}
      <Route path='/index/video/addVideo' component={AddVideo} />
      <Route path='/index/video/editVideo' component={EditVideo} />
      <Redirect to='/index/video' />
    </Switch>
  )
}

export default Video