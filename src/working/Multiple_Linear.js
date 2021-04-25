import React from 'react'
import { Row, Col } from 'antd'
import { Input, Button } from 'antd'
import { InputMultiple } from '../input/inputmatrix'
import { calMultiple } from './cal_all'

class Multiple extends React.Component {
    state = {
        n: 2,
        valueX1: "",
        valueX2: "",
        valueX3: "",
        matrixA: [[], []],
        isModalVisible: false,
        apiData: [],
        hasData: false

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
    onChangeX1 = e => {
        this.setState({ valueX1: e.target.value })
    }
    onChangeX2 = e => {
        this.setState({ valueX2: e.target.value })
    }
    onChangeX3 = e => {
        this.setState({ valueX3: e.target.value })
    }


    onChangematrixXY = (e) => {
        let index = e.target.name.split(" ")
        let value = e.target.value
        this.state.matrixA[parseInt(index[0])][parseInt(index[1])] = (value)



    }
    onClickmatrixadd = (e) => {
        if (this.state.n < 11) {
            this.setState({ n: this.state.n += 1 })
            this.state.matrixA.push([])
        }
    }
    onClickmatrixdel = (e) => {
        if (this.state.n > 2) {
            this.setState({ n: this.state.n -= 1 })
            this.state.matrixA.pop([])
        }
    }
    onClickCalculator = (e) => {

        this.setState({ data: calMultiple(this.state.n, this.state.matrixA, this.state.valueX1, this.state.valueX2, this.state.valueX3) })

    }
    render() {

        return (

            <div className="multiple">
                <h1 className="Ontop">Multi-linear Regression</h1>
               
                <Col span={12} style={{ padding: '10px 0 0' }}>
                    <Row>
                        <Row className='rowButtonmatrix'>
                            

                            <Col className='buttonmatrix'>
                                <Button type="primary" onClick={this.onClickmatrixadd} style={{ marginBottom: '5px' }} > เพิ่มขนาดเมตตริกซ์ </Button>
                            </Col>
                            
                            <Col className='buttonmatrix'>
                                <Button type="primary" onClick={this.onClickmatrixdel}> ลดขนาดเมตตริกซ์ </Button>
                            </Col>

                            

                        </Row>

                    </Row>
                    <Row className='inputdata'>
                        <div>
                            <Col span={24}> <InputMultiple n={this.state.n} onChange={this.onChangematrixXY} value={this.state.matrixA}/> </Col>
                        </div>
                    </Row>
                    <Row className='inputdata'>
                        <div >
                            กรอก ค่า X1 ที่ต้องการหา
                            </div>
                    </Row>
                    <Row className='inputdata'>
                        <div>
                            <Input className="matrixip" style={{ width: '150px' }} placeholder='Example = 40000' onChange={this.onChangeX1} value={this.state.valueX1}/>
                        </div>
                    </Row>
                    <Row className='inputdata'>
                        <div >
                            กรอก ค่า X2 ที่ต้องการหา
                            </div>
                    </Row>
                    <Row className='inputdata'>
                        <div>
                            <Input className="matrixip" style={{ width: '150px' }} placeholder='Example = 40000' onChange={this.onChangeX2} value={this.state.valueX2}/>
                        </div>
                    </Row>
                    <Row className='inputdata'>
                        <div >
                            กรอก ค่า X3 ที่ต้องการหา
                            </div>
                    </Row>
                    <Row className='inputdata'>
                        <div>
                            <Input className="matrixip" style={{ width: '150px' }} placeholder='Example = 40000' onChange={this.onChangeX3} value={this.state.valueX3}/>
                        </div>
                    </Row>
                    <Row className='inputdata'>
                        <Col span={24} >
                            <Button style={{ marginTop: '5px' }} type="primary" onClick={this.onClickCalculator}>คำนวณ</Button>
                            <span className="Poom"><Button type="primary" onClick={this.onClickExample} >Exsample</Button></span>
                        </Col>
                    </Row>
                </Col>
                <div>
                    {this.state.data}
                </div>
            </div>
        )
    }
}

export default Multiple