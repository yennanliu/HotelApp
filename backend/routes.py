from flask import Blueprint, request, jsonify
from models import db, Hotel, Booking
from app import ma
import datetime

api = Blueprint('api', __name__)

class HotelSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Hotel

hotel_schema = HotelSchema()
hotels_schema = HotelSchema(many=True)

class BookingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Booking

booking_schema = BookingSchema()
bookings_schema = BookingSchema(many=True)

@api.route('/hotels', methods=['GET'])
def get_hotels():
    all_hotels = Hotel.query.all()
    result = hotels_schema.dump(all_hotels)
    return jsonify(result)

@api.route('/hotels', methods=['POST'])
def add_hotel():
    name = request.json['name']
    location = request.json['location']
    price = request.json['price']
    new_hotel = Hotel(name=name, location=location, price=price)
    db.session.add(new_hotel)
    db.session.commit()
    return hotel_schema.jsonify(new_hotel)

@api.route('/bookings', methods=['POST'])
def add_booking():
    hotel_id = request.json['hotel_id']
    customer_name = request.json['customer_name']
    check_in_str = request.json['check_in']
    check_out_str = request.json['check_out']
    
    check_in = datetime.datetime.strptime(check_in_str, '%Y-%m-%d').date()
    check_out = datetime.datetime.strptime(check_out_str, '%Y-%m-%d').date()

    new_booking = Booking(hotel_id=hotel_id, customer_name=customer_name, check_in=check_in, check_out=check_out)
    db.session.add(new_booking)
    db.session.commit()
    return booking_schema.jsonify(new_booking)

@api.route('/bookings', methods=['GET'])
def get_bookings():
    all_bookings = Booking.query.all()
    result = bookings_schema.dump(all_bookings)
    return jsonify(result)
