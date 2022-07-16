import { style, keyframes } from '@vanilla-extract/css';

import { sprinkles } from '../sprinkles.css';
import { theme } from '../tokens';

const shineKeyframe = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translate(100%)' },
  '50%': { transform: 'translateX(100%)' },
});

export const skeletonCss = style([
  sprinkles({
    bg: 'black10',
    overflow: 'hidden',
    position: 'relative',
  }),
  {
    '::after': {
      animation: `${shineKeyframe} 2s linear infinite`,
      background: `linear-gradient(90deg, ${theme.colors.black10}, ${theme.colors.black6}, ${theme.colors.black10})`,
      content: '',
      height: '100%',
      position: 'absolute',
      transform: 'translateX(-100%)',
      width: '100%',
    },
  },
]);
