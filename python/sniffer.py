# commadn + shift + p
# Python: Select Interpreter
# python 3.10.9
import sys
import os
import selectors
import json
from scapy.all import AsyncSniffer

print("Python 脚本已经运行")
sys.stdout.flush()

selector = selectors.DefaultSelector()
sniffer = None
data_counter = 0

def start_sniffing():
    global sniffer
    print('开始嗅探')
    sys.stdout.flush()

    # 在桌面上创建一个文件
    # desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")
    # output_file_path = os.path.join(desktop_path, "sniffer_output.txt")

    def packet_handler(packet):
        global data_counter
        data_counter += 1  # 增加计数器
        packet_info = {
            "key": data_counter,
            "No": data_counter,
            "Time": packet.time,
            "Source": packet.src if hasattr(packet, 'src') else "N/A",
            "Destination": packet.dst if hasattr(packet, 'dst') else "N/A",
            "Protocol": packet.sprintf("%IP.proto%") if hasattr(packet, 'proto') else "Unknown",
            "Length": len(packet),
            "Info": packet.summary()
        }
        json_data = json.dumps(packet_info)
        print(f"DATA:{json_data}", flush=True)  # 添加前缀 "DATA:" 以便识别有效数据


    sniffer = AsyncSniffer(prn=packet_handler, promisc=True)
    sniffer.start()

def stop_sniffing():
    global sniffer
    print('停止嗅探')
    sys.stdout.flush()
    if sniffer:
        sniffer.stop()
        sniffer = None

def handle_input():
    line = sys.stdin.readline().strip()
    print(f'Received command: {line}')
    sys.stdout.flush()
    if line == 'start_sniffing':
        start_sniffing()
    elif line == 'stop_sniffing':
        stop_sniffing()

selector.register(sys.stdin, selectors.EVENT_READ, handle_input)

print('Python 子进程启动，等待命令...')
sys.stdout.flush()

while True:
    for key, mask in selector.select():
        callback = key.data
        callback()