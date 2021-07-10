import React, { useState } from 'react';
import Addappiontment from './Addappiontment'
import Appiontmentlist from './Appiontmentlist'
import Appointmentdetails from './Appointmentdetails'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';



const Home = (props) => {



    const { Header, Content } = Layout;
  
return (
        <Layout>

            <Header className="header">
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">Doctor Appointment Calendar</Menu.Item>
              </Menu>
            </Header>

              
              <Layout style={{ padding: '0 45px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Appointment</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 45,
                    margin: 0,
                    minHeight: 400,
                  }}
                >
                  
                  <Row>
                    <Col span={20}></Col>
                    <Col span={4} >
                      <Addappiontment />
                      </Col>
                  </Row>
                  
               <Appiontmentlist/>
               <Appointmentdetails/>
                </Content>
              </Layout>
          </Layout>


    );
}

export default  Home;
