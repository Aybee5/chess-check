export type AlphaNumeric = string | number;

export interface SelectOption {
  value: AlphaNumeric | null;
  label: string;
  icon?: string;
}

export interface ModalContent {
  title: string;
  icon: string;
  color: string;
}
