let chai = require('chai');
let chaiHttp = require('chai-http');
//assertion style
var should = chai.should();
chai.use(chaiHttp);
let server = require('../server');
let testDataInput = require('../test/testData.json');
let userToken = 'myToken123';

describe('Test APIs', () => {
    /**
     * test for GET route
     */
    describe("GET tickets-> /tickets", () => {
        it("It should GET all the tickets", (done) => {
            chai.request(server)
                .get("/tickets")
                .set('Authorization', `${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eq("Successfully Retrieved All Tickets !")
                    res.body.should.have.property('data').which.is.a('array');
                    done();
                });
        });

        it("It should NOT GET all the tickets for wrong url", (done) => {
            chai.request(server)
                .get("/ticket/get/abc")
                .set('Authorization', `${userToken}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    /**
    * test for POST route for tickets
    */
    describe("POST /ticket", () => {
        it("It should add new ticket", (done) => {
            const ticket = testDataInput.addTicketData;
            chai.request(server)
                .post('/ticket')
                .send(ticket)
                .set('Authorization', `${userToken}`)
                .end((err, res) => {
                    res.should.have.be.a('object');
                    res.should.have.status(201);
                    res.body.should.have.property('success').eq(true);
                    res.body.should.have.property('message').eq("Ticket Added Succesfully!");
                    res.body.should.have.property('data');
                    done();
                });
        });

        it("It should NOT POST new ticket without the ticketId property", (done) => {
            const ticket = testDataInput.addNewTicketwithoutId
            chai.request(server)
                .post('/ticket')
                .send(ticket)
                .set('Authorization', `${userToken}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('success').eq(false);
                    res.body.should.have.property('message').eq("Invalid Input!");
                    done();
                });
        });
    });
    /**
     * test for PUT route
     */
    describe("PUT /ticket/:ticketId", () => {
        it("It should update ticket details", (done) => {
            const ticketData = testDataInput.updateTicketDetails;
            const id = testDataInput.updateTicketId.id;
            chai.request(server)
                .put('/ticket/' + id)
                .send(ticketData)
                .set('Authorization', `${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have
                        .property('message')
                        .eql('Ticket Details Updated Successfully!');
                    done();
                });
        });
    });
    /**
     * test for GET one ticket by id
     */
    describe("GET ONE ticket ->/ticket/:ticketId", () => {
        it("It should retrieve ticket details for given id", (done) => {
            const id = testDataInput.getTicketDetailsId.id;
            chai.request(server)
                .get('/ticket/' + id)
                .set('Authorization', `${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have
                        .property('message')
                        .eql("Found Ticket Details successfully!");
                    res.body.should.have.property('data').should.be.a('object');
                    done();
                });
        });

        it("It should NOT GET ticket details for wrong id", (done) => {
            const id = testDataInput.getTicketDetailsWrongId.id;
            chai.request(server)
                .get('/ticket/' + id)
                .set('Authorization', `${userToken}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('message').eql('Ticket Not Found!');
                    done();
                });
        });
    });

    /**
     * test for DELETE ticket details
     */
    describe("DELETE /ticket/:ticketId", () => {
        it("It should delete ticket details", (done) => {

            const id = testDataInput.deleteTicketId.id;
            console.log(id);
            chai.request(server)
                .delete('/ticket/' + id)
                .set('Authorization', `${userToken}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });

        it("It should NOT DELETE ticket details for wrong id", (done) => {

            const id = testDataInput.deleteIncorrectId.id;
            chai.request(server)
                .put('/ticket/' + id)
                .set('Authorization', `${userToken}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('message').eql('Error deleting ticket with id ');
                    done();
                });
        });
    });
});