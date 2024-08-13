import React, { useState,useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from "axios"

const Schedule = () => {
  const api = process.env.REACT_APP_BACKEND_API;
  const {currentUser } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(1);
  const [eventName,setEventName] = useState("");
  const [eventType,setEventType] = useState("");
  const [eventDescription,setEventDescription] = useState("");
  const [eventDate,setEventDate] = useState("");
  const [eventTime,setEventTime] = useState("");
  const [eventVenue,setEventVenue] = useState("");
  const [estimatedAttendees,setEstimatedAttendees] = useState(0);
  const [item1,setItem1] = useState(0);
  const [item2,setItem2] = useState(0);
  const [item3,setItem3] = useState(0);
  const userName = currentUser;

  const ref = (...args)=>{
      let str = ""
      for(let i=0;i<args.length;i++){
        if(args[i]!==0)
          str+="item-"+(i+1)+": "+args[i]+", ";  
      }
      return str.substring(0,str.length-2);
  }

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleRequest = async(e) => {
    e.preventDefault();
        await axios.post(`https://uems-backend-9uce.onrender.com/events`,{
          userName,
          eventName,
          eventType,
          eventDescription,
          eventDate,
          eventTime,
          eventVenue,
          estimatedAttendees,
          item1,
          item2,
          item3
        })
        setEventName("")
        setEventType("")
        setEventDescription("")
        setEventDate("")
        setEventTime("")
        setEventVenue("")
        setEstimatedAttendees(0)
        setItem1(0)
        setItem2(0)
        setItem3(0)
  }

  return (
    <div>
      <div className='mt-2'>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            {/* <button className={`nav-link ${activeStep === 1 ? 'active' : ''}`} type="button" onClick={()=>{setActiveStep(1)}}>Step-1</button> */}
            <button className={`nav-link ${activeStep === 1 ? 'active' : ''}`} type="button" >Step-1</button>
          </li>
          <li className="nav-item" role="presentation">
            {/* <button className={`nav-link ${activeStep === 2 ? 'active' : ''}`} type="button" onClick={()=>{setActiveStep(2)}}>Step-2</button> */}
            <button className={`nav-link ${activeStep === 2 ? 'active' : ''}`} type="button" >Step-2</button>
          </li>
          <li className="nav-item" role="presentation">
            {/* <button className={`nav-link ${activeStep === 3 ? 'active' : ''}`} type="button" onClick={()=>{setActiveStep(3)}}>Step-3</button> */}
            <button className={`nav-link ${activeStep === 3 ? 'active' : ''}`} type="button" >Step-3</button>
          </li>
          <li className="nav-item" role="presentation">
            {/* <button className={`nav-link ${activeStep === 4 ? 'active' : ''}`} type="button" onClick={()=>{setActiveStep(4)}}>Step-4</button> */}
            <button className={`nav-link ${activeStep === 4 ? 'active' : ''}`} type="button" >Step-4</button>
          </li>
        </ul>
      </div>
      {activeStep === 1 && (
        <div className="container mt-4">
          <h3>EVENT DETAILS</h3>
          <label htmlFor="name" className="form-label">Event name</label>
          <input type="text" id="name" className="form-control" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          <label htmlFor="EventType" className="form-label">Event Type</label>
          <select id="EventType" className="form-select" value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="">...</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <label htmlFor="floatingTextarea" className="form-label">Event description</label>
          <textarea className="form-control" id="floatingTextarea" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} style={{height:"150px"}}></textarea>
          <button type="button" className="btn btn-primary mt-3" onClick={handleNext}>Next</button>
        </div>
      )}
      {activeStep === 2 && (
        <div className="container mt-4">
          <h3>SLOT DETAILS</h3>
          <label htmlFor="birthday">Date:</label>
          <input type="date" id="birthday" name="birthday" value={eventDate} onChange={e => setEventDate(e.target.value)}/><br />
          <div className="mt-3">
            <label htmlFor="appt">Time:</label>
            <input type="time" id="appt" name="appt" value={eventTime} onChange={e => setEventTime(e.target.value)}/>
          </div>
          <label htmlFor="venue" className="form-label mt-3">Venue</label>
          <select id="venue" className="form-select" value={eventVenue} onChange={e => setEventVenue(e.target.value)}>
            <option value=''>...</option>
            <option value='Auditorium'>Auditorium</option>
            <option value='Ground'>Ground</option>
            <option value='Mini-Auditorium'>Mini-Auditorium</option>
            <option value='Canteen'>Canteen</option>
          </select>
          <div className="mt-3">
            <label htmlFor="estimatedAttendees" className="form-label">Estimated Attendees:</label>
            <input type="number" id="estimatedAttendees" value={estimatedAttendees} onChange={e => setEstimatedAttendees(e.target.value)} /><br />
          </div>
          <button type="button" className="btn btn-primary mt-3" onClick={handlePrevious}>Previous</button>
          <button type="button" className="btn btn-primary mt-3 ms-5" onClick={handleNext}>Next</button>
        </div>
      )}
      {activeStep === 3 && (
        <div className="container mt-4">
          <h3>REFRESHMENTS</h3>
          <label htmlFor="item1" className="form-label">Item-1</label>
          <input type="number" id="item1" value={item1} onChange={e => setItem1(e.target.value)} /><br />
          <label htmlFor="item2" className="form-label">Item-2</label>
          <input type="number" id="item2" value={item2} onChange={e => setItem2(e.target.value)} /><br />
          <label htmlFor="item3" className="form-label">Item-3</label>
          <input type="number" id="item3" value={item3} onChange={e => setItem3(e.target.value)}/><br />
          <button type="button" className="btn btn-primary mt-3" onClick={handlePrevious}>Previous</button>
          <button type="button" className="btn btn-primary mt-3 ms-5" onClick={handleNext}>Next</button>
        </div>
      )}
      {activeStep === 4 && (
        <div className="container mt-4">
          <h3>PREVIEW</h3>
          <div id="request" className="step overflow-auto">
            <div className="container my-5 mx-auto w-100">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Label</th>
                    <th scope="col">Option</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Event Name</td>
                    <td>{eventName}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Event Description</td>
                    <td>{eventDescription}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Event Type</td>
                    <td>{eventType}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Date & Time</td>
                    <td>{eventDate+"   "+eventTime}</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Venue</td>
                    <td>{eventVenue}</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>Estimated Attendees</td>
                    <td>{estimatedAttendees===0?"":estimatedAttendees}</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>Refreshments</td>
                    <td>{
                      ref(item1,item2,item3)
                      }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button type="button" className="btn btn-primary mt-3" onClick={handlePrevious}>Previous</button>
          <button type="button" className="btn btn-primary mt-3 ms-5" onClick={handleRequest}>Request</button>
        </div>
      )}
    </div>
  );
};

export default Schedule;
