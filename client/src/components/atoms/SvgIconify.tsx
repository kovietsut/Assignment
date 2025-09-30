import { svgSources } from "@/helpers/icons";
import type { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/material";

type Props = {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  sx?: SxProps<Theme>;
};

const SVGIconify = ({ name, style, className, sx }: Props) => {
  const SvgComponent = svgSources[name];

  if (!SvgComponent) {
    return null;
  }

  return (
    <Box style={style} className={className} sx={sx}>
      {SvgComponent}
    </Box>
  );
};

export default SVGIconify;
