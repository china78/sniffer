import './App.css';
import { Button } from 'antd';
import SplitPane from 'react-split-pane';

function App() {
  return (
    <div className="App">
      <SplitPane split="vertical" defaultSize="40%" primary="first">
        <div>123</div>
        <div>456</div>
      </SplitPane>
    </div>
  );
}

export default App;
