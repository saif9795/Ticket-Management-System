const Bus = require("../models/bus.model");

const newBusInfo = async(req, res)=>{
    try {
        const {
            coachNumber,  
            from,
            destination, 
            departureDay,
            departureMonth,
            departureHour,
            departureMinute, 
            fare} = req.body;
        if(departureDay==null || departureDay>31 || departureDay<1 || departureMonth==null || departureMonth>12 || departureMonth<1){
            return res.status(400).send({message : "Invalid Departure Date"});
        }

        if(departureHour==null ||departureHour>23 || departureHour<0 || departureMinute==null|| departureMinute>59 || departureMinute<0){
            return res.status(400).send({message : "Invalid Departure Time"});
        }
        
        const busInfo = new Bus({
            coachNumber,
            capacity : 12,
            route : `${from} to ${destination}`,
            from,
            destination,
            departureDay,
            departureMonth,
            departureHour,
            departureMinute,
            fare, 
            availableSeats : 12,
            ticketCount : 12
    });
        const saveBusInfo = await busInfo.save();
            res.status(201).send({message : "New Bus Information Created."});
            } catch (error) {
                res.status(500).send({message : error.message});
            }
};

const updateBusInfo = async(req, res)=>{
    try {
        const id = req.params.id;
        const {key, data} = req.body;
    if(!id){
        return res.status(400).send({message : "Enter id!"});
    }
    else if(!key || !data){
        return res.status(400).send({message : "Enter key and Updated Data!"})
    }
    if(key=="departureDay"){
        if(data>31 || data<1){
            return res.status(400).send({message : "Invalid Departure Day input"});
        }
    }
    if(key =="departureMonth"){     
        if(data>12 || data<1){
            return res.status(400).send({message : "Invalid Departure Month input"});
        }
    }
    if(key=="departureHour"){
        if(data>23 || data<0){
            return res.status(400).send({message : "Invalid Departure Hour input"});
        }
    }
    if(key=="departureMinute"){
        if(data>59 || data<0){
            return res.status(400).send({message : "Invalid Departure Minute input"});
        }
    }
    
    if(!updateBusData[key]){
        return res.status(404).send({message: "No such key found."});
    }
    
    const updateBusData = await Bus.findOneAndUpdate({_id : id}, {$set: { [key]: data }},{new : true});
    res.status(200).send({message : `${key} Updated`});

    } catch (error) {
        res.status(500).send({message : error.message});
    }

};

const deleteBusInfo = async(req, res)=>{
    try {
        const id = req.params.id;
        const deleteBusData = await Bus.findOneAndDelete({_id : id});
        if(!deleteBusData){
            return res.status(404).send({message : "No Bus found"});
        }
            res.status(200).send({message : "Bus information deleted"});
    } catch (error) {
        res.status(500).send({message : error.message});
    }
};

module.exports = {newBusInfo, updateBusInfo, deleteBusInfo};