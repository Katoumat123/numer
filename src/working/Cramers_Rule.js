import React from 'react'
import { Row, Col } from 'antd'
import { Input, Button, Table, Modal } from 'antd'

import { MatrixInputA, MatrixInputB } from '../input/inputmatrix'

import { calCramer,copyArray } from './cal_all'
import apis from '../Api/index'
import Modal_Example from '../input/model'


class Cremeru extends React.Component{
    
    state = 
    {
        n: 2,
        matrixA : [[],[]],
        matrixB : [],
        result : "",
        isModalVisible: false,
        apiData: [],
        hasData: false
    }
    async getData()
    {
        let tempData = null
        await apis.getmatrix().then(res => {tempData = res.data
        console.log(res.data)})
        this.setState({apiData: tempData})
        this.setState({hasData: true})
        this.onClickInsert()
    
    }

   

    onClickInsert(){
            this.setState({
                matrixA: copyArray(this.state.apiData[0]["n"],this.state.apiData[0]["matrixA"]),
                matrixB: [...this.state.apiData[0]["matrixB"]],
                n: this.state.apiData[0]["n"],
                
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
        
        onPoom = e =>{
            this.setState({
                result : calCramer(this.state.n,this.state.matrixA,this.state.matrixB)
            });
        }
    render(){
        return(
            <div className ="TopRow">
                <h1 className ="Ontop">Cramer Rule</h1>
               
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
                    
                </Row>
                <span className="Poom"><Button type="primary" onClick ={this.onPoom}>คำนวณ</Button></span>
                <span className="Poom"><Button type="primary" onClick={this.onClickExample} >ตัวอย่าง</Button></span>
                <div>
                    {this.state.result}
                </div>
            </div>
            
        );

     
    }

}
export default Cremeru