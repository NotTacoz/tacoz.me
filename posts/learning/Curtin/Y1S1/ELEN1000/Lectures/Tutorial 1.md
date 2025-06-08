---
title: Untitled
date: 2025-03-03
tags:
  - learning
---
1. Okay, the question wants me to first consider a cube of 5.00 mm on each side. I should convert this to a more commonly accepted unit for calculations, such as meters. I know that 1cm = 10mm. Thats 5mm is 0.1cm. I know that 1m = 100cm, Thus, 0.1 cm is 1/1000 m which is 0.005 m (5.0 * 10^-3 m). The question also tells me that the cube is made of carbon and gave the resistivity of carbon as 3.5 x 10^-5 ohm m. Since I want to estimate the resistance (measured in ohms), I can infer that I divide the resisitivity by the length of each side = 3.5x10^-5 / 5.0x10^-3 = 7.0 x 10^-3 ohms (Same as answer)
2. Okay, the second question now wants me to determine the total resistance of the circuit in Figure 1, as seen at the points A and B. The circuit is made up of multiple sections of both series and parallel. I think it would be helpful to break it down into sections. I will first analyse the two "parallel" section between nodes. I know that 1/RT = sum of (1/R0 + ... + 1/Rn). Thus Rt = 1/(1/10000+1/10000+1/5000)= 2.5 kilo ohms. the bottom section is 0.5 kilohms. for the middle section Rt = 5.0 kilohms 2.5 + 0.5 + 5.0 = 8.0 kilo ohms (this is correct)
3. Circuit a: we recognise that that kirchoffs voltage law states that the sum of all voltage at each resistor is equated to the total voltage, and the voltage at each resistor follows V = IR. to determine current, we msut get the total resistance. For circuit 1 in a, it would be 24 Ohms total, I = V/R = 24/24 = 1.0 Amperes running through the circuit. Thus at each resistor the voltage in volts is equal to the resistance in ohms. Circuit 2 is a bit more complicated, there are two voltage suppleirs, 170 and 50 volts, we will use the same principle for this as well. sum of total voltage is 220, sum of total resistance is 23900. current would be 9.205 x 10^-3 amperes thus at reach resistor the voltage would be V = IR where I is 9.205 x 10^-3 and R is the resistance of the resistor. okay nevermind the tota voltage is 120 so. its more like 5.02 x10^-3 amperes
4. kirchhoffs voltage law states that the sum of voltage is zero. the circuit can be broken down into two components where both are parallel to each other. we first find v2 to be 10 as 20 + 10 = 30. then we find v1 where 50 + 40 = 20 + v1 such v1 = 70. v3 can be determined by summing v2 + v3 = v1, so v3 = v1 - v2 = 70 - 10 = 60 V
5. current divider rule states currents divide when parallel. first lets simplfy and fidn total fo parallel circuit r2 and r3, which is 1/(1/3.3+1/1) = 0.7674418605 kilo ohms. moreover, we find the total resistance which is 1/(1/4.7 + 1/0.7674418605 + 1/2.2) kiloohms which is 0.507526178 kiloohms as V = IR, V = 60 x 10^-3 x 0.507526178 * 10^3 which is 30.4515706815 volts going into I1, I4 and I(2+3). V = IR, I = V/R such I = 30.4515706815/4700 at R1 = 6.48 mA.  I(2+3) gets 39.6793193711 mA and I4 gets 13.84 mA. 39.6793193711 x 0.7674418605 = 30.4515706801. R2 = 9.23 mA and R3 = 30.45 mA wow this is nearlay the answer good job me.
b. okay this is a bit harder first i need to find the sum of r123 which is 109.09090909091 ohms. total ohms is 1/(1/109.09090909091 + 1/300) = 80 ohms. thus voltage = IR = 0.15 x 80 = 12 V. I = V/R so I4 = 12/300 = 40 mA. and I5 = 0.11 mA. V = IR so V = 12 V at V5 as well. 60 mA, 30 mA, 20 mA for 1, 2, 3 respectively (correct!)

Okay first I need to sum the total resistance
2 ohms I2
4 ohms I1
1.3333 ohms 
V = IR = 6 x 1.333 = 8 Volts
I = V/R = 8/4 = 2 A for I1, 4 A for I2
I = V/R = 8/8 = I3 = 1 A
8/6 = 1.333 A
1. 8, 7, 9 ohms each section. total resistance = 2.6387434555 k ohms V= IR, I = V/R = 28 / 2.6387434555 = 10.6111111111 amps 

