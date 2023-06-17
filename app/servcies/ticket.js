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
    /**
  * /retrieve and return all tickets from the database.
 * @param {*} object
  */
    async findAllTickets() {
        try {
            const allTickets = await ticketModel.findAllTickets();
            return allTickets;
        } catch (error) {
            return error;
        }
    };

    /**
   * find a single ticket with a ticketId
   * @param {*} ticketId path to the employee object
   * @param {*} callback callback function
   * @returns promise, object
   */
    findTicketById = (ticketId) => {
        try {
            return ticketModel.findTicketById(ticketId)
                .then(ticketData => {
                    if (!ticketData) {
                        return "Data not found!";
                    } else {
                        // logger.info(addressBookData);
                        return ticketData;
                    }
                }).catch(error => {
                   // logger.error(error.message);
                    return "Some error occured while retrieving ticket"
                });
        } catch (error) {
            return error.message;
        }
    }
    /**
  * deletes ticket data with ticketId
  * @param {*} ticketId path to the object
  * @param {*} callback callback function
  * @returns 
  */
    removeTicketById = async (ticketId) => {
        try {
           return await ticketModel.removeTicket(ticketId);
        } catch (error) {
            return error.message;
        }
    }
    /**
     * Updating ticket data
     * @param {*} ticketId id object
     * @param {*} ticketData data object
     * @param {*} callback function
     */
    updateTicketDetails = (ticketId, ticketData) => {
        try {
            return ticketModel.updateTicketById(ticketId, ticketData);
        } catch (error) {
            return error.message;
        }
    };
}
module.exports = new TicketBookingService();