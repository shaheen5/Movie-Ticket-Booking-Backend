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
        * @param empData is data sent from Services layer
        * @return callback is used to callback Services includes error message or data
            */
   
    createTicket = async (ticketData, callback) => {
        try {
            const createdTicket = await Ticket.create({
                ticketId: ticketData.ticketId,
                customerName: ticketData.customerName,
                customerAge: ticketData.customerAge,
                movieTitle: ticketData.movieTitle,
                ticketPrice:ticketData.ticketPrice ,
                movieTime: ticketData.movieTime,
                movieLanguage:ticketData.movieLanguage,
                theatreName:ticketData.theatreName,
                creationDate:ticketData.creationDate
            });
            return createdTicket? callback(null,createdTicket): ('Something error occurred!',null);
        } catch (error) {
            return callback(error, null);
        }
    }
}
module.exports = new TicketOperations();