import React from 'react'
import { Row, Col } from 'antd'
import { Input, Button } from 'antd'
import { InputXY } from '../input/inputmatrix'
import { calLinear,copyArray  } from './cal_all'
import apis from '../Api/index'
import Modal_Example from '../input/model'

class LinearRe extends React.Component{
    state = {
        n : 2,
        valueX : "",
        matrixA : [[],[]],
        data : "",
        isModalVisible: false,
        apiData: [],
        hasData: false
    }

    async getData() {
        let tempData = null
        await apis.getRegession().then(res => { tempData = res.data })
        this.setState({ apiData: tempData })
        this.setState({ hasData: true })
        /* console.log(tempData); */
    }
    
    onClickOk = e =>{
        this.setState({isModalVisible: false})
    }
    onClickInsert = e => {
        /*         console.log(e.currentTarget);
                console.log(e.target);
                console.log(e.currentTarget.getAttribute('name'));
                console.log(e.target.name); */
        let index = e.currentTarget.getAttribute('name').split('_')
        index = parseInt(index[1])
        this.setState({
            matrixA: copyArray(this.state.apiData[index]["n"], this.state.apiData[index]["matrixA"]),
            n: this.state.apiData[index]["n"],
            valueX: this.state.apiData[index]["x"],
            isModalVisible: false
        })
    }
 
    onClickExample = e =>{
        if(!this.state.hasData){
            this.getData()
        }
        this.setState({isModalVisible: true})
    }

    onChangeX = e => {
            this.setState({valueX : e.target.value})
    }
   

    onChangematrixXY = (e) =>{
        let index = e.target.name.split(" ")
        let value = e.target.value
        this.state.matrixA[parseInt(index[0])][parseInt(index[1])] = (value)
       
       
    
    }
    onClickmatrixadd = (e)=>{
        if(this.state.n < 10){
            this.setState({n : this.state.n+=1})
            this.state.matrixA.push([])
        }
    }
    onClickmatrixdel = (e)=>{
        if(this.state.n > 2){
            this.setState({n : this.state.n-=1})
            this.state.matrixA.pop([])
        }
    }
    onClickCalculator = (e)=>{
        this.setState({ data : calLinear(this.state.matrixA, this.state.valueX, this.state.n)  })   
    }
    
    render(){

        return(
            <div className= "allinLineaRe">
                <h1 className="Ontop">Linear Regression</h1>
                <Modal_Example
                      visible={this.state.isModalVisible}
                      onOk={this.onClickOk}
                      hasData={this.state.hasData}
                      apiData={this.state.apiData}
                      onClick={this.onClickInsert}
                />
              
                <Row>
                    <Row className='rowButtonmatrix'>
                        <Col className='buttonmatrix'>
                            <Button type="primary" onClick={this.onClickmatrixadd}> ADD point </Button>
                        </Col>
                        <Col className='buttonmatrix'>
                            <Button type="primary" onClick={this.onClickmatrixdel}> Del point </Button>
                        </Col>

                    </Row>

                </Row>
                <Row className='titlematrix'>
                    <Col span={10}> จุด X , Y </Col>

                </Row>
                <Row className='matrix'>
                    <Col span={24}> <InputXY n={this.state.n} onChange={this.onChangematrixXY} value={this.state.matrixA}/> </Col>

                </Row>
                <Row>
                    <div style={{ padding: '0px 40px' }}>
                        กรอก ค่า X ที่ต้องการหา
                    </div>
                </Row>
                <Row style={{ width: '100px', padding: '10px 40px' }}>
                    <div>
                        <Input className="matrixip" style={{ width: '150px' }} placeholder='Example = 40000' onChange={this.onChangeX} value={this.state.valueX}/>
                    </div>


                </Row>
                
                <Row className='matrix' style={{ padding: '10px 40px' }}>
                    <Button type="primary" onClick={this.onClickCalculator}>คำนวณ</Button>
                    <span className="Poom"><Button type="primary" onClick={this.onClickExample} >Exsample</Button></span>
                </Row>
                
                
                <div>
                    {this.state.data}
                </div>
            </div>
        )
    }
}

export default LinearRe