import React, { useState, useEffect } from 'react';
import { createStore } from 'redux'
import { connect } from 'react-redux'
import { getAppointmentList, apponeintmentDetails  } from '../redux'
import { Calendar, Badge } from 'antd';
import { useHistory } from "react-router-dom";
import Emitter from '../emitter';
  
  function getDaysInMonth (month,year) {
   return new Date(year, month, 0).getDate();
  };

  
  function getMonthData (value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  function monthCellRender (value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

function getRoute(path) {
    let args = Array.prototype.slice.call(arguments, 1);
    let count = -1;
    return path.replace(/:[a-zA-Z?]+/g, function (match) {
        count += 1;
        return args[count] !== undefined ? args[count] : match;
    });
};
  
  function Appiontmentlist (props) {
    
    const history = useHistory();
    function onPanelChange (value, mode) {
      history.push(getRoute('/year/:year/month/:month', value.format('YYYY'), value.format('MM')))
    }

      let appointments = [] 
    useEffect(() => {
        if(Array.isArray(appointments) && appointments.length == 0){
            props.getAppointmentList()
            }
    })
  appointments = props.appointments.appointments
 
  
  function dateCellRender (value) {
    let currentmonth = []
    if(Array.isArray(appointments) && appointments.length != 0){
     appointments.map(item => {
      if(item.year === value.year() && Number(item.month) === value.month() + 1 &&  item.day === value.date())  {
        currentmonth.push(item)
      }
    })
  }

    currentmonth.sort(function (a, b) {
      return a.time.localeCompare(b.time);
  });
    return (
      <ul className="events">
         {currentmonth.map(item => (
          <li key={item.time}>
            <Badge status={item.type} text={item.username}  value={item.time} id={item.date} onClick={onclickformodel}  />
          </li>
         ) )}
      </ul>
    );
  }

 function onclickformodel(event) {
   let date = event.target.parentNode.getAttribute("id")
   let time = event.target.parentNode.getAttribute("value")
   let appointments = props.appointments.appointments
   appointments.map( item => {
     if(item.time == time && item.date == date) {
      props.apponeintmentDetails(item)
      Emitter.emit('INPUT_FROM_MAIN', item)
       console.log(item)
     }
   })
    
  }

        return (
            <div>
                   <Calendar  
                  dateCellRender={dateCellRender}
                  monthCellRender={monthCellRender} 
                  onPanelChange={onPanelChange} 
                  
                  />
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
        getAppointmentList: () => dispatch(getAppointmentList()),
        apponeintmentDetails: (values) => dispatch(apponeintmentDetails(values))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )  (Appiontmentlist);