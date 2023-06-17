module.exports = (app) => {
    const ticketController = require('../controllers/ticket');
    
    // Create a new ticket
    app.post('/ticket',ticketController.createNewTicket );

    //get all tickets
    app.get('/tickets',ticketController.getAllTickets);

     //get ticket by id
     app.get('/ticket/:ticketId',ticketController.findTicketById);

     //update ticket
     app.put('/ticket/:ticketId',ticketController.updateTicketDetails);

     //delete ticket
     app.delete('/ticket/:ticketId',ticketController.removeTicket);

   
}