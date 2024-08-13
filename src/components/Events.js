import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = () => {
  const api = process.env.REACT_APP_BACKEND_API;

  
  const [pastEvents, setPastEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`https://uems-backend-9uce.onrender.com/events`); 
        const events = response.data;
        const now = new Date();

        const past = [];
        const ongoing = [];
        const upcoming = [];

        events.forEach((event) => {
          const eventDate = new Date(event.date);
          if (eventDate.toLocaleDateString() === now.toLocaleDateString()) {
            ongoing.push(event);
          } else if (eventDate < now) {
            past.push(event);
          } else if(eventDate > now) {
            upcoming.push(event);
          }
        });

        setPastEvents(past);
        setOngoingEvents(ongoing);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error("Error fetching events data:", error);
      }
    };

    fetchEvents();
  }, []);

  const renderAccordionItems = (events) =>
    events.map((event, index) => (
      <div className="accordion-item" key={event._id}>
        <h2 className="accordion-header" id={`heading${index}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${index}`}
            aria-expanded="false"
            aria-controls={`collapse${index}`}
          >
            {event.name}
          </button>
        </h2>
        <div
          id={`collapse${index}`}
          className="accordion-collapse collapse"
          aria-labelledby={`heading${index}`}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">{event.description}</div>
        </div>
      </div>
    ));

  return (
    <div className="container mt-2">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="past-tab"
            data-bs-toggle="tab"
            data-bs-target="#past-tab-pane"
            type="button"
            role="tab"
            aria-controls="past-tab-pane"
            aria-selected="true"
          >
            Past Events
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="ongoing-tab"
            data-bs-toggle="tab"
            data-bs-target="#ongoing-tab-pane"
            type="button"
            role="tab"
            aria-controls="ongoing-tab-pane"
            aria-selected="false"
          >
            Ongoing Events
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="upcoming-tab"
            data-bs-toggle="tab"
            data-bs-target="#upcoming-tab-pane"
            type="button"
            role="tab"
            aria-controls="upcoming-tab-pane"
            aria-selected="false"
          >
            Upcoming Events
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="past-tab-pane"
          role="tabpanel"
          aria-labelledby="past-tab"
          tabIndex="0"
        >
          <div className="accordion" id="accordionFlushExample">
            {renderAccordionItems(pastEvents)}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="ongoing-tab-pane"
          role="tabpanel"
          aria-labelledby="ongoing-tab"
          tabIndex="1"
        >
          <div className="accordion" id="accordionExample">
            {renderAccordionItems(ongoingEvents)}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="upcoming-tab-pane"
          role="tabpanel"
          aria-labelledby="upcoming-tab"
          tabIndex="2"
        >
          <div className="accordion" id="accordionExample">
            {renderAccordionItems(upcomingEvents)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;

