import RepeatIcon from "@mui/icons-material/Repeat";
import { Box, Icon, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

const PSEHeader = () => {
  return (
    <Paper className="stretchSelf" sx={{ px: 2, py: 2, bgcolor: "#000" }}>
      <Stack spacing={4} direction="row" alignItems="center">
        <div>
          <img alt="fc" src="/img/FC.svg" />
        </div>
        <Stack
          sx={{ color: "#fff" }}
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <Icon>
            <RepeatIcon />
          </Icon>
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: 16 }}>
            Étapes de production
          </Typography>
        </Stack>
        <Box>
          <Typography sx={{ fontSize: 16, color: "rgba(255, 255, 255, 0.9)" }}>
            / Sucy - Légumerie - {dayjs.utc().format("DD/MM/YYYY")}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PSEHeader;
