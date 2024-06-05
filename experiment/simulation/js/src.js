const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),

  // ! new added
  allQsDom: document.querySelectorAll(".qs"),

  set() {
    let index = 0;
    this.allItems = {
      // !Template images
      arrowRound: this.allImgsDom[index++],
      blinkArrow: this.allImgsDom[index++],
      laerrow: this.allImgsDom[index++],
      laerrow2: this.allImgsDom[index++],
      logo: this.allImgsDom[index++],
      man: this.allImgsDom[index++],
      measurearrow: this.allImgsDom[index++],
      measurearrow2: this.allImgsDom[index++],
      redsize: this.allImgsDom[index++],                                         
      speech_off_btn: this.allImgsDom[index++],
      speech_on_btn: this.allImgsDom[index++],
      talk_cloud: this.allImgsDom[index++],
      iit_delhi_logo: this.allImgsDom[index++],
      // !Template images end

      // ! Procedure formula Nomenclature images 
      formulas_component_stress:this.allImgsDom[index++],
      formulas_efficiency:this.allImgsDom[index++],
      formulas_ideal:this.allImgsDom[index++],
      formulas_nomenclautre:this.allImgsDom[index++],
      formulas_non_ideal:this.allImgsDom[index++],
      formulas_part_2:this.allImgsDom[index++],
      procedure_component_stress:this.allImgsDom[index++],
      procedure_efficiency:this.allImgsDom[index++],
      procedure_ideal:this.allImgsDom[index++],
      procedure_non_ideal:this.allImgsDom[index++],
      procedure_part_2:this.allImgsDom[index++],
      
      // ! Procedure formula Nomenclature images end

      //! EE9 images added
      btn_begin_experiment:this.allImgsDom[index++],
      btn_check_connections:this.allImgsDom[index++],
      btn_cmpltd_circuit_diagram:this.allImgsDom[index++],
      btn_delete:this.allImgsDom[index++],
      btn_hint:this.allImgsDom[index++],
      btn_incorrect_connection:this.allImgsDom[index++],
      btn_plot:this.allImgsDom[index++],
      btn_procedure:this.allImgsDom[index++],
      btn_record:this.allImgsDom[index++],
      btn_record_values:this.allImgsDom[index++],
      btn_record_waveforms:this.allImgsDom[index++],
      btn_reset:this.allImgsDom[index++],
      btn_reset_all:this.allImgsDom[index++],
      btn_reset_all_part_3:this.allImgsDom[index++],
      btn_reset_part_3:this.allImgsDom[index++],
      part_1_circuit_1:this.allImgsDom[index++],
      part_1_circuit_2:this.allImgsDom[index++],
      part_1_circuit_3:this.allImgsDom[index++],
      part_1_circuit_4:this.allImgsDom[index++],
      part_1_components:this.allImgsDom[index++],
      part_2_graph:this.allImgsDom[index++],
      part_2_graph_empty:this.allImgsDom[index++],
      part_3_circuit:this.allImgsDom[index++],
      part_3_select_option_1:this.allImgsDom[index++],
      part_3_select_option_1_select:this.allImgsDom[index++],
      part_3_select_option_2:this.allImgsDom[index++],
      part_3_select_option_2_select:this.allImgsDom[index++],
      part_3_select_option_3:this.allImgsDom[index++],
      part_3_select_option_3_select:this.allImgsDom[index++],
      part_3_select_option_4:this.allImgsDom[index++],
      part_3_select_option_4_select:this.allImgsDom[index++],
      part_3_select_option_full:this.allImgsDom[index++],
      header_helper:this.allImgsDom[index++],
      procedure_popup_box:this.allImgsDom[index++],
      hint_popup_box:this.allImgsDom[index++],
      part_2_graph_with_arrow:this.allImgsDom[index++],
      text_correct_connections_box:this.allImgsDom[index++],
      //! EE9 images end here


      // * Question Mark
      domQs1: this.allQsDom[0],
      domQs2: this.allQsDom[1],
      domQs3: this.allQsDom[2],
      domQs4: this.allQsDom[3],
      domQs5: this.allQsDom[4],
      domQs6: this.allQsDom[5],
      
      
      // * Videos
      // yoke_front_to_back: this.allVideosDom[0],
      // yoke_front_to_side: this.allVideosDom[1],
      // panel1: this.allVideosDom[2],
      // panel2: this.allVideosDom[3],

      bfs_video: this.allVideosDom[0],
    };
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
