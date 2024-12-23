let sliders = {
  vImg: document.querySelector(".slider-V-arrow"),
  v: document.querySelector(".v input"),
  vArrow: document.querySelector(".v .slider-V-arrow"),
  d: document.querySelector(".d input"),
  r: document.querySelector(".r input"),
  r_label: document.querySelector(".r .value-box input"),
  n: document.querySelector(".n select"),
  init(){
    this.sliderV(true);
    this.sliderR(true);
    this.sliderD(true);
    setTimeout(() => {
      // this.showForUniversal()
    }, 500);
  },
  reset(){
    this.sliderV(true);
    this.sliderD(true);
    this.sliderR(true);
    sliders.d.min = "0.1";
    sliders.d.max = "0.9";
    sliders.d.step = "0.01";
    sliders.d.value = "0.01";
    document.querySelector(".d .value-box input").readOnly = false;
    sliders.n.selectedIndex = 0
     // disableSlider("reset");
    this.enableSlider()
  },
  clearOnclick: () => {
    sliders.vImg.onclick = () => {};
    sliders.d.onclick = () => {};
    sliders.r.onclick = () => {};
  },
  sliderR(reset = false) {
    let slider_R = document.querySelector(".slider_R");
    let sliderImg = document.querySelector(".slider-R-arrow");
    let sliderValueInput = document.querySelector(".r .value-box input");
    // ratio to move 450/50 = 1:10
    // max img 71px -> min 120px
    let val = 0;
    let constVal = 500;

    // slider function
    function slide(e) {
      e = e instanceof Event;
      if (e) {
        sliderValueInput.value = slider_R.value;
      } else {
        slider_R.value = sliderValueInput.value;
      }
    }

    const slideInput = () => {
      let val = sliderValueInput.value;
      let max = slider_R.max
      if (val > max) {
        val = max;
      }
      sliderValueInput.value = val;
      slide(false);
    };

    if (reset) {
      sliderValueInput.value = slider_R.min;
      slide();
    }

    slider_R.oninput = slide;
    slider_R.oninput();
    sliderValueInput.onkeyup = slideInput;
    sliderValueInput.addEventListener("focusout", () => {
      let min = slider_R.min
      if (sliderValueInput.value < min) {
        sliderValueInput.value = min;
      }
      slide(false);
    });
  },
  updateSliderRbyValue(val){
    this.r_label.value = val
    this.r.oninput()
  },
  sliderD(reset = false) {
    let slider_D = document.querySelector(".slider_D");
    let sliderValueInput_1 = document.querySelector(".d .value-box-d1 input");
    let sliderValueInput_2 = document.querySelector(".d .value-box-d2 input");
    let val = 0;
    let max = 0.48;
    let min = 0;

    // slider function
    function slide(e, inputNumber) {
      e = e instanceof Event;
      if (e) {
        sliderValueInput_1.value = slider_D.value;
        sliderValueInput_2.value = slider_D.value;
      } else {
        if (inputNumber == 1) slider_D.value = sliderValueInput_1.value;
        else slider_D.value = sliderValueInput_2.value;
      }
    }

    const slideInputForMax = () => {
      if (sliderValueInput_1.value > max) {
        sliderValueInput_1.value = max;
      }
      if (sliderValueInput_2.value > max) {
        sliderValueInput_2.value = max;
      }
    };
    const slideInputForMin = () => {
      if (sliderValueInput_1.value < min) {
        sliderValueInput_1.value = min;
      }
      if (sliderValueInput_2.value < min) {
        sliderValueInput_2.value = min;
      }
    };

    if (reset) {
      sliderValueInput_1.value = min;
      sliderValueInput_2.value = min;
      slide();
    }

    slider_D.oninput = slide;
    sliderValueInput_1.onkeyup = () => {
      slideInputForMax()
      slide(false,1)
      sliderValueInput_2.value = sliderValueInput_1.value
    };
    sliderValueInput_1.addEventListener("focusout", () => {
      slideInputForMin()
      slide(false,1)
    });
    sliderValueInput_2.onkeyup = () => {
      slideInputForMax()
      slide(false,2)
      sliderValueInput_1.value = sliderValueInput_2.value
    }
    sliderValueInput_2.addEventListener("focusout", () => {
      slideInputForMin()
      slide(false,2)
    })
    
  },
  sliderV(reset = false) {
    let sliderArrow = document.querySelector(".slider-V-arrow");
    let sliderValueInput = document.querySelector(".v .value-box input");

    // slider function
    function rotateArrow(rot = 0) {
      if (sliderArrow.classList.contains("slider-v-r3")) {
        sliderArrow.classList.remove("slider-v-r3");
        sliderArrow.classList.add("slider-v-r1");
        sliderValueInput.value = 24;
      } else if (sliderArrow.classList.contains("slider-v-r1")) {
        sliderArrow.classList.remove("slider-v-r1");
        sliderArrow.classList.add("slider-v-r2");
        sliderValueInput.value = 36;
      } else if (sliderArrow.classList.contains("slider-v-r2")) {
        sliderArrow.classList.remove("slider-v-r2");
        sliderArrow.classList.add("slider-v-r3");
        sliderValueInput.value = 48;
      }
    }

    if (reset) {
      sliderArrow.classList.remove("slider-v-r3");
      sliderArrow.classList.remove("slider-v-r2");
      sliderArrow.classList.add("slider-v-r1");
      sliderValueInput.value = 24;
    }

    sliderArrow.onclick = rotateArrow;
  },
  // ! slider types universal/waveform
  showForWaveform(){
    let circuitImg = new Dom(".slider-circuit")
    let inputR = new Dom(".r .value-box")
    let sliderR = new Dom(".r input")
    let sliderVarrow = new Dom(".v .slider-V-arrow")
    
    circuitImg.item.src = "./src/images/sliders/circuit_waveform.png"
    circuitImg.styles({
      width: "477px",
      height: "fit-content",
    })
    inputR.set(229,227)
    sliderR.set(321,200)
    sliderVarrow.set(52,146)
  },
  showForUniversal(){
    let circuitImg = new Dom(".slider-circuit")
    let inputR = new Dom(".r .value-box")
    let sliderR = new Dom(".r input")
    let sliderVarrow = new Dom(".v .slider-V-arrow")
    
    circuitImg.item.src = "./src/images/sliders/circuit_universal.png"
    circuitImg.styles({
      width: "579px",
      height: "230px",
    })
    inputR.set(400,160)
    sliderR.set(415,91)
    sliderVarrow.set(43,146)
  },
  disableSlider(sliderName){
    switch(sliderName){
      case "r":
        this.r.disabled = true
        this.r_label.readOnly = true
        break
      case "d":
        this.d.disabled = true
        document.querySelector(".value-box-d1 input").readOnly = true
        document.querySelector(".value-box-d2 input").readOnly = true
        break
      case "v":
        this.vArrow.classList.add("deactive")
        break
      case "n":
        this.n.disabled = true
        break
    }
  },
  enableSlider(sliderName){
    switch(sliderName){
      case "r":
        this.r.disabled = false
        this.r_label.readOnly = false
        break
      case "d":
        this.d.disabled = false
        document.querySelector(".value-box-d1 input").readOnly = false
        document.querySelector(".value-box-d2 input").readOnly = false
        break
      case "v":
        this.vArrow.classList.remove("deactive")
        break
      case "n":
        this.n.disabled = false
        break
      default:
        this.r.disabled = false
        this.r_label.readOnly = false

        this.d.disabled = false
        document.querySelector(".value-box-d1 input").readOnly = false
        document.querySelector(".value-box-d2 input").readOnly = false

        this.vArrow.classList.remove("deactive")

        this.n.disabled = false
        break
    }
  } 
};

sliders.init()
