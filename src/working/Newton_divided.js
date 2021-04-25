import React from 'react'
import { Row, Col } from 'antd'
import { Input, Button } from 'antd'
import { InputXY } from '../input/inputmatrix'
import { calNewtonInterpolation } from './cal_all'

class Newtondivide extends React.Component {
    state = {
        n: 2,
        matrixA: [[], []],
        Point: [],
        valueX: '',
        data: "",
        isModalVisible: false,
        apiData: [],
        hasData: false
    }

    onClickOk = e => {
        this.setState({ isModalVisible: false })
    }

   
    onClickExample = e => {
        if (!this.state.hasData) {
            this.getData()
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
        this.setState({ data: calNewtonInterpolation(this.state.matrixA, this.state.Point, this.state.valueX) })
    }
    render() {

        return (
            <div className="allinnewtondevide">
                <h1 className="Ontop">Newton's divided-differences</h1>
                
                <Row>
                    <Row className='rowButtonmatrix'>
                        <Col className='buttonmatrix'>
                            <Button type="primary" onClick={this.onClickmatrixadd}> เพิ่มขนาดเมตตริกซ์ </Button>
                        </Col>
                        <Col className='buttonmatrix'>
                            <Button type="primary" onClick={this.onClickmatrixdel}> ลดขนาดเมตตริกซ์ </Button>
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
                        กรอก ค่า X ที่ต้องการหา
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
                    
                </Row>
                <div>
                    {this.state.data}
                </div>
            </div>
        )
    }
}
export default Newtondivide