export type CSSPropertiesWithVars = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};
