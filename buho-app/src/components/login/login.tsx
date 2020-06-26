/** @jsx jsx */
import { jsx } from 'theme-ui';
import {
  Container,
  Box,
  Label,
  Input,
  Checkbox,
  Button,
  Styled,
} from 'theme-ui';

export const Login = () => (
  <Container
    p={2}
    bg="muted"
    sx={{
      height: '100vh',
    }}
  >
    <Box
      as="form"
      onSubmit={(e) => e.preventDefault()}
      bg="white"
      p={5}
      sx={{
        borderRadius: 'lg',
        maxWidth: 'lg',
      }}
    >
      <Styled.h2>Login</Styled.h2>
      <Label htmlFor="username">Username</Label>
      <Input name="username" id="username" mb={3} />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" id="password" mb={3} />
      <Box>
        <Label mb={3}>
          <Checkbox />
          Remember me
        </Label>
      </Box>
      <Button variant="simple" mr={3}>
        Log in
      </Button>
      <Button variant="outline">Reset</Button>
    </Box>
  </Container>
);
