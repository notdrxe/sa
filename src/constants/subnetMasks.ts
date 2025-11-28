export interface SubnetOption {
  cidr: number;
  mask: string;
  label: string;
}

export const SUBNET_OPTIONS: SubnetOption[] = [
  { cidr: 0, mask: '0.0.0.0', label: '0 / 0.0.0.0' },
  { cidr: 1, mask: '128.0.0.0', label: '1 / 128.0.0.0' },
  // ... до 32
  { cidr: 24, mask: '255.255.255.0', label: '24 / 255.255.255.0' },
  // ...
  { cidr: 32, mask: '255.255.255.255', label: '32 / 255.255.255.255' },
];