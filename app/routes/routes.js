module.exports = (app) => {
    const ticketController = require('../controllers/ticket');
    
    // Create a new ticket
    app.post('/ticket',ticketController.createNewTicket );

   
}