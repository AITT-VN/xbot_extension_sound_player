
"""
	Original by  https://github.com/umarsear/ESP8266-Connected-MP3-Player#
	Thank you umarsear for your great work!
	The board uses the JQ8400 MP3 audio chip. It supports 8KHz to 48KHz sampling frequencies for MP3 and WAV file format
	
	Not all commands are mapped. 
	
	Command format
	
	Each command is 8 bytes
	Pos	Descrption 	Bytes	Value
	1 	Start		1		0xAA
	2	command		1		refer manual
	3	Lenght		1		len(data 1,....,data n)
	4	data		1		see below
	5	datan   	1		optional, refer manual
	6	SM			1		checksum of lower byte of (from Start to  datan )

    See more byte code here: https://wiki.dfrobot.com/Voice_Module_SKU__DFR0534
"""
from setting import *
from utility import *
from machine import UART

class JQ8400:
    def __init__(self, port):
        rx_pin = PORTS_DIGITAL[port][0]
        tx_pin = PORTS_DIGITAL[port][1]
        self.uart = UART(1, baudrate=9600, rx=rx_pin,tx=tx_pin)
        self.port = port
    
    def split(self, num):
        return num >> 8, num & 0xFF
    
    def get_SM(self, b):
        message_length=len(b)
        bit_sum=0X00
        for i in range((message_length)):
            bit_sum += b[i]
        #print("bit_sum:",bit_sum)
        #Sum check: It is the lower 8 bits of the sum of all the previous bytes, that is, the lower 8 bits are taken after the start code is added to the data
        SM_Code=(0xAA  + bit_sum ) & 0xFF
        return SM_Code

    # Khởi tạo mảng byte ban đầu
    def command_base(self):
        command=bytearray()
        command.append(0xAA)##[0]
        command.append(0x00)##[1]
        command.append(0x00)##[2]
        command.append(0x00)##[3]
        return command

    # Phát 1 bài nhạc biếách bài hát
    def play_track(self, track_id):
        command=bytearray()
        command=self.command_base()
        command[1]=0x07
        command[2]=0x02
        HighByte, LowByte = self.split(track_id)
        command[3]=HighByte
        command.append(LowByte)
        #print("HighByte: ",HighByte)
        #print("LowByte: ",LowByte)
        b=[command[1],command[2],command[3],command[4]]
        SM_Code=self.get_SM(b) 
        command.append(SM_Code)
        self.uart.write(command)

    def play(self):
        command=bytearray()
        command=self.command_base()
        command[1]=0x02
        command[3]=0xAC
        self.uart.write(command)
    
    def pause(self):
        command=bytearray()
        command=self.command_base()
        command[1]=0x03
        command[3]=0xAD
        self.uart.write(command)

    def stop(self):
        command=bytearray()
        command=self.command_base()
        command[1]=0x04
        command[3]=0xAE
        self.uart.write(command)


    def play_next(self):
        command=bytearray()
        command=self.command_base()
        command[1]=0x06
        command[3]=0xB0
        self.uart.write(command)

    def play_previous(self):
        command=bytearray()
        command=self.command_base()
        command[1]=0x05
        command[3]=0xAF
        self.uart.write(command)

    def set_volume(self, level):
        command=bytearray()
        command=self.command_base()
        command[1]=0x13
        command[2]=0x01

        command[3]=level
        b=[command[1],command[2],command[3]]
        SM_Code=self.get_SM(b) 
        command.append(SM_Code)
        self.uart.write(command)

    def volume_up(self):
        command=bytearray()
        command=self.command_base()
        command[1]=0x14
        command[3]=0xBE
        self.uart.write(command)

    def volume_down(self):
        command=bytearray()
        command=self.command_base()
        command[1]=0x15
        command[3]=0xBF
        self.uart.write(command)

    #Switch to flash card
    #AA 0B 01 02 B8 switch to FLASH card, it will stop after switching
    def use_flash(self):
        command=bytearray()
        command=self.command_base()
        command[1]=0x0B
        command[2]=0x01
        command[3]=0x02
        command.append(0xB8) 
        self.uart.write(command)

    #Command: AA 16 03 drive letter track high track low SM
    #return: none
    #Definition of drive letter: stop after switching drive letter
    #USB:00 SD:01 FLASH:02 NO_DEVICE: FF
    #For example: AA 16 03 00 00 09 CC insert the 9th song in the U disk
    #Description: Return to the insertion point to continue playing after the insertion ends
    def insert_play(self, track_id):
        command=bytearray()
        command=self.command_base()
        command[1]=0x16
        command[2]=0x03
        command[3]=0x02
        HighByte, LowByte = self.split(track_id)
        command.append(HighByte)
        command.append(LowByte)
        b=[command[1],command[2],command[3],command[4],command[5]]
        SM_Code=self.get_SM(b)
        command.append(SM_Code)
        self.uart.write(command)

