import { Box, Link, Stack, Typography } from "@mui/material";
import { Theme } from "@emotion/react";

const links = [
  {
    label: "GitHub",
    url: "https://github.com/tiavina-mika"
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/tiavina-michael-ralainirina/"
  },
  {
    label: "Youtube",
    url: "https://www.youtube.com/channel/UC0CfOprE7AOXQqeFhS2XUIQ"
  }
];

const sx = {
  footer: (theme: Theme) => ({
    borderTop: "1px solid " + theme.palette.grey[300],
    paddingTop: 1.3
  })
};

const Footer = () => {
  return (
    <Box className="flexRow spaceBetween stretchSelf" sx={sx.footer}>
      <Stack spacing={1} direction="row" flex={1}>
        {links.map((link, index) => (
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            key={link.label + index}
          >
            <Link href={link.url}>{link.label}</Link>
            {links.length - 1 !== index && <Typography>|</Typography>}
          </Stack>
        ))}
      </Stack>
      <div className="stretchSelf flexCenter flex1">
        <Typography className="grey800">
          By Tiavina Michael Ralainirina
        </Typography>
      </div>
      <div className="flexCenter stretchSelf flex1 flexEnd">
        <Typography className="flexRow center grey800">
          <Typography sx={{ mr: 1 }}>©</Typography>
          <span>{new Date().getFullYear()}</span>
        </Typography>
      </div>
    </Box>
  );
};

export default Footer;
