import * as React from 'react';
import { Box, Button } from 'theme-ui';

export function App(): JSX.Element {
  return (
    <Box p={4} color="white" bg="primary">
      <Button variant="primary" mr={2}>
        Beep
      </Button>
      <Button variant="secondary" mr={2}>
        Boop
      </Button>
    </Box>
  );
}
