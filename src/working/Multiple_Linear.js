import React from 'react'
import { Row, Col } from 'antd'
import { Input, Button } from 'antd'
import { InputMultiple } from '../input/inputmatrix'
import { calMultiple,copyArray } from './cal_all'
import apis from '../Api/index'
import Modal_Example from '../input/modelRegression'

class Multiple extends React.Component {
    state = {
        n: 2,
        valueX1: "",
        valueX2: "",
        valueX3: "",
        matrixA: [[], []],
        isModalVisible: false,
        apiData: [],
        hasData: false,
        Ex: 2

    }
   
    async getData()
    {
        let tempData = null
        await apis.getRegession().then(res => {tempData = res.data})
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
                        matrixA: copyArray(this.state.apiData[index]["n"],this.state.apiData[index]["matrixA"]),
                        n: this.state.apiData[index]["n"],
                        valueX1: this.state.apiData[index]["x1"],
                        valueX2: this.state.apiData[index]["x2"],
                        valueX3: this.state.apiData[index]["x3"],
                        isModalVisible: false
                    })
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
                <Modal_Example
                    visible = {this.state.isModalVisible}
                    onOk = {this.onClickOk}
                    hasData = {this.state.hasData}
                    apiData = {this.state.apiData}
                    onClick = {this.onClickInsert}
                    Ex = {this.state.Ex}
                />
                <h1 className="Ontop">Multi-linear Regression</h1>
               
                <Col span={12} style={{ padding: '10px 0 0' }}>
                    <Row>
                        <Row className='rowButtonmatrix'>
                            

                            <Col className='buttonmatrix'>
                                <Button type="primary" onClick={this.onClickmatrixadd} style={{ marginBottom: '5px' }} > ADD point </Button>
                            </Col>
                            
                            <Col className='buttonmatrix'>
                                <Button type="primary" onClick={this.onClickmatrixdel}> Del point </Button>
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