import theme from '@theme-ui/preset-tailwind';

export default {
  ...theme,
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'primaryHover',
      },
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
    },
  },
};
