"use strict"
import React from 'react';
import Menu from './components/menu'
class Main extends React.Component{
    render(){
      return (
        <div style={{"backgroundColor":"black","paddingBottom":"10px"}}>
          <Menu/>
            {this.props.children}
        </div>
      )
    }
}

export default Main
