import React from 'react'
import { Button,Input } from 'antd';
import { calBisection } from './cal_all.js'
import apis from '../Api/index'
import Modal_Example from '../input/model'

class Bisection extends React.Component {
    state ={
        Equation:'',
        XL: '',
        XR: '',
        ERROR: '',
        result: '',
        isModalVisible: false,
        apiData: [],
        hasData: false,
    }

    async getData()
    {
        let tempData = null
        await apis.getRoot().then(res => {tempData = res.data})
        this.setState({apiData: tempData})
        this.setState({hasData: true})
        /* console.log(tempData); */
    }

    onClickOk = e =>{
        this.setState({isModalVisible: false})
    }

    onClickInsert = e =>{
/*         console.log(e.currentTarget);
        console.log(e.target);
        console.log(e.currentTarget.getAttribute('name'));
        console.log(e.target.name); */
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
            <div className="allinbisetion" >
                 <Modal_Example
                    visible = {this.state.isModalVisible}
                    onOk = {this.onClickOk}
                    hasData = {this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick = {this.onClickInsert}
                />
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
                    <span><Input placeholder="0.000001" onChange={this.getERR} className="Input_3" value ={this.state.ERROR} /></span>
                    <span className="Poom"><Button type="primary" onClick={this.show_value} >Calculate</Button></span>
                    <span className="Poom"><Button type="primary" onClick={this.onClickExample} >Exsample</Button></span>
                </div>
                <div>
                    {this.state.result}
                </div>
                
            </div>
        )
    }
}
export default Bisection