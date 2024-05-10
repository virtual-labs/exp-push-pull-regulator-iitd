### Theory

The circuit diagram of push-pull converter is given in Fig. 1.

<center>
  <img src="images/th1.png" height="350px">
  
Fig. 1. Circuit Diagram of Push-pull Converter.

</center>
<br>
The switches (Q1 and Q2: ON/OFF-state) are turned-ON/OFF using 180o phase shifted PWM signals. The converter operation can easily be understood from the following equivalent circuits. Brief mathematical analysis is given below.
<br><br>


<table border="0" align="center" style="width:100%; border:none;">
  <tr>
<td style="width:50%">
<center>

<img src="images/th2.png">
<br><br>
Fig. 2(a). Circuit in mode-I (Q1- ON, Q2- OFF).
<br><br>
</center>
</td>
<td style="width:50%">
  
<center>

<img src="images/th3.png">
<br><br>
Fig. 2(b). Circuit in mode-II, IV (Q1- OFF, Q2- OFF).
<br><br>
</center> 
    </td>
  </tr>

<tr>
  <td colspan="2">
    <center>

<img src="images/th4.png" height="250px">
<br><br>
Fig. 2(c). Circuit in mode-III (Q1- OFF, Q2- ON).
<br><br>
</center>
  </td>
</tr>
</table>
<br><br>

<div style="float: left; width:100%;"><br>
  
  **1. Voltage conversion ratio or voltage gain (M)**
<br>
Voltage across inductor L:
<br>

<br><br>
Since the frequency of inductor current/voltage is ‘TS/2’, only Mode-I and Mode-II or Mode-III and Mode-IV is sufficient to formulate the voltage gain:
<br><br>

**Mode – I :**
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th5.png" height="25px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(1)
</div>
<br><br>

<div style="float: left; width:100%;"><br>
  
  where n=Ns/Np.
<br></div>

**Mode – II :**
<br>
<div style="float: left; width:50%;">
  <img src="images/th6.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(2)
      </div>     
<br><br>

<div style="float: left; width:100%;"><br>
  
  Applying ‘volt-sec’ balance across the inductor (eqn. 1 and 2)
<br></div>

<div style="float: left; width:50%;">
  <img src="images/th7.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(3)

</div>

<br><br>

<div style="float: left; width:100%;"><br>
  
  Solving eqn. 3 gives,
<br></div>


<div style="float: left; width:50%;">
  <img src="images/th8.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;" height="60px">
    ..(4)
  <br>
      </div>
<br>

<div style="float: left; width:100%;"><br>
  
  **2. Average current through the inductor:**
<br>
Current through capacitor C:
<br>

<br><br>
Since the frequency of both the inductor and capacitor currents is ‘TS/2’, only Mode-I and Mode-II is considered.
<br><br>

**Mode – I :**
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th9.png" height="25px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(5)
</div>
<br><br>

<div style="float: left; width:100%;"><br>
  
  &nbsp;
<br></div>

**Mode – II :**
<br>
<div style="float: left; width:50%;">
  <img src="images/th10.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(6)
      </div>     
<br><br>

<div style="float: left; width:100%;"><br>
  
  Applying ‘Charge-sec’ balance to the capacitor (eqn. 5 and 6)
<br></div>

<div style="float: left; width:50%;">
  <img src="images/th11.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(7)

</div>

<br><br>

<div style="float: left; width:100%;"><br>
  
  Solving eqn. 7 gives,
<br></div>


<div style="float: left; width:50%;">
  <img src="images/th12.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;" height="60px">
    ..(8)
  <br>
      </div>
<br><br>

<div style="float: left; width:100%;"><br>
  
  Therefore, average inductor current is equal to load current.
<br></div>
<br>

<div style="float: left; width:100%;"><br>
  
  **3. Power balance under ideal condition (neglecting losses in the converter):**

<br><br>
In ideal conditions, the input power is equal to the output power. Hence,
<br><br>

</div>

<br>


<div style="float: left; width:50%;">
  <img src="images/th13.png" height="25px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(9)
</div>
<br><br>

<div style="float: left; width:100%;"><br>
  
  &nbsp;
<br></div>

<div style="float: left; width:50%;">
  <img src="images/th14.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(10)
      </div>     
