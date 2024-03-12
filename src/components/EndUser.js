
import React, { useContext, useEffect, useState } from 'react';
import { TypeContext } from './../Context/TypeContext';

const EndUser = () => {
    const { user, logout } = useContext(TypeContext);
    const [ticketText, setTicketText] = useState('');
    const [tickets, setTickets] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const getTickets = async () => {
            try {
                const resp = await fetch('api/ticket');
                if (resp.ok) {
                    const details = resp.json();
                    setTickets(details);
                }
                else {
                    throw new Error("failed to fetch tickets.")
                }
            }catch(err){
                console.error(err);
            }
    };

    getTickets();
    }, [])

    const handleChange = (e) => {
        setTicketText(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const freshTicket = {
            id: tickets.length+1,
            text:ticketText,
            file:file?file.txt : null,
            status:'open'
        }
        
        setTickets([...tickets, freshTicket]);
        setTicketText('');
        setFile(null);
    };

    const handleTicketStatusChange =(id)=>{
        const updateticket = tickets.map((ticket)=>
            ticket.id === id ? {...ticket, status:'close'} : ticket
        );

        setTickets(updateticket);
    }
    return (
        <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={logout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Ticket Text:</label>
          <textarea value={ticketText} onChange={handleChange} />
        </div>
        <div>
          <label>Attachment:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Create Ticket</button>
      </form>

      <h2>Tickets:</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <div>{ticket.text}</div>
            {ticket.file && <div>Attachment: {ticket.file}</div>}
            <div>Status: {ticket.status}</div>
            {ticket.status === 'open' && (
              <button onClick={() => handleTicketStatusChange(ticket.id)}>
                Close/Resolve Ticket
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
    );
};

export default EndUser;