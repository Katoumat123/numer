import React from 'react'
import { Button, Input } from 'antd';
import { calFalse } from './cal_all.js'

class Falseposition extends React.Component {
  state = {
    Equation: '',
    XL: '',
    XR: '',
    ERROR: '',
    result: '',
    isModalVisible: false,
    apiData: [],
    hasData: false
  }

  
  onClickOk = e => {
    this.setState({ isModalVisible: false })
  }

  onClickInsert = e => {
    let index = e.currentTarget.getAttribute('name').split('_')
    index = parseInt(index[1])
    this.setState({
      Equation: this.state.apiData[index]["equation"],
      XL: this.state.apiData[index]["xl"],
      XR: this.state.apiData[index]["xr"],
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
    this.setState({

      Equation: e.target.value,
    });
  };

  getXL = (e) => {
    this.setState({
      XL: e.target.value,
    });
  };

  getXR = (e) => {
    this.setState({
      XR: e.target.value,
    });
  };

  getERR = (e) => {
    this.setState({
      ERROR: e.target.value,
    });
  };

  show_varlue = (e) => {
    this.setState({ result: calFalse(this.state.XL, this.state.XR, this.state.ERROR, this.state.Equation) });
  };

  render() {
    return (
      <div className="allinFalseposition">
        <h1 className="Ontop">Falseposition</h1>
       
        <div>
          <span>F(x) =</span>
          <span><Input placeholder="" className="Input_1" value={this.state.Equation} onChange={this.getEquation} /></span>
        </div>
        <div>
          <span className="Text_Input_2"> XL : </span>
          <span><Input placeholder="1.5" className="Input_2" value={this.state.XL} onChange={this.getXL} /></span>
          <span className="Text_Input_2"> XR : </span>
          <span><Input placeholder="2.0" className="Input_2" value={this.state.XR} onChange={this.getXR} /></span>
          <span className="Text_Input_2"> ERROR : </span>
          <span><Input placeholder="0.000001" className="Input_3" value={this.state.ERROR} onChange={this.getERR} /></span>
          <span className="Poom"><Button type="primary" onClick={this.show_varlue} >Calculate</Button></span>
   
        </div>
        <div>
          {this.state.result}
        </div>

      </div>
    )
  }
}
export default Falseposition