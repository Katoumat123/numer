import React from 'react'
import { Button, Input } from 'antd';
import { calSecant } from './cal_all.js'
import apis from '../Api/index'
import Modal_Example from '../input/model'

class Secant extends React.Component {
  state = {
    Equation: '',
    x0: '',
    x1: '',
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
      x0: this.state.apiData[index]["xl"],
      x1: this.state.apiData[index]["xr"],
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
  getEquation = (e) => {
    this.setState({ Equation: e.target.value });
  }
  getx0 = (e) => {
    this.setState({ x0: e.target.value });
  }
  getx1 = (e) => {
    this.setState({ x1: e.target.value });
  }
  getERROR = (e) => {
    this.setState({ ERROR: e.target.value });
  }
  getvalue = (e) => {
    this.setState({ Result: calSecant(this.state.Equation, this.state.x0, this.state.x1, this.state.ERROR) })

  }
  render() {
    return (
      <div className="allinSecant" >
        <Modal_Example
                    visible = {this.state.isModalVisible}
                    onOk = {this.onClickOk}
                    hasData = {this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick = {this.onClickInsert}
                />
        <h1 className ="Ontop">Secant</h1>
                <div>
                    <span>F(x) =</span>
                    <span><Input placeholder=""  className="Input_1" onChange ={this.getEquation} value={this.state.Equation}/></span>
                </div>
                <div>
                    <span className="Text_Input_2"> X0 =</span>
                    <span><Input placeholder="1.5"  className="Input_2" onChange ={this.getx0} value={this.state.x0}/></span>
                    <span className="Text_Input_2"> X1 =</span>
                    <span><Input placeholder="2.0"  className="Input_2" onChange ={this.getx1} value={this.state.x1}/></span>
                    <span className="Text_Input_2"> ERROR : </span>
                    <span><Input placeholder="0.000001"  className="Input_3" onChange ={this.getERROR} value={this.state.ERROR}/></span>
                    <span className="Poom"><Button type="primary" onClick = {this.getvalue}>Calculate</Button></span>
                    <span className="Poom"><Button type="primary" onClick={this.onClickExample} >Exsample</Button></span>
                
                </div>
                <div>
                    {this.state.Result}
                </div>

      </div>
    )
  }
}
export default Secant