const { sq } = require("../../config/db.config");
const { DataTypes } = require("sequelize");


const Ticket = sq.define("ticket", {
    ticketId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    customerName: {
        type: DataTypes.STRING,
    },
    customerAge: {
        type: DataTypes.INTEGER,
    },
    movieTitle: {
        type: DataTypes.STRING,
    },
    ticketPrice: {
        type: DataTypes.INTEGER,
    },
    movieTime: {
        type: DataTypes.STRING,
    },
    movieLanguage: {
        type: DataTypes.STRING,
    },
    theatreName: {
        type: DataTypes.STRING,
    }
});

Ticket.sync().then(() => {
    console.log("User Model synced");
});

class TicketOperations {
    /**
        * @description createTicket method is to save the new ticket Data
        * @param ticketData is data sent from Services layer
        * @return callback is used to callback Services includes error message or data
            */

    createTicket = async (ticketData, callback) => {
        try {
            const createdTicket = await Ticket.create({
                ticketId: ticketData.ticketId,
                customerName: ticketData.customerName,
                customerAge: ticketData.customerAge,
                movieTitle: ticketData.movieTitle,
                ticketPrice: ticketData.ticketPrice,
                movieTime: ticketData.movieTime,
                movieLanguage: ticketData.movieLanguage,
                theatreName: ticketData.theatreName,
            });
            return createdTicket ? callback(null, createdTicket) : ('Something error occurred!', null);
        } catch (error) {
            return callback(error, null);
        }
    }
    /**
        * @description retrive all the Ticket Data from database
        * @return callback is used to callback Services with data or error message
        */
    findAllTickets = async () => {
        try {
            const tickets = await Ticket.findAll();
            return tickets;
        } catch (error) {
            console.error('Error::' + err);
        }
    }
    /**
        * @description retrive the ticket Data from postgresql DB
        * @param ticketId,  is data sent from Services layer
        * @return callback is used to callback Services with data or error message
        */
    findTicketById = (ticketId) => {
        try {
             return Ticket.findOne({ where: { ticketId: ticketId } }).then((ticketData) => {
                if(!ticketData) {
                    return "Ticket Does Not Exist!"
                }else{
                    return ticketData;
                }       
            }).catch(error=>{
                return error;
            });
        } catch (error) {
            console.error('Error::' + error);
        }
    }
    /**
       * @description Update the ticket Data by Id
       * @param ticketId, ticketData
       * @return callback is used to callback Services with data or error message
       */
    updateTicketById = async (ticketId, ticketData) => {
        let data = {};
        try {
            data = await Ticket.update({
                ticketId: ticketData.ticketId,
                customerName: ticketData.customerName,
                customerAge: ticketData.customerAge,
                movieTitle: ticketData.movieTitle,
                ticketPrice: ticketData.ticketPrice,
                movieTime: ticketData.movieTime,
                movieLanguage: ticketData.movieLanguage,
                theatreName: ticketData.theatreName,
            }, {
                where: {
                    ticketId: ticketId
                }
            });
            console.log("data=",data)
            return data;
        } catch (error) {
            console.error('Error::' + error);
        }
    }
    /**
        * @description delete the ticket Data from database
        * @param ticketId,  is data sent from services layer
        * @return callback is used to callback Services with or without error message
        */
    removeTicket = async (ticketId) => {
        let data = {};
        try {
            data = await Ticket.destroy({
                where: {
                    ticketId: ticketId
                }
            });
        } catch (err) {
            console.error('Error::' + error);
        }
        return data;
    }
}
module.exports = new TicketOperations();