const Bus = require("../models/bus.model");
const Ticket = require("../models/ticket.model");

const getAllBus = async(req, res)=>{
    try {
        const busData = await Bus.find().select({
            _id:0,
            coachNumber : 1, 
            route : 1, 
            departureDay : 1,
            departureMonth : 1,  
            departureHour : 1,
            departureMinute : 1,
            fare : 1, 
            availableSeats : 1
        });
        res.status(200).json({busData});
        if(!busData){
            return res.status(404).send({message: "No Bus available."});
        }
    } catch (error) {
        res.status(500).send({message: error.message})
    }
};

const getTicket = async(req, res)=>{
    try {
        const {key, data} = req.body;

        if(key=="busId"){
            const ticket = await Ticket.find({busId : data});
            if(!ticket){
                return res.status(404).send({message: "No ticket found."});
            }
            res.status(200).send({data : ticket})
        }
        else if(key=="departureHour"){
            if(data>23 || data<0){
                return res.status(400).send({message: "Invalid Time"});
            }
            const buses = await Bus.find({departureHour : data});
           
            if(buses.length === 0){
                return res.status(404).send({message: "No Bus found."});
            }
            let tickets = [];
            for (const bus of buses) {
                const ticketinfo = await Ticket.find({busId : bus._id});
                tickets.push(ticketinfo)
                 
            }
            res.status(200).send({data : tickets});
        }
        else{
            return res.status(400).send({message: "Invalid key"});
        }
    } catch (error) {
        res.status(500).send({message: error.message})
    }
};

const purchaseTicket = async(req, res)=>{
    try {
        const ticketId = req.body.ticketId;
        const findTicket = await Ticket.findOne({_id : ticketId});

        if(!findTicket){
            return res.status(404).send({message: "No ticket found."});
        }
        const statusChange = await Ticket.findOneAndUpdate({_id : ticketId}, {$set:{status : "booked"}});
        res.status(200).send({message : "Ticket Purchased"})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

module.exports = {getAllBus, getTicket, purchaseTicket};