export type Doctor = {
  id: string;
  name: string;
  photo: string;
  doctor_introduction: string;
  specialities: { name: string }[];
  fees: string; // "₹ 500"
  experience: string; // "13 Years of experience"
  languages: string[];
  video_consult: boolean;
  in_clinic: boolean;
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url: string;
    };
  };
};
