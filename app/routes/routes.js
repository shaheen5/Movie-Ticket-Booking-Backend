module.exports = (app) => {
    const ticketController = require('../controllers/ticket');
    const helper=require('../middlewares/helper');
    
    // Create a new ticket
    app.post('/ticket',helper.authenticateToken,ticketController.createNewTicket );

    //get all tickets
    app.get('/tickets',helper.authenticateToken,ticketController.getAllTickets);

     //get ticket by id
     app.get('/ticket/:ticketId',helper.authenticateToken,ticketController.findTicketById);

     //update ticket
     app.put('/ticket/:ticketId',helper.authenticateToken,ticketController.updateTicketDetails);

     //delete ticket
     app.delete('/ticket/:ticketId',helper.authenticateToken,ticketController.removeTicket);

     //get profit summary between date range
     app.get('tickets/analytics/visited?method=db-aggregation',helper.authenticateToken,ticketController.getProfitData)

}