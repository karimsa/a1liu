# Install Scripts
All of these scripts should be run locally by cloning the repository first.

## Available Scripts
The following scripts are usable:

- `shell.py` - Installs shell configurations for a working shell.
- `vim.py` - Installs Vim configurations.
- `integrations.py` installs Git and Tmux configurations.
- `setup/S` - Installs useful programs for an operating system called `S`

## Installation Instructions
The instructions below supplement the installation scripts in this directory, and
hopefully make the process easier.

### Shell
This script depends on Python 3 being installed.

1. Clone repository with `git clone https://github.com/A1Liu/config.git`
2. Install environment using `python3 install/shell.py`. Replaced files will be
   stored in `local/preconf`, under their original name.
3. Some stuff doesn't work unless you use these commands from the project root:

   ```
   tic -x config/programs/tmux-256color.terminfo
   tic -x config/programs/xterm-256color-italic.terminfo
   ```

   Not sure what they do. They also don't always work.

To undo, run `python3 install/undo/shell.py`. It'll reset your configuration to
before the install script was run. Note that this requires the appropriate files
to have been saved in `local/preconf`.

###  Vim
This script depends on Python 3 being installed.

1. Clone repository with `git clone https://github.com/A1Liu/config.git`
2. Install environment using `python3 install/vim.py`. Replaced files will be
   stored in `local/preconf`, under their original name.

To undo, run `python3 install/undo/vim.py`. It'll reset your configuration to
before the install script was run. Note that this requires the appropriate files
to have been saved in `local/preconf`.

### MacOS
1. Install XCode tools using `xcode-select --install`
2. Clone repository with `git clone https://github.com/A1Liu/config.git`
3. Remap Caps Lock to control: System Preferences > Keyboard > Keyboard > Modifier Keys

The remainder of the settings are described in `install/MacOS.md`.

### ElementaryOS
1. Install Git using `sudo apt-get install git`
2. Clone repository with `git clone https://github.com/A1Liu/config.git`
2. Install software using `. setup/elementaryos` (this will require admin access)
3. Install keybindings by going into `settings -> keyboard -> layout`
4. Set up ssh stuff with `ssh-keygen`
5. Remove bell sounds with `sudo vi /etc/inputrc`, uncommenting the line `set bell-style none`
6. Potentially diagnose and fix problems with graphics card not waking up after
   suspend
   -  https://www.reddit.com/r/elementaryos/comments/3akt9g/black_screen_after_wake_up_from_suspend/
   -  https://www.reddit.com/r/elementaryos/comments/382e76/how_to_fix_cannot_wake_up_from_suspend_issue/
7. [Set up virtual console](https://askubuntu.com/questions/982863/change-caps-lock-to-control-in-virtual-console-on-ubuntu-17)

### Windows
1. Enable developer mode and associated features (Settings -&gt; Updates &amp; Security
   -&gt; For Developers)

2. Install Chocolatey and Git (in PowerShell with admin privileges):

   ```
   Set-ExecutionPolicy Unrestricted
   iex ((New-Object System.Net.WebClient).DownloadString("https://chocolatey.org/install.ps1"))
   choco install git.install --params "/GitAndUnixToolsOnPath /WindowsTerminal" -y
   ```

2. Add ssh stuff with `ssh-keygen`

3. Clone the repository using `git clone git@github.com:A1Liu/config`

4. [Install Vim](https://github.com/vim/vim-win32-installer/releases). Make sure
   it's the 64-bit version.

5. [Download SharpKeys](https://www.randyrants.com/category/sharpkeys/) and load
   the settings stored in this repository under `compat\windows\keybindings.skl`

6. Install Python 3.8 using the [Python 3.8 installer](https://www.python.org/downloads/release/python-382/),
   and customize the install by ensuring that it's installed for all users, adding
   python to the environment variables, and not precompiling the standard library.

7. Windows is broken, so follow this to get debugging native files to work:
   https://docs.microsoft.com/en-us/visualstudio/debugger/debug-using-the-just-in-time-debugger?view=vs-2019#jit_errors

### Windows Subsystem for Linux
1. Install Windows Subsystem for Linux

   ```
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
   ```

   And then restart your computer.

2. Install a distribution of Linux, then open it, right click on the window bar,
   and select properties. Then enable "Use Ctrl+Shift+C/V as Copy/Paste"

3. Enable copy-paste functionality in Vim using
   [VcXsrv](https://sourceforge.net/projects/vcxsrv/) with its default configurations,
   then save those configurations to `$HOME\AppData\Roaming\Microsoft\Windows\Startup`
