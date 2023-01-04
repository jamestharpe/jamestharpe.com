---
date: 2021-09-30T05:55:11-04:00
description: "A quick fix to permanently remove pinned taskbar items that keep returning after a restart"
tags: [ "windows" ]
title: "Permanent removal of Windows taskbar pinned items"
---

# How to permanently remove pinned items from the Windows taskbar

The [Windows](windows.md) taskbar allows you to "pin" apps to it so they're easily accessible. However, some items may get re-pinned when the computer is rebooted even though you want them permanently unpinned.

The following solution to permanently unpin items from the Windows taskbar was tested with Windows 10:

1. Press <kbd>Win</kbd>+<kbd>R</kbd> keys
1. Type `%LOCALAPPDATA%\Microsoft\Windows\Shell\` and press <kbd>Enter</kbd>
1. Open `LayoutModification.xml` in an editor (notepad works fine, I prefer Visual Studio Code)
1. Remove the unwanted `taskbar:DesktopApp` elements from the `LayoutModificationTemplate` ➡ `CustomTaskbarLayoutCollection` ➡ `defaultlayout:TaskbarLayout` ➡ `taskbar:TaskbarPinList` element
1. Save the file

You can now remove the unwanted items from the taskbar and they will not return upon reboot.

## `LayoutModification.xml`: Before and After

Example of a `LayoutModification.xml` that causes pinned items that were removed to be re-added to the taskbar upon restart:

```xml
<LayoutModificationTemplate
    xmlns="http://schemas.microsoft.com/Start/2014/LayoutModification"
    xmlns:defaultlayout="http://schemas.microsoft.com/Start/2014/FullDefaultLayout"
    xmlns:start="http://schemas.microsoft.com/Start/2014/StartLayout"
    xmlns:taskbar="http://schemas.microsoft.com/Start/2014/TaskbarLayout"
    Version="1">
  <LayoutOptions StartTileGroupCellWidth="6" />
  <DefaultLayoutOverride>
    <StartLayoutCollection>
    	<!-- ... Code omitted for brevity ... -->
    </StartLayoutCollection>
  </DefaultLayoutOverride>
	<CustomTaskbarLayoutCollection PinListPlacement="Replace">
    		<defaultlayout:TaskbarLayout>
     			<taskbar:TaskbarPinList>
            		<taskbar:DesktopApp DesktopApplicationLinkPath="%APPDATA%\Microsoft\Windows\Start Menu\Programs\Accessories\Internet Explorer.lnk" />
                	<taskbar:DesktopApp DesktopApplicationLinkPath="%APPDATA%\Microsoft\Windows\Start Menu\Programs\System Tools\File Explorer.lnk" />
                	<taskbar:DesktopApp DesktopApplicationLinkPath="%ALLUSERSPROFILE%\Microsoft\Windows\Start Menu\Programs\Outlook.lnk" />
                	<taskbar:DesktopApp DesktopApplicationLinkPath="%ALLUSERSPROFILE%\Microsoft\Windows\Start Menu\Programs\Google Chrome.lnk" />
            		<taskbar:DesktopApp DesktopApplicationLinkPath="%ALLUSERSPROFILE%\Microsoft\Windows\Start Menu\Programs\Microsoft Edge.lnk"/>
      			</taskbar:TaskbarPinList>
    		</defaultlayout:TaskbarLayout>
  	</CustomTaskbarLayoutCollection>
</LayoutModificationTemplate>
```

Example of a `LayoutModification.xml` modified so that no pinned items are not re-added once they've been removed:

```xml
<LayoutModificationTemplate
    xmlns="http://schemas.microsoft.com/Start/2014/LayoutModification"
    xmlns:defaultlayout="http://schemas.microsoft.com/Start/2014/FullDefaultLayout"
    xmlns:start="http://schemas.microsoft.com/Start/2014/StartLayout"
    xmlns:taskbar="http://schemas.microsoft.com/Start/2014/TaskbarLayout"
    Version="1">
  <LayoutOptions StartTileGroupCellWidth="6" />
  <DefaultLayoutOverride>
    <StartLayoutCollection>
      <!-- ... Code omitted for brevity ... -->
    </StartLayoutCollection>
  </DefaultLayoutOverride>
	<CustomTaskbarLayoutCollection PinListPlacement="Replace">
    		<defaultlayout:TaskbarLayout>
     			<taskbar:TaskbarPinList>
      			</taskbar:TaskbarPinList>
    		</defaultlayout:TaskbarLayout>
  	</CustomTaskbarLayoutCollection>
</LayoutModificationTemplate>
```
