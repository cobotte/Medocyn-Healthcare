import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

// Global baseline settings
const BASE_STROKE = 2;
const BASE_COLOR = 'currentColor';

const createIcon = (
  displayName: string,
  paths: React.ReactNode,
  viewBox = '0 0 24 24'
): React.FC<IconProps> => {
  const Component: React.FC<IconProps> = ({
    size = 24,
    color = BASE_COLOR,
    strokeWidth = BASE_STROKE,
    className = '',
    ...props
  }) => (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block ${className}`}
      {...props}
    >
      {paths}
    </svg>
  );
  Component.displayName = displayName;
  return Component;
};

// 1. General Medicine (Activity line on a clipboard)
export const GeneralMedicineIcon = createIcon('GeneralMedicineIcon', (
  <>
    <rect x="8" y="2" width="8" height="4" rx="1" fill="none" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M8 14h3l1-2 2 4 1-2h1" />
  </>
));

// 2. Cardiology (Heart shape with an heartbeat line inside)
export const CardiologyIcon = createIcon('CardiologyIcon', (
  <>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M6 9h2.5l1-1.5 1.5 3 1-1.5H15" />
  </>
));

// 3. Neurology (Brain lateral view representation)
export const NeurologyIcon = createIcon('NeurologyIcon', (
  <>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15A2.5 2.5 0 0 1 9.5 22h-3A4.5 4.5 0 0 1 2 17.5V14a3 3 0 0 1 3-3h1.5V9.5A4.5 4.5 0 0 1 11 5h1a2.5 2.5 0 0 1 2.5 2.5v1.5H16A4.5 4.5 0 0 1 20.5 14v2a2 2 0 0 1-2 2h-1.5v2A2.5 2.5 0 0 1 14.5 22.5" />
    <path d="M12 9h4.5a2.5 2.5 0 0 1 2.5 2.5v0" />
    <path d="M12 14H6.5a2.5 2.5 0 0 0-2.5 2.5v0" />
  </>
));

// 4. Orthopedics (Joint bone icon)
export const OrthopedicsIcon = createIcon('OrthopedicsIcon', (
  <>
    <path d="M6.5 10c1.38 0 2.5-1.12 2.5-2.5S7.88 5 6.5 5S4 6.12 4 7.5S5.12 10 6.5 10Z" />
    <path d="M17.5 10c1.38 0 2.5-1.12 2.5-2.5S18.88 5 17.5 5S15 6.12 15 7.5S16.12 10 17.5 10Z" />
    <path d="M6.5 14c1.38 0 2.5 1.12 2.5 2.5S7.88 19 6.5 19S4 17.88 4 16.5S5.12 14 6.5 14Z" />
    <path d="M17.5 14c1.38 0 2.5 1.12 2.5 2.5S18.88 19 17.5 19S15 17.88 15 16.5S16.12 14 17.5 14Z" />
    <path d="M8 7.5h8M8 16.5h8" />
    <line x1="12" y1="7.5" x2="12" y2="16.5" />
  </>
));

// 5. Pediatrics (Stroller / baby toy representation)
export const PediatricsIcon = createIcon('PediatricsIcon', (
  <>
    <circle cx="8" cy="18" r="2" />
    <circle cx="16" cy="18" r="2" />
    <path d="M12 18h2M4 18h2M18 18h2" />
    <path d="M6 16v-8a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H6" />
    <path d="M19 8h2v2" />
  </>
));

// 6. Laboratory (Test tubes rack)
export const LaboratoryIcon = createIcon('LaboratoryIcon', (
  <>
    <path d="M6 3v12M18 3v12M3 15h18M5 15v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
    <path d="M9 3v8a2 2 0 0 0 4 0V3" />
    <line x1="8" y1="3" x2="16" y2="3" />
  </>
));

// 7. Emergency (Siren / flashing light representation)
export const EmergencyIcon = createIcon('EmergencyIcon', (
  <>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </>
));

// 8. Telemedicine (Laptop with a cross inside screen)
export const TelemedicineIcon = createIcon('TelemedicineIcon', (
  <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M2 18h20v2H2z" />
    <path d="M10 10h4M12 8v4" />
  </>
));

// 9. Hospital (Clinic building)
export const HospitalIcon = createIcon('HospitalIcon', (
  <>
    <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
    <path d="M10 9h4M12 7v4" />
    <rect x="7" y="13" width="2" height="2" rx="0.5" />
    <rect x="15" y="13" width="2" height="2" rx="0.5" />
  </>
));

// 10. Doctor (Medical professional with stethoscope)
export const DoctorIcon = createIcon('DoctorIcon', (
  <>
    <circle cx="12" cy="7" r="4" />
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <path d="M8 15a4 4 0 0 0 8 0" />
    <path d="M12 11v4" />
  </>
));

// 11. Nurse (Cross cap icon)
export const NurseIcon = createIcon('NurseIcon', (
  <>
    <path d="M4 14c0-4 3-7 8-7s8 3 8 7v4H4z" />
    <path d="M2 18h20v2H2z" />
    <path d="M10 12h4M12 10v4" />
  </>
));

// 12. Calendar (Standard scheduling grid)
export const CalendarIcon = createIcon('CalendarIcon', (
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <rect x="7" y="14" width="2" height="2" />
    <rect x="11" y="14" width="2" height="2" />
    <rect x="15" y="14" width="2" height="2" />
  </>
));

// 13. Clock (Time icon)
export const ClockIcon = createIcon('ClockIcon', (
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
));

// 14. Appointment (Handshake / Stethoscope badge combination)
export const AppointmentIcon = createIcon('AppointmentIcon', (
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6M22 11h-6" />
  </>
));

// 15. Medical Report (Document with heart lines)
export const MedicalReportIcon = createIcon('MedicalReportIcon', (
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13h8M8 17h6" />
  </>
));

// 16. Prescription (Rx pad icon)
export const PrescriptionIcon = createIcon('PrescriptionIcon', (
  <>
    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
    <path d="M8 8h3c1.5 0 2.5 1 2.5 2.5S12.5 13 11 13H8v5M11 13l3 5M16 11l-3 4" />
  </>
));

// 17. Medicine (Pill container / flask representation)
export const MedicineIcon = createIcon('MedicineIcon', (
  <>
    <rect x="5" y="6" width="14" height="14" rx="2" />
    <line x1="5" y1="10" x2="19" y2="10" />
    <line x1="9" y1="6" x2="9" y2="10" />
    <line x1="15" y1="6" x2="15" y2="10" />
    <path d="M12 12v4M10 14h4" />
  </>
));

// 18. Microscope (Diagnostics lab tool)
export const MicroscopeIcon = createIcon('MicroscopeIcon', (
  <>
    <path d="M6 18h8M5 21h10" />
    <path d="M10 18V9a3 3 0 0 1 6 0v2" />
    <circle cx="10" cy="5" r="1" />
    <rect x="7" y="7" width="2" height="6" rx="1" />
  </>
));

// 19. DNA (Helix representation)
export const DnaIcon = createIcon('DnaIcon', (
  <>
    <path d="M4.5 10.5c3-1.5 6-1.5 9 0s6 1.5 9 0" />
    <path d="M4.5 13.5c3 1.5 6 1.5 9 0s6-1.5 9 0" />
    <line x1="6" y1="10" x2="6" y2="14" />
    <line x1="12" y1="11" x2="12" y2="13" />
    <line x1="18" y1="10" x2="18" y2="14" />
  </>
));

// 20. Heart (Basic medical shape)
export const HeartIcon = createIcon('HeartIcon', (
  <>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </>
));

// 21. Brain (Neuro health representation)
export const BrainIcon = createIcon('BrainIcon', (
  <>
    <path d="M9.5 2C11 2 12 3.5 12 5v14c0 1.5-1 3-2.5 3S7 20.5 7 19V5c0-1.5 1-3 2.5-3Z" />
    <path d="M14.5 2C13 2 12 3.5 12 5v14c0 1.5 1 3 2.5 3S17 20.5 17 19V5c0-1.5-1-3-2.5-3Z" />
    <path d="M7 9a3.5 3.5 0 0 0-3.5 3.5v1.5a3.5 3.5 0 0 0 3.5 3.5" />
    <path d="M17 9a3.5 3.5 0 0 1 3.5 3.5v1.5a3.5 3.5 0 0 1-3.5 3.5" />
  </>
));

// 22. Bone (Orthopedics structure)
export const BoneIcon = createIcon('BoneIcon', (
  <>
    <path d="M17 5c-1.5 0-2.5 1-2.5 2.5S15.5 10 17 10h.5l-3.5 3.5-3.5-3.5H11c1.5 0 2.5-1 2.5-2.5S12.5 5 11 5s-2.5 1-2.5 2.5S9.5 10 11 10h.5l-3.5 3.5L4.5 10H5c1.5 0 2.5-1 2.5-2.5S6.5 5 5 5s-2.5 1-2.5 2.5S3.5 10 5 10" />
    <path d="M5 14c-1.5 0-2.5 1-2.5 2.5S3.5 19 5 19h.5l3.5-3.5 3.5 3.5H13c-1.5 0-2.5-1-2.5-2.5S11.5 14 13 14h.5l3.5-3.5 3.5 3.5H20" />
  </>
), '0 0 24 24');

// 23. Patient (User outline with a heartbeat band)
export const PatientIcon = createIcon('PatientIcon', (
  <>
    <circle cx="12" cy="7" r="4" />
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <path d="M9 17h6" />
  </>
));

// 24. Health Packages (Gift/Shield package box)
export const HealthPackagesIcon = createIcon('HealthPackagesIcon', (
  <>
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1.5" y="3" width="21" height="5" rx="1" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </>
));

// 25. Medical Dashboard (Grid / Speedometer gauges)
export const MedicalDashboardIcon = createIcon('MedicalDashboardIcon', (
  <>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
  </>
));

// 26. Insurance (Protection shield with checkmark)
export const InsuranceIcon = createIcon('InsuranceIcon', (
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </>
));

// 27. Wheelchair Accessibility (Universal access)
export const AccessibilityIcon = createIcon('AccessibilityIcon', (
  <>
    <circle cx="16" cy="5" r="2" />
    <path d="M9 13V9a3 3 0 0 1 6 0v2.5M10 18a5 5 0 1 1-5-5" />
    <path d="m14 14 3 5h3" />
  </>
));

// 28. Healthcare Cloud (Cloud storage with medical cross)
export const HealthcareCloudIcon = createIcon('HealthcareCloudIcon', (
  <>
    <path d="M17.5 19A5.5 5.5 0 0 0 22 13.5a5.5 5.5 0 0 0-5.5-5.5H16a8 8 0 0 0-15.5 2 6 6 0 0 0 1.5 11.5H17.5Z" />
    <path d="M9 14h4M11 12v4" />
  </>
));

// 29. Video Consultation (Camera with cross badge)
export const VideoConsultationIcon = createIcon('VideoConsultationIcon', (
  <>
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
    <path d="M6 12h4M8 10v4" />
  </>
));

// 30. Medical Records (Document stack / folders)
export const MedicalRecordsIcon = createIcon('MedicalRecordsIcon', (
  <>
    <path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18" />
    <path d="M8 6h8M8 10h8M8 14h4" />
  </>
));
