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
    /**
   * function to call the getAllTickets function of service layer which retrives data from db
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
    getAllTickets = async(req, res) => {
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
    } catch(error) {
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
findTicketById =  (req, res) => {
    try {
        const ticketId = req.params.ticketId;
         return ticketBookingService.findTicketById(ticketId)
            .then((resultData) => {
                if (resultData) {
                    res.status(200).send({
                        success: true,
                        data: resultData,
                        message: "Found Ticket Details successfully!"
                    });
                } else {
                    return res.status(404).send({
                        success: false,
                        message: "Data is not available for given id"
                    });
                }
            }).then(error => {
                if (error) {
                    if (error.kind === 'ObjectId') {
                        return res.status(404).send({
                            success: false,
                            message: "Ticket not found"
                        });
                    } else {
                        return res.status(500).send({
                            success: false,
                            message: "Error retrieving ticket details"
                        });
                    }
                }
            });
    } catch (error) {
        return res.send({ message: error.message });
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
        const result =await  ticketBookingService.removeTicketById(req.params.ticketId);
            if (!result) {
                return res.status(500).send({
                    success: false,
                    message: "Error deleting ticket with id "
                });
            }
            res.status(200).send({
                success: true,
                message: result
            });
    } catch (error) {
        return res.send({
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
        //check whether request body contains 8 input properties
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
        console.log("id=",req.params.ticketId)
        const data=ticketBookingService.updateTicketDetails(req.params.ticketId, req.body);
        if(data){
            res.send({
                success: true,
                message: "Ticket Details Updated Successfully!",
                data:data
            })
        }else{
            res.send({
                success: false,
                message: "Ticket Details Not Updated!",
                data:data
            });
        }
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
};
}
module.exports = new TicketBookController();