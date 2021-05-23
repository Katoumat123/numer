import React from 'react'
import { Row, Col } from 'antd'
import { Input, Button, Table, Modal } from 'antd'

import { MatrixInputA, MatrixInputB } from '../input/inputmatrix'

import {calConjugate,copyArray } from './cal_all'
import apis from '../Api/index'
import Modal_Example from '../input/model'

class Conjugate extends React.Component{
     
    state = 
    {
        n: 2,
        matrixA : [[],[]],
        matrixB : [],
        result : "",
        ERROR : "",
        apiData: [],
        hasData: false
    }

    async getData()
    {
        let tempData = null
        await apis.getmatrix().then(res => {tempData = res.data})
        this.setState({apiData: tempData})
        this.setState({hasData: true})
        this.onClickInsert()
       
    }
    

   

    onClickInsert(){
                    this.setState({
                        matrixA: copyArray(this.state.apiData[1]["n"],this.state.apiData[1]["matrixA"]),
                        matrixB: [...this.state.apiData[1]["matrixB"]],
                        n: this.state.apiData[1]["n"],
                        ERROR : this.state.apiData[1]["error"],
                        
                    })
            }
        
   

    onClickExample = e =>{
        if(!this.state.hasData){
            this.getData()
        }
        else{
            this.onClickInsert()
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
        
        getERR= (e) => {
            this.setState({
                ERROR: e.target.value,
            })
        }
        
        onPoom = e =>{
            this.setState({
                result : calConjugate(this.state.n,this.state.matrixA,this.state.matrixB,this.state.ERROR),
                topre : <div className = "ontopresult"> คำตอบของการคำนวนคือ</div>
            })
        }
    render(){

       return(
           <div className="TopRow">
               
                <h1 className ="Ontop">Conjugate Gradient Method</h1>
               
                <Button Button type="primary" onClick={this.onClickDel}>Del</Button>
                {this.state.n} x {this.state.n}
                <Button Button type="primary" onClick={this.onClickAdd}>Add</Button>
                <Row>
                    <Col span ='6'>
                        <MatrixInputA n={this.state.n} onChange={this.OnChangeMatrixA} value={this.state.matrixA}/>
                    </Col>
                    <Col>
                    
                    </Col>
                    <Col >
                        <MatrixInputB n={this.state.n} onChange={this.OnChangeMatrixB} value={this.state.matrixB}/>
                    </Col>
                    <span className="Poom"><Button type="primary" onClick ={this.onPoom}>คำนวณ</Button></span>
                    <span className="Poom"><Button type="primary" onClick={this.onClickExample} >ตัวอย่าง</Button></span>
                </Row>
                <span><Input placeholder="0.000001" onChange={this.getERR} className="Input_4" value={this.state.ERROR}/></span>
                
                <div>
                    {this.state.result}
                </div>
                

           </div>
       )
    }
}
export default Conjugate