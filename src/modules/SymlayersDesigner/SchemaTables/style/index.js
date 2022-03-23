import { makeStyles } from '@material-ui/core';

export { default as SchemaTablesStyles } from './SchemaTablesStyles.css';
// не знаю как реализовать ховерэффкеты через useStyles, так что юзаю и чистый css

export const style = () => ({
  'rnd-svg': {
    width: '100%'
    // display : 'block',
  },
  'rnd-background': {
    width: '100%',
    height: '100%',

    fill: 'rgba(0, 0, 0, 0)',
    // stroke: 'black'
  },

  workArea: {
    display: 'flex',
    alignItems: 'stretch',
    position: 'relative',
    height: '80vh'
  },
  minimapBackground: {
    backgroundColor: 'white',
    outline: '1px solid gray',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 10
  },
  viewportRect: {
    fill: 'rgba(0, 0, 255, 0.1)',
    stroke: 'rgba(0, 0, 255, 0.8)'
  }
});

export default makeStyles(style);
