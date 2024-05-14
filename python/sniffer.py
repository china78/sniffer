# commadn + shift + p
# Python: Select Interpreter
# python 3.10.9
import sys
import selectors
from scapy.all import AsyncSniffer
# from scapy.all import sniff

# 标志位，用于控制是否停止嗅探
sniffer = None
selector = selectors.DefaultSelector()

def start_sniffing():
    global sniffer
    print('开始嗅探')
    sys.stdout.flush()
    sniffer = AsyncSniffer(prn=lambda x: x.summary())
    sniffer.start()
    # sniff(prn=lambda x: x.summary())

def stop_sniffing():
    global sniffer
    print('停止嗅探')
    sys.stdout.flush()
    if sniffer:
        sniffer.stop()

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

while True:
    for key, mask in selector.select():
        callback = key.data
        callback()