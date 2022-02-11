import { Toolbar, Box, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  title: string;
}

const PageTitle: React.FunctionComponent<Props> = ({ title, children }) => (
  <Toolbar
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 20,
    }}
    disableGutters
  >
    <Box>
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
    </Box>
    {children ? <Box>{children}</Box> : null}
  </Toolbar>
);

export default PageTitle;
