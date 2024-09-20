export interface IDProfile {
  id: number;
  owner_id: number;
  version: number;
  surname: string;
  name: string;
  date_of_birth: string;
  date_of_issue: string;
  place_of_origin: string;
  secret: string;
  activated: boolean;
  ceremony_time: string;
}

export type IDSession = {
  user: IDProfile;
} | null;
