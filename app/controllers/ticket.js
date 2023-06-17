const ticketBookingService = require('../servcies/ticket');
const ticketBookValidator = require('../middlewares/ticketValidation');

class TicketBookController {
    /**
  * function to validate request body received from client and call service createNewTicket function
  * @param {*} req (express property)
  * @param {*} res (express property)
  * @returns HTTP status and object
  */

    createNewTicket = (req, res) => {
        try {
            //check whether request body input length is 9 
            if (Object.keys(req.body).length != 9) {
                return res.status(400).send({ success: false, message: "Invalid Input!" });
            }
            //validate req body 
            let validationResult = ticketBookValidator.validate(req.body);
            if (validationResult.error) {
                return res.status(400).send({
                    success: false,
                    message: validationResult.error.details[0].message
                });
            }
            ticketBookingService.addNewTicket(req.body, (error, resultData) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: "Some error occurred while creating Ticket."
                    });
                }
                else {
                    return res.status(201).send({
                        success: true,
                        data: resultData,
                        message: "Ticket Added Succesfully!"
                    });
                }
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    }
    /**
   * function to call the getAllTickets function of service layer which retrives data from db
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
    getAllTickets = async (req, res) => {
        try {
            const contacts = await ticketBookingService.findAllTickets();
            if (!contacts) {
                return res.status(404).send("There are no tickets created yet!");
            } else {
                return res.status(200).send({
                    success: true,
                    data: contacts,
                    message: "Successfully Retrieved All Tickets !"
                });
            }
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };
    /**
    * function to call the findTicketById function of service that gets the required addressbook data from db
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and employee object
    */
    findTicketById = async (req, res) => {
        try {
            const ticketId = req.params.ticketId;
            const resultData = await ticketBookingService.findTicketById(ticketId);
            if (resultData == null) {
                return res.status(404).send({
                    success: false,
                    message: 'Ticket Not Found!'
                });
            } else {
                res.status(200).send({
                    success: true,
                    message:'Found Ticket Details successfully!',
                    data: resultData,
                });
            }

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };
    /**
    * function to call the removeTicketById function of service layer that deletes
    *  the required ticket data from the db 
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and object
    */
    removeTicket = async (req, res) => {
        try {
            const result = await ticketBookingService.removeTicketById(req.params.ticketId);
            if (!result) {
                return res.status(400).send({
                    success: false,
                    message: "Error deleting ticket with id "
                });
            }
            res.status(200).send({
                success: true,
                message: result
            });
        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }
    };
    /**
    * function to call the update function that updates the required ticket data from db
    * @param {*} req (express property)
    * @param {*} res (express property)
    * @returns HTTP status and object
    */
    updateTicketDetails = (req, res) => {
        try {
            //check whether request body contains 9 input properties
            if (Object.keys(req.body).length != 9) {
                return res.status(400).send({ success: false, message: "Invalid Input!" });
            }
            //validate req body 
            let validationResult = ticketBookValidator.validate(req.body);
            if (validationResult.error) {
                return res.status(400).send({
                    success: false,
                    message: validationResult.error.details[0].message
                });
            }
            const data = ticketBookingService.updateTicketDetails(req.params.ticketId, req.body);
            if (data) {
                res.status(200).send({
                    success: true,
                    message: "Ticket Details Updated Successfully!",
                })
            } else {
                res.status(304).send({
                    success: false,
                    message: "Ticket Details Not Modified!",
                });
            }
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    };
    /**
   * function to get analytics for profit summary
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
    getProfitData = async (req, res) => {
        try {
            const resultData = await ticketBookingService.getProfitData();
            res.status(200).send({
                success: true,
                data: resultData,
            });

        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}
module.exports = new TicketBookController();