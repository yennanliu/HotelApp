import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');
  const [hotelPrice, setHotelPrice] = useState('');
  const [bookingHotelId, setBookingHotelId] = useState('');
  const [bookingCustomerName, setBookingCustomerName] = useState('');
  const [bookingCheckIn, setBookingCheckIn] = useState('');
  const [bookingCheckOut, setBookingCheckOut] = useState('');

  useEffect(() => {
    fetchHotels();
    fetchBookings();
  }, []);

  const fetchHotels = async () => {
    const response = await axios.get('/api/hotels');
    setHotels(response.data);
  };

  const fetchBookings = async () => {
    const response = await axios.get('/api/bookings');
    setBookings(response.data);
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    await axios.post('/api/hotels', {
      name: hotelName,
      location: hotelLocation,
      price: hotelPrice,
    });
    fetchHotels();
    setHotelName('');
    setHotelLocation('');
    setHotelPrice('');
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    await axios.post('/api/bookings', {
      hotel_id: bookingHotelId,
      customer_name: bookingCustomerName,
      check_in: bookingCheckIn,
      check_out: bookingCheckOut,
    });
    fetchBookings();
    setBookingHotelId('');
    setBookingCustomerName('');
    setBookingCheckIn('');
    setBookingCheckOut('');
  };

  return (
    <div>
      <h1>Hotel Booking</h1>

      <h2>Hotels</h2>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            {hotel.name} - {hotel.location} - ${hotel.price}
          </li>
        ))}
      </ul>

      <h2>Add Hotel</h2>
      <form onSubmit={handleAddHotel}>
        <input
          type="text"
          placeholder="Name"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={hotelLocation}
          onChange={(e) => setHotelLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={hotelPrice}
          onChange={(e) => setHotelPrice(e.target.value)}
        />
        <button type="submit">Add Hotel</button>
      </form>

      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            Hotel ID: {booking.hotel_id}, Customer: {booking.customer_name}, Check-in: {booking.check_in}, Check-out: {booking.check_out}
          </li>
        ))}
      </ul>

      <h2>Add Booking</h2>
      <form onSubmit={handleAddBooking}>
        <input
          type="number"
          placeholder="Hotel ID"
          value={bookingHotelId}
          onChange={(e) => setBookingHotelId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer Name"
          value={bookingCustomerName}
          onChange={(e) => setBookingCustomerName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Check-in"
          value={bookingCheckIn}
          onChange={(e) => setBookingCheckIn(e.target.value)}
        />
        <input
          type="date"
          placeholder="Check-out"
          value={bookingCheckOut}
          onChange={(e) => setBookingCheckOut(e.target.value)}
        />
        <button type="submit">Add Booking</button>
      </form>
    </div>
  );
}

export default App;
