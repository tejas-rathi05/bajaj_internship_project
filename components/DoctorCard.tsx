import React from 'react';
import { Doctor } from '../types/doctor';
import { MapPin, Building } from 'lucide-react';

interface DoctorCardProps {
    doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
    const specialtiesText = doctor.specialities
        .map(spec => spec.name)
        .join(', ');

    return (
        <div data-testid="doctor-card" className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
            <div className="flex flex-col md:flex-row">
                <div className="mr-6 mb-4 md:mb-0">
                    <img
                        src={doctor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full object-cover"
                    />
                </div>

                <div className="flex-1">
                    <h2 data-testid="doctor-name" className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h2>

                    <p data-testid="doctor-specialty" className="text-gray-600 mb-2">
                        {specialtiesText}
                    </p>

                    <p className="text-gray-700 mb-2">{doctor.doctor_introduction}</p>

                    <p data-testid="doctor-experience" className="text-gray-700 mb-4">
                        {doctor.experience}
                    </p>

                    <div className="flex items-start mb-3">
                        <Building className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                            <p className="text-gray-700 font-medium">{doctor.clinic?.name}</p>
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                                <p className="text-gray-600 text-sm">{doctor.clinic?.address?.locality}, {doctor.clinic?.address?.city}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                    <p data-testid="doctor-fee" className="text-xl font-bold text-gray-800">{doctor.fees}</p>

                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;