<br><br>

<div style="float: left; width:100%;"><br>
  
  Substituting eqn. 4 in 10,
<br></div>

<div style="float: left; width:50%;">
  <img src="images/th15.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(11)

</div>

<br><br>

<br>


<div style="float: left; width:100%;"><br>
  
  **4. Inductor current ripple:**
<br><br>
From eqn. 1,
<br><br>

</div>

<br>

<div style="float: left; width:50%;">
  <img src="images/th16.png" height="25px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(12)
</div>
<br><br>

<div style="float: left; width:100%;"><br>
  
  &nbsp;
<br></div>

<div style="float: left; width:50%;">
  <img src="images/th17.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(13)
      </div>     
<br><br>

<div style="float: left; width:100%;"><br>
  
  Therefore, the inductor ripple current is,
<br></div>

<div style="float: left; width:50%;">
  <img src="images/th18.png" height="25px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(14)

</div>

<br><br>


<div style="float: left; width:100%;"><br>
  
  **5. Current through various components:**
<br><br>
The current through various components can easily be identified from Fig. 3.
<br><br>

</div>

<br>

<center>
  <img src="images/th19.png">
  
Fig. 3. Circuit Diagram of Push-pull Converter.

</center>
<br>


<center>
<table align="center" width="100%" >
  <tr style="text-align: center; font-weight: bold; background-color: #c9c9c9;">
    <td style="text-align: center; font-weight: bold;">&nbsp;</td>
    <td style="text-align: center; font-weight: bold;" colspan="2">
      Mode-I<br>(DT<sub>s</sub>/2)
    </td>
    <td style="text-align: center; font-weight: bold;" colspan="2">
      Mode-II<br>(1-D)T<sub>s</sub>
    </td>
    <td style="text-align: center; font-weight: bold;" colspan="2">
      Mode-III<br>(DT<sub>s</sub>/2)
    </td>
    <td style="text-align: center; font-weight: bold;">Average Current</td>
  </tr>
  <tr style="background-color: #c9c9c9;">
    <td></td>
    <td>i<sub>min</sub></td>
    <td>i<sub>max</sub></td>
    <td>i<sub>min</sub></td>
    <td>i<sub>max</sub></td>
    <td>i<sub>min</sub></td>
    <td>i<sub>max</sub></td>
    <td>I<sub>avg</sub></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>i<sub>L</sub></td>
    <td><img src="images/th20.png" height="60px"></td>
    <td><img src="images/th21.png" height="60px"></td>
    <td><img src="images/th20.png" height="60px"></td>
    <td><img src="images/th21.png" height="60px"></td>
    <td><img src="images/th20.png" height="60px"></td>
    <td><img src="images/th21.png" height="60px"></td>
    <td><img src="images/th22.png" height="35px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>i<sub>C</sub></td>
    <td><img src="images/th23.png" height="60px"></td>
    <td><img src="images/th24.png" height="60px"></td>
    <td><img src="images/th23.png" height="60px"></td>
    <td><img src="images/th24.png" height="60px"></td>
    <td><img src="images/th23.png" height="60px"></td>
    <td><img src="images/th24.png" height="60px"></td>
    <td>&#48;</td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>i<sub>Q1</sub></td>
    <td><img src="images/th25.png" height="60px"></td>
    <td><img src="images/th26.png" height="60px"></td>
    <td>&#x30;</td>
    <td>&#x30;</td>
    <td>&#x30;</td>
    <td>&#x30;</td>
    <td><img src="images/th27.png" height="60px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>i<sub>Q2</sub></td>
    <td>&#x30;</td>
    <td>&#x30;</td>
    <td>&#x30;</td>
    <td>&#x30;</td>
    <td><img src="images/th28.png" height="60px"></td>
    <td><img src="images/th29.png" height="60px"></td>
    <td><img src="images/th30.png" height="30px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>i<sub>Di1</sub></td>
    <td><img src="images/th31.png" height="60px"></td>
    <td><img src="images/th32.png" height="60px"></td>
    <td><img src="images/th36.png" height="60px"></td>
    <td><img src="images/th37.png" height="60px"></td>
    <td>&#x30;</td>
    <td>&#x30;</td>
    <td><img src="images/th38.png" height="60px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>i<sub>Di2</sub></td>
    <td>&#x30;</td>
    <td>&#x30;</td>
    <td><img src="images/th39.png" height="60px"></td>
    <td><img src="images/th40.png" height="60px"></td>
    <td><img src="images/th41.png" height="60px"></td>
    <td><img src="images/th42.png" height="60px"></td>
    <td><img src="images/th43.png" height="60px"></td>
  </tr>
