import React,  { useState, useEffect } from 'react';
import {  Modal } from 'antd';
import { connect } from 'react-redux';
import Emitter from '../emitter';

function Appointmentdetails(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    let details = props.details

    const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      useEffect(() => {
        Emitter.on('INPUT_FROM_MAIN', (newValue) =>  {
            setIsModalVisible(true);
        })
      })

    return (
        <div>
<Modal title="Appointment Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Name: {details.username}</p>
        <p>Age: {details.age}</p>
        <p>Gender: {details.gender}</p>
        <p>Appointment Date: {details.date}</p>
        <p>Appointment Time: {details.time}</p>
      </Modal>
      </div>
    );
}

const mapStateToProps = (state) => {
    return {
        details: state.appointment.details
    }
}
const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    ) (Appointmentdetails);