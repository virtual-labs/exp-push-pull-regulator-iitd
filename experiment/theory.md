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
