// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }    
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
}

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}
const cancelSpeech = ()=>{
  window.speechSynthesis.cancel()
  ccQueue = []
}

const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    cancelSpeech()
    Dom.hideAll()
  }
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text,speak=true) => {
  // for filter <sub></sub>
  text = text.replaceAll("<sub>"," ").replaceAll("</sub>"," ")
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  if(isMute || !speak){
    utterance.volume = 0
    utterance.rate = 10
  }
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25, speak = true) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped(){
      ccQueue.shift()
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())`
      // }
    }
  });
  let utterance = textToSpeach(text,speak)
  return utterance
}

// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),

    //!images of previous experiment
    
    part3_table_one : new Dom(".part3_table_one"),
    part3_table_two : new Dom(".part3_table_two"),
    part3_table_three : new Dom(".part3_table_three"),
    part3_table_four : new Dom(".part3_table_four"),
    part3_table_four_2 : new Dom(".part3_table_four_2"),
    slider_vIn : new Dom(".slider_vIn"),
    slider_D : new Dom(".slider_D"),
    slider_R : new Dom(".slider_R"),
    slider_box : new Dom(".universal-slider"),
    graph1: new Dom(".graph1"),
    graph2: new Dom(".graph2"),
    graph3: new Dom(".graph3"),
    graph4: new Dom(".graph4"),
    graph5: new Dom(".graph5"),
    graph6: new Dom(".graph6"),
    graph7: new Dom(".graph7"),
    graph8: new Dom(".graph8"),
    graph_box_1: new Dom(".graph_box1"),
    graph_box_2: new Dom(".graph_box2"),
    graph_box_3: new Dom(".graph_box3"),
    graph_box_4: new Dom(".graph_box4"),
    graph_box_5: new Dom(".graph_box5"),
    graph_box_6: new Dom(".graph_box6"),
    graph_box_7: new Dom(".graph_box7"),
    graph_box_8: new Dom(".graph_box8"),
    xLabel: new Dom(".xLabel"),
    yLabel: new Dom(".yLabel"),
    xLabel2: new Dom(".xLabel2"),
    yLabel2: new Dom(".yLabel2"),
    btn_delete : new Dom(".btn-delete"),
    btn_reset : new Dom(".btn-reset"),
    btn_check_connections: new Dom(".btn-check-connections"),
    btn_circuit_diagram: new Dom(".btn-circuit-diagram"),
    btn_transparent: new Dom(".btn-transparent"),
    btn_popup_box: new Dom(".btn-btn-popup-box"),


    // ! Procedure formula Nomenclature images 
    formulas_component_stress : new Dom("formulas_component_stress"),
    formulas_efficiency : new Dom("formulas_efficiency"),
    formulas_ideal : new Dom("formulas_ideal"),
    formulas_nomenclautre : new Dom("formulas_nomenclautre"),
    formulas_non_ideal : new Dom("formulas_non_ideal"),
    formulas_part_2 : new Dom("formulas_part_2"),
    procedure_component_stress : new Dom("procedure_component_stress"),
    procedure_efficiency : new Dom("procedure_efficiency"),
    procedure_ideal : new Dom("procedure_ideal"),
    procedure_non_ideal : new Dom("procedure_non_ideal"),
    procedure_part_2 : new Dom("procedure_part_2"),
    // ! Procedure formula Nomenclature images end


    //! EE9 images added 

    btn_begin_experiment : new Dom("btn_begin_experiment"),
    btn_check_connections : new Dom("btn_check_connections"),
    btn_cmpltd_circuit_diagram : new Dom("btn_cmpltd_circuit_diagram"),
    btn_delete : new Dom("btn_delete"),
    btn_hint : new Dom("btn_hint"),
    text_incorrect_connections_box : new Dom("btn_incorrect_connection"),
    text_correct_connections_box : new Dom("text_correct_connections_box"),
    btn_plot : new Dom("btn_plot"),
    btn_procedure : new Dom("btn_procedure"),
    btn_record : new Dom("btn_record"),
    btn_record_values : new Dom("btn_record_values"),
    btn_record_waveforms : new Dom("btn_record_waveforms"),
    btn_reset : new Dom("btn_reset"),
    btn_reset_all : new Dom("btn_reset_all"),
    btn_reset_all_part_3 : new Dom("btn_reset_all_part_3"),
    btn_reset_part_3 : new Dom("btn_reset_part_3"),
    part_1_circuit_1 : new Dom("part_1_circuit_1"),
    part_1_circuit_2 : new Dom("part_1_circuit_2"),
    part_1_circuit_3 : new Dom("part_1_circuit_3"),
    part_1_circuit_4 : new Dom("part_1_circuit_4"),
    part_1_components : new Dom("part_1_components"),
    part_2_graph : new Dom("part_2_graph"),
    part_2_graph_empty : new Dom("part_2_graph_empty"),
    part_3_circuit : new Dom("part_3_circuit"),
    part_3_select_option_1 : new Dom("part_3_select_option_1"),
    part_3_select_option_1_select : new Dom("part_3_select_option_1_select"),
    part_3_select_option_2 : new Dom("part_3_select_option_2"),
    part_3_select_option_2_select : new Dom("part_3_select_option_2_select"),
    part_3_select_option_3 : new Dom("part_3_select_option_3"),
    part_3_select_option_3_select : new Dom("part_3_select_option_3_select"),
    part_3_select_option_4 : new Dom("part_3_select_option_4"),
    part_3_select_option_4_select : new Dom("part_3_select_option_4_select"),
    part_3_select_option_full : new Dom("part_3_select_option_full"),
    header_helper : new Dom("header_helper"),
    procedure_popup_box : new Dom("procedure_popup_box"),
    hint_popup_box : new Dom("hint_popup_box"),
    part_2_graph_with_arrow : new Dom("part_2_graph_with_arrow"),
    btn_hint_2 : new Dom("btn_hint_2"),
    hint_popup_box_2 : new Dom("hint_popup_box_2"),

    //! Experimental section images added

    btn_1: new Dom("btn_1"),
    btn_2: new Dom("btn_2"),
    btn_3: new Dom("btn_3"),
    btn_click: new Dom("btn_click"),
    circle: new Dom("circle"),
    frame_1: new Dom("frame_1"),
    frame_2: new Dom("frame_2"),
    frame_3: new Dom("frame_3"),
    menu_page: new Dom("menu_page"),
    val_vgs: new Dom("val_vgs"),
    val_vin: new Dom("val_vin"),
    val_d: new Dom("val_d"),


    //! EE9 images end here

    concept_development: new Dom(".concept_development"),
    
    // ! new items dom
    domQs1: new Dom("domQs1"),
    domQs2: new Dom("domQs2"),
    domQs3: new Dom("domQs3"),
    domQs4: new Dom("domQs4"),
    domQs5: new Dom("domQs5"),
    domQs6: new Dom("domQs6"),

    //! To change header
    experiment_heading: new Dom(".experiment_heading"),



    chart: [
      graph1=null,
      graph2=null,
      graph3=null,
      graph4=null,
      graph5=null,
      graph6=null,
      graph7=null,
      graph8=null,
      graph9=null,
      graph10=null,
     ],
    
     chart: {
      label1:{
        x: "Label 2",
        y: "Label 1",
      },
      label2:{
        x: "Label 2",
        y: "Label 1",
      },
      label3:{
        x: "Label 2",
        y: "Label 1",
      },
      label4:{
        x: "Label 2",
        y: "Label 1",
      },
      label5:{
        x: "Label 2",
        y: "Label 1",
      },
      label6:{
        x: "Label 2",
        y: "Label 1",
      },
      label7:{
        x: "Label 2",
        y: "Label 1",
      },
      label8:{
        x: "Label 2",
        y: "Label 1",
      },
      label9:{
        x: "Label 2",
        y: "Label 1",
      },
      label10:{
        x: "Label 2",
        y: "Label 1",
      },
     } 


  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  //* To change the heading 
  changeHeader(step){
    let heading = Scenes.items.experiment_heading
    switch(step){
      case "1": heading.setContent("Circuit Formulation")
      break;
      case "2": heading.setContent("Voltage and Current Waveforms")
      break;
      case "3": heading.setContent("Performance Analysis")
      break;
      case "3_1": heading.setContent("Ideal Voltage Gain")
      break;
      case "3_2": heading.setContent("Practical Voltage Gain")
      break;
      case "3_3": heading.setContent("Efficiency Analysis")
      break;
      case "3_4": heading.setContent("Component Stresses")
      break;
    }
  },

  //* to show the popup to corresponding image
  showPopup(step){

    let procedureBtn = Scenes.items.btn_procedure.zIndex(1000)
    let hintBtn1 = Scenes.items.btn_hint.zIndex(1000)
    let hintBtn2 = Scenes.items.btn_hint_2.zIndex(1000)

    let procedureImg, hintImg, hintImg2;

    
    let btn = [
      hintBtn1,
      hintBtn2,
      procedureBtn,
    ]

    switch(step){

      //for step 1 circuit formulation
      case 1 :
        procedureImg = Scenes.items.procedure_popup_box.set(2, 134, 283).hide()
        hintImg = Scenes.items.hint_popup_box.set(502, -29, 418).hide()
        hintImg2 = Scenes.items.hint_popup_box_2.set(9, -33+40, 440).hide()
          }


    let showHintImg1 = function(){
      hintImg.show().zIndex(40)

    }
    let showHintImg2 = function(){
      hintImg2.show().zIndex(40)

    }
    let showProcedureImg = function(){
      procedureImg.show().zIndex(40)

    }

    let hideHintImg1 = function(){
      hintImg.hide()

    }
    let hideHintImg2 = function(){
      hintImg2.hide()

    }
    let hideProcedureImg = function(){
      procedureImg.hide()

    }

    

    btn[0].item.onmouseover = showHintImg1
    btn[0].item.onmouseout = hideHintImg1

    btn[1].item.onmouseover = showHintImg2
    btn[1].item.onmouseout = hideHintImg2

    btn[2].item.onmouseover = showProcedureImg
    btn[2].item.onmouseout = hideProcedureImg

 

    

  },
  forMathematicalExpressionBtn : 0,
  forProcedureBtn : 0,



  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone:[0,0,0,0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
      }),
      (objective = function () {
        setIsProcessRunning(true);
        Dom.hideAll()
        // require
        Scenes.items.slider_box.hide()
        
        let btn_transparent = Scenes.items.btn_transparent.set().item;
  
        Scenes.items.concept_development.set().styles({
          zIndex: "5000",
          scale: "1 0.915",
          top: "-144px",
          position: "absolute",
        })
  
        // ! Slide ended enable the button next button
        function checkIsSlideEnded(){
          let isSlideEnded = localStorage.getItem("isSlideEnded")
          if(isSlideEnded=="true"){
            btn_transparent.disabled = false
            setIsProcessRunning(false)
            btn_transparent.classList.remove("btn-disabled")
            // setCC("Click next to goto next slide.")
            Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
            btn_transparent.onclick = ()=>{
              Scenes.next()
              localStorage.setItem("isSlideEnded",false)
              window.clearInterval(interval)
            }
          }
        }
        var interval = window.setInterval(checkIsSlideEnded, 1000)
          
        return true;
      }),    
      (step1 = function () {
        setIsProcessRunning(true);
        // to hide previous step
        Dom.hideAll();
        Scenes.items.projectIntro.hide()
        Dom.setBlinkArrow(-1);
        Scenes.items.btn_next.show()
        Scenes.items.slider_box.hide()
        // Scenes.items.btn_reset_connections.styles({
        //   position: "absolute",
        //   right: 0,
        //   top: "195px",
        //   backgroundColor: "blue",
        //   color: "white",
        // })

        // Scenes.setStepHeading("Step-1", "Circuit Formulation");
        Scenes.changeHeader("1")
        Scenes.showPopup(1)
        // Scenes.items.btn_popup_box.styles({
          // display : "none"
        // })

        // Scenes.items.changeHeader.setContent("sneha")
        setCC("Connect all the terminals correctly to form the circuit")

        let vertexBox = new Dom(".vertex-box")
        vertexBox.show()

        //! Required positions
        Scenes.items.part_1_components.set(-2,-64, 523, 950)

        Scenes.items.header_helper.set(420,-110, 60, 380).zIndex(10000)
        Scenes.items.btn_hint.set(863, 75, 36).zIndex(1)
        Scenes.items.btn_hint_2.set(863, 75+40, 36).zIndex(1)

        // Scenes.items.hint_popup_box.set(502, -29, 418).zIndex(10)
        // Scenes.items.hint_popup_box_2.set(9, -33+40, 440).zIndex(10)

        Scenes.items.btn_procedure.set(770, 180, 51, 175).zIndex(1)
        Scenes.items.btn_reset.set(770, 236, 52, 175).zIndex(1)
        Scenes.items.btn_check_connections.set(770, 285, 82, 175).zIndex(1)
        Scenes.items.btn_cmpltd_circuit_diagram .set(770, 370, 82, 175).zIndex(1)

        function isConnectionsRight(isConnectionsCorrect,matchedGraphIdx=-1){
          let imgToShow = null
          if(isConnectionsCorrect){
            imgToShow = Scenes.items.text_correct_connections_box.set(550,300,75).zIndex(100)
            setCC("Connections correct")
            // arrow for connected connections
            Dom.setBlinkArrowRed(true,720,388,40, null, 180).play()
            let circuitImages = [
              Scenes.items.part_1_circuit_1,
              Scenes.items.part_1_circuit_2,
              Scenes.items.part_1_circuit_3,
              Scenes.items.part_1_circuit_4,
            ]
            // ! onclick for show circtuit dia
            Scenes.items.btn_cmpltd_circuit_diagram.item.onclick = ()=>{
              circuitImages[matchedGraphIdx].set(0,-49,500,950).zIndex(100)
              Dom.setBlinkArrowRed(true,674,380,40,null,180).play()
              setCC("Push-pull converter is ready for experiment")
              Scenes.items.btn_begin_experiment.set(734,363,75).zIndex(102)
              Scenes.items.btn_begin_experiment.item.onclick = ()=>{
                setIsProcessRunning(false);
                Scenes.next()
              }
            }
          }
          else{
            setCC("Incorrect connections, try again")
            Dom.setBlinkArrowRed(true,720,39,40, null, 180).play()
            imgToShow = Scenes.items.text_incorrect_connections_box.set(550,300,120).zIndex(100)
          }
          anime({
            targets: imgToShow.item,
            delay: 1000,
            duration: 3500,
            easing: "linear",
            opacity: [0.4,1,0.4],
            begin(){
              Dom.setBlinkArrowRed(-1)
            },
            complete: () => {
              if(isConnectionsCorrect){
                Dom.setBlinkArrowRed(true,720,388,40, null, 180).play()
              }else{
                Dom.setBlinkArrowRed(true,720,239,40, null, 180).play()
              }
              imgToShow.hide()
            }
          })
        }


        Scenes.items.slider_box.hide();
        // ! JSPLumb cable 
        function cable(){
          
          Scenes.items.btn_check_connections.item.onclick = checkCableConnection
          // ! connections array contains connected idxs
          // connected vertex src and dest
          let allConnectedVertexSrcDest = []
          // ! initializing the checkgraph for connections
          let matricesForCheckGraph = []
          // ! connection is right/wrong
          let isConnectionRight = false
          // set graph
          function fillCheckGraph(){
            //* to fill element in array
            function create3DArray(size, rows, cols, initValue){
              let filledArray = new Array(size)

              for(let i=0;i<size;i++){
                filledArray[i] = new Array(rows)

                for(let j=0;j<rows;j++){
                  filledArray[i][j] = new Array(cols)

                  for(let k=0;k<cols;k++){
                    filledArray[i][j][k] = initValue
                  }
                }
              }
              return filledArray;
            }

            // fill zero 
            let graphSize = 4
            let noOfVertex = 25
            matricesForCheckGraph = create3DArray(graphSize, noOfVertex, noOfVertex, 0)
            
            //* 1-7 fixed connection is filled
            let xAxisFixed = [1, 2, 2, 16, 17, 24, 7, 23, 23]
            let yAxisFixed = [4, 15, 20, 13, 18, 11, 12, 10, 22 ]
            for(let graph of matricesForCheckGraph){
              for(let i in xAxisFixed){
                graph[xAxisFixed[i]][yAxisFixed[i]] = 1
                graph[yAxisFixed[i]][xAxisFixed[i]] = 1
              }
            }

            let firstGraph = matricesForCheckGraph[0]
            let secondGraph = matricesForCheckGraph[1]
            let thirdGraph = matricesForCheckGraph[2]
            let fourthGraph = matricesForCheckGraph[3]
            
            //* for first graph 
            firstGraph[14][3] = 1
            firstGraph[3][14] = 1
            firstGraph[19][5] = 1
            firstGraph[5][19] = 1
            firstGraph[9][6] = 1
            firstGraph[6][9] = 1
            firstGraph[21][8] = 1
            firstGraph[8][21] = 1
            
            //* for second graph 
            secondGraph[14][3] = 1
            secondGraph[3][14] = 1
            secondGraph[19][5] = 1
            secondGraph[5][19] = 1
            secondGraph[21][6] = 1
            secondGraph[6][21] = 1
            secondGraph[9][8] = 1
            secondGraph[8][9] = 1
            
            //* for third graph 
            thirdGraph[14][5] = 1
            thirdGraph[5][14] = 1
            thirdGraph[19][3] = 1
            thirdGraph[3][19] = 1
            thirdGraph[21][6] = 1
            thirdGraph[6][21] = 1
            thirdGraph[9][8] = 1
            thirdGraph[8][9] = 1
            
            //* for fourth graph 
            fourthGraph[14][5] = 1
            fourthGraph[5][14] = 1
            fourthGraph[19][3] = 1
            fourthGraph[3][19] = 1
            fourthGraph[9][6] = 1
            fourthGraph[6][9] = 1
            fourthGraph[21][8] = 1
            fourthGraph[8][21] = 1

          } 
          fillCheckGraph()

          // ! check
          function checkCableConnection() {
            // console.log("sneha")
            // console.log("sneha")
            // if (connections.length == 0) {
            //   alert("Please make the connections first");
            //   return false;
            // }
            if (connections.length < 13) {
              setCC("Connect all the terminals first")
              return false;
            }
            if (connections.length >= 13) {
              // ! listDiv contains vertexConnectionsName
              // eg vertex10, vertex23
              var listDiv = [];
              for (var j = 0; j < connections.length; j++) {
                let pos = [connections[j].targetId,connections[j].sourceId] 
                listDiv.push(pos)
              }
              // ! Matched Graph Idx
              let matchedGraphIdx = -1
              // whos graph is matched with connections
              let matchedWithGraph = [0,0,0,0]
              // ! Main logic for checking graph
              for(let i=0;i<listDiv.length;i++){
                // * to convert div to idx only
                function convertDivtextToIdx(divText){
                  let convertedText = ""
                  let text = divText.substr(-2)
                  let num1 = text[0]
                  let num2 = text[1]
                  if(!isNaN(num1))
                    convertedText+=num1
                  if(!isNaN(num2))
                    convertedText+=num2
                  return parseInt(convertedText)
                }
                // substr is so i can extract the number from the id
                let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
                let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])
                allConnectedVertexSrcDest.push([vertexSrcIdx,vertexDestIdx])
                
              }

              //! check for total four possibilities
              matricesForCheckGraph.forEach((checkGraph,graphIdx)=>{
                // * in connected
                let connections = allConnectedVertexSrcDest
                for(let connectionIdx in connections){
                  var connection = connections[connectionIdx]
                  var vertexSrcIdx = connection[0]
                  var vertexDestIdx = connection[1]
                  if(checkGraph[vertexSrcIdx][vertexDestIdx] == 1){
                    console.log(`graphIdx:${graphIdx}`,connectionIdx,connection)
                    if(connectionIdx == connections.length - 1){
                      isConnectionRight = true
                      matchedWithGraph[graphIdx] = 1
                    }
                  }
                  else{
                    // alert("wrong")
                    matchedWithGraph[graphIdx] = 0
                    break
                  }
                }
              })
              matchedGraphIdx = matchedWithGraph.indexOf(1)
              // ! for right connection note
              if(matchedGraphIdx != -1){
                // alert(`Correct Connections: ${matchedGraphIdx}`)
                console.log(matchedGraphIdx,matchedWithGraph)
                isConnectionsRight(true, matchedGraphIdx)
              }else{
                // ! for wrong connection
                // alert("Wrong Connections, try again.")
                isConnectionsRight(false)
                allConnectedVertexSrcDest = []
              }
            }
            
          }
          // checkCableConnection()
          (showConnectionInfo = function (listDiv) {
          }),
          (hideConnectionInfo = function (listDiv) {
            listDiv.style.display = "none";
          }),
          (connections = []),
          (updateConnections = function (conn, remove) {
            if (!remove) {
              connections.push(conn);
              // ! show blink when all vertex are connected
              // todo change size 4 to 13
              if(connections.length == 13){
                Dom.setBlinkArrowRed(true,720,305,40, null, 180).play()
              }
            }

            else {
              var idx = -1;
              for (var i = 0; i < connections.length; i++) {
                if (connections[i] == conn) {
                  idx = i;
                  break;
                }
              }
              if (idx != -1) connections.splice(idx, 1);
            }
            if (connections.length > 0) {
              var listDiv = [];
              for (var j = 0; j < connections.length; j++) {
                let pos = [connections[j].targetId,connections[j].sourceId] 
                listDiv.push(pos)
              }
              showConnectionInfo(listDiv);
            }
          });

          jsPlumb.ready(function () {
            var instance = jsPlumb.getInstance();

            // suspend drawing and initialise.
            instance.batch(function () {
              // bind to connection/connectionDetached events, and update the list of connections on screen.
              instance.bind("connection", function (info, originalEvent) {
                updateConnections(info.connection);
              });
              instance.bind("connectionDetached", function (info, originalEvent) {
                updateConnections(info.connection, true);
              });

              instance.bind("connectionMoved", function (info, originalEvent) {
                //  only remove here, because a 'connection' event is also fired.
                // in a future release of jsplumb this extra connection event will not
                // be fired.
                updateConnections(info.connection, true);
              });

              // configure some drop options for use by all endpoints.
              var exampleDropOptions = {
                tolerance: "touch",
                hoverClass: "dropHover",
                activeClass: "dragActive",
              };

              // ! for setting up the endpoints
              function setEndPoint(maxConnections=1){
                let radius = 10
                let endPointStyleData = {
                  endpoint: ["Dot", { radius: radius }],
                  paintStyle: { fill: "red" },
                  isSource: true,
                  scope: "green",
                  connectorStyle: { stroke: "#0000f6", strokeWidth: 6 },
                  connector: ["Bezier", { curviness: -50 }],
                  maxConnections: maxConnections,
                  isTarget: true,
                  dropOptions: exampleDropOptions,
                }
                return endPointStyleData
              }

              var exampleEndpoint1 = setEndPoint()
              var exampleEndpoint2 = setEndPoint(2)
              var exampleEndpoint3 = setEndPoint()
              var exampleEndpoint4 = setEndPoint()
              var exampleEndpoint5 = setEndPoint()
              var exampleEndpoint6 = setEndPoint()
              var exampleEndpoint7 = setEndPoint(2)
              var exampleEndpoint8 = setEndPoint()
              var exampleEndpoint9 = setEndPoint()
              var exampleEndpoint10 = setEndPoint()
              var exampleEndpoint11 = setEndPoint()

              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              // conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex20",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              // conn 3
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );

              //* conn 4
              instance.addEndpoint(
                "vertex17",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );
              instance.addEndpoint(
                "vertex18",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );

              //*conn 5
              instance.addEndpoint(
                "vertex24",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );

              //*conn 6
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              //*conn 7
              instance.addEndpoint(
                "vertex23",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex22",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );

              //*conn 8
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );

              //*conn 9
              instance.addEndpoint(
                "vertex19",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );

              //*conn 10
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint10
              );
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint10
              );
              instance.addEndpoint(
                "vertex21",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint10
              );

              //*conn 11
              instance.addEndpoint(
                "vertex21",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint11
              );
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint11
              );
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint11
              );


              /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
              instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
              instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
              instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

              instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

              var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
              instance.on(hideLinks, "click", function (e) {
                instance.toggleVisible(this.getAttribute("rel"));
                jsPlumbUtil.consume(e);
              });

              var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
              instance.on(dragLinks, "click", function (e) {
                var s = instance.toggleDraggable(this.getAttribute("rel"));
                this.innerHTML = s ? "disable dragging" : "enable dragging";
                jsPlumbUtil.consume(e);
              });

              var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
              instance.on(detachLinks, "click", function (e) {
                instance.deleteConnectionsForElement(this.getAttribute("rel"));
                jsPlumbUtil.consume(e);
              });

              // ! reset
              instance.on(Scenes.items.btn_reset.item, "click", function (e) {
                // instance.detachEveryConnection();
                instance.deleteEveryConnection()
                showConnectionInfo("");
                jsPlumbUtil.consume(e);
                Dom.setBlinkArrowRed(-1)
              });
            });

            jsPlumb.fire("jsPlumbDemoLoaded", instance);
          });
        }

        // calling cable function
        cable()
        
        // ------ end



        return true
      }),
      (step2 = function () {
        setIsProcessRunning(true);
        // * destroy all the connection
        Scenes.items.btn_reset.item.click()
        getAll(".jtk-endpoint").forEach(ele=>{
          ele.style.display = "none"
        })

        // Scenes.setStepHeading(
        //   "Step-2",
        //   "Voltage and current waveforms."
        // )
        Scenes.changeHeader("2")
        Scenes.forMathematicalExpressionBtn = 0
        console.log(Scenes.forMathematicalExpressionBtn)
        Scenes.forProcedureBtn = 0
        Scenes.items.slider_box.show()
        sliders.showForWaveform()

        
        Scenes.items.btn_next.show();
        function stepTutorial2(){

          setCC("Select V<sub>G</sub>")
            Dom.setBlinkArrowRed(true,57,125,30,30,90).play()
            
            sliders.vArrow.onclick = ()=>{
              Dom.setBlinkArrowRed(true,362,185,30,30,90).play()
              setCC("Select R")

              sliders.sliderV()
              sliders.vArrow.click()

              sliders.r.onclick = ()=>{
                Dom.setBlinkArrowRed(true,169,25,30,30,90).play()
                setCC("Select Turns ratio")
        
                sliders.n.oninput = ()=>{
                  Dom.setBlinkArrowRed(true,134,-5,30,30,90).play()
                  setCC("Select D")
          

                sliders.d.onclick = ()=>{
                  Dom.setBlinkArrowRed(true,335,5,30,30,90).play()

                  setCC("Press Record Waveforms")   

                }
              }
            }
          }
        }
        stepTutorial2()
        
    //! new images added
    Scenes.items.btn_record_waveforms.set(300, -44, 45).zIndex(10000)
    Scenes.items.btn_record_values.set(389, -44, 45).zIndex(10000)
    Scenes.items.btn_reset_all.set(0,207, 40).zIndex(10000)
    Scenes.items.part_2_graph_empty.set(0, -49, 499, 975)
    Scenes.items.part_2_graph.set(0, -49, 499, 975).hide()
    Scenes.items.part_2_graph_with_arrow.set(0, -49, 499, 975).hide()

    // todo 
    //* edit the resistance min max value
    // slider.r.min = "4";
    // slider.r.max = "12";
    // slider.r.step = "4";
        

    // ! temp values and text
    let st = {
      backgroundColor: "white",
      border: "2px solid black",
      color: "black",
      borderRadius: "0",
      width: "fit-content",
      textAlign: "center",
      padding: "2px 4px",
      fontSize: "0.9rem",
      lineHeight: "13px"
    }
    let textLabels = [
      // ! vp
      vP1 = Scenes.items.tempTitle24.set(530,9).setContent("nV<sub>s</sub> = 0 V").styles(st).hide(),

      vP2 = Scenes.items.tempTitle25.set(634,42).setContent("0 V").styles(st).hide(),
      
      // ! inductor current iL
      iL1 = Scenes.items.tempTitle26.set(618,82).setContent(" i<sub>2</sub> = 0 A").styles(st).hide(),

      iL2 = Scenes.items.tempTitle27.set(556,99).setContent(" I<sub>L</sub> = 0 A").styles(st).hide(),

      iL3 = Scenes.items.tempTitle28.set(682,110).setContent(" i<sub>1</sub> = 0 A").styles(st).hide(),
      
      //! inductor voltage vL
      vL1 = Scenes.items.tempTitle29.set(618,144).setContent(" (nV<sub>G</sub> - V<sub>0</sub>) = 0 V").styles(st).hide(),
      vL2 = Scenes.items.tempTitle30.set(642,172).setContent(" (-V<sub>0</sub>) = 0 V").styles(st).hide(),

      //!switch current iQ1
      iQ1 = Scenes.items.tempTitle31.set(616,202).setContent(" (i<sub>Q1_2</sub>) = 0 A").styles(st).hide(),
      iQ2 = Scenes.items.tempTitle32.set(686,218).setContent("0 A").styles(st).hide(),
      iQ3 = Scenes.items.tempTitle33.set(716,203).setContent(" (i<sub>Q1_1</sub>) = 0 A").styles(st).hide(),
      
      //! switch voltage vQ1
      vQ1 = Scenes.items.tempTitle34.set(550,289).setContent("0 V").styles(st).hide(),
      vQ2 = Scenes.items.tempTitle35.set(570,254).setContent("(V<sub>G</sub>) = 0 V").styles(st).hide(),
      vQ3 = Scenes.items.tempTitle36.set(640,253).setContent("(2V<sub>G</sub>) = 0 V").styles(st).hide(),

      //! diode current iD1
      iD1 = Scenes.items.tempTitle37.set(618,319).setContent("i<sub>2</sub> = 0 A").styles(st).hide(),
      iD2 = Scenes.items.tempTitle38.set(642,352).setContent("i<sub>2</sub>/2 = 0 A").styles(st).hide(),
      iD3 = Scenes.items.tempTitle39.set(718,326).setContent("i<sub>1</sub> = 0 A").styles(st).hide(),
      iD4 = Scenes.items.tempTitle40.set(829,319).setContent("i<sub>1</sub>/2 = 0 A").styles(st).hide(),
      iD5 = Scenes.items.tempTitle41.set(893,345).setContent("0 A").styles(st).hide(),

      //!diode voltage vD1
      vD1 = Scenes.items.tempTitle42.set(550,385).setContent("0 V").styles(st).hide(),
      vD2 = Scenes.items.tempTitle43.set(635,400).setContent("(-2nV<sub>G</sub>) = 0 V").styles(st).hide(),

      //!output current iO
      iO1 = Scenes.items.tempTitle44.set(410,309).setContent("(i<sub>O</sub>) = 0 A").styles(st).hide(),
      iO2 = Scenes.items.tempTitle45.set(405,334).setContent("(V<sub>O</sub>) = 0 A").styles(st).hide(),

      //!input current iG
      iG1 = Scenes.items.tempTitle46.set(250,365).setContent("i<sub>1</sub> = 0 A").styles(st).hide(),
      iG2 = Scenes.items.tempTitle47.set(277,395).setContent("i<sub>2</sub> = 0 A").styles(st).hide(),
      iG3 = Scenes.items.tempTitle48.set(405,414).setContent("(V<sub>G</sub>) = 0 A").styles(st).hide(),
    ]
    
    // if(showValues){
    //   textLabels.forEach((ele,idx)=>{
    //     ele.setContent(textValues[idx]).show()
    //   })
    // }
  
        let currentGraph = Scenes.items.part_2_graph_empty

        let btn_record_waveforms = Scenes.items.btn_record_waveforms
        let btn_record_values = Scenes.items.btn_record_values
        let btn_reset_all = Scenes.items.btn_reset_all


        btn_record_waveforms.item.onclick = function(){
          Dom.setBlinkArrowRed(true,420,5,30,30,90).play()
          
          setCC("Press Record Values")

          currentGraph.hide()
          Scenes.items.part_2_graph.show()
          currentGraph = Scenes.Scenes.items.part_2_graph
        }

        btn_record_values.item.onclick = function(){
          let vInValue = Number(sliders.v.value)
          let dutyRatioValue = Number(sliders.d.value)
          let resistanceValue = Number(sliders.r.value)
          let nValue = Number(sliders.n.value)

          updateValues(vInValue,dutyRatioValue,resistanceValue,nValue)

          // setting values from formulas
          function setTempTitleAndValues(showValues=false,vInValue=0){  
      
            let v0 = parseFloat(Number(Formulas.step2.v0(values)).toFixed(1))
            let i0  = parseFloat(Number(Formulas.step2.i0(values)).toFixed(1))
            let iL = parseFloat(Number( Formulas.step2.iL(values).toFixed(1)))
            let i2 = parseFloat(Number( Formulas.step2.i2(values).toFixed(1)))
            let i1 = parseFloat(Number( Formulas.step2.i1(values).toFixed(1)))
            let iQ12 = parseFloat(Number( Formulas.step2.iQ12(values).toFixed(1)))
            let iQ11 = parseFloat(Number( Formulas.step2.iQ11(values).toFixed(1)))

            console.log(vInValue,dutyRatioValue,resistanceValue,nValue)

            let textValues = [
              //! vp 
              vP1 = `${ nValue * vInValue}V`,
              vP2 = `${ 0 }V`,
              
              //! inductor current iL
              iL1 = `${ iL }A`,
              iL2 = `${ i2 }A`,
              iL3 = `${ i1 }A`,
              
              //! vL 
              vL1 = `${ (nValue * vInValue) - v0}V`,
              vL2 = `${ - v0}V`,
              
              //! switch current iQ1
              iQ1 = `${ iQ12 }A`,
              iQ2 = `${ 0 }A`,
              iQ3 = `${ iQ11 }A`,
              
              //! switch voltage vQ
              vQ1 = `${ 0 }V`,
              vQ2 = `${ v0 }V`,
              vQ3 = `${ 2*v0 }V`,
              
              //! diode current iD1
              iD1 = `${ i2 }A`,
              iD2 = `${ i1 / 2 }A`,
              iD3 = `${ i1 }A`,
              iD4 = `${ i2 / 2 }A`,
              iD5 = `${ 0 }A`,
              
              //! diode voltage vQ
              vD1 = `${ 0 }V`,
              vD2 = `${-2 * nValue* v0 }V`,
              
              //! input current iD1
              iO1 = `${ i0 }A`,
              iO2 = `${ v0 }A`,
              
              //! switch voltage vQ
              iG1 = `${ i2 }V`,
              iG2 = `${ i1 }V`,
              iG3 = `${ v0 }V`,
            ]  
        
            // also show the all values and graph uppper image
            // Scenes.items.part_2_graph_data_upper.show()
            if(showValues){
              textLabels.forEach((ele,idx)=>{
                ele.setContent(textValues[idx]).show()
              })
            }
          }
          setTempTitleAndValues(true,vInValue)
          currentGraph.hide()
          Scenes.items.part_2_graph_with_arrow.show()
          currentGraph = Scenes.items.part_2_graph_with_arrow

          Dom.setBlinkArrowRed(-1)
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
        }

        btn_reset_all.item.onclick = function(){
          Scenes.steps[3]()
        }
        
        
        let isOneTimeOver = false
        // ! onclick for record
        Scenes.items.btn_record.item.onclick = function () {
          Dom.setBlinkArrowRed(-1)
          // ! Activate the next btn right after the click
          
          
          let vInValue = Number(sliders.selectOp1.value)
          let dutyRatioValue = Number(sliders.slider.value)
          let resistanceValue = Number(sliders.selectOp2.value)
          let nValue = Number(sliders.selectOp3.value)

          updateValues(vInValue,dutyRatioValue,resistanceValue,nValue)

          // setting values from formulas
          function setTempTitleAndValues(showValues=false,vInValue=0){  
      
            let v0 = parseFloat(Number(Formulas.step2.v0(values)).toFixed(1))
            let i0  = parseFloat(Number(Formulas.step2.i0(values)).toFixed(1))
            let iL = parseFloat(Number( Formulas.step2.iL(values).toFixed(1)))
            let delIL = parseFloat(Number( Formulas.step2.delILL(values).toFixed(1)))
            let i2 = parseFloat(Number( Formulas.step2.i2(values).toFixed(1)))
            let i1 = parseFloat(Number( Formulas.step2.i1(values).toFixed(1)))
            let iQ12 = parseFloat(Number( Formulas.step2.iQ12(values).toFixed(1)))
            let iQ11 = parseFloat(Number( Formulas.step2.iQ11(values).toFixed(1)))

            console.log("v0:",v0,"iIn:",iIn)
            console.log(vInValue,dutyRatioValue,resistanceValue,nValue)

            let textValues = [
              //! vp 
              vP1 = `${ nValue * vInValue}V`,
              vP2 = `${ 0 }V`,
              
              //! inductor current iL
              iL1 = `${ iL }A`,
              iL2 = `${ i2 }A`,
              iL3 = `${ i1 }A`,
              
              //! vL 
              vL1 = `${ (nValue * vInValue) - v0}V`,
              vL2 = `${ - v0}V`,
              
              //! switch current iQ1
              iQ1 = `${ iQ12 }A`,
              iQ2 = `${ 0 }A`,
              iQ3 = `${ iQ11 }A`,
              
              //! switch voltage vQ
              vQ1 = `${ 0 }V`,
              vQ2 = `${ v0 }V`,
              vQ3 = `${ 2*v0 }V`,
              
              //! diode current iD1
              iD1 = `${ i2 }A`,
              iD2 = `${ i1 / 2 }A`,
              iD3 = `${ i1 }A`,
              iD4 = `${ i2 / 2 }A`,
              iD5 = `${ 0 }A`,
              
              //! diode voltage vQ
              vD1 = `${ 0 }V`,
              vD2 = `${-2 * nValue* v0 }V`,
              
              //! input current iD1
              iO1 = `${ i0 }A`,
              iO2 = `${ v0 }A`,
              
              //! switch voltage vQ
              iG1 = `${ i2 }V`,
              iG2 = `${ i1 }V`,
              iG3 = `${ v0 }V`,
            ]  
        
            // also show the all values and graph uppper image
            // Scenes.items.part_2_graph_data_upper.show()
            if(showValues){
              textLabels.forEach((ele,idx)=>{
                ele.setContent(textValues[idx]).show()
              })
            }
          }
          setTempTitleAndValues(true,vInValue)


          // if (dutyRatioValue == 0.25){
          //   currentGraph.hide();
          //   Scenes.items.new_part_2_graph_1.show();
          //   currentGraph = Scenes.items.new_part_2_graph_1;
          // }
          // if (dutyRatioValue == 0.5){
          //   currentGraph.hide();
          //   Scenes.items.new_part_2_graph_2.show();
          //   currentGraph = Scenes.items.new_part_2_graph_2;
          // }
          // if (dutyRatioValue == 0.75){
          //   currentGraph.hide();
          //   Scenes.items.new_part_2_graph_3.show();
          //   currentGraph = Scenes.items.new_part_2_graph_3;
          // }
          // setIsProcessRunning(false);
          // Dom.setBlinkArrow(true, 630, 315)

          // speak test
          if(isOneTimeOver==false){
            setCC("For the these set input voltage and duty ratio, various component voltage and current waveforms are displayed here.",6)
            isOneTimeOver = true
          }

          // after complete
          setTimeout(()=>{
            Dom.setBlinkArrow(true, 790, 408).play()
            // setCC("Click 'Next' to go to next step")
            setIsProcessRunning(false)
          },5000)
        };

        return true
      }),
    (step3 = function () {
      setIsProcessRunning(true);
      
      speechSynthesis.cancel()
      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      // Scenes.setStepHeading("Step-3", "Performance Analysis.");
      Scenes.changeHeader("3")

      
      // * remove all previous restrictions
      
      // * Required Elements

      Scenes.items.part_3_circuit.set(34, 105, 171)
      Scenes.items.header_helper.set(430,-110, 60, 380).zIndex(10000)

      Scenes.items.part_3_select_option_full.set(439, 25, 350)
      Scenes.items.part_3_select_option_1.set(582, 37, 93).zIndex(2)
      Scenes.items.part_3_select_option_2.set(582, 19+100, 93).zIndex(2)
      Scenes.items.part_3_select_option_3.set(582, 22+175, 93).zIndex(2)
      Scenes.items.part_3_select_option_4.set(582, 32+248, 93).zIndex(2)

      

      // hide the slider
      Scenes.items.slider_box.hide()
      // resloving the step to css
      Scenes.items.slider_box.item.style.scale = "1";


      // let rightTicks = [
      //   Scenes.items.right_tick_1.set(640,35,44).zIndex(2000).hide(),
      //   Scenes.items.right_tick_2.set(655,105,44).zIndex(2001).hide(),
      //   Scenes.items.right_tick_3.set(655,180,44).zIndex(2000).hide(),
      //   Scenes.items.right_tick_4.set(645,255,44).zIndex(2000).hide()
      // ]

      // hide all tables
      Scenes.items.part3_table_one.hide()
      Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      Scenes.items.part3_table_four.hide()
      Scenes.items.part3_table_four_2.hide()

      // active all sliders
      

      // * showing right tick if done
      // for(let i in rightTicks){
      //   if(Scenes.optionsDone[i] == 1){
      //     rightTicks[i].show()
      //   }
      // }


      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.part_3_select_option_1,
        Scenes.items.part_3_select_option_2,
        Scenes.items.part_3_select_option_3,
        Scenes.items.part_3_select_option_4,
      ]

      //! RESET ALL THE SLIDER VALUES
      sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0
      
      const opOne = ()=>{
        Scenes.items.part_3_select_option_1_select.set(582, 37, 93).zIndex(2)
        

        Scenes.optionsDone[0]=1;
        Scenes.forMathematicalExpressionBtn = 1
        Scenes.steps[0+5]()
      }
      const opTwo = ()=>{
        Scenes.items.part_3_select_option_2_select.set(582, 19+100, 93).zIndex(2)
       

        Scenes.optionsDone[1]=1;
        Scenes.forMathematicalExpressionBtn = 2
        Scenes.steps[1+5]()
      }
      const opThree = ()=>{
        Scenes.items.part_3_select_option_3_select.set(582, 22+175, 93).zIndex(2)
        

        Scenes.optionsDone[2]=1;
        Scenes.forMathematicalExpressionBtn = 3
        Scenes.steps[2+5]()
      }
      const opFour = ()=>{

        Scenes.optionsDone[3]=1;
        Scenes.forMathematicalExpressionBtn = 4
        Scenes.steps[3+5]()
      }
      options[0].item.onclick = opOne
      // rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      // rightTicks[1].item.onclick = opTwo

      options[2].item.onclick =  opThree
      // rightTicks[2].item.onclick = opThree

      options[3].item.onclick =  opFour
      // rightTicks[3].item.onclick = opFour

      // ! if all options done then exit
      let exit = true
      for(let i in Scenes.optionsDone){
        if(Scenes.optionsDone[i]==0){
          exit = false
        }
        if(Scenes.optionsDone[i]==1){
          options[i].styles({
            filter: "brightness(0.5)"
          })
          options[i].removeClass("btn-img")
        }
      }      

      if(exit){
        // after complete
        Scenes.items.btn_next.show()
        setIsProcessRunning(false)
        setCC("Click 'Next' to go to next step")
        Dom.setBlinkArrow(true, 790, 414).play();
        Scenes.currentStep = 8
        return true
      }
      
      setCC("Click on the 'ICON' to plot the performance characteristics.")

      return true;

    }),
    (step4 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");
      // Scenes.setStepHeading(
      //   "",
      //   "Ideal voltage gain plot."
      // );
      Scenes.changeHeader("3_1")

      // ! show the slider
      Scenes.items.slider_box.set(0,-43)
      sliders.showForUniversal()
      // setCC("Record  7 reading for different Duty Ratio.")

      // setting slider values
      function setSliderValues(slider,min,max,step,label=null){
        slider.min = min
        slider.max = max
        slider.step = step
        slider.value = slider.min
        if(label!=null){
          label.min = min
          label.max = max
          label.step = step
          label.value = slider.min
        }
      }
      setSliderValues(sliders.r,5,20,1,sliders.r_label)
      setSliderValues(sliders.d,0.1, 0.48, 0.01)

      //   //for labeling
      // let conclusionFront = ""

      // conclusionFront = "Voltage gain and output voltage increases with increasing duty ratio. Depending on turns ratio and duty cycle, output voltage is either lower or higher than input voltage."

      // Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item

      
      // setCC("Voltage gain and output voltage increases with increasing duty ratio. Depending on turns ratio and duty cycle, output voltage is either lower or higher than input voltage.")

      
      // ! required item
      // circuit full 3 replaced by 2 because of changes
      // Scenes.items.circuit_full_2.set(230,-50,175)
      // Scenes.items.part_3_option_1.set(10, 170-15)
      // Scenes.items.right_tick_1.set(-12,185-15)
      // Scenes.items.graph1_arrow.set(-5,6)      
      Scenes.items.part3_table_one.set(10,206).show("flex")
      Scenes.items.btn_record.set(20+190+80,-43, 44-10).zIndex(1000)
      Scenes.items.btn_plot.set(120+190+60,-43, 44-10).zIndex(1000)
      Scenes.items.btn_delete.set(320+110+20,-43, 44-10).zIndex(1000)
      Scenes.items.btn_reset_part_3.set(529,13,34).zIndex(1000)
      Scenes.items.btn_reset_all_part_3.set(420+110,-43, 52).zIndex(1000)
      // Scenes.items.record_btn.set(610,365,60)
      // Scenes.items.btn_delete.set(730,365)
      // Scenes.items.btn_reset.set(820,365)
      let valuesToMatch = [
        [],
        [],
        []
      ] 

      let table = Scenes.items.part3_table_one.item
      let table1 = table.children[0]
      let table2 = table.children[1]
      let table3 = table.children[2] 
      let tablesBody = [ 
        table.children[0].tBodies[0],
        table.children[1].tBodies[0],
        table.children[2].tBodies[0]
      ]    
      let tableHeadTitle = getAll(".part3_table_one .title")
       // * index to handle records
      let recordBtnClickIdx = (table3.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      // helper for record btn
      let currentTableIdx = 0
      let forTable = 0
      // * if plotting not don't record any value
      let isPlotingDone = true

      // disable voltage slider
      sliders.disableSlider("v")

     
      // ! Tutorial Function

      function stepTutorial2(){
  
        // Dom.setBlinkArrowRed(true, 172, 24, 30, 30, 90).play()
        // Dom.setBlinkArrowRed(true, 413, 18, 30, 30, -90).play()
        // Dom.setBlinkArrowRed(true, 48, -1, 30, 30, 90).play()
        // Dom.setBlinkArrowRed(true, 311, -6, 30, 30, 90).play()
        // Dom.setBlinkArrowRed(true, 389, -6, 30, 30, 90).play()



          Dom.setBlinkArrowRed(true, 172, 24, 30, 30, 90).play()
          setCC("Set the transformer turns ratio. ")

          sliders.n.oninput = ()=>{
            Dom.setBlinkArrowRed(true, 413, 18, 30, 30, -90).play()
            setCC("Set the load resistance")

            sliders.r.onclick = ()=>{
              Dom.setBlinkArrowRed(true, 52, -1, 30, 30, 90).play()
              setCC("Set the duty ratio")

              sliders.d.onclick = ()=>{
                Dom.setBlinkArrowRed(true, 311, -6, 30, 30, 90).play()
                setCC("Press Record")
              }
          }
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }
      
      // ! graph
      // * add x,y parameters for graph
      // let graphData = []
      let graph_height = 240
      let graph_width = 330
      
      let graph_box1 = new Dom(".graph_box1")
      let graph_box2 = new Dom(".graph_box2")

      Scenes.items.graph1.set(null,null,graph_height,graph_width)
      Scenes.items.graph2.set(null,null,graph_height,graph_width)

      graph_box1.set(null,-40)
      graph_box2.set(null,205)

      let ctx1 = Scenes.items.graph1.item
      let ctx2 = Scenes.items.graph2.item

      let chart1 = Scenes.items.chart.graph1
      let chart2 = Scenes.items.chart.graph2
      let isDataDeleteaaddDatable = true
      if(chart1 == null){
        isDataDeleteable = true
      }else{
        isDataDeleteable = false
      }
      // temp text for adding zero
      Scenes.items.tempText.setContent(0).set(565,-89).styles({
        rotate: "-90deg",
        backgroundColor: "transparent",
        fontSize: "10px",
      })

      function plotGraph(data1=[[],[],[]],data2=[[],[],[]]){
        if(chart1!=null){
          chart1.destroy()
        }
        if(chart2!=null){
          chart2.destroy()
        }
        chart1 = new Chart(ctx1, {
          type: "scatter",
          data: {
            datasets: [
                {
                  label: "24 V",
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data1[0],
                },
                {
                  label: "48 V",
                  fill: false,
                  borderColor: "green",
                  backgroundColor: "green",
                  data: data1[1],
                },
                {
                  label: "72 V",
                  fill: false,
                  borderColor: "blue",


                 backgroundColor: "blue",
                  data: data1[2],
                },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Load Voltage (V )",
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Duty Ratio (D)",
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                   }
                },
              ],
            },
          },
        })
       
        chart2 = new Chart(ctx2, {
          type: "scatter",
          data: {
            datasets: [
                {
                  label: "24 V",
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2[0],
                },
                {
                  label: "48 V",
                  fill: false,
                  borderColor: "green",
                  backgroundColor: "green",
                  data: data2[1],
                },
                {
                  label: "72 V",
                  fill: false,
                  borderColor: "blue",
                  backgroundColor: "blue",
                  data: data2[2],
                },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Voltage Gain (M)",
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Duty Ratio (D)",
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                   }
                },
              ],
            },
          },
        })
       
        Scenes.items.chart.graph1 = chart1
        Scenes.items.chart.graph2 = chart2
        graph_box1.set(null,null,graph_height,graph_width)
        graph_box2.set(null,null,graph_height,graph_width)
        // Scenes.items.graph1.set(null,null,210,330)
        // Scenes.items.graph2.set(null,null,210,330)

      }

      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: true,
              borderColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          console.log(data)
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }

      // get data
      function setDataToGraph(forTable = 0){
        Dom.setBlinkArrowRed(-1)
        isDataDeleteable = true
        let data1 = [
        ]
        let data2 = [
        ]

        tablesBody.forEach((table,idx)=>{
          // added for plot the graph according to table
          if(idx > forTable){
            return
          }
          let axes1 = []
          let axes2 = []
          for(let i=0;i<table.rows.length;i++){
            let x = table.rows[i].cells[0].innerHTML
            let y1 = table.rows[i].cells[1].innerHTML
            let y2 = table.rows[i].cells[2].innerHTML
        
            // x is same for both
            axes1.push({x:x,y:y1})
            axes2.push({x:x,y:y2})
          }
          data1.push(axes1)
          data2.push(axes2)
        })

        plotGraph(data1,data2)
      }

      // to active the table header portion
      function activePortion(idx=0){
          let thead =   getAll(".part3_table_one .table-title")
          thead.forEach(ele=>{
            ele.classList.add("deactive")
          })
          if(idx!=-1)
            thead[idx].classList.remove("deactive")
      }
      activePortion(0)

      // ! ------------> If data already present plot the graph
      if(table3.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        // setDataToGraph()= 
          setIsProcessRunning(false)
          Scenes.currentStep  = 4

          recordBtnClickIdx = 21
          let r=7
          let tab=3
          // * to get old values from table for matching
          for(let i=0;i<tab;i++){
            let arr = []
            for(let j=0;j<r;j++){
              arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
            }
            valuesToMatch.push(arr)
          }

          sliders.disableSlider("n")
          sliders.disableSlider("r")
          sliders.disableSlider("v")
          setDataToGraph(3)

          activePortion(2)
      }else{
        plotGraph()
        // sliders.reset()
      }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        console.log("del",isDataDeleteable)
        if((recordBtnClickIdx <= 0 || recordBtnClickIdx > 21) || !isDataDeleteable){
          return
        }

        if(recordBtnClickIdx==0){
          activePortion(0)
        }else if(recordBtnClickIdx==7){
          activePortion(0)
          sliders.vImg.click()
          sliders.vImg.click() 
          currentTableIdx = 0
        }else if(recordBtnClickIdx==14){
          activePortion(1)
          sliders.vImg.click()
          sliders.vImg.click()
          currentTableIdx = 1
        }
        // * saving default value by deleting
          // if((recordBtnClickIdx-1)%7==0 || (recordBtnClickIdx-2)%7==0){
          //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
          //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;
          // }else{
          //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[0].innerHTML = "" ;
          //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
          //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;
          // }
        
        tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[0].innerHTML = "" ;
        tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
        tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;

        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          sliders.enableSlider()
        }
        valuesToMatch[currentTableIdx].pop()
      }

      // ! onclick for reset button
      Scenes.items.btn_reset_part_3.item.onclick = ()=>{
        if(recordBtnClickIdx == 0 || recordBtnClickIdx == 21){
          return
        }
        isPlotingDone = true
        let currentTable = tablesBody[currentTableIdx]
        for(let i=0;i<currentTable.rows.length;i++){
          currentTable.rows[i].cells[0].innerHTML = ""
          currentTable.rows[i].cells[1].innerHTML = ""
          currentTable.rows[i].cells[2].innerHTML = ""
        }

        switch(currentTableIdx){
          case 0:
            recordBtnClickIdx = 0
            valuesToMatch[currentTableIdx] = []
            var dummyDataSet = {
              label: "24 V",
              fill: false,
              borderColor: "red",
              backgroundColor: "red",
              data: [],
            }
            chart1.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            chart2.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            
            break
          case 1:
            recordBtnClickIdx = 7
            valuesToMatch[currentTableIdx] = []
            var dummyDataSet = {
              label: "48 V",
              fill: false,
              borderColor: "green",
              backgroundColor: "green",
              data: [],
            }
            chart1.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            chart2.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            break
          case 2:
            recordBtnClickIdx = 14
            valuesToMatch[currentTableIdx] = []
            var dummyDataSet = {
              label: "72 V",
              fill: false,
              borderColor: "blue",
              backgroundColor: "blue",
              data: [],
            }
            chart1.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            chart2.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            break
        }
        console.log(currentTableIdx)
        chart1.update()
        chart2.update()
        activePortion(currentTableIdx)
      }
      
      //! onclick for reset all 
      Scenes.items.btn_reset_all_part_3.item.onclick = function(){
        function tableReset(){
          tablesBody.forEach((table,idx)=>{
            for(let i=0;i<table.rows.length;i++){
              table.rows[i].cells[0].innerHTML = ""
              table.rows[i].cells[1].innerHTML = ""
              table.rows[i].cells[2].innerHTML = ""
            }

          })

        }
        tableReset()

        // reseting the graph
        Scenes.items.chart.graph1.destroy()
        Scenes.items.chart.graph2.destroy()

        // reset all the parameters
        // so just simply call this step again
        sliders.reset()
        Scenes.steps[5]() 
        
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
        // * if plotting not don't record any value
        if(!isPlotingDone){
          setCC("Click on the Plot.")
          return
        }

        let vInValue = Number(sliders.v.value)
        let dutyRatioValue = Number(sliders.d.value)
        let resistanceValue = Number(sliders.r.value)
        let nValue = Number(sliders.n.value)

        // when nValue is empty
        if(nValue == -1){
          Dom.setBlinkArrowRed(true, 172, 24, 30, 30, 90).play()
          setCC("Set the transformer turns ratio. ")
          return
        }
        
        // if(recordBtnClickIdx%7==0){
        //   dutyRatioValue = 0.1
        // }else if((recordBtnClickIdx-1)%7==0){ 
        //   dutyRatioValue = 0.9
        // }
        // diable resistance
        if(recordBtnClickIdx==0){
          // todo
          sliders.disableSlider("r")
          sliders.disableSlider("n")
        }
        
        updateValues(vInValue,dutyRatioValue,resistanceValue,nValue)

        if(recordBtnClickIdx<7){
          vInValue = 24
          currentTableIdx = 0
        }else if(recordBtnClickIdx<14){
          vInValue = 36
          currentTableIdx = 1
        }else if(recordBtnClickIdx<21){
          vInValue = 48
          currentTableIdx = 2
        }

        // ! Can't select same values
        // todo do it <21 back 
        if(recordBtnClickIdx < 21 && valuesToMatch[currentTableIdx].indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else if(recordBtnClickIdx < 21){
          valuesToMatch[currentTableIdx].push(dutyRatioValue)
        }

        // ! for arrow system
        switch(recordBtnClickIdx){
          case 6:
          case 13:
          case 20:
            Dom.setBlinkArrowRed(true, 389, -6, 30, 30, 90).play()
            setCC("Press Plot")
            break
          
          default:
            Dom.setBlinkArrowRed(true, 52, -1, 30, 30, 90).play()
            setCC("Set the duty ratio")
            break
        }
        
        if(recordBtnClickIdx==0){
          activePortion(0)
        }else if(recordBtnClickIdx==6){
          activePortion(1)
          sliders.vImg.click()
        }else if(recordBtnClickIdx==13){
          activePortion(2)
          sliders.vImg.click()
        }
        
        // ! btn plot 
        Scenes.items.btn_plot.item.onclick = ()=>{
         


          if(recordBtnClickIdx==21 || recordBtnClickIdx==7 || recordBtnClickIdx==14){
            isPlotingDone = true
            var rows = null
            isDataDeleteable = true
            // ! sort the data
            function sortTable(){
              function so(){
                let n=7
                for(let i=0;i<n;i++){
                  for(let j=0;j<n-i-1;j++){
                    if(rows[j].cells[0].innerHTML > rows[j+1].cells[0].innerHTML){
                      let temp = rows[j].innerHTML
                      rows[j].innerHTML = rows[j+1].innerHTML
                      rows[j+1].innerHTML = temp
                    }
                  }
                }
              }
              for(let i=0;i<3;i++){
                rows = tablesBody[i].rows
                so()
              }
              
            }
            sortTable()
  
            // * plot the graph
            // adding parameter to x,y graph
            // ! calling the graph update function
            setDataToGraph(forTable++)
            console.log("i")
  
            // for the last click
            if(recordBtnClickIdx==21){
                  
              //for labeling
              let conclusionFront = ""

              conclusionFront = "For a fixed input voltage, the ideal voltage gain varies linearly with the duty ratio."

              Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item

              
              setCC("Ideal voltage gain varies linearly with the duty ratio.")

              setTimeout(()=>{
                
              // after complete
              Dom.setBlinkArrow(true, 790, 408).play()
              setCC("Click 'Next' to go to next step")
              setIsProcessRunning(false)

              },8000)

              Scenes.currentStep = 4
            }
            else{
              Dom.setBlinkArrowRed(true, 52, -1, 30, 30, 90).play()
              setCC("Set the duty ratio")
            }
          }
        }
        if(recordBtnClickIdx < 21){
          let tableRow = tablesBody[currentTableIdx].rows[recordBtnClickIdx++%7]
          tableRow.cells[0].innerHTML = dutyRatioValue
          tableRow.cells[1].innerHTML = Number(Formulas.ideal.v0(values)).toFixed(2)
          tableRow.cells[2].innerHTML = Number(Formulas.ideal.M(values)).toFixed(2)

          // tableRow.cells[1].innerHTML = Number(dutyRatioValue * vInValue ).toFixed(2)
          // tableRow.cells[2].innerHTML = Number(dutyRatioValue * vInValue).toFixed(2)
        }

        // warning for sorting the data
        // if(recordBtnClickIdx==8 ||recordBtnClickIdx == 14){

        //   //*sneha jadon
        //   Dom.setBlinkArrowRed(true, 52, -1, 30, 30, 90).play()
        //   setCC("Set the duty ratio")
        // }
        // * when plot button is clicked then it is false
        if(recordBtnClickIdx==21 || recordBtnClickIdx==7 || recordBtnClickIdx==14){
          isPlotingDone = false
        }
        
      }    

      return true;

    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      // Scenes.setStepHeading(
      //   "",
      //   "Non-ideal gain."
      // );
      Scenes.changeHeader("3_2")

      // setCC("Record 7 reading for 3 different load resistances.")
      // ! show the slider
      Scenes.items.slider_box.set(0,-43)
      sliders.showForUniversal()
      Scenes.items.btn_next.show()
      
      // setting slider values
      function setSliderValues(slider,min,max,step,label=null){
        slider.min = min
        slider.max = max
        slider.step = step
        slider.value = slider.min
        if(label!=null){
          label.min = min
          label.max = max
          label.step = step
          label.value = slider.min
        }
      }
      setSliderValues(sliders.r,5,20,1,sliders.r_label)
      setSliderValues(sliders.d,0.1, 0.48, 0.01)

      //! Required Items
      // Scenes.items.circuit_full_3.set(230,-50,150)
      // Scenes.items.part_3_option_2.set(-20, 170-120).zIndex(2000)
      // Scenes.items.right_tick_1.set(-3,185-120).zIndex(2000)
      Scenes.items.part3_table_two.show("flex")
      // Scenes.items.graph2_arrow.set(-5,0)
      // Scenes.items.record_btn.set(750,270,70)
      // Scenes.items.btn_reset.set(770,350)
      Scenes.items.btn_record.set(20+190+80,-43, 44-10).zIndex(1000)
      Scenes.items.btn_plot.set(120+190+60,-43, 44-10).zIndex(1000)
      Scenes.items.btn_delete.set(320+110+20,-43, 44-10).zIndex(1000)
      Scenes.items.btn_reset_part_3.set(529,13,34).zIndex(1000)
      Scenes.items.btn_reset_all_part_3.set(420+110,-43, 52).zIndex(1000)

      
      // Scenes.items.btn_delete.set(100+20,350)

      // to access thead of the table 
      // Scenes.items.part3_table_two.item.children[0].tHead.rows[0].innerHTML
      let valuesToMatch = [
        [],
        [],
        []
      ] 

      let table = Scenes.items.part3_table_two.item
      let table1 = table.children[0]
      let table2 = table.children[1]
      let table3 = table.children[2] 
      let tablesBody = [
        table.children[0].tBodies[0],
        table.children[1].tBodies[0],
        table.children[2].tBodies[0]
      ]    
      let tableHeadTitle = getAll(".part3_table_two .title")
       // * index to handle records
      let recordBtnClickIdx = (table3.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      
      // helper for record btn
      let currentTableIdx = 0
      let forTable = 0
      // * if plotting not don't record any value
      let isPlotingDone = true

      // disable resitance slider
      sliders.disableSlider("r")

     
      // ! Tutorial Function

      function stepTutorial2(){
  
        // Dom.setBlinkArrowRed(true, 172, 24, 30, 30, 90).play()
        // Dom.setBlinkArrowRed(true, 413, 18, 30, 30, -90).play()
        // Dom.setBlinkArrowRed(true, 48, -1, 30, 30, 90).play()
        // Dom.setBlinkArrowRed(true, 311, -6, 30, 30, 90).play()
        // Dom.setBlinkArrowRed(true, 389, -6, 30, 30, 90).play()



          Dom.setBlinkArrowRed(true, 172, 24, 30, 30, 90).play()
          setCC("Set the transformer turns ratio. ")

          sliders.n.oninput = ()=>{
            Dom.setBlinkArrowRed(true, 45, 58, 30, 30, -90).play()
            setCC("Set the V<sub>G</sub>")

            sliders.vArrow.onclick = ()=>{
              Dom.setBlinkArrowRed(true, 52, -1, 30, 30, 90).play()
              setCC("Set the duty ratio")
              sliders.sliderV()
              sliders.vArrow.click()
              
              sliders.d.onclick = ()=>{
                Dom.setBlinkArrowRed(true, 311, -6, 30, 30, 90).play()
                setCC("Press Record")
              }
          }
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }
      


      // ! graph
      // * add x,y parameters for graph
      // let graphData = []
      let graph_height = 240
      let graph_width = 330
      
      let graph_box3 = new Dom(".graph_box3")
      let graph_box4 = new Dom(".graph_box4")

      Scenes.items.graph3.set(null,null,graph_height,graph_width)
      Scenes.items.graph4.set(null,null,graph_height,graph_width)

      graph_box3.set(null,-40)
      graph_box4.set(null,205)

      let ctx1 = Scenes.items.graph3.item
      let ctx2 = Scenes.items.graph4.item

      let chart1 = Scenes.items.chart.graph3
      let chart2 = Scenes.items.chart.graph4
      let isDataDeleteable = true
      if(chart1 == null){
        isDataDeleteable = true
      }else{
        isDataDeleteable = false
      }
      // temp text for adding zero
      Scenes.items.tempText.setContent(0).set(565,-89).styles({
        rotate: "-90deg",
        backgroundColor: "transparent",
        fontSize: "10px",
      })

      function plotGraph(data1=[[],[],[]],data2=[[],[],[]]){
        if(chart1!=null){
          chart1.destroy()
        }
        if(chart2!=null){
          chart2.destroy()
        }
        chart1 = new Chart(ctx1, {
          type: "scatter",
          data: {
            datasets: [
                {
                  label: "R1 = 5",
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data1[0],
                },
                {
                  label: "R2 = 15",
                  fill: false,
                  borderColor: "green",
                  backgroundColor: "green",
                  data: data1[1],
                },
                {
                  label: "R3 = 30",
                  fill: false,
                  borderColor: "blue",
                  backgroundColor: "blue",
                  data: data1[2],
                },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Load Voltage (V )",
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Duty Ratio (D)",
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                   }
                },
              ],
            },
          },
        })
       
        chart2 = new Chart(ctx2, {
          type: "scatter",
          data: {
            datasets: [
                {
                  label: "R1 = 5",
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2[0],
                },
                {
                  label: "R2 = 15",
                  fill: false,
                  borderColor: "green",
                  backgroundColor: "green",
                  data: data2[1],
                },
                {
                  label: "R3 = 30",
                  fill: false,
                  borderColor: "blue",
                  backgroundColor: "blue",
                  data: data2[2],
                },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Voltage Gain (M)",
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Duty Ratio (D)",
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                   }
                },
              ],
            },
          },
        })
       
        Scenes.items.chart.graph3 = chart1
        Scenes.items.chart.graph4 = chart2
        graph_box3.set(null,null,graph_height,graph_width)
        graph_box4.set(null,null,graph_height,graph_width)
        // Scenes.items.graph1.set(null,null,210,330)
        // Scenes.items.graph2.set(null,null,210,330)

      }

      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: false,
              borderColor: bgColor,
              backgroundColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          console.log(data)
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }
      
      // get data
      function setDataToGraph(forTable = 0){
        Dom.setBlinkArrowRed(-1)
        isDataDeleteable = true
        let data1 = [
          [],
          [],
          [],
        ]
        let data2 = [
          [],
          [],
          [],
        ]

        let blackPlotVo = []
        let blackPlotM = []
        tablesBody.forEach((table,idx)=>{
          // added for plot the graph according to table
          if(idx > forTable){
            return
          }
          let axes1 = []
          let axes2 = []
          for(let i=0;i<table.rows.length;i++){
            let x = table.rows[i].cells[0].innerHTML
            let y1 = table.rows[i].cells[1].innerHTML
            let y2 = table.rows[i].cells[2].innerHTML
        
            // x is same for both
            axes1.push({x:x,y:y1})
            axes2.push({x:x,y:y2})
            if(idx == 2){
              // * black plot
              let valueVin = Number(Scenes.items.tempTitle13.item.innerHTML).toFixed(2)
              let valueR = Number(Scenes.items.tempTitle14.item.innerHTML).toFixed(2)
              let valueN = Number(Scenes.items.tempTitle15.item.innerHTML).toFixed(2)
              updateValues(valueVin,x,valueR,valueN)

              let idealVo = Formulas.ideal.v0(values)
              let idealM = Formulas.ideal.M(values)
              
              
              blackPlotVo.push({x: x, y: idealVo})
              blackPlotM.push({x: x, y: idealM})
            } 
          }
          data1[idx] = axes1
          data2[idx] = axes2
        })

        
        plotGraph(data1,data2)
        if(forTable >= 2){
          graph.addDataset(chart1,"Vo Ideal", "black", blackPlotVo)
          graph.addDataset(chart2,"M Ideal", "black", blackPlotM)
        }
      }

      // to active the table header portion
      function activePortion(idx=0){
          let thead =   getAll(".part3_table_two .table-title")
          thead.forEach(ele=>{
            ele.classList.add("deactive")
          })
          if(idx!=-1)
            thead[idx].classList.remove("deactive")
      }
      activePortion(0)

      // ! ------------> If data already present plot the graph
      if(table3.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        // setDataToGraph()= 
          setIsProcessRunning(false)
          Scenes.currentStep  = 4

          recordBtnClickIdx = 21
          let r=7
          let tab=3
          // * to get old values from table for matching
          for(let i=0;i<tab;i++){
            let arr = []
            for(let j=0;j<r;j++){
              arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
            }
            valuesToMatch.push(arr)
          }

          sliders.disableSlider("r")
          sliders.disableSlider("n")
          sliders.disableSlider("v")
          setDataToGraph(3)

          activePortion(2)
      }else{
        plotGraph()
        // sliders.reset()
      }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if((recordBtnClickIdx <= 0 || recordBtnClickIdx > 21) || !isDataDeleteable){
          return
        }

        if(recordBtnClickIdx==0){
          activePortion(0)
        }else if(recordBtnClickIdx==7){
          activePortion(0)
          sliders.updateSliderRbyValue(5)
          currentTableIdx = 0
        }else if(recordBtnClickIdx==14){
          sliders.updateSliderRbyValue(15)
          activePortion(1)
          currentTableIdx = 1
        }
        // * saving default value by deleting
        // if((recordBtnClickIdx-1)%7==0 || (recordBtnClickIdx-2)%7==0){
        //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
        //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;
        // }else{
        //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[0].innerHTML = "" ;
        //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
        //   tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;
        // }
        
        tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[0].innerHTML = "" ;
        tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
        tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;

        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          sliders.enableSlider()
        }
        valuesToMatch[currentTableIdx].pop()
      }

      // ! onclick for reset button
      Scenes.items.btn_reset_part_3.item.onclick = ()=>{
        if(recordBtnClickIdx == 0 || recordBtnClickIdx == 21){
          return
        }
        isPlotingDone = true
        let currentTable = tablesBody[currentTableIdx]
        for(let i=0;i<currentTable.rows.length;i++){
          currentTable.rows[i].cells[0].innerHTML = ""
          currentTable.rows[i].cells[1].innerHTML = ""
          currentTable.rows[i].cells[2].innerHTML = ""
        }

        switch(currentTableIdx){
          case 0:
            recordBtnClickIdx = 0
            valuesToMatch[currentTableIdx] = []
            var dummyDataSet = {
              label: "R1 = 5",
              fill: false,
              borderColor: "red",
              backgroundColor: "red",
              data: [],
            }
            chart1.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            chart2.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            
            break
          case 1:
            recordBtnClickIdx = 7
            valuesToMatch[currentTableIdx] = []
            var dummyDataSet = {
              label: "R2 = 15",
              fill: false,
              borderColor: "green",
              backgroundColor: "green",
              data: [],
            }
            chart1.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            chart2.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            break
          case 2:
            recordBtnClickIdx = 14
            valuesToMatch[currentTableIdx] = []
            var dummyDataSet = {
              label: "R3 = 30",
              fill: false,
              borderColor: "blue",
              backgroundColor: "blue",
              data: [],
            }
            chart1.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            chart2.data.datasets.splice(currentTableIdx,1,dummyDataSet)
            break
        }
        chart1.update()
        chart2.update()
        activePortion(currentTableIdx)
      }
      
      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        function tableReset(){
          tablesBody.forEach((table,idx)=>{
            for(let i=0;i<table.rows.length;i++){
              table.rows[i].cells[0].innerHTML = ""
              table.rows[i].cells[1].innerHTML = ""
              table.rows[i].cells[2].innerHTML = ""
            }

          })

        }
        tableReset()

        // reseting the graph
        Scenes.items.chart.graph1.destroy()
        Scenes.items.chart.graph2.destroy()

        // reset all the parameters
        // so just simply call this step again
        sliders.reset()
        Scenes.steps[6]() 
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
          // * if plotting not don't record any value
          if(!isPlotingDone){
          setCC("Click on the Plot.")
          return
        }

        
        let vInValue = Number(sliders.v.value)
        let dutyRatioValue = Number(sliders.d.value)
        let resistanceValue = Number(sliders.r.value)
        let nValue = Number(sliders.n.value)

        // when nValue is empty
        if(nValue == -1){
          Dom.setBlinkArrowRed(true, 172, 24, 30, 30, 90).play()
          setCC("Set the transformer turns ratio. ")
          return
        }
        
        // if(recordBtnClickIdx%7==0){
        //   dutyRatioValue = 0.1
        // }else if((recordBtnClickIdx-1)%7==0){ 
        //   dutyRatioValue = 0.9
        // }
        // diable resistance
        if(recordBtnClickIdx==0){
          // todo
          sliders.disableSlider("v")
          sliders.disableSlider("n")
        }
        // ! for black plot backup values (vin, r,n)
        Scenes.items.tempTitle13.setContent(vInValue)
        Scenes.items.tempTitle14.setContent(resistanceValue)
        Scenes.items.tempTitle15.setContent(nValue)
        updateValues(vInValue,dutyRatioValue,resistanceValue,nValue)

        if(recordBtnClickIdx<7){
          sliders.updateSliderRbyValue(5)
          currentTableIdx = 0
        }else if(recordBtnClickIdx<14){
          sliders.updateSliderRbyValue(15)
          currentTableIdx = 1
        }else if(recordBtnClickIdx<21){
          sliders.updateSliderRbyValue(15)
          currentTableIdx = 2
        }

        // ! Can't select same values
        // todo do it <21 back 
        if(recordBtnClickIdx < 21 && valuesToMatch[currentTableIdx].indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else if(recordBtnClickIdx < 21){
          valuesToMatch[currentTableIdx].push(dutyRatioValue)
        }

        // ! for arrow system
        switch(recordBtnClickIdx){
          case 6:
          case 13:
          case 20: 
            Dom.setBlinkArrowRed(true, 389, -6, 30, 30, 90).play()
            setCC("Press Plot")
            break
          
          default:
            Dom.setBlinkArrowRed(true, 52, -1, 30, 30, 90).play()
            setCC("Set the duty ratio")
            break
        }
        
        if(recordBtnClickIdx==0){
          activePortion(0)
          sliders.updateSliderRbyValue(5)
        }else if(recordBtnClickIdx==6){
          activePortion(1)
          sliders.updateSliderRbyValue(15)
        }else if(recordBtnClickIdx==13){
          activePortion(2)
          sliders.updateSliderRbyValue(30)
        }
        
        // ! btn plot 
        Scenes.items.btn_plot.item.onclick = ()=>{
          if(recordBtnClickIdx==21 || recordBtnClickIdx==7 || recordBtnClickIdx==14){
            isPlotingDone = true
            var rows = null
            isDataDeleteable = true
            // ! sort the data
            function sortTable(){
              function so(){
                let n=7
                for(let i=0;i<n;i++){
                  for(let j=0;j<n-i-1;j++){
                    if(rows[j].cells[0].innerHTML > rows[j+1].cells[0].innerHTML){
                      let temp = rows[j].innerHTML
                      rows[j].innerHTML = rows[j+1].innerHTML
                      rows[j+1].innerHTML = temp
                    }
                  }
                }
              }
              for(let i=0;i<3;i++){
                rows = tablesBody[i].rows
                so()
              }
              
            }
            sortTable()
  
            // * plot the graph
            // adding parameter to x,y graph
            // ! calling the graph update function
            setDataToGraph(forTable++)
  
            // for the last click
            if(recordBtnClickIdx==21){
              //for labeling
              let conclusionFront = ""
              conclusionFront = "It is clear that the practical voltage gain is lower than the ideal voltage gain. This is due to the voltage drops occurring in the inductor, capacitor, switches and diodes."
              Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item
              
              setCC("Practical voltage is lower than the ideal voltage gain due to voltage drops across the parasitic resistance and switches and diode voltage drops.")

              setTimeout(()=>{
                // after complete
                Dom.setBlinkArrow(true, 790, 408).play()
                setCC("Click 'Next' to go to next step")
                setIsProcessRunning(false)
              },8000)
              
              Scenes.currentStep = 4
            }else{
              Dom.setBlinkArrowRed(true, 52, -1, 30, 30, 90).play()
              setCC("Set the duty ratio")
            }
          }
        }
        if(recordBtnClickIdx < 21){
          let tableRow = tablesBody[currentTableIdx].rows[recordBtnClickIdx++%7]
          // tableRow.cells[1].innerHTML = Number(Formulas.ideal.v0(values)).toFixed(2)
          // tableRow.cells[2].innerHTML = Number(Formulas.ideal.M(values)).toFixed(2)
          
          tableRow.cells[0].innerHTML = dutyRatioValue
          tableRow.cells[1].innerHTML = Formulas.nonIdeal.v0(values).toFixed(2)
          tableRow.cells[2].innerHTML = Formulas.nonIdeal.M(values).toFixed(2)
        }

        // * when plot button is clicked then it is false
        if(recordBtnClickIdx==21 || recordBtnClickIdx==7 || recordBtnClickIdx==14){
          isPlotingDone = false
        }

        
      }    

      return true;
    }),
    (step6 = function () {
      setIsProcessRunning(true);
 
      // Scenes.setStepHeading(
      //   "",
      //   "Efficiency Plot."
      // )
      Scenes.changeHeader("3_3")

      // setCC("Record 7 reading for different Load Resistances (R0)")
        // ! show the slider
      Scenes.items.slider_box.set(0,-43)
      sliders.showForUniversal()
      Scenes.items.btn_next.show()
       
      // setting slider values
      function setSliderValues(slider,min,max,step,label=null){
        slider.min = min
        slider.max = max
        slider.step = step
        slider.value = slider.min
        if(label!=null){
          label.min = min
          label.max = max
          label.step = step
          label.value = slider.min
        }
      }

      //* setting value 50 to match with the sample values
      setSliderValues(sliders.r,5,25,1,sliders.r_label)
      // setSliderValues(sliders.r,5,20,1,sliders.r_label)
      // setSliderValues(sliders.d,0.1, 0.48, 0.01)

      //! Required Items
      // Scenes.items.circuit_full_3.set(230,-50,150)
      // Scenes.items.part_3_option_3.set(-30, 155)
       Scenes.items.part3_table_three.show()
       Scenes.items.btn_record.set(20+190+80,-43, 44-10).zIndex(1000)
      Scenes.items.btn_plot.set(120+190+60,-43, 44-10).zIndex(1000)
      Scenes.items.btn_delete.set(320+110+20,-43, 44-10).zIndex(1000)
      // Scenes.items.btn_reset_part_3.set(529,13,34).zIndex(1000)
      Scenes.items.btn_reset_all_part_3.set(420+110,-43, 52).zIndex(1000)
       //  Scenes.items.right_tick_1.set(-5,175)
      //  Scenes.items.record_btn.set(770,220,70)
      //  Scenes.items.btn_delete.set(785,290)
      //  Scenes.items.btn_reset.set(787,350)

      //! new items added
       Scenes.items.part3_table_three.set(-90, 212).scale(0.8)
       let table = Scenes.items.part3_table_three.item
       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)
      
       // ! graph
       let graph_height = 240
       let graph_width = 330
       
       let graph_box5 = new Dom(".graph_box5")
       let graph_box6 = new Dom(".graph_box6")
 
       Scenes.items.graph5.set(null,null,graph_height,graph_width)
       Scenes.items.graph6.set(null,null,graph_height,graph_width)
 
       graph_box5.set(null,-40)
       graph_box6.set(null,205)
 
       let ctx1 = Scenes.items.graph5.item
       let ctx2 = Scenes.items.graph6.item
 
       let chart1 = Scenes.items.chart.graph5
       let chart2 = Scenes.items.chart.graph6
       let isDataDeleteable = true
       if(chart1 == null){
         isDataDeleteable = true
       }else{
         isDataDeleteable = false
       }
      
      // let xLabel = "Output Power (Po)"
      let xLabel = ""
      let yLabel = "Efficiency (%)"
      function plotGraph(data1, data2,label,xLabel,yLabel,beginAtZero=false){
        chart1 = new Chart(ctx1, {
          type: "scatter",
          plugins: [{
            afterDraw: chart => {
              var ctx = chart.chart.ctx;
              ctx.save();
              ctx.textAlign = 'center';
              ctx.font = '18px Arial';
              ctx.fillStyle = 'black';
              ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              ctx.textAlign = 'left';
              ctx.font = '10px Arial';
              ctx.fillText('0', chart.chart.width - 109, chart.chart.height - 12);
              ctx.restore();
            },
            
          }],
          data: {
            datasets: [
                {
                  label: label,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data1,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })

        chart2 = new Chart(ctx2, {
          type: "scatter",
          plugins: [{
            afterDraw: chart => {
              var ctx = chart.chart.ctx;
              ctx.save();
              ctx.textAlign = 'center';
              ctx.font = '18px Arial';
              ctx.fillStyle = 'black';
              ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              ctx.textAlign = 'left';
              ctx.font = '10px Arial';
              ctx.fillText('0', chart.chart.width - 109, chart.chart.height - 12);
              ctx.restore();
            },
            
          }],
          data: {
            datasets: [
                {
                  label: label,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Losses (W)",
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })

        Scenes.items.chart.graph5 = chart1
        Scenes.items.chart.graph6 = chart2
        graph_box5.set(null,null,graph_height,graph_width)
        graph_box6.set(null,null,graph_height,graph_width)
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true, 172, 24, 30, 30, 90).play()
        setCC("Set the transformer turns ratio. ")

        sliders.n.oninput = ()=>{
          Dom.setBlinkArrowRed(true, 45, 58, 30, 30, -90).play()
          setCC("Set the V<sub>G</sub>")

          sliders.vArrow.onclick = ()=>{
            Dom.setBlinkArrowRed(true, 52, -1, 30, 30, 90).play()
            setCC("Set the duty ratio")
            sliders.sliderV()
            sliders.vArrow.click()
            
            sliders.d.onclick = ()=>{
              Dom.setBlinkArrowRed(true, 413, 18, 30, 30, -90).play()
              setCC("Set the load resistance")

              sliders.r.onclick = ()=>{
                Dom.setBlinkArrowRed(true, 311, -6, 30, 30, 90).play()
                setCC("Press Record")
              }
            }
        }
      }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }

      // todo edit index 
      function setDataToGraph(){
        let graphData1 = []
        let graphData2 = []
        var rows = table.tBodies[0].rows
        let n = 7
        for(let i=0;i<n;i++){
          graphData1.push(
            {
              x: rows[i].cells[5].innerHTML,
              y: rows[i].cells[8].innerHTML
            }
          )
          graphData2.push(
            {
              x: rows[i].cells[5].innerHTML,
              y: rows[i].cells[7].innerHTML
            }
          )
        }
        plotGraph(graphData1, graphData2,"Efficiency","",yLabel)
        Scenes.items.graph5.set(null,null,graph_height,graph_width)
        Scenes.items.graph6.set(null,null,graph_height,graph_width)
      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 4

        recordBtnClickIdx = 7
        let rows = table.tBodies[0].rows
        let n=7
        // * to get old values from table for matching
        for(let i=0;i<n;i++){
          let val = rows[i].cells[2].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph([{}], [{}],"Efficiency","",yLabel,true) 
        Scenes.items.graph5.set(null,null,graph_height,graph_width)
        Scenes.items.graph6.set(null,null,graph_height,graph_width)
        // sliders.reset()
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let row = table.tBodies[0].rows
        let n= 9
        
        for(let i=0;i<n;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          sliders.enableSlider()
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset_all_part_3.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7
        let m=9
  
        for(let i=0;i<n;i++){
          for(let j=0;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        // reset all the parameters
        // so just simply call this step again
        sliders.reset()
        Scenes.steps[7]()        
        
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){ 
        let vInValue = Number(sliders.v.value)
        let dutyRatioValue = Number(sliders.d.value)
        let resistanceValue = Number(sliders.r.value)
        let nValue = Number(sliders.n.value)
        
        // when nValue is empty
        if(nValue == -1){
          Dom.setBlinkArrowRed(true, 172, 24, 30, 30, 90).play()
          setCC("Set the transformer turns ratio. ")
          return
        }
        updateValues(vInValue,dutyRatioValue,resistanceValue, nValue)

         // for arrow system
         if(recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true, 413, 18, 30, 30, -90).play()
            setCC("Set the load resistance")
        }else{
          Dom.setBlinkArrowRed(-1)
        }

        // ! Can't select same values
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(resistanceValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(resistanceValue)
        }

        // deactivate the sliders after first value  done
        if(recordBtnClickIdx == 0){
          sliders.disableSlider("v")
          sliders.disableSlider("d")
          sliders.disableSlider("n")

          let forN = sliders.n.selectedOptions[0].innerHTML
          let headerValue = $(".part3_table_three pre")
          headerValue.html(`V<sub>G</sub> = ${vInValue} V,  D = ${dutyRatioValue},  n:1 = ${forN}`)
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[0].innerHTML = resistanceValue
        tableRow.cells[1].innerHTML = Formulas.efficiencyPlot.M(values).toFixed(2)
        tableRow.cells[2].innerHTML = Formulas.efficiencyPlot.v0(values).toFixed(2)
        tableRow.cells[3].innerHTML = Formulas.efficiencyPlot.i0(values).toFixed(2)
        tableRow.cells[4].innerHTML = Formulas.efficiencyPlot.iG(values).toFixed(2)
        tableRow.cells[5].innerHTML = Formulas.efficiencyPlot.pOut(values).toFixed(2)
        tableRow.cells[6].innerHTML = Formulas.efficiencyPlot.pIn(values).toFixed(2)
        tableRow.cells[7].innerHTML = Formulas.efficiencyPlot.pLosses(values).toFixed(2)
        tableRow.cells[8].innerHTML = Formulas.efficiencyPlot.eff(values).toFixed(2)
        // tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
        // tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
        // tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        // tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
        // tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
        // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if(recordBtnClickIdx==7){
          Dom.setBlinkArrowRed(true, 389, -6, 30, 30, 90).play()
          setCC("Press Plot")

          // ! plot btn onclick
          Scenes.items.btn_plot.item.onclick = ()=>{
            function sortTable(){
              var rows = table.tBodies[0].rows
              let sortAccording = 0
              let n=7
              for(let i=0;i<n;i++){
                  for(let j=0;j<n-i-1;j++){
                      let val1 = Number(rows[j].cells[sortAccording].innerHTML)
                      let val2 = Number(rows[j+1].cells[sortAccording].innerHTML)
                      if(val1 > val2){
                          let temp = rows[j].innerHTML
                          rows[j].innerHTML = rows[j+1].innerHTML
                          rows[j+1].innerHTML = temp
                      }
                  }
              }
            }
            sortTable()
  
            // * plot the graph
            // adding parameter to x,y graph
            // var rows = table.tBodies[0].rows
            // let n = 7
            // for(let i=0;i<n;i++){
            //   graph.addData(0,
            //     {
            //       x: rows[i].cells[9].innerHTML,
            //       y: rows[i].cells[10].innerHTML
            //     }
            //   )
            // }
            setDataToGraph()
  
            // after complete
            //for labeling
            Dom.setBlinkArrowRed(-1)
            let conclusionFront = "For a fixed input voltage  and duty ratio, the increase in load power results in more losses and decrease in efficiency."

            Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item
            
            setCC("With the increase in load power, the losses increase while the efficiency decreases.")

            setTimeout(()=>{
              // after complete
              Dom.setBlinkArrow(true, 790, 408).play()
              setCC("Click 'Next' to go to next step")
              setIsProcessRunning(false)
            },8000)

            Scenes.currentStep = 4
          }
        }
      }    
      
      return true
    }),
    (step7 = function () {
      setIsProcessRunning(true);
 
      // Scenes.setStepHeading(
      //   "",
      //   "Component Stress"
      // )
      Scenes.changeHeader("3_4")

        // ! show the slider
      Scenes.items.slider_box.set(0,-43)
      sliders.showForUniversal()
      Scenes.items.btn_next.show()
       
      // setting slider values
      function setSliderValues(slider,min,max,step,label=null){
        slider.min = min
        slider.max = max
        slider.step = step
        slider.value = slider.min
        if(label!=null){
          label.min = min
          label.max = max
          label.step = step
          label.value = slider.min
        }
      }
      setSliderValues(sliders.r,5,20,1,sliders.r_label)
      // setSliderValues(sliders.d,0.1, 0.48, 0.01)

      //! Required Items
      // Scenes.items.circuit_full_2.set(270,0,160)
      //  Scenes.items.part_3_option_4.set(-30, 170,100,220)
      // Scenes.items.right_tick_1.set(-12,185)
      Scenes.items.part3_table_four.set(10,220)
      Scenes.items.part3_table_four_2.set(10,290)
      // Scenes.items.record_btn.set(465,180,60)

      //  Scenes.items.part_3_option_4_graph.set(295,-60,60)

      //!new items added
      Scenes.items.btn_record.set(120+80+220,-43, 44-10).zIndex(1000)
      Scenes.items.btn_reset_all_part_3.set(420+80,-43, 52).zIndex(1000)

      let styles = {
        color: "black",
        backgroundColor: "white",
        width: "80px",
        rotate: "-90deg"
      }
      // Scenes.items.tempTitle1.set(548,25).zIndex(4000).setContent("Switch").styles(styles)
      // Scenes.items.tempTitle2.set(548,150).zIndex(4000).setContent("Diode").styles(styles)
      // Scenes.items.tempTitle3.set(548,290).zIndex(4000).setContent("Capacitor").styles(styles)
      let table = Scenes.items.part3_table_four.item
      
      // ! graph
      let graphIdx = 6
      let graph_height = 240
      let graph_width = 330
      
      let graph_box7 = new Dom(".graph_box7")
      let graph_box8 = new Dom(".graph_box8")

      Scenes.items.graph7.set(null,null,graph_height,graph_width)
      Scenes.items.graph8.set(null,null,graph_height,graph_width)

      graph_box7.set(null,-40)
      graph_box8.set(null,205)

      let ctx1 = Scenes.items.graph7.item
      let ctx2 = Scenes.items.graph8.item

      let chart1 = Scenes.items.chart.graph7
      let chart2 = Scenes.items.chart.graph8
      let isDataDeleteable = true
      if(chart1 == null){
        isDataDeleteable = true
      }else{
        isDataDeleteable = false
      }
      let st_label = {
        backgroundColor: "white",
        color: "black",
        fontSize: "20px",
        width: "300px",
        textAlign: "center",
        margin: "0",
       }
      let l1 = "<span>i<sub>Q1</sub>, i<sub>Q2</sub></span> <span>i<sub>D1</sub>, i<sub>D2</sub></span> <span>i<sub>c</sub></span>"
      let l2 = "<span>i<sub>Q1</sub>, i<sub>Q2</sub></span> <span>i<sub>D1</sub>, i<sub>D2</sub></span> <span>v<sub>c</sub></span>"
      Scenes.items.tempTitle51.set(620,118+40).setContent(l1).styles(st_label).addClass("graph_labels")
      Scenes.items.tempTitle52.set(620,364+40).setContent(l2).styles(st_label).addClass("graph_labels")
      
      function plotGraph(){
        if(chart1!=null){
          chart1.destroy()
          chart2.destroy()
        }
        
        chart1 = new Chart(ctx1,
          {
            type: "bar",
            data: {
              labels: ["", "", ""],
              datasets: [
                {
                  backgroundColor: ['blue','red','green'],
                  // data: [10,10,20],
                },
              ]
            },
            plugins: [{
              // afterDraw: chart => {
              //   var ctx = chart.chart.ctx;
              //   ctx.save();
              //   ctx.textAlign = 'center';
              //   ctx.font = '20px Arial';
              //   ctx.fillStyle = 'black';
              //   ctx.fillText('v                   v                  v', chart.chart.width - 170, chart.chart.height - 32);
              //   ctx.textAlign = 'left';
              //   ctx.font = '12px Arial';
              //   ctx.fillText('S                               D                               C', chart.chart.width - 275, chart.chart.height - 27);
              //   ctx.restore();
              // },
              
            }],
            options: {
              maintainAspectRatio: false,
              responsive: true,
              legend: {
                display: false
              },
              title:{
                display: true,
                // text: "Voltage Stress",
                text: "Current Stress (A)",
                fontColor: 'black',
                fontSize: 15,
              },
              scales: {
                yAxes: [
                  {
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                    },
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
              },
            },
          }
        )
        chart2 = new Chart(ctx2,
          {
            type: "bar",
            data: {
              labels: ["", "", ""],
              datasets: [
                {
                  backgroundColor: ['blue','red','green'],
                  // data: [10,10,20],
                },
              ]
            },
            plugins: [{
              // afterDraw: chart => {
              //   var ctx = chart.chart.ctx;
              //   ctx.save();
              //   ctx.textAlign = 'center';
              //   ctx.font = '20px Arial';
              //   ctx.fillStyle = 'black';
              //   ctx.fillText('i                   i                  i', chart.chart.width - 170, chart.chart.height - 32);
              //   ctx.textAlign = 'left';
              //   ctx.font = '12px Arial';
              //   ctx.fillText('S                               D                             C', chart.chart.width - 275, chart.chart.height - 27);
              //   ctx.restore();
              // },
              
            }],
            options: {
              maintainAspectRatio: false,
              responsive: true,
              legend: {
                display: false
              },
              title:{
                display: true,
                // text: "Current Stress",
                text: "Voltage Stress (V)",
                fontColor: 'black',
                fontSize: 15,
              },
              scales: {
                yAxes: [
                  {
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                    },
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
              },
            },
          }  
        )
        Scenes.items.chart[graphIdx] = chart1
        Scenes.items.chart[graphIdx+1] = chart2

        Scenes.items.graph7.set(null,null,graph_height,graph_width)
        Scenes.items.graph8.set(null,null,graph_height,graph_width)
      }

      // let slidersBox = document.querySelectorAll(".slider")
      let slidersBox = document.querySelectorAll(".range-slider__range")
      function stepTutorial2(){

        
        Dom.setBlinkArrowRed(true, 172, 24, 30, 30, 90).play()
          setCC("Set the transformer turns ratio. ")

          sliders.n.oninput = ()=>{
            Dom.setBlinkArrowRed(true, 45, 58, 30, 30, -90).play()
            setCC("Set the V<sub>G</sub>")

            sliders.vArrow.onclick = ()=>{
              Dom.setBlinkArrowRed(true, 52, -1, 30, 30, 90).play()
              setCC("Set the duty ratio")
              sliders.sliderV()
              sliders.vArrow.click()
              
              sliders.d.onclick = ()=>{
                Dom.setBlinkArrowRed(true, 413, 18, 30, 30, -90).play()
                setCC("Set the load resistance")

                sliders.r.onclick = ()=>{
                  Dom.setBlinkArrowRed(true, 441, -6, 30, 30, 90).play()
                  setCC("Press Record")
                }
              }
          }
        }

      }
      if(table.tBodies[0].rows[0].cells[3].innerHTML == ""){
        stepTutorial2()
      }
      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: true,
              borderColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          console.log(data)
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }

       // ! ------------> If data already present plot the graph
        if(table.tBodies[0].rows[0].cells[6].innerHTML !== ""){
          setIsProcessRunning(false)
          Scenes.items.graph7.set(null,null,graph_height,graph_width)
          Scenes.items.graph8.set(null,null,graph_height,graph_width)
          Scenes.currentStep = 4
        }else{
          plotGraph()
          // sliders.reset()
        }   
        // ! onclick for reset
        Scenes.items.btn_reset_all_part_3.item.onclick = ()=>{
          let tableRows = table.tBodies[0].rows[0]
          let table2Rows = Scenes.items.part3_table_four_2.item.tBodies[0].rows
          chart1.destroy()
          chart2.destroy()
          plotGraph()
          for(let i=0;i<tableRows.cells.length;i++){
            tableRows.cells[i].innerHTML = ""
          }
          for(let i =0;i<table2Rows.length;i++){
            table2Rows[i].cells[1].innerHTML = ""
            table2Rows[i].cells[2].innerHTML = ""
          }
          sliders.reset()
          Scenes.steps[8]() 
        }
       
       // ! onclick for record
       Scenes.items.btn_record.item.onclick = function(){
        Dom.setBlinkArrowRed(-1)

         let vInValue = Number(sliders.v.value)
         let dutyRatioValue = Number(sliders.d.value)
         let resistanceValue = Number(sliders.r.value)
         let nValue = Number(sliders.n.value)

         updateValues(vInValue,dutyRatioValue,resistanceValue,nValue)
 
         let tableRow = table.tBodies[0].rows[0]
         tableRow.cells[1-1].innerHTML = vInValue
         tableRow.cells[2-1].innerHTML = resistanceValue
         tableRow.cells[3-1].innerHTML = dutyRatioValue
         tableRow.cells[4-1].innerHTML = dutyRatioValue
         tableRow.cells[5-1].innerHTML = Number(Formulas.stress.v0(values)).toFixed(2)
         tableRow.cells[6-1].innerHTML = Number(Formulas.stress.M(values)).toFixed(2)
         tableRow.cells[7-1].innerHTML = Number(Formulas.stress.i0(values)).toFixed(2)
         tableRow.cells[8-1].innerHTML = Number(Formulas.stress.iG(values)).toFixed(2)

        //  tableRow.cells[4-1].innerHTML = 10
        //  tableRow.cells[5-1].innerHTML = 10
        //  tableRow.cells[6-1].innerHTML = 10
        //  tableRow.cells[7-1].innerHTML = 10
        //  tableRow.cells[8-1].innerHTML = 10

        //  let v0 = Number(Formulas.stress.v0(values)).toFixed(2)
        //  let i2 = Number(Formulas.stress.i2(values)).toFixed(2)
        //  let ic = Number(Formulas.stress.i2(values) - Formulas.stress.i0(values)).toFixed(2)
        //  let pSw = Number(Formulas.stress.pSw(values)).toFixed(2)
        //  let pDi = Number(Formulas.stress.pDi(values)).toFixed(2)

        let q1 = Number(Formulas.stress.i2(values) * nValue).toFixed(2)
        let q2 = Number(2 * vInValue).toFixed(2)
        let d1 = Number(Formulas.stress.i2(values)).toFixed(2)
        let d2 = Number(Formulas.stress.v0(values)).toFixed(2)
        let c1 = Number(Formulas.stress.delIL(values) / 2)
        let c2 = Number(Formulas.stress.v0(values)).toFixed(2)

        // console.log("delIl", Formulas.stress.delIL(values))
        // console.log("delIl/2", Formulas.stress.delIL(values)/2)
        // console.log("c1", c1)
        //  let v0 = 10
        //  let i2 = 10
        //  let ic = 10
        //  let pSw = 10
        //  let pDi = 10
         
         // table two changes
         let table2Row = Scenes.items.part3_table_four_2.item.tBodies[0].rows
        table2Row[0].cells[1].innerHTML = `> i<sub>2</sub>(NP/NS) (${q1}A)`
        table2Row[1].cells[1].innerHTML = `> i<sub>2</sub> (${d1}A)`
        table2Row[2].cells[1].innerHTML = `> Δi<sub>L</sub>/2 (${c1}A)`
        
        table2Row[0].cells[2].innerHTML = `> 2V<sub>G</sub> (${q2}V)`
        table2Row[1].cells[2].innerHTML = `> V<sub>0</sub> (${d2}V)`
        table2Row[2].cells[2].innerHTML = `> V<sub>0</sub> (${c2}V)`

        // ! add values to graph
        let graph2_voltageStress = [q1,d1,c1]
        let graph2_currentStress = [q2, d2, c2]

        // ! destroy and show new graph
        // plotGraph()
        graph.addData(chart1,0,graph2_voltageStress)
        graph.addData(chart2,0,graph2_currentStress)
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          // setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false); 
          Scenes.currentStep = 4

          // ! fix resistance value to its original
          // resistanceSlider.min = 10
          // resistanceSlider.max = 500
          // resistanceSlider.step = 1        
          // resistanceSlider.value = 10
          // resistanceSlider.oninput = ()=>{}
       }    
      

      
      return true
    }),

    // !Experimental result section
    //! R LOAD  Waveforms section
    (step8 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Scenes.items.slider_box.hide()


      //! Required Items
      Scenes.items.btn_next.show();


      //r load click
      let arrowIdx = 0;
      let arrows = [
        () => {
          Dom.setBlinkArrowRed(true, 532, 117, 30, null, 180).play();
          arrowIdx++;
        },
        () => {
          Dom.setBlinkArrowRed(true, 532, 210, 30, null, 180).play();
          arrowIdx++;
        },
        () => {
          Dom.setBlinkArrowRed(true, 532, 306, 30, null, 180).play();
          arrowIdx++;
        },
        () => {
          Dom.setBlinkArrowRed(-1);
        },
      ];

      arrows[arrowIdx]();

      Scenes.items.menu_page.set(5, -45, 425);
      // Scenes.items.circle.set(426, 362, 76).hide();

      let btns = [
        Scenes.items.btn_1.set(580, 103, 58).zIndex(1),
        Scenes.items.btn_2.set(580, 103+92, 58).zIndex(1),
        Scenes.items.btn_3.set(580, 279, 87).zIndex(1),
      ];

      let vals = [
        Scenes.items.val_vin.set(784, 110, 47).zIndex(1).hide(),
        Scenes.items.val_vgs.set(784, 202, 49).zIndex(1).hide(),
        Scenes.items.val_d.set(795, 284, 84).zIndex(1).hide(),
      ];

      let optionsClick = [0, 0, 0];
      let btn_see_waveforms = Scenes.items.btn_click
        .set(22, 325, 56)
        .zIndex(1);

      btns.forEach((btn, idx) => {
        btn.item.onclick = () => {
          arrows[arrowIdx]();
          vals[idx].show();
          optionsClick[idx] = 1;
          if (optionsClick.indexOf(0) == -1) {
            Scenes.items.circle.set(18, 314, 80);
            btn_see_waveforms.item.classList.add("btn-img");
            let scaleBtn = anime({
              targets: Scenes.items.circle.item,
              scale: [1, 1.1],
              duration: 1000,
              easing: "linear",
              loop: true,
            });
            btn_see_waveforms.item.onclick = () => {
              scaleBtn.reset();
              waveformShow();
            };
          }
        };
      });

      let scenes = [
        Scenes.items.frame_1.set(20, 9, 420).hide(),
        Scenes.items.frame_2.set(20, 9, 420).hide(),
        Scenes.items.frame_3.set(20, 9, 420).hide(),
      ];

      let waveformShow = () => {
        vals.forEach((_, idx) => {
          btns[idx].hide();
          vals[idx].hide();
        });
        Scenes.items.circle.hide();
        Scenes.items.btn_click.hide();
        Scenes.items.menu_page.hide();

        Dom.setBlinkArrowRed(true, 592, 76, 30, null, 0).play();
        // Dom.setBlinkArrowRed(-1);

        scenes[0].show();
        setCC(
          "Switches Q1 and Q2 are given push-pull gating scheme of duty ratio 0.42. The input voltage is set to 12 volts."
        );

        setTimeout(() => {
          // setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 415).play();
          setIsProcessRunning(false);
        }, 7000);
      };

      return true;
    }),

    //! R LOAD  CLICK 2
    (step9 = function () {
      setIsProcessRunning(true);

      //! Required Items
      Scenes.items.btn_next.show();
      // to hide previous step
      Scenes.items.frame_2.set(20, 9, 420);
      Dom.setBlinkArrowRed(true, 592, 160, 30, null, 0).play();

      setCC(
        "Switches Q1 and Q2 have identical staircase waveforms with phase shift. The peak switch voltage is 24 V which is  twice that of the set input voltage."
      );

      setTimeout(() => {
        // setCC("Click 'Next' to go to next step");
        Dom.setBlinkArrow(true, 790, 415).play();
        setIsProcessRunning(false);
      }, 7000);

      //! Required Items

      return true;
    }),

    //! R LOAD  CLICK 3
    (step10 = function () {
      setIsProcessRunning(true);

      //! Required Items
      Scenes.items.btn_next.show();
      // Scenes.items.slider_box.hide();

      // to hide previous step
      Scenes.items.frame_3.set(20, 9, 420);
      // Dom.setBlinkArrowRed(true, 555, 317, 30, null, 0).play();
      // Dom.setBlinkArrowRed(-1)

      setCC(
        "Diodes Di1 and Di2 have identical waveforms with phase shift. The peak diode voltage is 24 V which is twice that of the set input voltage."
      );

      setTimeout(() => {
        // setCC("Click 'Next' to go to next step");
        // Dom.setBlinkArrow(true, 790, 415).play();
        setCC("Simulation Done");  
        // setIsProcessRunning(false);
      }, 6000);

      //! Required Items

      return true;
    }),

  ],
  // ! For adding realcurrentstep in every step
  // ! For tracking the current step accuratly
  realCurrentStep: null,
  setRealCurrentStep(){
    let count = 0
    this.steps.forEach((step,idx) => {
      const constCount = count
      let newStep = () => {
        this.realCurrentStep = constCount;
        console.log(`RealCurrentStep: ${this.realCurrentStep}`)
        return step();
      };

      count++;
      this.steps[idx] = newStep
    });
  },
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    let ignore = true
    const ignoreDrawerProgress = ()=>{
      let stepsToIgnore = [5,6,7,8]
      console.log(this.realCurrentStep)
      ignore = stepsToIgnore.indexOf(this.realCurrentStep) != -1
      return 
    }
    if(!this.realCurrentStep){
      Scenes.setRealCurrentStep()
    }
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      ignoreDrawerProgress()

      if (this.steps[this.currentStep]()) {
        if(!ignore){
          nextDrawerItem();
          nextProgressBar();
        }
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

// * slider
// var rangeSlider = function () {
//   var slider = $(".range-slider"),
//     range = $(".range-slider__range"),
//     value = $(".range-slider__value");

//   slider.each(function () {
//     value.each(function () {
//       var value = $(this).prev().attr("value");
//       $(this).html(value);
//     });

//     range.on("input", function () {
//       $(this).next(value).html(this.value);
//       $(this).next(value).val(this.value);
//     });
//   });
// };
// $(".resistance-input").on("keyup", () => {
//   let slider = $(".slider_R .range-slider__range");
//   let input = document.querySelector(".resistance-input");

//   let min = 1;
//   let max = Number(slider.attr("max"));
//   // if (input.value < min) {
//   //   input.value = min;
//   // } 

//   if (input.value > max) {
//     input.value = max;
//   }
//   slider.val(input.value);
// });
// rangeSlider();

// stepcalling
Scenes.currentStep = 1

Scenes.next()
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next");

const backBtn = get(".btn-back");
nextBtn.addEventListener("click", () => {
  Scenes.next();
});
backBtn.addEventListener("click", () => {
  Scenes.back();
});

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  //formula
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 0 :            
        popupWindow.src = Scenes.items.procedure_part_2.item.src
        break;
      case 1 :            
        popupWindow.src = Scenes.items.procedure_ideal.item.src
        break;

      case 2:            
        popupWindow.src = Scenes.items.procedure_non_ideal.item.src
        break;

      case 3:            
        popupWindow.src = Scenes.items.procedure_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.procedure_component_stress.item.src
        break;
    }
  }

  //nomenclature
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }

  //procedure
  popupBtns[0].onmouseover = ()=>{
    console.log(Scenes.forMathematicalExpressionBtn)
    switch (Scenes.forMathematicalExpressionBtn) {
      case 0 :            
        popupWindow.src = Scenes.items.formulas_part_2.item.src
        break;
      case 1 :            
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:            
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:            
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }