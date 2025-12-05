const Appointment = require('../models/appointmentModel');
const asyncHandler = require('express-async-handler');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private (Requires user login)
const createAppointment = asyncHandler(async (req, res) => {
    // NOTE: In the final version, the user ID will come from the JWT token (req.user._id)
    // For now, we'll use a placeholder or assume the user is passed in the body for testing.

    const { vehicleType, serviceType, date, timeSlot, notes } = req.body;
    
    // Simple validation
    if (!vehicleType || !serviceType || !date || !timeSlot) {
        res.status(400);
        throw new Error('Please fill all required fields: Vehicle Type, Service Type, Date, and Time Slot.');
    }

    // Placeholder for user ID (Replace with req.user._id after Auth is set up)
    const userId = req.body.userId || '60c72b2f9f1b2c001c8e4d3a'; // Replace with a valid ID from your DB for initial testing

    const appointment = new Appointment({
        user: userId, 
        vehicleType,
        serviceType,
        date,
        timeSlot,
        notes: notes || '',
        status: 'Pending'
    });

    const createdAppointment = await appointment.save();
    res.status(201).json({ 
        message: 'Appointment booked successfully! Pending Admin Approval.',
        appointment: createdAppointment
    });
});


// @desc    Get appointments for a logged-in user
// @route   GET /api/appointments/myappointments
// @access  Private
const getMyAppointments = asyncHandler(async (req, res) => {
    // NOTE: Replace with req.user._id when authentication is ready
    const userId = req.body.userId || '60c72b2f9f1b2c001c8e4d3a'; 

    const appointments = await Appointment.find({ user: userId }).sort({ date: 1 });
    res.json(appointments);
});


// @desc    Get all appointments (Admin only)
// @route   GET /api/appointments
// @access  Private/Admin
const getAllAppointments = asyncHandler(async (req, res) => {
    // NOTE: This route should be protected by an 'isAdmin' middleware
    const appointments = await Appointment.find({}).populate('user', 'name email phone');
    res.json(appointments);
});


module.exports = {
    createAppointment,
    getMyAppointments,
    getAllAppointments
};