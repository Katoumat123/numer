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
    this.onClickInsert()
    /* console.log(tempData); */
}

  

  onClickInsert() {
    this.setState({
      Equation: this.state.apiData[4]["equation"],
      x0: this.state.apiData[4]["xl"],
      x1: this.state.apiData[4]["xr"],
      ERROR: this.state.apiData[4]["error"],
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
      <div className="TopRow" >
        
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
                    <span><Input placeholder="0.000001"  className="Input_4" onChange ={this.getERROR} value={this.state.ERROR}/></span>
                    
                
                </div>
                    <span className="Poom"><Button type="primary" onClick = {this.getvalue}>คำนวณ</Button></span>
                    <span className="Poom"><Button type="primary" onClick={this.onClickExample} >ตัวอย่าง</Button></span>
                <div>
                    {this.state.Result}
                </div>

      </div>
    )
  }
}
export default Secant