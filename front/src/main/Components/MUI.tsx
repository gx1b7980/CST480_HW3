import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const StyledButton: React.FC<ButtonProps> = (props) => {
  return <CustomButton {...props} />;
};

export default StyledButton;
