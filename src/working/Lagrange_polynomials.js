import React from 'react'
import { Row, Col } from 'antd'
import { Input, Button } from 'antd'
import { InputXY } from '../input/inputmatrix'
import { calLagrange,copyArray } from './cal_all'
import apis from '../Api/index'

class Lagrange extends React.Component {

    state = {
        n: 2,
        matrixA: [[], []],
        Point: [],
        valueX: '',
        data: "",
       
        apiData: [],
        hasData: false
    }
   
    async getData() {
        let tempData = null
        await apis.getInter().then(res => { tempData = res.data })
        this.setState({ apiData: tempData })
        this.setState({ hasData: true })
        this.onClickInsert()
    }

   

    onClickInsert(){
       
        this.setState({
            matrixA: copyArray(this.state.apiData[1]["n"], this.state.apiData[1]["matrixA"]),
            Point: [...this.state.apiData[1]["point"]],
            n: this.state.apiData[1]["n"],
            valueX: this.state.apiData[1]["x"],
           
        })
    }


    onClickExample = e => {
        if (!this.state.hasData) {
            this.getData()
        }
        else{
            this.onClickInsert()
        }
        this.setState({ isModalVisible: true })
    }
    onChangeX = e => {
        this.setState
            (
                { valueX: e.target.value }
            )
    }
    onChangePoint = e => {
        let index = []
        index = e.target.value
        this.setState
            (
                { Point: index.split(",") }
            )
    }
    onChangematrixXY = (e) => {
        let index = e.target.name.split(" ")
        let value = e.target.value
        this.state.matrixA[parseInt(index[0])][parseInt(index[1])] = value
        console.log(this.state.matrixA.toString())


    }
    onClickmatrixadd = (e) => {
        if (this.state.n < 6) {
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
        this.setState({ data: calLagrange(this.state.matrixA, this.state.Point, this.state.valueX) })
    }
    render() {

        return (
            <div className="TopRow">
                <h1 className="Ontop">Lagrange polynomials</h1>
               
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
                    <Col span={24}> <InputXY n={this.state.n} onChange={this.onChangematrixXY} value={this.state.matrixA} /> </Col>

                </Row>
                <Row>
                    <div style={{ padding: '0px 40px' }}>
                        กรอก ค่า X
                    </div>
                </Row>
                <Row style={{ width: '100px', padding: '10px 40px' }}>
                    <div>
                        <Input className="matrixip" style={{ width: '150px' }} placeholder='Example = 40000' onChange={this.onChangeX} value={this.state.valueX} />
                    </div>


                </Row>
                <Row>
                    <div style={{ padding: '0px 40px' }}>
                        ใส่จำนวนจุดที่ต้องการ
                    </div>
                </Row>
                <Row style={{ width: '100px', padding: '10px 40px' }}>
                    <div>
                        <Input className="matrixip" style={{ width: '150px' }} placeholder='Example = 1,2,3' onChange={this.onChangePoint} value={this.state.Point} />
                    </div>


                </Row>
                <Row className='matrix' style={{ padding: '10px 40px' }}>
                    <Button type="primary" onClick={this.onClickCalculator}>คำนวณ</Button>
                    <span className="Poom"><Button type="primary" onClick={this.onClickExample} >ตัวอย่าง</Button></span>
                </Row>
                <div>
                    {this.state.data}
                </div>
            </div>
        )
    }
}

export default Lagrange