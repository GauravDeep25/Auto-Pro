const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['Scooty', 'Motorcycle', 'Sports/Premium Bike', 'E-Rickshaw']
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['General Service', 'Repair', 'Wash & Polish', 'Battery Check', 'Breakdown']
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true // e.g., "10:00 AM - 12:00 PM"
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    notes: {
        type: String // Customer describes the issue (e.g. "Engine making weird noise")
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;