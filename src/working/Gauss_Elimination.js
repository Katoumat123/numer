import React from 'react'
import { Row, Col } from 'antd'
import { Input, Button, Table, Modal } from 'antd'

import { MatrixInputA, MatrixInputB } from '../input/inputmatrix'

import { calElimination,copyArray } from './cal_all'
import apis from '../Api/index'
import Modal_Example from '../input/model'


class Elimination extends React.Component{
    state = 
    {
        n: 2,
        matrixA : [[],[]],
        matrixB : [],
        result : "",
        isModalVisible: false,
        apiData: [],
        topre: "",
        hasData: false
    }

    async getData()
    {
        let tempData = null
        await apis.getmatrix().then(res => {tempData = res.data})
        this.setState({apiData: tempData})
        this.setState({hasData: true})
        /* console.log(tempData); */
    }
    onClickInsert = e =>{
       
                let index = e.currentTarget.getAttribute('name').split('_')
                    index = parseInt(index[1])
                    this.setState({
                        matrixA: copyArray(this.state.apiData[index]["n"],this.state.apiData[index]["matrixA"]),
                        matrixB: [...this.state.apiData[index]["matrixB"]],
                        n: this.state.apiData[index]["n"],
                        ERROR : this.state.apiData[index]["error"],
                        isModalVisible: false
                    })
            }

    onClickOk = e =>{
        this.setState({isModalVisible: false})
    }

  
    onClickExample = e =>{
        if(!this.state.hasData){
            this.getData()
        }
        this.setState({isModalVisible: true})
    }
        OnChangeMatrixA = e =>{
            let changedArr = this.state.matrixA
            let index = e.target.name.split('_')
            changedArr[parseInt(index[1])][parseInt(index[2])] = e.target.value
            console.log(e.target.value)
            this.setState({matrixA:changedArr})
        }
    
        OnChangeMatrixB = e =>{
            let changedArr = this.state.matrixB
            let index = e.target.name.split('_')
            changedArr[parseInt(index[1])]= e.target.value
            console.log(e.target.value)
            this.setState({matrixB:changedArr})
        }
    
        onClickAdd = e =>{
            if(this.state.n < 6){
                this.state.matrixA.push([])
                this.setState({n:this.state.n+1})
            } 
        }
    
        onClickDel = e =>{
            if(this.state.n > 2){
                this.state.matrixA.pop()
                this.setState({n:this.state.n-1})
            } 
        }
        onCal = e =>{
            this.setState({
                result : calElimination(this.state.n,this.state.matrixA,this.state.matrixB),
                topre : <div className = "ontopresult"> คำตอบของการคำนวนคือ</div>
            })
        }
    render(){
        return(
            <div className="allingausseElimination">
                 <Modal_Example
                    visible = {this.state.isModalVisible}
                    onOk = {this.onClickOk}
                    hasData = {this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick = {this.onClickInsert}
                />
                <h1 className ="Ontop">Gauss Elimination Method</h1>
               
              
                <Button onClick={this.onClickDel}>Del</Button>{this.state.n} x {this.state.n}<Button onClick={this.onClickAdd}>Add</Button>
                <Row>
                    <Col span ='6'>
                        <MatrixInputA n={this.state.n} onChange={this.OnChangeMatrixA} value={this.state.matrixA}/>
                    </Col>
                    <Col>
                    
                    </Col>
                    <Col >
                        <MatrixInputB n={this.state.n} onChange={this.OnChangeMatrixB} value={this.state.matrixB}/>
                    </Col>
                    <span className="Poom"><Button type="primary" onClick = {this.onCal}>Calculate</Button></span>
                    <span className="Poom"><Button type="primary" onClick={this.onClickExample} >Exsample</Button></span>
                </Row>
                <div>
                    {this.state.topre}
                    {this.state.result}
                </div>
            
            </div>
        );
    }
}

export default Elimination