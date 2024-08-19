import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type TResponsiveButtonText = {
  mobileText: string;
  desktopText: string;
};

const ResponsiveButtonText = ({
  mobileText,
  desktopText,
}: TResponsiveButtonText) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return isMobile ? mobileText : desktopText;
};

export const uiUtils = { ResponsiveButtonText };
