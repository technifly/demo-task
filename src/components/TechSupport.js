
import React, { useState, useEffect, useContext } from 'react';
import { TypeContext } from './../Context/TypeContext';

const TechSupport = () => {
  const { user, logout } = useContext(TypeContext);
  const [tickets, setTickets] = useState([]);

  // Fetch tickets when component mounts
  useEffect(() => {
    // fetch tickets from backend
    const fetchTickets = async () => {
      try {
        // Replace with actual API call to fetch assigned tickets for the tech support user
        const resp = await fetch('/api/assigned-tickets');
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

  const handleTicketStatusChange = (id) => {
    // to mark ticket as closed or resolved logic
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: 'closed' } : ticket
    );

    // update tickets state
    setTickets(updatedTickets);
  };

  const handleAnswerTicket = (id) => {
    //  answer ticket logic
    const answer = prompt('Enter your answer:');
    // update tickets state
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id
        ? {
            ...ticket,
            answer,
            status: 'resolved', // Assuming answering a ticket resolves it
          }
        : ticket
    );

    // Update tickets state
    setTickets(updatedTickets);
  };

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={logout}>Logout</button>

      <h2>Assigned Tickets:</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <div>{ticket.text}</div>
            {ticket.file && <div>Attachment: {ticket.file}</div>}
            <div>Status: {ticket.status}</div>
            {ticket.status === 'open' && (
              <>
                <button onClick={() => handleAnswerTicket(ticket.id)}>
                  Answer Ticket
                </button>
                <button onClick={() => handleTicketStatusChange(ticket.id)}>
                  Close/Resolve Ticket
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechSupport;