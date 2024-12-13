const Ticket = require("../models/ticket.model");
const Bus = require("../models/bus.model");

const newTicketInfo = async (req, res) => {
    try {
        const {busId, seatNumber} = req.body;
        const findBus = await Bus.findById({_id : busId });
        const existingTicket = await Ticket.find({busId : busId});

        if(!findBus){
            return res.status(404).send({message : "No Bus found"});
        }

        const isSeatAvailable = existingTicket.some(ticket => ticket.seatNumber === seatNumber);
    
        if (isSeatAvailable) {
            return res.status(404).send({ message: "Seat already exists" });
        } 

        const allowedSeatNumbers = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2'];
        if(!allowedSeatNumbers.includes(seatNumber)){
            return res.status(404).send({message : "Invalid Seat"});
        }
        
        const availableSeat = findBus.ticketCount;
        if(availableSeat < 0){
            return res.status(400).send({message : "No ticket available"});
        }
   
        const ticketInfo = new Ticket({
            busId,
            coachNumber : findBus.coachNumber,
            seatNumber  
            });
        const saveTicketInfo = await ticketInfo.save();
        await Bus.findOneAndUpdate({_id : busId}, {$set:{ticketCount : availableSeat-1}})
        res.status(201).send({ message: "New Ticket Information Created." });
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateTicketInfo = async(req, res)=>{
    try {
        const id = req.params.id;
        const {busId, key, data } = req.body;
        const findBus = await Bus.findById({_id : busId });
        const existingTicket = await Ticket.find({busId : busId});

        if (!id) {
            return res.status(400).send({ message: 'Enter Ticket Id!' });
        } else if (!busId || !key || !data) {
            return res.status(400).send({ message: 'Enter all the information!' });
        }

        if(!findBus){
            return res.status(404).send({message : "No Bus found"});
        }

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).send({ message: 'Ticket not found' });
        }

        if (key === 'seatNumber') {

            const isSeatAvailable = existingTicket.some(ticket => ticket.seatNumber === data);
    
            if (isSeatAvailable) {
                return res.status(404).send({ message: "Seat already exists" });
            } 

            const allowedSeatNumbers = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2'];
            if (!allowedSeatNumbers.includes(data)) {
                return res.status(400).send({ message: 'Invalid seat number' });
            }
        }

        if(!updatedTicket[key]){
            return res.status(404).send({message: "No such key found."});
        }
        const updatedTicket = await Ticket.findOneAndUpdate({ _id: id }, { $set: { [key]: data } }, { new: true });
        res.status(200).send({ message: `${key} Updated` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteTicketInfo = async(req, res)=>{
    try {
        const id = req.params.id;
        const deleteTicketData = await Ticket.findOneAndDelete({_id : id});
        const busId = deleteTicketData.busId;
        if(!deleteTicketData){
            return res.status(404).send({message : "No Ticket found"});
        }
            res.status(200).send({message : "Ticket deleted"});
            const findbus = await Bus.findOne({_id: busId})
            const ticket = findbus.ticketCount
            await Bus.findOneAndUpdate({_id : busId}, {$set:{ticketCount: ticket+1}})
    } catch (error) {
        res.status(500).send({message : error.message});
    }
};

module.exports = {newTicketInfo, updateTicketInfo, deleteTicketInfo};