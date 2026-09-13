export interface SocialData {
  name: string;
  role: string;
  shortBio: string;
  statement: string;
  github: string;
  linkedin: string;
  email: string;
  resume: string;
  availableForProjects: boolean;
  availabilityStatus: string;
  location: string;
}

export const socialData: SocialData = {
  name: 'TAMIM',
  role: 'Engineering Student · Developer · Builder',
  shortBio: 'Engineering student building AI systems, software applications, interactive web experiences, developer tools, and automation.',
  statement: 'I BUILD DIGITAL EXPERIENCES, AI SYSTEMS, AND SOFTWARE THAT FEEL ALIVE.',
  
  // Real GitHub Profile
  github: 'https://github.com/deadsec7869',
  
  // Set to empty string until real URLs are supplied
  linkedin: '',
  email: '',
  resume: '',
  
  availableForProjects: true,
  availabilityStatus: 'OPEN FOR COLLABORATION',
  location: 'Global',
};
