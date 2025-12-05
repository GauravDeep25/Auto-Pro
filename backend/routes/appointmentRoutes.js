const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getMyAppointments,
    getAllAppointments
} = require('../controllers/appointmentController');

// Public/Private access routes
router.route('/')
    .post(createAppointment)     // Create new appointment (Requires user login eventually)
    .get(getAllAppointments);    // Get ALL appointments (Requires Admin access eventually)

router.route('/myappointments')
    .get(getMyAppointments);     // Get appointments for the current user

module.exports = router;