import { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';

export default function History ({ footer }) {
  const [data, setData] = useState();

  console.log('window.electronAPI', window.electronAPI)
  window?.electronAPI?.receiveSnifferData((value) => {
    setData(value)
  })

  return (
    <div>
      <SplitPane split="vertical" defaultSize={300} primary="first" minSize={250} maxSize={300}>
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%', backgroundColor: 'blue' }}>
            {/* 显示嗅探数据 */}
            { data }
          </div>
          { footer }
        </div>
        <div>456</div>
      </SplitPane>
    </div>
  )
}