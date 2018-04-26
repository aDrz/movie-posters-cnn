// https://github.com/douglasbagnall/image-tsne

function plot(json, size){
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    // var svg = d3.select("div.w3-twothird")
    // 	.append("svg")
    //     .attr("width", w/2-10)
    //     .attr("height", (w/2-10)*2/3);

    var svg = d3.select("#tsne")
	.append("svg")
	.attr("viewBox", "0 0 1024 500");

    var img = d3.select("#poster-img");
    var img1 = d3.select("#poster-img1");
    var img2 = d3.select("#poster-img2");
    var img3 = d3.select("#poster-img3");
    var img4 = d3.select("#poster-img4");
    var img5 = d3.select("#poster-img5");
    var img6 = d3.select("#poster-img6");

    svg.append('g').selectAll('.myPoint')
        .data(json)
        .enter()
        .append('image')
        .attr("xlink:href", function(d){ return url_www+'static/'+(d.thumb) })
        .attr("x", function(d){ return d.xy[0]})
        .attr("y", function(d){ return d.xy[1]})
        .attr("width", size[0])
        .attr("height", size[1])
        .on("click", function(d, i){
	    retrieve_movie(d.id);
        });

    
    var zoom = d3.zoom().scaleExtent([0.5, 10])
	.translateExtent([[-100, -100], [1500, 1500]]);
    svg.call(zoom);
    zoom.on("zoom", function(){
	
	var transform = d3.event.transform;
	var w = size[0] / transform.k;
	var h = size[1] / transform.k;
	var transform = "translate(" + transform.x + "," +
	    transform.y + ") scale(" + transform.k + ")";
	svg.selectAll('image')
	    .attr("transform", transform)
	    .attr('width', w)
	    .attr('height',h);
    });
};

function click_img(num) {
    retrieve_movie(dataClicked[num].id);
};


function updatePage() {
    $('input:first').val(dataClicked[0].title_display);
    console.log(myData[0].url_img);
    $("#poster-img").attr("src", url_www+'static/'+(dataClicked[0].path_img));
    for (var i = 1; i < 7; i++)
    {
	$("#poster-img"+i).attr("src", url_www+'static/'+(dataClicked[i].path_img));
    }
};


function retrieve_movie(id) {
    url = url_api + id.toString();
    $.ajax({
        type:"get",
        url: url,
	dataType: "json",
        success: function(data) {
            dataClicked = data;
        },
        complete: function() {
	    updatePage();
        }
    });
};


function updateWindow(){
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
window.onresize = updateWindow;

function get_size(){
    var dataset = window.location.search.substr(1);
    return [40, 40];
}

// var jsonvar = []

// d3.json(get_dataset(), function(error, json) {
//     if (error) return console.warn(error);
//     jsonvar = json;
//     plot(json, get_size());
// });


myData = [];
dataClicked = [];
map_id_title = {};

url_www = 'http://128.79.92.46:5000/';
url_api = 'http://128.79.92.46:5000/v1/';

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

$(document).ready(function() {
    crossDomain: true;
    $.ajax({
        type:"get",
        url: url_api + '2d',
	dataType: "json",
        success: function(data) {
	    console.log('success madafaka');
	    myData = data;
	    // plot(myData, [40, 40]);
	},
        complete: function() {
            //setTimeout(loadData, 1000);
        }
    });

});
