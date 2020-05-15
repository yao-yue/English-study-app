
import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AddWQ from './AddWQ.js'
import EditWQ from './EditWQ.js'
import WQshow from './WQshow.js'

function WriteQuestion() {
    return (
        <Switch>
            <Route path='/index/writeQuestion' component={WQshow} exact /> {/*路径完全匹配*/}
            <Route path='/index/writeQuestion/addWQ' component={AddWQ} />
            <Route path='/index/writeQuestion/editWQ' component={EditWQ} />
            <Redirect to='/index/writeQuestion' />
        </Switch>
    )
}

export default WriteQuestion