

let t_r = 0,t_g = 0,t_b = 0;
let source_color = '#FFFFFF';
const target_Canvas = document.getElementById("target");
const source_Canvas = document.getElementById("source");
const color_picker = document.getElementById("colorpicker");
const result_button  = document.getElementById("result");
const reset_button  = document.getElementById("reset");
const result_text = document.getElementById("result_text");

function init_color() {
    let [r,g,b] = [~~(Math.random() * 256),~~(Math.random() * 256),~~(Math.random() * 256)];
    [t_r,t_g,t_b] = [r,g,b];
    let randcolor = `background-color:rgb(${r},${g},${b})`;
    target_Canvas.setAttribute("style",randcolor);
}

color_picker.addEventListener('change',function(event) {
    let color = 'background-color:'+event.target.value;
    source_color = event.target.value;
    source_Canvas.setAttribute('style',color); 
});

result_button.addEventListener('click',function(event) {
    let diff_r = parseInt(source_color.slice(1,3),16) - t_r;
    let diff_g = parseInt(source_color.slice(3,5),16) - t_g;
    let diff_b = parseInt(source_color.slice(5,7),16) - t_b;

    result_text.innerText = `結果：R(${diff_r})、G(${diff_g})、B(${diff_b})`;
});

reset_button.addEventListener('click',function(event) {
    result_text.innerText = '結果：';
    init_color();
});

init_color();