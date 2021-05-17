import styled from '@emotion/styled';
import { theme } from 'core/theme';

const StyledForm = styled.form`
  max-height: ${theme.sizes.sm};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  > div {
    margin: ${theme.space[3]} auto;
    width: 100%;
    max-width: ${theme.sizes.md};
  }
`;

const StyledInput = styled.input`
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.white};
  background: ${theme.colors.white};
  padding: ${theme.space[2]} ${theme.space[3]};
  margin-top: ${theme.space[1]};
`;

const StyledTextarea = styled.textarea`
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.white};
  background: ${theme.colors.white};
  padding: ${theme.space[2]} ${theme.space[3]};
  margin-top: ${theme.space[1]};
`;

const StyledSelect = styled.select`
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.white};
  background: ${theme.colors.white};
  padding: ${theme.space[2]} ${theme.space[3]};
  margin-top: ${theme.space[1]};
`;

const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export {
  StyledForm,
  StyledFormGroup,
  StyledInput,
  StyledTextarea,
  StyledSelect,
};
