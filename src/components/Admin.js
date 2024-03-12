
import React, { useState, useEffect, useContext } from 'react';
import { TypeContext } from './../Context/TypeContext';

const Admin = () => {
  const { user, logout } = useContext(TypeContext);
  const [tickets, setTickets] = useState([]);

  
  useEffect(() => {
    //fetch tickets from backend
    const fetchTickets = async () => {
      try {
        // api call to fetch all tickets
        const resp = await fetch('/api/all-tickets');
        if (resp.ok) {
          const data = await resp.json();
          setTickets(data);
        } else {
          throw new Error('Failed to fetch tickets');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickets();
  }, []);

  const handleTicketStatusChange = (id, status) => {
    // to mark ticket as closed or resolved logic
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status } : ticket
    );

    // update tickets state
    setTickets(updatedTickets);
  };

  const handleAssignTechSupport = (id) => {
    //  assign/change tech support logic
    const newTechSupport = prompt('Enter tech support username:');
    // update tickets state
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, techSupport: newTechSupport } : ticket
    );

    // update tickets state
    setTickets(updatedTickets);
  };

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={logout}>Logout</button>

      <h2>All Tickets:</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <div>{ticket.text}</div>
            {ticket.file && <div>Attachment: {ticket.file}</div>}
            <div>Status: {ticket.status}</div>
            <div>Tech Support: {ticket.techSupport}</div>
            {ticket.status === 'open' && (
              <>
                <button onClick={() => handleAssignTechSupport(ticket.id)}>
                  Assign Tech Support
                </button>
                <button onClick={() => handleTicketStatusChange(ticket.id, 'closed')}>
                  Close Ticket
                </button>
              </>
            )}
            {ticket.status === 'resolved' && (
              <button onClick={() => handleTicketStatusChange(ticket.id, 'closed')}>
                Resolve Ticket
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;