| TEMPERATURE (°C) | RT (Ω) | RT/R25   | R-TOL. (± %) | α (%/K) | T-TOL. (± °C) | RMIN. (Ω) | RMAX. (Ω) |
| ---------------- | ------ | -------- | ------------ | ------- | ------------- | --------- | --------- |
| -40.0            | 190953 | 19.095   | 4.24         | -5.46   | 0.78          | 182848    | 199057    |
| -35.0            | 145953 | 14.595   | 3.93         | -5.30   | 0.74          | 140213    | 151693    |
| -30.0            | 112440 | 11.244   | 3.63         | -5.14   | 0.71          | 108354    | 116526    |
| -25.0            | 87285  | 8.7285   | 3.35         | -4.99   | 0.67          | 84364     | 90206     |
| -20.0            | 68260  | 6.8260   | 3.07         | -4.85   | 0.63          | 66164     | 70355     |
| -15.0            | 53762  | 5.3762   | 2.80         | -4.71   | 0.60          | 52254     | 55270     |
| -10.0            | 42636  | 4.2636   | 2.55         | -4.57   | 0.56          | 41549     | 43723     |
| -5.0             | 34038  | 3.4038   | 2.30         | -4.44   | 0.52          | 33254     | 34822     |
| 0.0              | 27348  | 2.7348   | 2.07         | -4.31   | 0.48          | 26783     | 27913     |
| 5.0              | 22108  | 2.2108   | 1.84         | -4.19   | 0.44          | 21702     | 22515     |
| 10.0             | 17979  | 1.7979   | 1.62         | -4.08   | 0.40          | 17689     | 18270     |
| 15.0             | 14706  | 1.4706   | 1.40         | -3.96   | 0.35          | 14499     | 14912     |
| 20.0             | 12094  | 1.2094   | 1.20         | -3.86   | 0.31          | 11949     | 12239     |
| 25.0             | 10000  | 1.0000   | 1.00         | -3.75   | 0.27          | 9900.0    | 10100     |
| 30.0             | 8310.8 | 0.83108  | 1.19         | -3.65   | 0.33          | 8211.7    | 8409.8    |
| 35.0             | 6941.1 | 0.69411  | 1.38         | -3.55   | 0.39          | 6845.5    | 7036.7    |
| 40.0             | 5824.9 | 0.58249  | 1.56         | -3.46   | 0.45          | 5734.1    | 5915.6    |
| 45.0             | 4910.6 | 0.49106  | 1.73         | -3.37   | 0.51          | 4825.6    | 4995.7    |
| 50.0             | 4158.3 | 0.41583  | 1.90         | -3.28   | 0.58          | 4079.2    | 4237.3    |
| 55.0             | 3536.2 | 0.35362  | 2.06         | -3.20   | 0.65          | 3463.2    | 3609.2    |
| 60.0             | 3019.7 | 0.30197  | 2.22         | -3.12   | 0.71          | 2952.5    | 3086.8    |
| 65.0             | 2588.8 | 0.25888  | 2.38         | -3.04   | 0.78          | 2527.3    | 2650.4    |
| 70.0             | 2228.0 | 0.22280  | 2.53         | -2.96   | 0.85          | 2171.7    | 2284.3    |
| 75.0             | 1924.6 | 0.19246  | 2.67         | -2.89   | 0.92          | 1873.1    | 1976.0    |
| 80.0             | 1668.4 | 0.16684  | 2.81         | -2.82   | 1.00          | 1621.5    | 1715.3    |
| 85.0             | 1451.3 | 0.14513  | 2.95         | -2.75   | 1.07          | 1408.5    | 1494.2    |
| 90.0             | 1266.7 | 0.12667  | 3.08         | -2.69   | 1.15          | 1227.7    | 1305.8    |
| 95.0             | 1109.2 | 0.11092  | 3.21         | -2.62   | 1.22          | 1073.6    | 1144.8    |
| 100.0            | 974.26 | 0.097426 | 3.34         | -2.56   | 1.30          | 941.74    | 1006.8    |
| 105.0            | 858.33 | 0.085833 | 3.46         | -2.50   | 1.38          | 828.62    | 888.04    |