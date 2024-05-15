import { useState, useRef, useEffect } from 'react';
import { List } from 'antd'; 
import SplitPane from 'react-split-pane';
import { useSelector, useDispatch } from 'react-redux';
import { setSniff, getSniffData } from '../features/sniff/sniffSlice';

export default function History ({ footer }) {
  const listEndRef = useRef(null);
  const sniffData = useSelector(getSniffData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('----渲染组件-----', 11111)
    window?.electronAPI?.receiveSnifferData((value) => {
      console.log('--- value ---: ', value)
      dispatch(setSniff(value))
    })
  }, [])

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sniffData]);

  return (
    <div>
      <SplitPane split="vertical" defaultSize={300} primary="first" minSize={250} maxSize={300}>
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
            <List
              dataSource={sniffData}
              renderItem={item => (
                <List.Item>{item}</List.Item>
              )}
            />
            <div ref={listEndRef} />
          </div>
          { footer }
        </div>
        <div>456</div>
      </SplitPane>
    </div>
  )
}