import React from 'react'
import { Button,Input } from 'antd';
import { calBisection } from './cal_all.js'
import apis from '../Api/index'


class Bisection extends React.Component {
    state ={
        Equation:'',
        XL: '',
        XR: '',
        ERROR: '',
        result: '',
        apiData: [],
        hasData: false,

    }

    async getData()
    {
        let tempData = null
        await apis.getRoot().then(res => {tempData = res.data})
        this.setState({apiData: tempData})
        this.setState({hasData: true})
        this.onClickInsert()
        /* console.log(tempData); */
    }

    

    onClickInsert(){
            this.setState({
                Equation: this.state.apiData[0]["equation"],
                XL: this.state.apiData[0]["xl"],
                XR: this.state.apiData[0]["xr"],
                ERROR: this.state.apiData[0]["error"],
                isModalVisible: false
            })
    }

    onClickExample = e =>{
        if(!this.state.hasData){
            this.getData()
        }
        this.setState({isModalVisible: true})
    }


    getEquation = e =>{
        this.setState({
            EX: e.target.value,
        });
    }    

    getXL = e =>{
        this.setState({
            XL: e.target.value,
        });
    }   

    getXR = e =>{
        this.setState({
            XR: e.target.value,
        });
    }   
    
    getERR = e =>{
        this.setState({
            ERROR: e.target.value,
        });
    }   

    show_value = e =>{
        this.setState({
            result: calBisection(this.state.Equation,this.state.XL,this.state.XR,this.state.ERROR)
        });
    }   



    render() {
        return (
            <div className="TopRow" >
              
                <h1 className="Ontop">Bisection Method</h1>
                <div>
               
                    <span>F(x) =</span>
                    <span><Input placeholder="x^4-13" onChange={this.getEquation} className="Input_1" value ={this.state.Equation} /></span>
                </div>
                <div>
                    <span className="Text_Input_2"> XL : </span>
                    <span><Input placeholder="1.5" onChange={this.getXL} className="Input_2" value ={this.state.XL} /></span>
                    <span className="Text_Input_2"> XR : </span>
                    <span><Input placeholder="2.0" onChange={this.getXR} className="Input_2" value ={this.state.XR} /></span>
                    <span className="Text_Input_2"> ERROR : </span>
                    <span><Input placeholder="0.000001" onChange={this.getERR} className="Input_4" value ={this.state.ERROR} /></span>
                    
                </div>
                <span className="Poom"><Button type="primary" onClick={this.show_value} >คำนวณ</Button></span>
                <span className="Poom"><Button type="primary" onClick={this.onClickExample} >ตัวอย่าง</Button></span>
                <div>
                    {this.state.result}
                </div>
                
            </div>
        )
    }
}
export default Bisection