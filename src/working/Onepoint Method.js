import React from 'react'
import { Button, Input } from 'antd';
import { calOnepoint } from './cal_all.js'
import apis from '../Api/index'
import Modal_Example from '../input/model'

class Onepoint extends React.Component {
  state = {
    Equation: '',
    Innitx: '',
    ERROR: '',
    Result: '',
    isModalVisible: false,
    apiData: [],
    hasData: false
  }

  async getData() {
    let tempData = null
    await apis.getRoot().then(res => { tempData = res.data })
    this.setState({ apiData: tempData })
    this.setState({ hasData: true })
    /* console.log(tempData); */
}

  onClickOk = e => {
    this.setState({ isModalVisible: false })
  }

  onClickInsert = e => {
    let index = e.currentTarget.getAttribute('name').split('_')
    index = parseInt(index[1])
    this.setState({
      Equation: this.state.apiData[index]["equation"],
      Innitx: this.state.apiData[index]["initial_x"],
      ERROR: this.state.apiData[index]["error"],
      isModalVisible: false
    })
  }
  onClickExample = e => {
    if (!this.state.hasData) {
      this.getData()
    }
    this.setState({ isModalVisible: true })
  }
  getEqation = (e) => {
    this.setState({ Equation: e.target.value });
  };
  getinnitx = (e) => {
    this.setState({ Innitx: e.target.value });
  };
  getERROR = (e) => {
    this.setState({ ERROR: e.target.value });
  };
  show_value = (e) => {
    this.setState({ Result: calOnepoint(this.state.Equation, this.state.Innitx, this.state.ERROR) });
  };

  render() {
    return (
      <div className="allinOnepoint">
            <Modal_Example
                    visible = {this.state.isModalVisible}
                    onOk = {this.onClickOk}
                    hasData = {this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick = {this.onClickInsert}
                />
        <h1 className="Ontop">Onepoint Iteration Method</h1>
       
        <div>
          <span>F(x) =</span>
          <span><Input placeholder="(-0.6*x)+0.8" className="Input_1" onChange={this.getEqation} value={this.state.Equation} /></span>
        </div>
        <div>
          <span className=""> Initial x = </span>
          <span><Input placeholder="0" className="Input_2" onChange={this.getinnitx} value={this.state.Innitx} /></span>
          <span className=""> ERROR : </span>
          <span><Input placeholder="0.000001" className="Input_3" onChange={this.getERROR} value={this.state.ERROR} /></span>
          <span className="Poom"><Button type="primary" onClick={this.show_value}>Calculate</Button></span>
          <span className="Poom"><Button type="primary" onClick={this.onClickExample} >Exsample</Button></span>
        </div>
        <div>
          {this.state.Result}
        </div>
      </div>
    )
  }
}
export default Onepoint