const { default: mongoose } = require("mongoose");

const busSchema = new mongoose.Schema({

    coachNumber: {
        type: String,
        required: true,
        unique: true
      },
    capacity: {
        type: Number,
        required: true,
        default: 12
      },
    route: {
        type: String,
        required: true
      },
    from: {
        type: String,
        required: true
      },
    destination: {
        type: String,
        required: true
      },
    departureDay: {
        type: Number,
        required: true
      },
    departureMonth: {
        type: Number,
        required: true
      },
    departureHour:{
        type: Number,
        required: true
      },
    departureMinute:{
        type: Number,
        required: true
      },
    fare: {
        type: Number,
        required: true,
        min: [500, 'Fare must be at least 10']
      },
    availableSeats: {
        type: Number,
        default: 12
      },
    ticketCount: {
        type: Number,
        default: 12
      }
    });
    
const Bus = mongoose.model("Bus",busSchema);

module.exports = Bus;