import { Doctor } from '@/types/doctor';

export const filterDoctorsByName = (doctors: Doctor[], searchTerm: string) => {
    return doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const filterDoctorsByConsultation = (doctors: Doctor[], type: string) => {
    if (type === 'in_clinic') {
        return doctors.filter(doc => doc.in_clinic);
    } else if (type === 'video_consult') {
        return doctors.filter(doc => doc.video_consult);
    }
    return doctors;
};

export const filterDoctorsBySpecialty = (doctors: Doctor[], specialties: string[]) => {
    if (!specialties || specialties.length === 0) {
        return doctors;
    }
    return doctors.filter(doctor =>
        doctor.specialities.some(spec => specialties.includes(spec.name))
    );
};

export const sortDoctors = (doctors: Doctor[], sortBy: string) => {
    const parseFees = (fees: string) =>
        parseFloat(fees.replace(/[^\d.]/g, ''));

    const parseExperience = (experience: string) => {
        const match = experience.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    };

    const sortedDoctors = [...doctors];

    if (sortBy === 'fees') {
        return sortedDoctors.sort(
            (a, b) => parseFees(a.fees) - parseFees(b.fees)
        );
    } else if (sortBy === 'experience') {
        return sortedDoctors.sort(
            (a, b) =>
                parseExperience(b.experience) - parseExperience(a.experience)
        );
    }

    return sortedDoctors;
};

export const getDoctorSuggestions = (doctors: Doctor[], searchTerm: string): Doctor[] => {
  if (!searchTerm.trim()) {
      return [];
  }
  const lowerSearchTerm = searchTerm.toLowerCase();
  return doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(lowerSearchTerm)
  );
};