import { useState, useRef, useEffect } from 'react';
import { Table, Tree } from 'antd'; 
import SplitPane from 'react-split-pane';
import { useSelector, useDispatch } from 'react-redux';
import { setSniff, getSniffData, setCurrentSniffDetails, getCurrentSniffDes } from '../features/sniff/sniffSlice';

const columns = [
  { title: 'No', dataIndex: 'No', key: 'No' },
  { title: 'Time', dataIndex: 'Time', key: 'Time' },
  { title: 'Source', dataIndex: 'Source', key: 'Source' },
  { title: 'Destination', dataIndex: 'Destination', key: 'Destination' },
  { title: 'Protocol', dataIndex: 'Protocol', key: 'Protocol' },
  { title: 'Length', dataIndex: 'Length', key: 'Length' },
  { title: 'Info', dataIndex: 'Info', key: 'Info' },
];

export default function History ({ footer }) {
  const listEndRef = useRef(null);
  const sniffData = useSelector(getSniffData);
  const currentSniffDes = useSelector(getCurrentSniffDes);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSniff = (values) => {
      values.forEach(value => {
        if (value.startsWith("DATA:")) {
          try {
            const validData = JSON.parse(value.substring(5)); // 去掉前缀 "DATA:"
            dispatch(setSniff(validData));
          } catch (error) {
            console.error('Error parsing JSON data:', error);
          }
        }
      });
    }
    window?.electronAPI?.receiveSnifferData(handleSniff);
    return () => {
      window?.electronAPI?.offSniffData();
    };
  }, [])

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sniffData]);

  function parseDataToTree(data) {
      // 解析数据为对象结构
      const parsedData = {};
      const sections = data.split("###");
      let currentSection = '';
      sections.forEach(section => {
          if (section.trim().startsWith('[')) {
              currentSection = section.trim();
              parsedData[currentSection] = {};
          } else {
              const lines = section.trim().split('\n');
              lines.forEach(line => {
                  const [key, value] = line.trim().split('=');
                  if (key && value) {
                      parsedData[currentSection][key.trim()] = value.trim();
                  }
              });
          }
      });

      // 转换为treeData格式
      const treeData = [];
      for (const section in parsedData) {
          const sectionData = parsedData[section];
          const sectionTitle = section.replace(/#/g, '').trim();
          const sectionKey = sectionTitle.replace(/ /g, '-');
          const children = [];
          for (const key in sectionData) {
              const title = `${key}: ${sectionData[key]}`;
              const childKey = `${sectionKey}-${key.replace(/ /g, '-')}`;
              children.push({ title, key: childKey });
          }
          treeData.push({ title: sectionTitle, key: sectionKey, children });
      }

      return treeData;
  }

  // 示例数据
  // const data = "###[ Ethernet ]### \n  dst       = 00:00:00:00:04:11\n  src       = a0:78:17:6b:fe:9d\n  type      = IPv4\n###[ IP ]### \n     version   = 4\n     ihl       = 5\n     tos       = 0x0\n     len       = 52\n     id        = 0\n     flags     = DF\n     frag      = 0\n     ttl       = 64\n     proto     = tcp\n     chksum    = 0x6f1f\n     src       = 30.129.194.228\n     dst       = 149.50.85.13\n     \\options   \\\n###[ TCP ]### \n        sport     = 57057\n        dport     = https\n        seq       = 1797523286\n        ack       = 315274216\n        dataofs   = 8\n        reserved  = 0\n        flags     = A\n        window    = 1976\n        chksum    = 0xb44b\n        urgptr    = 0\n        options   = [('NOP', None), ('NOP', None), ('Timestamp', (979416961, 3832479481))]\n";

  // 调用方法并输出结果
  const treeData = parseDataToTree(currentSniffDes);
  // console.log('treeData: ', treeData);


  return (
    <SplitPane style={{ height: 'calc(100vh - 39px)' }} split="vertical" defaultSize={'50%'} primary="first" minSize={250}>
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%', height: 'calc(100vh - 108px)', overflow: 'auto' }}>
          <Table
            columns={columns}
            dataSource={sniffData}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  console.log('record: ', record)
                  dispatch(setCurrentSniffDetails(record?.details))
                }
              }
            }}
          />
          <div ref={listEndRef} />
        </div>
        { footer }
      </div>
      <div style={{ height: 'calc(100vh - 50px)', overflow: 'auto' }}>
        <Tree
          onSelect={() =>{}}
          onCheck={() =>{}}
          treeData={treeData}
        />
      </div>
    </SplitPane>
  )
}