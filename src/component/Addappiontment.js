import React,  { useState } from 'react';
import { connect } from 'react-redux'
import { fetchAppointmentList } from '../redux'
import {  Modal, Button } from 'antd';

import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';

import 'antd/dist/antd.css';

const { Option } = Select;
function Addappiontment(props) {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
      };

    const handleOk = () => {
    setIsModalVisible(false);
    };
    const handleCancel = () => {
    setIsModalVisible(false);
    };  

    const onFinish = (values) => {
        let datetime = values.datetime
        let appointmen = {
            "time" : datetime.format('HH:mm:ss'),
            "type": 'success',
            "username" : values.username, 
            "gender" : values.gender, 
            "age" : values.age, 
            "year" : datetime.year(),
            "month" : datetime.format('MM'),
            "day" : Number(datetime.format('DD')),
            "date" : datetime.format('YYYY-MM-DD'),
        }
        let appointmenList = JSON.parse(localStorage.getItem('appointmens'));
        let appointmen_value = []
        if(appointmenList == null) {
            appointmenList = []
        } else {
             appointmen_value = appointmenList.filter( (event) => {
               return event.time === datetime.format('HH:mm:ss')
            } ) 
           
        }
        if(appointmen_value.length === 0) {
            appointmenList.push(appointmen);
            localStorage.setItem('appointmens', JSON.stringify(appointmenList));
        } else {
            alert('error')
        }
         props.fetchAppointmentList(appointmenList)
         setIsModalVisible(false);
         form.resetFields();
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div>
              <div className="button-space-align">
               <Button type="primary" onClick={showModal}>Add Appointment</Button>
              </div>

              <Modal  okButtonProps={{
          style: {
            display: "none",
          },
        }}  title="Appointment Form" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       
            <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                    <Form.Item
                    label="Patient Name"
                    name="username"
                    rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item name="gender" label="Gender" rules={[{ required: true,  message: 'Please input your gender!' }]} >
                    <Select
                        placeholder="Select your gender"
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                    </Select>
                    </Form.Item>

                    <Form.Item name="age" label="Age" rules={[{ required: true,  message: 'Please input your Age!' }]}>
                    <InputNumber  min={3} max={99}  />
                    </Form.Item>

                    <Form.Item name="datetime" label="Appointment Date" rules={[{ required: true,  message: 'Please input appointment date!' }]} >
                    <DatePicker showTime />
                    </Form.Item>
                

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>   
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        appointments: state.appointment
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchAppointmentList: (values) => dispatch(fetchAppointmentList(values))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    ) (Addappiontment);