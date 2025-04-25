"use client";

import { useState } from "react";
import { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";

interface FilterPanelProps {
  doctors: Doctor[];
  onFilterChange: (filters: any) => void;
  onSortChange: (sortBy: string) => void;
}

const predefinedSpecialties = [
  "Dentist",
  "Gynaecologist and Obstetrician",
  "Homeopath",
  "General Physician",
  "Orthopaedic",
  "Ayurveda",
  "Dietitian/Nutritionist",
  "Audiologist",
  "Dermatologist",
  "Diabetologist",
  "Ophthalmologist",
  "General Surgeon",
  "Psychiatrist",
  "ENT",
  "Rheumatologist",
  "Paediatrician",
];

export default function FilterPanel({
  doctors,
  onFilterChange,
  onSortChange,
}: FilterPanelProps) {
  const [consultationType, setConsultationType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [specialtySearchTerm, setSpecialtySearchTerm] = useState("");

  const handleConsultationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConsultationType = event.target.value;
    setConsultationType(newConsultationType);
    onFilterChange({
      consultationType: newConsultationType,
      specialties: selectedSpecialties,
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    onSortChange(newSortBy);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties((prevSelected) => {
      const newSelected = prevSelected.includes(specialty)
        ? prevSelected.filter((item) => item !== specialty)
        : [...prevSelected, specialty];
      onFilterChange({ consultationType, specialties: newSelected });
      return newSelected;
    });
  };

  const handleSpecialtySearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpecialtySearchTerm(event.target.value);
  };

  const filteredSpecialties = predefinedSpecialties.filter((specialty) =>
    specialty.toLowerCase().includes(specialtySearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Sort By Filter */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-700">Sort By</h3>
        <div className="space-y-2">
          <label className="flex items-center text-sm">
            <input
              type="radio"
              name="sortBy"
              value="fees"
              checked={sortBy === "fees"}
              onChange={handleSortChange}
              className="mr-2 h-4 w-4 accent-primary"
            />
            Price: Low to High
          </label>
          <label className="flex items-center text-sm">
            <input
              type="radio"
              name="sortBy"
              value="experience"
              checked={sortBy === "experience"}
              onChange={handleSortChange}
              className="mr-2 h-4 w-4 accent-primary"
            />
            Experience: Most Experience First
          </label>
        </div>
      </Card>

      {/* Consultation Mode Filter */}
      <Card className="">
        <h3 className="text-sm font-semibold px-4">Filters</h3>
        <Separator className="border-1" />
        <div className="px-4">
          <div className="border-b pb-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">
              Specialties
            </h3>
            <div className="mb-2">
              <Input
                type="text"
                placeholder="Search specialties..."
                value={specialtySearchTerm}
                onChange={handleSpecialtySearch}
                className="w-full text-sm"
              />
            </div>
            <ScrollArea className="h-[150px] w-full space-y-2">
              {filteredSpecialties.map((specialty) => (
                <div
                  key={specialty}
                  className="flex items-center space-x-2 py-2"
                >
                  <Checkbox
                    id={`specialty-${specialty}`}
                    checked={selectedSpecialties.includes(specialty)}
                    onCheckedChange={() => handleSpecialtyChange(specialty)}
                  />
                  <Label
                    htmlFor={`specialty-${specialty}`}
                    className="text-sm font-normal"
                  >
                    {specialty}
                  </Label>
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Mode of Consultation</h3>
            <div className="space-y-2">
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="consultationType"
                  value="in_clinic"
                  checked={consultationType === "in_clinic"}
                  onChange={handleConsultationChange}
                  className="mr-2 h-4 w-4 accent-primary"
                />
                In Clinic
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="consultationType"
                  value="video_consult"
                  checked={consultationType === "video_consult"}
                  onChange={handleConsultationChange}
                  className="mr-2 h-4 w-4 accent-primary"
                />
                Video Consultation
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="consultationType"
                  value="all"
                  checked={consultationType === "all"}
                  onChange={handleConsultationChange}
                  className="mr-2 h-4 w-4 accent-primary"
                />
                All
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Specialty Filter with Search */}
    </div>
  );
}
