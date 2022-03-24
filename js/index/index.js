let can_res_height = window.innerHeight;
let can_res_width = can_res_height * 3/4;

let canvas_col = document.getElementById('cnv-col');
let content_col = document.getElementById('cnt_col');
let generateBtn = document.getElementById('generateBtn');
let notification = document.getElementById('notify');

content_col.style.height = can_res_height + 'px';
content_col.style.height = can_res_height + 'px';


content_col.style.width = (window.innerWidth - can_res_width) - 1 + 'px';


generateBtn.addEventListener("click", function(){
    window.location = ""
})