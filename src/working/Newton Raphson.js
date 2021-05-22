import React from 'react'
import { Button, Input } from 'antd';
import { calNewton } from './cal_all.js'
import apis from '../Api/index'
import Modal_Example from '../input/model'

class Newton extends React.Component {
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
    this.onClickInsert()
}

  

  onClickInsert() {
    this.setState({
      Equation: this.state.apiData[3]["equation"],
      Innitx: this.state.apiData[3]["initial_x"],
      ERROR: this.state.apiData[3]["error"],
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
    this.setState({ Result: calNewton(this.state.Equation, this.state.Innitx, this.state.ERROR) });

  };
  render() {
    return (
      <div className="TopRow">
        <h1 className="Ontop">Newton Raphon Method</h1>

        <div>
          <span>F(x) =</span>
          <span><Input placeholder="(-0.6*x)+0.8" className="Input_1" value={this.state.Equation} onChange={this.getEqation} /></span>
        </div>
        <div>
          <span className=""> Initial x = </span>
          <span><Input placeholder="0" className="Input_2" onChange={this.getinnitx} value={this.state.Innitx} /></span>
          <span className=""> ERROR : </span>
          <span><Input placeholder="0.000001" className="Input_4" onChange={this.getERROR} value={this.state.ERROR} /></span>
          
        </div>
        <span className="Poom"><Button type="primary" onClick={this.show_value} >คำนวณ</Button></span>
          <span className="Poom"><Button type="primary" onClick={this.onClickExample} >ตัวอย่าง</Button></span>
        <div>
          {this.state.Result}
        </div>
      </div>
    )
  }
}
export default Newton