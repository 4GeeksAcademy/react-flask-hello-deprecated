import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import './EventCreation.css';
function getTokenAndUserInfo() {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
      console.error('Token not found in localStorage.');
      return null;
  }

  // Retrieve the user info from localStorage
  const userInfo = localStorage.getItem('user_info');
  
  if (!userInfo) {
      console.error('User info not found in localStorage.');
      return null;
  }

  // Parse the user info from JSON
  const parsedUserInfo = JSON.parse(userInfo);

  // Optionally, you could decode the token here to validate or inspect it (if needed)
  const decodedToken = decodeJwt(token);

  return {
      token,
      userInfo: parsedUserInfo,
      decodedToken
  };
}

// Function to decode JWT token (if needed)
function decodeJwt(token) {
  try {
      // JWTs are composed of three parts: header, payload, and signature
      const payload = token.split('.')[1];

      // Decode the base64-encoded payload and parse as JSON
      const decodedPayload = JSON.parse(atob(payload));

      return decodedPayload;
  } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
  }
}


const EventCreation = ({ session }) => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with a valid Date object
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null); // For displaying errors

  const { token, userInfo, decodedToken } = getTokenAndUserInfo();
  console.log("userInfo", userInfo)

  // Fetch events on mount and whenever the provider_token changes
  useEffect(() => {
    async function fetchEvents() {
     
      const url = `https://effective-space-trout-vgvrqw54744fw95p-3001.app.github.dev/api/events/user/${userInfo?.id}`;
    
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
    
        if (!response.ok) {
          throw new Error(`Error al obtener los eventos: ${response.statusText}`);
        }
    
        const eventsData = await response.json();
      const eventsMap = eventsData.reduce((acc, event) => {
        const eventDate = new Date(event.fecha).toISOString().split('T')[0]; // Extract YYYY-MM-DD
        if (!acc[eventDate]) {
          acc[eventDate] = [];
        }
        acc[eventDate].push(event);
        return acc;
      }, {});

      setEvents(eventsMap);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
        setError(error.message); // Capture error to display it to the user
      }
    }

    // if (session?.provider_token) {
      fetchEvents(); // Fetch events when the token is available
    //}
  }, [session?.provider_token, refetch]);

  // Handle event creation and force fetch after successful creation
  async function createCalendarEvent() {
    console.log("Creating calendar event");
  
    // Example of getting the weather (clima). In a real app, you could fetch this from an API.
    const clima = "Sunny"; // Placeholder for weather data, replace with actual weather fetching logic.
  
    // Ensure we have a valid userInfo and session data
    // if (!userInfo || !session?.provider_token) {
    //   console.error("User info or session token is missing.");
    //   setError("User info or session token is missing.");
    //   return;
    // }
  
    const event = {
      'title': eventName,  // Mapping event name to 'titulo'
      'description': eventDescription,  // Mapping description to 'descripcion'
      'clima': clima,  // Using the placeholder 'clima' value (weather)
      'usuario_id': userInfo.id,  // Mapping user ID
      'date': start.toISOString(),  // Passing the start date as 'fecha'
    };
  
    try {
      const response = await fetch("https://effective-space-trout-vgvrqw54744fw95p-3001.app.github.dev/api/events", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event), // Send the event data in the body
      });
  
      if (!response.ok) {
        throw new Error(`Error creating event: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Event created:", data);
  
      setRefetch((prev) => !prev); // Trigger a refetch after successful creation
      setIsModalOpen(false); // Close modal after event creation
    } catch (error) {
      console.error("Error creating event:", error);
      setError(error.message); // Capture error for user feedback
    }
  }
  // Handle when a user selects a day on the calendar
  const handleDayClick = (day) => {
    const selectedDate = new Date(day);
    // Sumar un día a la fecha seleccionada
    selectedDate.setDate(selectedDate.getDate() + 1);
  
    // Inicializar start y end a medianoche y último momento del día
    const newStart = new Date(selectedDate);
    newStart.setHours(0, 0, 0, 0); // Set to midnight
  
    const newEnd = new Date(selectedDate);
    newEnd.setHours(23, 59, 59, 999); // Set to end of day
  
    setStart(newStart);
    setEnd(newEnd);
    setSelectedDate(selectedDate); // Store the selected date as a Date object
    setIsModalOpen(true); // Open modal when a day is clicked
  };
  
  // Render the calendar grid
  const renderCalendarGrid = () => {
    const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return (
      <div className="calendar-grid">
        {daysArray.map(day => {
          const dayStr = `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const dayEvents = events[dayStr] || [];

          return (
            <div
              key={day}
              className="calendar-day"
              onClick={() => handleDayClick(dayStr)} // Call handleDayClick on click
            >
              <span>{day}</span>
              {dayEvents.length > 0 && (
                <div className="events">
                  {dayEvents.map((event, idx) => (
                    <div key={idx} className="event">{event.titulo}</div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
  };

  return (
    <div className="container">
      <h2>Hey there </h2>

      {/* Display error if fetching events failed */}
      {error && <div className="error">{error}</div>}

      {/* Calendar View */}
      <div>
        <h3>{start.toLocaleString('default', { month: 'long' })} {start.getFullYear()}</h3>
        {renderCalendarGrid()}
      </div>

      {/* Modal for Event Form */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create Event"
        customStyles={customStyles}
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <h3>Create Event for {selectedDate.toLocaleDateString()}</h3> {/* Display selected date */}
        <div>
          <label>Start of your event</label>
          <DatePicker
            onChange={setStart}
            selected={start}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <div>
          <label>End of your event</label>
          <DatePicker
            onChange={setEnd}
            selected={end}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <div>
          <label>Event name</label>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </div>
        <div>
          <label>Event description</label>
          <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
        </div>
        <hr />
        <div className="modal-actions">
          <button type="button" onClick={createCalendarEvent}>Create Calendar Event</button>
          <button className="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default EventCreation;
