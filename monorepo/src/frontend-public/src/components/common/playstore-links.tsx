import { Link } from "@mui/material";

export default function PlayStoreLinks() {
  return (
    <>
      <Link variant="subtitle1" underline="none"  color="text.primary" target="_blank" href="https://apps.apple.com/se/app/clean-green/id1570473241?l=en" rel="noreferrer">
        <img src="/images/AppStore_Swe.svg" width="140" alt="Apple Store Link"/>
      </Link>
      <Link variant="subtitle1" underline="none" sx={{ ml: 1 }} color="text.primary" target="_blank" href="https://play.google.com/store/apps/details?id=se.cleangreen.wecleangreen" rel="noreferrer">
        <img src="/images/play_store_badge.svg" width="140" alt="Play Store Link"/>
      </Link>
    </>
  );
};
