const ticketBookingService = require('../servcies/ticket');
const ticketBookValidator = require('../middlewares/ticketValidation');

class TicketBookController {
    /**
  * function to validate request body received from client and call service createNewContact function
  * @param {*} req (express property)
  * @param {*} res (express property)
  * @returns HTTP status and object
  */

    createNewTicket = (req, res) => {
        try {
            //check whether request body input length is 4 
            if (Object.keys(req.body).length != 8) {
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
}
module.exports = new TicketBookController();