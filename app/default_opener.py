#!/usr/bin/env python3
#
# Native messaging examples:
#
# https://github.com/mdn/webextensions-examples/blob/master/native-messaging/app/ping_pong.py

import subprocess
import nativemessaging

while True:
    receivedMessage = nativemessaging.get_message()
    subprocess.call(['google-chrome-stable', receivedMessage['link']]);
    nativemessaging.send_message(nativemessaging.encode_message(''))
