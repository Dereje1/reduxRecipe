import React from 'react'

class Ingredients extends React.Component{
  //parses ingredients in to a list
  listParser(ings){
    var z=ings.map((i,idx)=>{
      return(
        <li key={idx} className="list-group-item" >{i}</li>
      )
    })
    return z;
  }

  render(){
    return(
          <ul className="list-group">
            {this.listParser(this.props.ingrid)}
          </ul>
    )

  }

}

export default Ingredients
