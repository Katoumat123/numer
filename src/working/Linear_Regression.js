import React from 'react'
import { Row, Col } from 'antd'
import { Input, Button } from 'antd'
import { InputXY } from '../input/inputmatrix'
import { calLinear, copyArray } from './cal_all'
import apis from '../Api/index'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Modal_Example from '../input/modelRegression'

class LinearRe extends React.Component {
    state = {
        n: 2,
        valueX: "",
        matrixA: [[], []],
        data: "",
        apiData: [],
        hasData: false,
        Ex: 0,
        dataLine: []
    }

    async getData() {
        let tempData = null
        await apis.getRegession().then(res => {tempData = res.data})
            //console.log(res.data)
       
        this.setState({ apiData: tempData })
        this.setState({ hasData: true })
        this.onClickInsert()
    }


    onClickInsert() {

        this.setState({
            matrixA: copyArray(this.state.apiData[0]["n"], this.state.apiData[0]["matrixA"]),
            n: this.state.apiData[0]["n"],
            valueX: this.state.apiData[0]["x"],

        })
    }

    onClickExample = e => {
        if (!this.state.hasData) {
            this.getData()
        }
        else {
            this.onClickInsert()
        }
        this.setState({ isModalVisible: true })
    }

    onChangeX = e => {
        this.setState({ valueX: e.target.value })
    }


    onChangematrixXY = (e) => {
        let index = e.target.name.split(" ")
        let value = e.target.value
        this.state.matrixA[parseInt(index[0])][parseInt(index[1])] = (value)

    }
    onClickmatrixadd = (e) => {
        if (this.state.n < 10) {
            this.setState({ n: this.state.n += 1 })
            this.state.matrixA.push([])
            //console.log(this.setState.matrixA)
        }
    }
    onClickmatrixdel = (e) => {
        if (this.state.n > 2) {
            this.setState({ n: this.state.n -= 1 })
            this.state.matrixA.pop([])

        }
    }

    
    onClickCalculator = (e) => {
        let a = calLinear(this.state.matrixA, this.state.valueX, this.state.n)
        //console.log(a);
        
        let data = [];
        for(let i = 0 ; i < this.state.n ; i++){
            data.push({x:parseFloat(this.state.matrixA[i][0]), y:parseFloat(this.state.matrixA[i][1]),
            fx: a[1][i]})  
                 
        }
         //console.log(data);
         this.setState({dataLine: data , data:a[0]})

    }

    render() {

        return (
            <div className="TopRow">
                <h1 className="Ontop">Linear Regression</h1>
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
                        กรอก ค่า X ที่ต้องการหา
                    </div>
                </Row>
                <Row style={{ width: '100px', padding: '10px 40px' }}>
                    <div>
                        <Input className="matrixip" style={{ width: '150px' }} placeholder='Example = 40000' onChange={this.onChangeX} value={this.state.valueX} />
                    </div>


                </Row>

                <Row className='matrix' style={{ padding: '10px 40px' }}>
                    <Button type="primary" onClick={this.onClickCalculator}>คำนวณ</Button>
                    <span className="Poom"><Button type="primary" onClick={this.onClickExample} >ตัวอย่าง</Button></span>
                </Row>


                <div>
                    {this.state.data}
                    <LineChart
                        width={800}
                        height={400}
                        data={this.state.dataLine}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="fx" stroke="#82ca9d" />
                    </LineChart>
                </div>
            </div>
        )
    }
}

export default LinearRe