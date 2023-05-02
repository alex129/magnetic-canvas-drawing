interface WiringOption {
  title: string;
  color: string;
  color_code: string;
}

const WiringOptions: { [key: number]: WiringOption } = {
  0: { title: 'PRIMARY', color: '#33E7FF', color_code: 'wiring-primary' },
  1: { title: 'SECONDARY', color: '#ebac23', color_code: 'wiring-secondary' },
};

export default WiringOptions;
