const ticketModel = require('../models/ticket');

class TicketBookingService {
    /**
      * creates an ticket object by calling model methods and send response to control layer
      * @param {*} req (express property)
      * @param {*} res (express property)
      * @returns callback
      */
    addNewTicket = (ticketData, callback) => {
        try {
            ticketModel.createTicket(ticketData, (error, data) => {
                if (error) {
                    callback(error, null);
                }
                else {
                    console.log(data);
                    callback(null, data);
                }
            });
        } catch (error) {
            return callback(error, null);
        }
    }
}
module.exports = new TicketBookingService();