import React from 'react';
import ReactDOM from 'react-dom';
import useWindowSize from '@talves/use-window-size';
import usePrevious from '@talves/use-previous'

import './styles.css';

import Size from './Size';
import SizeHeader from './SizeHeader';
import SizeWrapper from './SizeWrapper';

function App() {
  const [size, setSize] = React.useState({current: {}, previous: {}});
  const winSize = useWindowSize();
  const winPreviousSize = usePrevious(winSize)
  const [previousWinSize, setPreviousWinSize] = React.useState(winPreviousSize)

  React.useEffect(() => {
    const notEqual = JSON.stringify(winSize) !== JSON.stringify(winPreviousSize)
    console.log(`notEqual:\n  ${JSON.stringify(winSize)}\n  ${JSON.stringify(winPreviousSize)}`)
    if (notEqual) {
      // Only change previous size if not the same
      setPreviousWinSize(winPreviousSize)
    }
  }, [winSize, winPreviousSize])

  const handleSize = newSize => {
    setSize(newSize);
  };

  return (
    <div className='App'>
      <SizeWrapper style={wrapperStyle} onSizeChange={handleSize}>
        <Size title='Component Size' style={componentSizeStyle} size={size.current} />
        <Size title='Previous Size' style={previousSizeStyle} size={size.previous} />

        <h1>react-hooks-utils Demo!</h1>
        <SizeHeader key={0} title="Window Size" size={winSize} />
        <SizeHeader key={1} title="Previous Window Size" size={previousWinSize} />
      </SizeWrapper>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);


const wrapperStyle = {
  border: 'solid 1px #ff0000',
  position: 'relative',
  margin: 30,
  height: '50vh'
};
const componentSizeStyle = {
  color: 'white',
  position: 'absolute',
  padding: 3,
  left: 0,
  top: 0,
  width: 'auto',
  backgroundColor: '#ff0000',
  fontSize: 16,
  textAlign: 'center'
};
const previousSizeStyle = {
  color: 'white',
  position: 'absolute',
  padding: 3,
  left: 0,
  bottom: 0,
  width: 'auto',
  backgroundColor: '#aeaeae',
  fontSize: 16,
  textAlign: 'center'
};
