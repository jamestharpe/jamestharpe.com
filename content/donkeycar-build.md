---
title: "Build a Donkey Car (Part 1 of 2)"
date: 2018-12-09T11:51:09-05:00
languages: ["Python"]
tools: ["Raspberry Pi", "RC Car"]
techniques: ["IoT"]
frameworks: []
projects: ["Donkey Car"]
draft: false
---

# Building our First Donkey Car

[Donkey Car](http://www.donkeycar.com/) is an opensource project for developing self-driving small scale cars. Over the weekend, my daughter and I built one!

We found the [Donkey Car docs](http://docs.donkeycar.com/) a bit difficult to follow, and just plain wrong, in a few places. Yet we managed to muddle our way through, despite a few mistakes along the way. Here's what we ended up doing.

## The Parts

Here are the parts we ordered to build the car (prices as-of 2018-12-09:

| Part                                                                                   | Price   | Description                                                          |
| -------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------- |
| [Magnet Partial Kit](https://squareup.com/store/donkeycar/item/magnet-partial-kit)     | $85.00 | Includes the chassis, screws, camera, jumper wires, and servo driver |
| [1/16 2.4Ghz Exceed RC Magnet EP Electric RTR Off Road Truck](https://amzn.to/2L65HJP) | $89.95 | Hobby-level RC car                                                   |
| [Raspberry Pi 3 B+](https://amzn.to/2QH5e61)                                           | $38.50 | A very, very small computer. About the size of a credit card!        |
| [Anker Astro E1 External Battery Power Bank](https://amzn.to/2Qk54SR)                  | $23.99 | Power supply for the Raspberry Pi                                    |
| **Total:** | **$237.44** | |

### Why the Exceed Magnet

We chose the Exceed Magnet RC Truck because it's the easiest and cheapest build for Donkey Car. Using the Magnet Partial Kit, no additional adapters are needed. However, it's worth noting that the jumper wires that came with the kit were too short! We ended up using longer jumper wires we purchased from Amazon.

### Tools Required

We also ended up needing a small phillips-head screwdriver and some [zip ties](https://amzn.to/2PteshQ), both of which we happend to have already.

## Building The Car

As mentioned, the documents were sometimes confusing and wrong. A complete list of corrections we found are at the bottom of this article. These build instructions might be more helpful until the main Donkey Car documentation is updated.

### Assemble the Top Plate and Roll Cage

The Magnet Partial Kit came with a 3D printed top plate and roll cage. To assemble them, simply screw them together with the provided screws. We ended up attaching the top plate upside down!

![Donkey Car Top Plate and Roll Cage](/img/donkey-car-top-plate-roll-cage.jpg)

We'll fix ours later, but if you're following along at home note that the nubs should face the roll cage!

### Connect the Servo Driver to the Raspberry Pi

Connecting the servo driver to the Raspberry Pi was straight forward using the jumperwires from the Magnet Partial Kit:

![Connect servo driver to Raspberry Pi](/img/connect-servo-driver-raspberry-pi.jpg)

Unfortunatly, we found out quickly that the provided jumper wires were too short! Luckily, we had some extras laying around from the [Pi Alarm](https://github.com/tmobile/pi-alarm) project I participated in with T-Mobile.

### Mount the Raspberry Pi and Servo Driver to the Top Plate

In this step, we ran into two already mentioned problems:

1. We had mounted the top plate upside down
1. The jumper wires were too short

For the top-plate, we left it as-is. For the jumper-wires, we just got longer ones then [tweeted](https://twitter.com/jamestharpe/status/1071844187073593344) [Adam Conway](https://twitter.com/acb0t) (from Donkey Car) to let him know of the issue.

![Mount Raspberry Pi to Top Plate](/img/mount-raspberry-pi-donkey-car-top-plate.jpg)

With the new jumper wires:

![Replaced jumper wires](/img/donkey-car-longer-jumper-wires.jpg)

Alternativly, we could have rotated the servo driver 180° and that would have worked. In this case, however, our servo driver orientation is the same as the official build instructions suggest.

{{< tweet 1071844187073593344 >}}

### Attach the USB Battery

The build instructions for Donky Car only stated:

> Attach the USB battery to the underside of the printed bottom plate using cable ties or velcro.

We interpreted the instructions according to this picture:

![Incorrectly attached USB Battery](/img/donkey-car-usb-battery-attached-wrong.jpg)

When we tried to attach the top plate and roll cage to the RC Car, it wouldn't fit. We instead ended up attaching it to the back of the roll cage.

![Correctly attached USB Battery](/img/donkey-car-usb-battery-attached-correct.jpg)

### Attach the Camera

Finally, something that went exactly as anticipated! Attaching the camera was as easy as sliding it into the provided slot.

![Camera mounted to Donkey Car](/img/donkey-car-mounted-camera.jpg)

Connecting the camera ribbon to the Raspberry Pi was a bit tricky, but this video cleared things up:

{{< youtube T8T6S5eFpqE >}}

(Skip to [1:57](https://youtu.be/T8T6S5eFpqE?t=117) for how to attach the ribbon)

We had to put a twist in the ribbon to face the connector the right way.

![Camera connected to Raspberry Pi](/img/donkey-car-connect-camera-raspberry-pi.jpg)

### Mounting the Car

The top plate has holes designed to accomodate the Exceed Magnet RC Car, but the fit was so tight that we could not push the top plate far enough down so that the pins could be put in as suggested by the instructions. It seems secure enough without the pins, but I might try re-drilling the holes later to prevent it from coming apart.

Once attached, our Donkey Car is starting to look nearly complete!

![Donkey Car Mounted to RC Car Base](/img/donkey-car-mounted-to-rc-car-base.jpg)

### Connecting the Servo Cables

The last step of the physical build is to connect the RC car's servo cables to the mounted servo driver. Except that we weren't sure which cables were the servo cables, this was drivial.

First, we did some Googling and found that these are the servo cables:

![Exceed Magnet Servo Cables](/img/exceed-magnet-servo-cables.jpg)

One cable is left-right, the other is forward-reverse. We unplugged them from the RC car and ran them up through the bottom plate then connected them to channles 0 and 1 on the servo driver:

![Servo Cables connected to servo driver](/img/servo-driver-cables-connected.jpg)

### Build Complete

With everything connected, we just need to install the Donkey Car software and do some calibration to start driving!

## Donkey Car Documentation Updates and Corrections

During the build, we submitted the following pull requests to correct the official Donky Car documentation:

1. [Remove unneeded nut reference](https://github.com/autorope/donkeycar/pull/359)
1. [Clarify top plate orientation to roll cage](https://github.com/autorope/donkeycar/pull/361)
1. [USB Battery does not fit on plate underside](https://github.com/autorope/donkeycar/pull/362)