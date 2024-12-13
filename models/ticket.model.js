const { default: mongoose } = require("mongoose");

const ticketSchema = new mongoose.Schema({

    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    coachNumber: {
        type: String,
        required: true
      },
    seatNumber: {
        type: String,
        enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2','E1', 'E2', 'F1', 'F2'],
        required: true
    },
    bookingDate: {
        type: Date,
        default : Date.now
    },
    status: {
        type: String,
        enum: ['booked', 'vacant'],
        default: 'vacant'
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;