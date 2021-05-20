import React from 'react';
import { Row , Col } from 'antd';
import { Button } from 'antd';
import { Modal } from 'antd';

class Modal_Example extends React.Component{
    render() {
        return (
            <div>
                <Modal
                    title = 'ตัวอย่าง'
                    visible = {this.props.visible}
                    onCancel = {this.props.onOk}
                    footer = {[
                        <Button type = 'primary' onClick={this.props.onOk}>
                            Ok
                        </Button>
                    ]}
                >
                    
                    {this.props.hasData ?
                         
                        
                        <Row>
                            <Col span={12}>ข้อที่ {this.props.Ex+1} {this.props.apiData[this.props.Ex]['equation']}</Col>
                            <Col span={12}>
                                    <Button type='primary' name={'insert_' + this.props.Ex} onClick={this.props.onClick}>Insert</Button>
                                </Col>
                            
                        </Row>

                        /* this.props.apiData.map((x,i) => (
                            <Row>
                                <Col span={12}>ข้อที่ {i+1} {x['equation']}</Col>

                                <Col span={12}>
                                    
                                    <Button type='primary' name={'insert_' + i} onClick={this.props.onClick}>Insert</Button>
                                </Col>
                                <hr/>
                            </Row>
                        )) */
                        : <span style={{fontSize: "25px" , textAlign: "center"}}>กำลังโหลดข้อมูล</span>
                    }
                </Modal>
            </div>
        )
    }
}

export default Modal_Example