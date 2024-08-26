How to install NVIDIA.run?



https://askubuntu.com/questions/841876/how-to-disable-nouveau-kernel-driver
According to the NVIDIA developer zone: Create a file

nano /etc/modprobe.d/blacklist-nouveau.conf

with the following contents:

blacklist nouveau

options nouveau modeset=0

Regenerate the kernel initramfs:

sudo update-initramfs -u

and finally: reboot

sudo reboot
---

Show driver in use

cat /proc/driver/nvidia/version
nvidia-smi
nvidia-settings -q NvidiaDriverVersion
---
https://help.ubuntu.com/community/BinaryDriverHowto/Nvidia
https://askubuntu.com/questions/799184/how-can-i-install-cuda-on-ubuntu-16-04
https://askubuntu.com/questions/1026179/how-to-install-a-gtx-1060
https://gist.github.com/zhanwenchen/e520767a409325d9961072f666815bb8
https://gist.github.com/wangruohui/df039f0dc434d6486f5d4d098aa52d07

https://github.com/NVIDIA/nvidia-docker
Make sure you have installed the NVIDIA driver and a supported version of Docker for your distribution (see prerequisites).
https://github.com/NVIDIA/nvidia-docker/wiki/CUDA

---

https://askubuntu.com/questions/149206/how-to-install-nvidia-run
As the error states, you are still running an X server. This error occurs when you try to install the Nvidia .run files while logged in.
Make sure you are logged out.

Hit Ctrl+Alt+F1 and login using your credentials.
kill your current X server session by typing sudo service lightdm stop or sudo lightdm stop
Enter runlevel 3 by typing sudo init 3
Install your *.run file.
1. you change to the directory where you have downloaded the file by typing for instance cd Downloads. If it is in another directory, go there. Check if you see the file when you type ls NVIDIA*
2. Make the file executable with chmod +x ./your-nvidia-file.run
3. Execute the file with sudo ./your-nvidia-file.run
- You might be required to reboot when the installation finishes. If not, run sudo service lightdm start or sudo start lightdm to start your X server again.
- It's worth mentioning, that when installed this way, you'd have to redo the steps after each kernel update.
---
follow the instructions on the screen:

At that point you might get a warning that " The distribution-provided pre-install script failed! are you sure that you want to continue?" You can select continue on this one.

Next it will ask you to register the kernel module source with DKMS. Select "yes"

If you dont have 32 bit compatibility the you will get a warning. Just select ok.

You might get a few more steps depends on the hardware and driver version but just before the installation finish it will ask you if you want to let the installation to run the nvidia-xconfig for you. Please let this one run unless you want and you know how to do that manually.

once you finish reboot your computer:

reboot

In case that the graphics are not as they suppose to be, open a command line and type the following:

sudo nvidia-xconfig

And then reboot again

Important note!

Some under-clocked NVIDIA graphic cards and M versions might have issues with the latest drivers. Try to use an older driver from the Nvidia archives website if the latest driver fails.