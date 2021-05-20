import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import '../workcss/layout.css';
import Bisection from'./Bisection Method.js';
import Falseposition from'./Falseposition Method.js';
import Newton from'./Newton Raphson.js';
import Onepoint from'./Onepoint Method.js';
import Secant from'./Secant.js';
import Cramer from './Cramers_Rule.js'
import Gauss_Elimination from './Gauss_Elimination.js'
import Gauss_Jordan from './Gauss_Jordan.js'
import LU_Decom from './LU_Decomposition.js'
import Jacobi from './Jacobi_Iteration.js'
import Gauss_Seidel from './Gauss-Seidel_Iteration.js'
import Conjusgate from './Conjugate_Gradient.js'
import Newton_divided from './Newton_divided.js'
import Lagrange_polynomials from './Lagrange_polynomials.js'
import Spline_interpolation from './Spline_interpolation.js'
import Linear_Regression from './Linear_Regression.js'
import Polynomial_Regression from './Polynomial_Regression.js'
import Multiple_Linear from './Multiple_Linear.js'
import Swaggeradd from '../input/swagger.js'

import { Route } from "react-router-dom";
import { HashRouter } from 'react-router-dom';
import { Link,Redirect } from "react-router-dom";
import { i } from 'mathjs';


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Lay extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Layout>
                        <Header className="header">
                            <div className="logo" />
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                                <Menu.Item key="1" >Home{<Link to = "/Swaggeradd"></Link>}</Menu.Item>
                                <SubMenu className="Menu2" key="2" title="Root of equations">
                                    <Menu.Item key="sub1">Bisection Method{<Link to = "/Bisection"></Link>}</Menu.Item>
                                    <Menu.Item key="sub2">Falseposition Method{<Link to = "/Falseposition"></Link>}</Menu.Item>
                                    <Menu.Item key="sub3">Onepoint Method{<Link to = "/Onepoint"></Link>}</Menu.Item>
                                    <Menu.Item key="sub4">Newton Raphson{<Link to = "/Newton"></Link>}</Menu.Item>
                                    <Menu.Item key="sub5">Secant{<Link to = "/Secant"></Link>}</Menu.Item>
                                </SubMenu>
                                <SubMenu className="Menu2" key="3" title="Matrix" >
                                    <Menu.Item key="sub1">Cramer's Rule{<Link to = "/Cramer"></Link>}</Menu.Item>
                                    <Menu.Item key="sub2">Gauss Elimination Method{<Link to = "/Gauss_Elimination"></Link>}</Menu.Item>
                                    <Menu.Item key="sub3">Gauss Jordan Method{<Link to = "/Gauss_Jordan"></Link>}</Menu.Item>
                                    <Menu.Item key="sub4">LU Decomposition Method{<Link to = "/LU_Decomposition"></Link>}</Menu.Item>
                                    <Menu.Item key="sub5">Jacobi Iteration Method{<Link to = "/Jacobi"></Link>}</Menu.Item>
                                    <Menu.Item key="sub6">Gauss-Seidel Iteration {<Link to = "/Gauss_Seidel"></Link>}</Menu.Item>
                                    <Menu.Item key="sub7">Conjugate Gradient Method{<Link to = "/Conjusgate"></Link>}</Menu.Item>
                                </SubMenu>
                                <SubMenu className="Menu2" key="4" title="Interpolation">
                                    <Menu.Item key="sub1">Newton's divided-differences{<Link to = "/Newton_divided"></Link>}</Menu.Item>
                                    <Menu.Item key="sub2">Lagrange polynomials{<Link to = "/Lagrange_polynomials"></Link>}</Menu.Item>
                                    <Menu.Item key="sub3">Spline interpolation{<Link to = "/Spline_interpolation"></Link>}</Menu.Item>
                                </SubMenu>
                                <SubMenu className="Menu2" key="5" title="Regression">
                                    <Menu.Item key="sub1">Linear Regression{<Link to = "/Linear_Regression"></Link>}</Menu.Item>
                                    <Menu.Item key="sub2">Polynomial Regression{<Link to = "/Polynomial_Regression"></Link>}</Menu.Item>
                                    <Menu.Item key="sub3">Multiple Linear Regression{<Link to = "/Multiple_Linear"></Link>}</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>

                            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                                <Content style={{ padding: '0 24px', minHeight: 720 }}>
                                    {<Route path ="/Bisection" component = {Bisection}></Route>}
                                    {<Route path ="/Falseposition" component = {Falseposition}></Route>}
                                    {<Route path ="/Onepoint" component = {Onepoint}></Route>}
                                    {<Route path ="/Newton" component = {Newton}></Route>}
                                    {<Route path ="/Secant" component = {Secant}></Route>}
                                    {<Route path ="/Cramer" component = {Cramer}></Route>}
                                    {<Route path ="/Gauss_Elimination" component = {Gauss_Elimination}></Route>}
                                    {<Route path ="/Gauss_Jordan" component = {Gauss_Jordan}></Route>}
                                    {<Route path ="/LU_Decomposition" component = {LU_Decom}></Route>}
                                    {<Route path ="/Jacobi" component = {Jacobi}></Route>}
                                    {<Route path ="/Gauss_Seidel" component = {Gauss_Seidel}></Route>}
                                    {<Route path ="/Conjusgate" component = {Conjusgate}></Route>}
                                    {<Route path ="/Newton_divided" component = {Newton_divided}></Route>}
                                    {<Route path ="/Lagrange_polynomials" component = {Lagrange_polynomials}></Route>}
                                    {<Route path ="/Spline_interpolation" component = {Spline_interpolation}></Route>}
                                    {<Route path ="/Linear_Regression" component = {Linear_Regression}></Route>}
                                    {<Route path ="/Polynomial_Regression" component = {Polynomial_Regression}></Route>}
                                    {<Route path ="/Multiple_Linear" component = {Multiple_Linear}></Route>}
                                    {<Route path ="/Swaggeradd" component = {Swaggeradd}></Route>}
                                </Content>
                                
                            </Layout>
                        </Content>

                    </Layout>
                </div>
            </HashRouter>
        )
    }
}
export default Lay