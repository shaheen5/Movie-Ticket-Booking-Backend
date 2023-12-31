const { sq } = require("../../config/db.config");
const { DataTypes } = require("sequelize");
const {logger} = require('../../config/logger');

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
    },
    month: {
        type: DataTypes.STRING,
    }
});

Ticket.sync().then(() => {
    logger.info("User Model synced");
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
                month:ticketData.month
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
            logger.error('Error::' + err);
        }
    }
    /**
        * @description retrive the ticket Data from postgresql DB
        * @param ticketId,  is data sent from Services layer
        * @return callback is used to callback Services with data or error message
        */
    findTicketById = (ticketId) => {
        try {
             return Ticket.findOne({ where: { ticketId: ticketId } })
        } catch (error) {
            logger.error('Error::' + error);
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
                month:ticketData.month
            }, {
                where: {
                    ticketId: ticketId
                }
            });
            return data;
        } catch (error) {
            logger.error('Error::' + error);
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
            logger.error('Error::' + error);
        }
        return data;
    }
    calculateProfitData=async ()=>{
        try{
        const profitData = await Ticket.findAll({
            attributes: [
              'month',
              [sequelize.fn('sum', sequelize.col('ticketPrice')), 'summaryProfit'],
            ],
            group: ['month'],
          });
          console.log(profitData);
          return profitData;
        }catch (err) {
            logger.error('Error::' + error);
        }
    }
}
module.exports = new TicketOperations();