</table>
</center>
<br>


<div style="float: left; width:100%;"><br>

**6. Voltage and current stress on various components:**

</div>
<br>
<center>    
<table align="center" style="width: 100%;">
  <tr style="text-align: center; font-weight: bold; background-color: #c9c9c9;">
    <td style="text-align: center; font-weight: bold;">
      &nbsp;
    </td>
    <td style="text-align: center; font-weight: bold;">
      Voltage stress
    </td>
    <td style="text-align: center; font-weight: bold;">
      Current Stress
    </td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>Inductor (L)</td>
    <td><img src="images/th44.png" height="60px"></td>
    <td><img src="images/th45.png" height="60px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>Capacitor (C)</td>
    <td><img src="images/th46.png" height="60px"></td>
    <td><img src="images/th47.png" height="60px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>Switches (Q<sub>1</sub>, Q<sub>2</sub>)</td>
    <td><img src="images/th48.png" height="60px"></td>
    <td><img src="images/th49.png" height="60px"></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td>Diodes (D<sub>i1</sub>, D<sub>i2</sub>)</td>
    <td><img src="images/th50.png" height="60px"></td>
    <td><img src="images/th51.png" height="60px"></td>
  </tr>
</table>

</center>
<br>
<br>

<div style="float: left; width:100%;"><br>

**7. Efficiency analysis:**     

</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th52.png" height="70px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(15)
      </div>

<div style="float: left; width:100%;">
<br><br>    
</div>

<div style="float: left; width:50%;">
  <img src="images/th53.png" height="80px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(16)
      </div>

<div style="float: left; width:100%;"><br><br>
     
Power losses occurring in various components are given below:<br><br>
Power loss in inductor:
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th54.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(17)
      </div>
<br><br>

<div style="float: left; width:100%;">
  
Power loss in capacitor:    
</div>

<div style="float: left; width:50%;">
  <img src="images/th55.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(18)
      </div>

<div style="float: left; width:100%;"><br>

Power loss in switches:
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th56.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(19)
      </div>
<br><br>
<div style="float: left; width:100%;"><br>
&nbsp;
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th57.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(20)
      </div>

<br>

<div style="float: left; width:100%;"><br>

Power loss in diodes:
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th58.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(21)
      </div>
<br><br>
<div style="float: left; width:100%;"><br>
&nbsp;
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th59.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(22)
      </div>

<br><br>

<div style="float: left; width:100%;"><br>
     
Total power loss:
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th60.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(23)
      </div>
<br><br>

<div style="float: left; width:100%;"><br>

**8. Effect of non-idealities on voltage gain expression:**     

</div>

<br><br>
Power losses occurring in various components are given below:
<br>

<center>
  <img src="images/th61.png" height="350px">
  
Fig. 4. Circuit Diagram of Push-pull Converter with non-idealities.

</center>
<br>


<br><br>

<div style="float: left; width:100%;"><br><br>

Voltage across inductor L<br>

<br>
Since the frequency of inductor voltage is TS/2, only Mode-I and Mode-II or Mode-III and Mode-IV will be taken:
<br>

**Mode – I :**
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th62.png" height="45px"><br>
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(24)
</div>
<br><br>
<div style="float: left; width:100%;">
     
**Mode – II :**
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th63.png" height="45px"><br>
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(25)
      </div>     


<div style="float: left; width:100%;"><br><br>
  
Applying Volt-sec balance across the inductor (eqn. 24 and 25), <br><br>  
</div>

<div style="float: left; width:50%;">
  <img src="images/th64.png" height="45px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(26)
      </div>

<div style="float: left; width:100%;"><br>
     
Substituting,<img src="images/th65.png" height="45px"> and solving the above equation gives,
</div>


<div style="float: left; width:50%;"><br>
  <img src="images/th66.png" height="75px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(27)
      </div>
<br><br>
