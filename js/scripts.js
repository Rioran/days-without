const MS_RENDER_DELAY = 1000 * 60 * 10; // every 10 minutes
const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
const text_header_p = document.getElementById("text-header-p");
const days_without_p = document.getElementById("days-without-p");
const universal_day_string = "2022-11-15";
const universal_text = "Рома продержался дней без колы:";
const query_string = window.location.search;
const url_params = new URLSearchParams(query_string);

var date_cache = "current date goes here";
var start_day;
var text;


function get_parameter(parameter_name, parameter_default) {
    var parameter_value = url_params.get(parameter_name);
    if (parameter_value == null) {
        parameter_value = parameter_default;
    }
    return parameter_value;
}

function set_up() {
    start_day = get_parameter("start", universal_day_string);
    start_day = new Date(start_day).toISOString().split('T');
    text = get_parameter("text", universal_text);
    text_header_p.innerHTML = text;
    render_days();
}

function render_days() {
    var today = new Date().toISOString().split('T');
    if (today !== date_cache) {
        var date_diff = (new Date(today)) - (new Date(start_day));
        days_without_p.innerHTML = Math.floor(date_diff / MS_IN_A_DAY);
        date_cache = today;
    }
}

function render_loop() {
    setInterval(function(){
        render_days();
    }, MS_RENDER_DELAY);
}


set_up();
render_loop();
