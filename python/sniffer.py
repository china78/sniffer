# commadn + shift + p
# Python: Select Interpreter
# python 3.10.9
import sys
import os
import selectors
from scapy.all import AsyncSniffer

print("Python 脚本已经运行")
sys.stdout.flush()

selector = selectors.DefaultSelector()
sniffer = None

def start_sniffing():
    global sniffer
    print('开始嗅探')
    sys.stdout.flush()

    # 在桌面上创建一个文件
    desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")
    output_file_path = os.path.join(desktop_path, "sniffer_output.txt")

    # 打开文件并追加写入
    output_file = open(output_file_path, 'a')

    def packet_handler(packet):
        summary = packet.summary()
        print(summary, flush=True)  # 继续打印到控制台
        output_file.write(summary + '\n')  # 写入文件
        output_file.flush()  # 确保及时写入磁盘


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