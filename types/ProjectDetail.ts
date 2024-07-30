interface FileSummary {
  fileExtension: string;
  fileId: number;
  fileSizeString: string;
};

interface LkuCodeKind {
  codeType: string;
  description: string;
};

interface FileObjectKind {
  lkuCodeId: number;
  code: string;
  description: string;
  lkuCodeTypeId: number;
  lkuCodeType: LkuCodeKind;
};

interface File extends FileSummary {
  fileName: string;
  fileSize: number;
  objectId: number;
  objectType: FileObjectKind;
  objectTypeId: number;
};

interface PrimaryImage {
  file: FileSummary;
  id: number;
  description: string;
  projectId: number;
  publishedDateString: string;
};

interface Country {
  abbreviation: string;
  countryId: number;
  name: string;
};

interface StateTerritory {
  abbreviation: string;
  country: Country;
  countryId: number;
  name: string;
  stateTerritoryId: number;
};

interface LeadOrganization {
  acronym: string;
  canUserEdit: boolean;
  city: string;
  country: Country;
  countryId: number;
  external: boolean;
  linkCount: number;
  organizationId: number;
  organizationName: string;
  organizationType: string;
  stateTerritory: StateTerritory;
  stateTerritoryId: number;
  naorganization: boolean;
  organizationTypePretty: string;
};

export interface ManagerContactInformation {
  contactId: number;
  canUserEdit: boolean;
  displayOrder?: number;
  firstName: string;
  lastName: string;
  fullName: string;
  fullNameInverted: string;
  primaryEmail: string;
  publicEmail: boolean;
  nacontact: boolean;
  middleInitial?: string;
};

interface ResponsibleMd {
  acronym: string;
  canUserEdit: boolean;
  city: string;
  external: boolean;
  linkCount: number;
  organizationId: number;
  organizationName: string;
  organizationType: string;
  naorganization: boolean;
  organizationTypePretty: string;
};

interface ParentProgram {
  acronym: string;
  active: boolean;
  programId: number;
  responsibleMd: ResponsibleMd;
  responsibleMdId: number;
  title: string;
};

interface Program {
  acronym: string;
  active: boolean;
  description: string;
  parentProgram: ParentProgram;
  parentProgramId: number;
  programId: number;
  responsibleMd: ResponsibleMd;
  responsibleMdId: number;
  title: string;
};

export interface ProjectDetail {
  // information to display on projects list page
  projectId: number;
  title: string;
  acronym: string;
  endDateString: string;
  startDateString: string;
  releaseStatusString: string;
  viewCount: number;
  description: string;
  lastUpdated: string;
  primaryImage: PrimaryImage;

  // additional information to display on project detail page
  statusDescription: string;
  leadOrganization: LeadOrganization;
  website: string;
  principalInvestigators: ManagerContactInformation[];
  programManagers: ManagerContactInformation[];
  projectManagers: ManagerContactInformation[];
  responsibleMd: ResponsibleMd;
  program: Program;
  benefits: string;

  // other information
  primaryTaxonomyNodes?: any;
  additionalTaxonomyNodes?: any;
  startTrl: any;
  currentTrl: any;
  endTrl: any;
  destinations: any[];
  startYear: any;
  startMonth: any;
  endYear: any;
  endMonth: any;
  libraryItems: any[];
  transitions: any[];
  statesWithWork: any[];
};
