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
  name: 'MUHAMMED TAMIM BAIG',
  role: 'Engineering Student · Developer · Builder',
  shortBio: 'Engineering student at Visvesvaraya Institute Of Advanced Technology exploring the intersection of machine intelligence, robust backend infrastructure, and computational craft.',
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
