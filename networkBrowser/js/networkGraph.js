var w = 800, h = 600;
    
var defaultStrokeWidth = 1.5;

var geneList = {};
var hdinhd_striatum = false;
var hdinhd_cortex = false;
var moduleDescriptions = {};

var path = "/gclabapps/nb/";
//var path ="/nb/";

var selectedSymbolName="";
var selectedColor = "#cccccc";
var projectId="0";
var sizeDatas = {};

$( document ).ready(function() {
  initWindowSize();
  initGraph();
  initProjectId();
  initModelGraph();
  initKnob();
  initNodeinfoWindowSize();
  initNodeinfoWindowOpenButton();
  initNodeinfoWindowCloseButton();
  //initAboutB();
  initSearchB();
});

function getPlotDataPath() {
	//for testing use
	//return "/nb/getNetworkPlotData";
	//return "/nb/getNetworkPlotDataDan";
	return path + "getNetworkPlotData";
	//return path + "getNetworkPlotDataDan";
	
	//for public use
	//return "/gclabapps/nb/getNetworkPlotData";
	//return "/gclabapps/nb/getNetworkPlotDataDan";
}

function initGraph() {
  modelvis = d3.select("#modelChart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("pointer-events", "all")
    .append('svg:g')
    .call(d3.behavior.zoom().on("zoom", zoomHandler))
    .append('svg:g');
}

function initd3() {
   document.getElementById("geneChart").innerHTML="";
	
	vis = d3.select("#geneChart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)//;
    .attr("pointer-events", "all")
    .append('svg:g')
    .call(d3.behavior.zoom().on("zoom", zoomHandler))
    .append('svg:g');
  

	vis.append('svg:rect')
    .attr('width', w)
    .attr('height', h)
    .attr('fill', 'none');
}
  
function zoomHandler() {
	//if (d3.event.sourceEvent.type=='mousewheel' || d3.event.sourceEvent.type=='DOMMouseScroll')
	//{
  		vis.attr("transform",
      			 "translate(" + d3.event.translate + ")"
      			 + " scale(" + d3.event.scale*1.2 + ")");
    //}
}  

var translateModelNumberToColor = false;
var hdinhd = false;
var hint_mappings = {};
var ensembl_mappings = {};
var region = "";

function initProjectId() {
  var pathArray = window.location.search.split( '=' );
  projectId = pathArray[1];
  if (projectId === "Yang_HD_STR;ver") {
	specialText();
  }

  // HDinHD projects
  if (projectId.startsWith("hdinhd/")) {
	hdinhd = true;
	$.getJSON( "/static/gclabapps/networkBrowser/js/hint_mappings.json", function( data ) {
		$.each( data, function( key, val ) {
			hint_mappings[key] = val;
		});
	});
	$.getJSON( "/static/gclabapps/networkBrowser/js/ensembl_mappings.json", function( data ) {
		$.each( data, function( key, val ) {
			ensembl_mappings[key] = val;
		});
	});
	if (projectId.match(/Striatum/i)) {
		region = "striatum";
	} else if (projectId.match(/Liver/i)) {
		region = "liver";
	} else if (projectId.match(/Cortex/i)) {
		region = "cortex";
	} else if (projectId.match(/Cerebellum/i)) {
		region = "cerebellum";
	} else if (projectId.includes(/Hippocampus/i)) {
		region = "hippocampus";
	}

	$("#modelname").addClass("model-top-margin");
	$("#infoContainer").addClass("info-top-margin");
	hdinhdSpecialText();
	if (!projectId.includes("colorCode")) {
		translateModelNumberToColor = true;
	}
  }
}

function hdinhdSpecialText() {
	$("#modelname").before('<div class="top-info"><h2>HDinHD Main Message</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet purus eget bibendum lobortis. Mauris euismod, odio vel sodales bibendum, lorem libero tincidunt nibh, vitae vestibulum enim ante dictum lacus. Praesent dapibus urna sed condimentum vehicula. Cras facilisis, dolor at fringilla rhoncus, risus tortor viverra nibh, non egestas odio tellus nec velit. Vestibulum pellentesque quis ipsum nec tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras sed sapien et ex aliquam luctus non vitae quam. Integer ultrices egestas libero ac lobortis. In gravida ipsum sed mauris posuere, nec blandit neque mattis.</p></div>');
	$("#searchB").after("<div id='aboutB'></div>");
	$("#aboutContainer").html('<h2>HDinHD Detail Information</h2><p>Fusce gravida nibh erat, nec iaculis elit euismod ac. Aenean nec purus risus. Pellentesque a neque malesuada, faucibus nibh at, lobortis nulla. Nunc interdum est at ex eleifend vestibulum porttitor eget dui. Nunc in tortor in neque ullamcorper pellentesque. Vestibulum aliquet ornare orci, a posuere libero laoreet eget. Nulla facilisi. Integer lobortis, tellus sit amet scelerisque accumsan, sem ligula aliquam elit, a hendrerit odio elit et erat. Pellentesque cursus lobortis massa, eu pulvinar diam pulvinar nec. Vestibulum efficitur, justo ac aliquam luctus, lorem orci egestas arcu, sit amet consequat ante magna accumsan metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p><p>Aenean est nisi, maximus nec tincidunt egestas, commodo porta quam. Praesent commodo venenatis justo, at hendrerit massa blandit id. Morbi iaculis in nunc fringilla aliquam. Vivamus accumsan blandit arcu. Phasellus non libero non diam euismod dictum eu in arcu. Suspendisse eget nunc sed justo varius fringilla. Cras id magna sem</p><p>Phasellus ac neque mi. Mauris dapibus mollis scelerisque. Proin a orci sed libero rutrum varius. Maecenas eleifend eros id sem mattis sollicitudin a at mi. Vivamus interdum, tortor a pellentesque mattis, lorem nulla dapibus elit, in bibendum lectus nunc at nibh. Vestibulum consectetur blandit ipsum in bibendum. Integer nec mattis quam, vel lacinia dolor. Maecenas dapibus, ex eget vulputate interdum, est felis lacinia dui, vitae pulvinar felis urna sit amet orci. Quisque et vehicula elit. Aliquam rutrum ante eu lectus faucibus mollis. Ut vehicula velit sit amet massa bibendum vulputate in sit amet nulla.</p>');
	initAboutB();
}

function specialText() {
	$("#modelname").before('<h3>Network Plot from <b style="color: black">"N17 Modifies Mutant Huntingtin Nuclear Pathogenesis and Severity of Disease in HD BAC Transgenic Mice"</b> (Gu et al., Neuron 85 , 2015). <br/>Raw data is available in <a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE64386">GEO</a>. Additional Information about this and other HD studies from the X. William Yang lab can be found on our <a target="_blank" href="http://yanglab.npih.ucla.edu">website</a>.</h3>');
	$("#searchB").before("<div id='aboutB'></div>");
	initAboutB();
}

function initWindowSize() {
	w = $(window).width()-20;
	h = $(window).height()-40;
}

function initKnob() {
	$(".dial").knob({
		"fgColor":"#56E0F0",
		"min":1,
		"max":500,
		"angleArc":250,
		"angleOffset":-125,
		"width":250,
		"release" : function (v) { knobSymbolRedraw(v); } 
		});	
}

function initModelGraph() {
	document.getElementById("modelChart").style.display = "block"; 
	document.getElementById("geneChart").style.display = "none"; 
    //document.getElementById("controlPanelDiv").style.display = "none"; 
	
	//var moduleDataPath = "/fb/getNetworkPlotModuleData?id="+projectId;
	var moduleDataPath = getPlotDataPath()+"?num=9999;model=symbol;symbol=module;id="+projectId;
    
	
	//d3.json("data/sub_network_modules.json", function(json) {
		
	d3.json(moduleDataPath, function(json) {
    var force = self.force = d3.layout.force()
        .nodes(json.nodes)
        .links(json.links)
        //.gravity(.05)
        //.distance(390)
        .distance(300)
        .linkStrength(0.05)
        //.charge(-100)
        .charge(-300)
        .size([w, h])
        .start();

    var link = modelvis.selectAll("line.link")
        .data(json.links)
        .enter().append("svg:line")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .style("stroke",function(d) {return "#ccc";/*return getModelEdgeColor(d.source.name,d.target.name);*/ });

    var node = modelvis.selectAll("g.node")
        .data(json.nodes)
      	.enter().append("svg:g")
        .attr("class", "node")
        .call(force.drag);

	node.append("svg:circle")
     .attr("r", function(d) { return 15;/*getSize();*/ }  )
     .style("fill",  function(d) { return getColorByName(d.name); }  );
     // .style("fill",  function(d) { return "#56E0F0";/*getColorByName(d.name);*/ }  );
     //.style("fill",  function(d) { return getColor(); }  );

    node.append("svg:text")
        .attr("class", "nodetext")
        // .attr("dx", 12)
        .attr("dx", 15)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });
    
    node.on("mouseover", fade(0.05,true));
    	                              
    node.on("mouseout", function(){fade(0,false); } );	  
    
    function getModuleDescription(module) {
	module = module.replace(/^\D+/g, '');
	if (hdinhd_striatum) {
	  module = "Striatum M" + module;
        } else if (hdinhd_cortex) {
          module = "Cortex M" + module; 
        }

	var length = moduleDescriptions.length;
        for (var i = 0; i < length; i++) {
	  if (moduleDescriptions[i].Module == module) {
	    return "<p style='margin: 0; font-size: 16px;'>" + moduleDescriptions[i].Description + "</p>";
	  }
        }

	return null;
    }


    node.on("click", function(d, i) {
    	var name = d.name;	
    	selectedSymbolName=name;
    	
    	selectedColor = getColorByName(name); 
    	
    	$("#modelname").html("Module: " + selectedSymbolName);
	if (hdinhd_striatum || hdinhd_cortex) {
	  $("#modelname").append(getModuleDescription(selectedSymbolName));	
	  // Load model gene list
	  if (hdinhd_striatum) {
	    var csvPath = '/static/gclabapps/networkBrowser/file/moduleContent-striatum-M.' + selectedSymbolName.replace(/^\D+/g, '').padStart(2, "0") + '.csv';
	  } else if (hdinhd_cortex) {
	    var csvPath = '/static/gclabapps/networkBrowser/file/moduleContent-cortex-M.' + selectedSymbolName.replace(/^\D+/g, '').padStart(2, "0") + '.csv';
	  } 

	  d3.csv(csvPath, function(genes) {
	    geneList = genes;
	  });
	}
    	
    	//var url = path + "getNodeSizeDan" +"?symbol="+selectedSymbolName+";id="+projectId; 
	    //$.getJSON(url,function(data){
                   // sizeDatas[selectedSymbolName] = data;
                    //if(name.indexOf("mi") == -1)
    			//	{	
    					document.getElementById("modelChart").style.display = "none"; 
    					document.getElementById("geneChart").style.display = "block"; 
    		
    					initd3();
    		
					var num = 100;
    					var file = getPlotDataPath()+"?num="+num+";model=symbol;symbol="+name+";id="+projectId;
    					initGneGraph(file);

						$( "#infoContainer" ).toggle( "slide",200 );
    				//}
                   
        //          }
		//);  
       	
    });
    
    link.on("click", function(d, i) {
    					var matchresult = matchLink(connectedLinks,d);
    				
    					if(matchresult) {
            			link.style("stroke-opacity", function(o) {
            		
            				if(o===d) {
                				link.attr("class", "link");
                				return 1;
                			}	
                			else
                			{
                				link.attr("class", "linkHighLightSingle");
                				return 0;
                			}
            			});
            		   }
        			}
    );
    
    link.on("contextmenu", function(data, index) {
     /*
        d3.event.preventDefault();
     
        link.style("stroke-opacity", function(o) {
            				if(o===data) { 
                				link.attr("class", "link");
                				
                				var sourceNodeName = o.source.name ;
                				var targetNodeName = o.target.name;
                				
                				document.getElementById("genecard_a").style.display = "none"; 
                				document.getElementById("brainspan_a").style.display = "none"; 
                				document.getElementById("cox_a").style.display = "none"; 
                				
                				document.getElementById("pubmid_a").setAttribute("href", "http://www.ncbi.nlm.nih.gov/pubmed?term="+"(" + sourceNodeName + ")" +"OR"+ "(" + targetNodeName + ")"  );
     	
     							document.getElementById("NGPopUp").style.left = "400px";
     							document.getElementById("NGPopUp").style.top = "300px";
     							document.getElementById("NGPopUp").style.display = "block";     	

     							cancelTimer();
                				return 1;
                			}	
                			else {
                				link.attr("class", "linkHighLightSingle");
                				return 0;
                			}
            			});
     */
	});
	
  var linkedByIndex = {};

  json.links.forEach(function(d) {
      linkedByIndex[d.source.index + "," + d.target.index] = 1;
  });

	function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }
    
    var selectedNodeName = "";
    //var connectedNodes = [];
    //var connectedLinks = [];

	function fade(opacity,linkHighLight) {
        return function(d) {
            node.style("stroke-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                this.setAttribute('fill-opacity', thisOpacity);
                return thisOpacity;
            });
            
			selectedNodeName = d.name;
            //connectedNodes = [];

      link.style("stroke-opacity", function(o) {
          //link.attr("class", "linkRed");
          
          if(linkHighLight) {
            //alert(o.value); 
            link.attr("class", "linkHighLight");
          }
          else {
            link.attr("class", "link");
          }
          
          if(o.source === d || o.target === d) {	
          /*
            if(o.source === d)
              connectedNodes.push(o.target.name);
            else
              connectedNodes.push(o.source.name);
            
            connectedLinks.push(o);
            */
            return 1;
          }
          else {
            return opacity;
          }
      });
      
      link.style("stroke", function(d) {
         // if(o.source === d || o.target === d)
         // {	
         // 	if(o.value < 0)
         // 		return "#F99";
         // 	else
         // 		return "#aaa";
         // }
         // else
         // {
            return "#aaa";
            //return getModelEdgeColor(d.source.name,d.target.name); 
          //}
      });            
            
           // var s="";
            //for(var i=0; i<connectedNodes.length;i++)
            //{
            //	s = s + connectedNodes[i]+"<br/>";
            //}
            
            //document.getElementById("infoPanel").innerHTML = s;
        };
    }

	node.on("contextmenu", function(data, index) {
		//alert("R:"+data.name);
        /*
     	d3.event.preventDefault();
        showAllLinkField();
     	
     	document.getElementById("genecard_a").setAttribute("href", "http://www.genecards.org/cgi-bin/carddisp.pl?gene="+data.name);
     	document.getElementById("brainspan_a").setAttribute("href", "http://www.brainspan.org/rnaseq/search?type=rnaseq&query="+data.name);
     	document.getElementById("pubmid_a").setAttribute("href", "http://www.ncbi.nlm.nih.gov/pubmed?term="+data.name);
     	document.getElementById("cox_a").setAttribute("href", "http://coxpresdb.jp/cgi-bin/inkeyword.cgi?type=any&word="+data.name);
     	
     	document.getElementById("NGPopUp").style.left = (data.x+30)+"px";
     	document.getElementById("NGPopUp").style.top = data.y+"px";
     	document.getElementById("NGPopUp").style.display = "block";     	
     
     	cancelTimer();
     	*/
	});

	node.on("dblclick", function(d) {
    	d.x=400;
    	d.y=300;
    	d.px=400;
    	d.py=300;
    	force.start();
    
  });	 

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
});  
}

function initGneGraph(file) {
  //var file = "fb/getNetworkPlotData?num=300;model=symbol;symbol=paM1";

  d3.json(file, function(json) {
    var force = self.force = d3.layout.force()
        .nodes(json.nodes)
        .links(json.links)
        //.gravity(.005)
        //.distance(300)
        //.linkStrength(0.05)
        .charge(-300)
        .gravity(.05)
        .distance(100)
        .linkStrength(0.5)
        .size([w, h])
        .start();

    var link = vis.selectAll("line.link")
        .data(json.links)
        .enter().append("svg:line")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    var node = vis.selectAll("g.node")
        .data(json.nodes)
      	.enter().append("svg:g")
        .attr("class", "node")
        .call(force.drag);
    //force.alpha(0.02);    
	/*
    node.append("svg:image")
        .attr("class", "circle")
        .attr("xlink:href", "https://d3nwyuy0nl342s.cloudfront.net/images/icons/public.png")
        .attr("x", "-8px")
        .attr("y", "-8px")
        .attr("width", "16px")
        .attr("height", "16px");*/

	node.append("svg:circle")
      //.attr("r", 15)
      .attr("r", function(d) { return 12;/*getSizeByNameSearch(d.name);*//*getSize();*/ }  )
      
      //.style("fill", "#1BE032"  );//.style("fill", function(d) { return color(d.group); }  );
     // .style("fill",  function(d) { return "#56E0F0";/*getASDColor(d.name);*//*return selectedColor;*//*return getColor();*/ }  );
     .style("fill",  function(d) { return selectedColor;}  );
      
     // .style("stroke", function(o) { return "#FAC0F2";  })
     // .style("stroke-width", function(d) { return getASDColor(d.name);  });

    node.append("svg:text")
        .attr("class", "nodetext")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });
    /*alert(d.name);*/
    
    node.on("click", fade(0.1,true)  );
    /*
    node.on("click", function(d){
    	
    	//alert("A");
    	
    	fade(0.1,true);
    
    });
    */
     
    link.on("click", function(d, i) {
    					//alert(connectedNodes);
    					//alert( d.source.name+"       "+d.target.name);
    					
    					//connectedNodes.push(selectedNodeName);
    					//var matchresult = matchNode(connectedNodes, d.source.name) && matchNode(connectedNodes, d.target.name);
    					var matchresult = matchLink(connectedLinks,d);
    					//connectedNodes.pop();
    					
    					if(matchresult) {
            			link.style("stroke-opacity", function(o) {
            				
            				//var matchresult = matchNode(connectedNodes, o.source.name) || matchNode(connectedNodes, o.target.name);
            				if(o===d) {
                				link.attr("class", "link");
                				return 1;
                			}	
                			else {
                				link.attr("class", "linkHighLightSingle");
                				return 0;
                			}
            			});
            		   }
        			}
    );
    
    link.on("mouseover", function(d,i) {
     	var matchresult = matchLink(connectedLinks,d);
    					
    	if(matchresult) {					
     		//alert(d.source.name+"     "+d.target.name);
     		
     		link.style("stroke-width", function(o) {
                if(o.source.name == d.source.name && o.target.name == d.target.name ) {
                	return "7px";
                }
                else {
                	return "1.5px";
                }
            });
     	}
     });
       
    link.on("contextmenu", function(data, index) {
        d3.event.preventDefault();
     
        link.style("stroke-opacity", function(o) {
            				if(o===data) { 
                				link.attr("class", "link");
                				
                				var sourceNodeName = o.source.name ;
                				var targetNodeName = o.target.name;
                				
                				document.getElementById("genecard_a").style.display = "none"; 
                				document.getElementById("brainspan_a").style.display = "none"; 
                				document.getElementById("cox_a").style.display = "none"; 
                				document.getElementById("stanford_a").style.display = "none"; 
                				
                				//document.getElementById("pubmid_a").setAttribute("href", "http://www.ncbi.nlm.nih.gov/pubmed?term="+"(" + sourceNodeName + ")" +"AND"+ "(" + targetNodeName + ")AND(brain)"  );
     							document.getElementById("pubmid_a").setAttribute("href", "http://www.ncbi.nlm.nih.gov/pubmed?term="+"(" + sourceNodeName + ")" +"AND"+ "(" + targetNodeName + ")"  );
     							
     							//document.getElementById("NGPopUp").style.left = "400px";
     							/*
     							document.getElementById("NGPopUp").style.top = "300px";
     							document.getElementById("NGPopUp").style.marginLeft = "50%";
     							document.getElementById("NGPopUp").style.marginRight = "50%";
     							*/
     							
     							document.getElementById("NGPopUp").style.top = mousePos.y + "px";
     							document.getElementById("NGPopUp").style.left = (mousePos.x+20) + "px";
     							
     							document.getElementById("NGPopUp").style.display = "block";     	

     							cancelTimer();
                				return 1;
                	}	
                	else {
                				link.attr("class", "linkHighLightSingle");
                				return 0;
                			}
            			});
	});
    /*
    node.on("mouseover", fade(0.1,true)
    							//link.attr("class", "link2");
    	                              );
    	                              
    node.on("mouseout", function(){fade(0,false); setTimer("NGPopUp");}
    							//link.attr("class", "link");
    	                              );	  
    */	                                                          
	
	var linkedByIndex = {};
    json.links.forEach(function(d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

	function isConnected(a, b) {
        return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
    }
    
    var selectedNodeName = "";
    var connectedNodes = [];
    var connectedLinks = [];

	function fade(opacity,linkHighLight) {
        return function(d) {
            node.style("stroke-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                this.setAttribute('fill-opacity', thisOpacity);
                return thisOpacity;
            });
            
			selectedNodeName = d.name;
      connectedNodes = [];
      connectedNodes.push(selectedNodeName);

      link.style("stroke-opacity", function(o) {
          //link.attr("class", "linkRed");
        if(linkHighLight) {
          link.attr("class", "linkHighLight");
        }
        else {
          link.attr("class", "link");
        }
        
        if(o.source === d || o.target === d) {
          if(o.source === d) {	
            connectedNodes.push(o.target.name);
            //  alert("t:"+o.target.name);
          }
          else {	
            connectedNodes.push(o.source.name);
            //  alert("s:"+o.source.name);
          }
          
          connectedLinks.push(o);
          
          return 1;
        }
        else {
          return opacity;
        }
        //return o.source === d || o.target === d ? 1 : opacity;
    });
            /*
            link.style("stroke-width", function(o) {
               
                if(o.source === d || o.target === d)
                {
                	return "7px";
                }
                else
                {
                	return "1.5px";
                }
               
            });
            */
            
            //var s="";
    connectedNodes = connectedNodes.getUnique();
    setNodeInfoList(connectedNodes);
            //for(var i=0; i<connectedNodes.length;i++)
            //{   
            //	s = s + connectedNodes[i]+"\n";
            //}
            //document.getElementById("infoPanel").innerHTML = s;
            //document.getElementById("infoPanel").value = s;
        };
    }

	node.on("contextmenu", function(data, index) {
		//alert("R:"+data.name);
     	d3.event.preventDefault();
     	//alert(mousePos.x+"-----"+mousePos.y);
    
      showAllLinkField();
     	
	if (hdinhd) {
		$("#repair_a").attr("href", "https://repair.hdinhd.org/");
		$("#repair_a").parent().show();

		if (data.name in hint_mappings) {
			$("#hint_a").attr("href", "https://hint.hdinhd.org/proteins/info/" + hint_mappings[data.name]);		
			$("#hint_a").parent().show();
		} else {
			$("#hint_a").parent().hide();
		}

		if (data.name in ensembl_mappings) {
			$("#asviewer_a").attr("href", "https://asviewer.hdinhd.org/?gene=" + ensembl_mappings[data.name] + "&tissue=" + region);
			$("#asviewer_a").parent().show();
		} else {
			$("#asviewer_a").parent().hide();
		}

		if (region === "striatum") {
			$("#biogemix_a").attr("href", "http://www.broca.inserm.fr/webportal/images/LFC_3D_plots/Str/LFC_3D_plot_" + data.name + "_Str.png");
			$("#biogemix_a").parent().show();	
		} else if (region === "cortex") {
			$("#biogemix_a").attr("href", "http://www.broca.inserm.fr/webportal/images/LFC_3D_plots/Cor/LFC_3D_plot_" + data.name + "_Cor.png");
			$("#biogemix_a").parent().show();	
		} else if (region === "cerebellum") {
			$("#biogemix_a").attr("href", "http://www.broca.inserm.fr/webportal/images/LFC_3D_plots/Cer/LFC_3D_plot_" + data.name + "_Cer.png");
			$("#biogemix_a").parent().show();	
		} else {
			$("#biogemix_a").parent().hide();	
		}	

		$("#hd_proteome_a").attr("href", "https://hdpb.evotec.com/mxdb/searchProteins/query?query=geneName%3D%22" + data.name + "%22%20AND%20reviewed%3D%22yes%22");
                $("#hd_proteome_a").parent().show();
	}

     	document.getElementById("genecard_a").setAttribute("href", "http://www.genecards.org/cgi-bin/carddisp.pl?gene="+data.name);
     	document.getElementById("brainspan_a").setAttribute("href", "http://www.brainspan.org/rnaseq/search?type=rnaseq&query="+data.name);
     	document.getElementById("pubmid_a").setAttribute("href", "http://www.ncbi.nlm.nih.gov/pubmed?term="+data.name);
     	document.getElementById("cox_a").setAttribute("href", "http://coxpresdb.jp/cgi-bin/inkeyword.cgi?type=any&word="+data.name);
     	document.getElementById("stanford_a").setAttribute("href", "http://web.stanford.edu/group/barres_lab/cgi-bin/igv_cgi_2.py?lname="+data.name);
     	
     	//document.getElementById("NGPopUp").style.left = (data.x+300)+"px";
     	/*
     	document.getElementById("NGPopUp").style.top = data.y+"px";
     	document.getElementById("NGPopUp").style.marginLeft = "50%";
     	document.getElementById("NGPopUp").style.marginRight = "50%";
     	*/
     	
     	
     	document.getElementById("NGPopUp").style.top = mousePos.y + "px";
     	document.getElementById("NGPopUp").style.left = (mousePos.x+20) + "px";
    	
     	document.getElementById("NGPopUp").style.display = "block";     	
     	
     	//var item = document.getElementById("button");
		//item.addEventListener("mouseover", func, false);
		//item.addEventListener("mouseout", func1, false);

     	cancelTimer();
	});

	node.on("dblclick", function(d) {
    	//node.attr("transform", function(d) { return "translate(" + 300 + "," + 300 + ")"; });
    	
    	d.x=400;
    	d.y=300;
    	d.px=400;
    	d.py=300;
    	force.start();
    	//force.tick();
    							//alert("C");
    							
    							//node.forEach(function(n) {
    /*if (n.source && node.target) {
      node.type = node.source.type = "target-source";
      node.target.type = "source-target";
    } else if (node.source) {
      node.type = node.source.type = "source";
    } else if (node.target) {
      node.type = node.target.type = "target";
    } else {
      node.connectors = [{node: node}];
      node.type = "source";
    }*/
  //});
    							/*
    							if (d.children) 
    							{
    								d._children = d.children;
    								d.children = null;
  								} 
  								else 
  								{
    								d.children = d._children;
    								d._children = null;
  								}
  								update();
  									*/
    });	 

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
});  

}

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

var timeout	= 300;
var closetimer	= 0;

function cancelTimer() {
	if(closetimer) {
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

function setTimer(itemToClose) {
	closetimer = window.setTimeout( function(){document.getElementById(itemToClose).style.display = "none";  } , timeout);
}

var colorIndex = 0;
function getColor() {
	var a = ["#F73E88","#F74581","#F745F1","#9773FA","#7375FA","#73A7FA","#73EAFA","#4EF5CE","#45E670","#96E60E","#E6D40E","#E67A0E"];
	
	var c = a[colorIndex];
	
	colorIndex = colorIndex+1;
	if(colorIndex >= a.length)
		colorIndex=0;
	
	return c;
}

function getColorByName(name) {
	var mapping = {
		"01": "#40E0D0",
		"02": "#0000FF",
		"03": "#A52A2A",
		"04": "#FFFF00",
		"05": "#00FF00",
		"06": "#FF0000",
		"07": "#000000",
		"08": "#FFC0CB",
		"09": "#FF00FF",
		"10": "#A020F0",
		"11": "#ADFF2F",
		"12": "#D2B48C",
		"13": "#FA8072",
		"14": "#00FFFF",
		"15": "#191970",
		"16": "#E0FFFF",
		"17": "#999999",
		"18": "#90EE90",
		"19": "#FFFFE0",
		"20": "#4169E1",
		"21": "#8B0000",
		"22": "#006400",
		"23": "#00CED1",
		"24": "#A9A9A9",
		"25": "#FFA500",
		"26": "#FF8C00",
		"27": "#FFFFFF",
		"28": "#87CEEB",
		"29": "#8B4513",
		"30": "#4682B4",
		"31": "#AFEEEE",
		"32": "#EE82EE",
		"33": "#556B2F",
		"34": "#8B008B",
		"35": "#CD6839",
		"36": "#9ACD32",
		"37": "#6CA6CD",
		"38": "#FFBBFF",
		"39": "#8B2500",
		"40": "#8968CD",
		"41": "#CAE1FF",
		"42": "#E0FFFF",
		"43": "#FFFFF0",
		"44": "#FFFAF0",
		"45": "#EE7600",
		"46": "#8B2323",
		"47": "#8B7D6B",
		"48": "#483D8B",
		"49": "#EEAEEE",
		"50": "#EED2EE",
		"51": "#FFE1FF",
		"52": "#8B4C39",
		"53": "#CD6889",
		"54": "#EECFA1",
		"55": "#B03060",
		"56": "#8B5F65",
		"57": "#CDC1C5",
		"58": "#F0FFF0",
		"59": "#698B69",
		"60": "#FF7256",
		"61": "#8B8378",
		"62": "#EE6A50",
		"63": "#BA55D3",
		"64": "#7EC0EE",
		"65": "#8B8B00",
		"66": "#87CEFF",
		"67": "#DDA0DD",
		"68": "#CD3700",
		"69": "#9F79EE",
		"70": "#B0C4DE",
		"71": "#F08080",
		"72": "#8B3A3A",
		"73": "#8B1A1A",
		"74": "#6E8B3D",
		"75": "#EE3B3B",
		"76": "#0000EE",
		"77": "#9400D3",
		"78": "#CD96CD",
		"79": "#CDB5CD",
		"80": "#D8BFD8",
		"81": "#EE8262",
		"82": "#EE799F",
		"83": "#FFDEAD",
		"84": "#8B008B",
		"85": "#CD8C95",
		"86": "#EEE0E5",
		"87": "#F0FFF0",
		"88": "#9BCD9B",
		"89": "#FF7F50",
		"90": "#EEDFCC",
		"91": "#CD5B45",
		"92": "#5D478B",
		"93": "#4A708B",
		"94": "#CDCD00",
		"95": "#8B4726",
		"96": "#8B636C",
		"97": "#FF4500",
		"98": "#AB82FF",
		"99": "#8470FF",
		"100": "#68838B",
	}

	// name = name.toLowerCase();

	if (translateModelNumberToColor) {
		name = name.replace(/^\D+/g, '').padStart(2, "0");
		if(mapping.hasOwnProperty(name)) {
			return mapping[name];	
		}
		else
	  		return "#cccccc";
	}

	name = name.replace(/\d+/g, '');
  
  return name;
}

var sizeIndex = 0;
function getSize() {
	var a = [4,6,8,10,12,14,16];
	
	var c = a[sizeIndex];

	sizeIndex = sizeIndex+1;
	if(sizeIndex >= a.length)
		sizeIndex=0;
	
	return c;
}

/*
function getSizeByName(name) {   
	if(sizeDatas.hasOwnProperty(selectedSymbolName)) {
	}
	else {
	    var url = path + "getNodeSizeDan" +"?symbol="+selectedSymbolName+";id="+projectId; 
	
	    $.getJSON(url,function(data){
                  sizeDatas[selectedSymbolName] = data;
                  }
		);     
	}
}
*/

function getSizeByNameSearch(name) {
	if(sizeDatas.hasOwnProperty(selectedSymbolName)) {
		if( typeof sizeDatas[selectedSymbolName][name] == 'undefined'  )
		  return 8;
	
		var n = sizeDatas[selectedSymbolName][name].s * 10;
		var n1 = n % 10;
		var n2 = n + Math.round(sizeDatas[selectedSymbolName][name].s*5)  ;
	
		//var n2 = n1/5 * (n-3);  
		//alert(n2);
		
		return n2;
	}
	else {
		return 8;
	}
}

function showAllLinkField() {
	document.getElementById("genecard_a").style.display = "block"; 
  	document.getElementById("brainspan_a").style.display = "block"; 
  	document.getElementById("pubmid_a").style.display = "block"; 
 	document.getElementById("cox_a").style.display = "block"; 
 	document.getElementById("stanford_a").style.display = "block"; 
}

function resetModelSelection() {
	//alert();
	//vis.selectAll("line").attr("class", "link");
	modelvis.selectAll("line").style("stroke-opacity",0.1);
	modelvis.selectAll("line").style("stroke-width",1.5);
	modelvis.selectAll(".node").style("fill-opacity",1);
}

function resetSelection() {
	//alert();
	//vis.selectAll("line").attr("class", "link");
	vis.selectAll("line").style("stroke-opacity",0.1);
	vis.selectAll("line").style("stroke-width",1.5);
	vis.selectAll(".node").style("fill-opacity",1);
}

function showModules() {
	//document.getElementById("modelReswetButton").style.display = "block"; 
	document.getElementById("modelChart").style.display = "block"; 
	document.getElementById("geneChart").style.display = "none"; 
	
	$( "#infoContainer" ).toggle( "slide",200 );//.hide();
	
	$("#modelname").html("");
	
    //document.getElementById("controlPanelDiv").style.display = "none"; 
    //document.getElementById("sliderDiv").style.display = "none"; 
	//document.getElementById("symbolNameLabel").style.display = "none"; 
    //document.getElementById("symbolNameLabel").innerHTML = ""; 
}
/*
function matchNode(nodelist,node) {
	var result = false;
	for(var i=0; i< nodelist.length; i++) {
		if(nodelist[i] == node) {
		 	result = true;
		 	alert(nodelist+"     N:"+node);
		 	
		 	break;
		}
	}
	return result;
}
*/
function matchLink(connectedLinks,d) {
	var result = false;
	for(var i=0; i< connectedLinks.length; i++) {
		
		if(connectedLinks[i].source.name == d.source.name  &&  connectedLinks[i].target.name == d.target.name) {
			//alert(connectedLinks[i].source.name+"    "+connectedLinks[i].target.name);
		 	result = true;
		 	//alert(nodelist+"     N:"+node);	
		 	break;
		}
	}
	return result;
}

function initSlider() {
// Create a YUI instance and request the slider module and its dependencies
YUI().use("slider", function (Y) {

	var xInput,  // input tied to xSlider
    	yInput,  // input tied to ySlider
    	xSlider; // horizontal Slider

	// Function to pass input value back to the Slider
	function updateSlider( e ) {
    	var data   = this.getData(),
        	slider = data.slider,
        	value  = parseInt( this.get( "value" ), 10 );

    	if ( data.wait ) 
    	{
        	data.wait.cancel();
    	}

    	// Update the Slider on a delay to allow time for typing
    	data.wait = Y.later( 200, slider, function () {
        	data.wait = null;
        	this.set( "value", value );
    	} );
	}

	// Function to update the input value from the Slider value
	function updateInput( e ) {
    	this.set( "value", e.newVal );
    	//alert("g");
	}

	// Link the input value to the Slider
	xInput = Y.one( "#horiz_value" );
	xInput.setData( "slider", new Y.Slider({
            axis: 'x',
            min   : 0,      // min is the value at the top
            max   : 1225,     // max is the value at the bottom
            value : 100,       // initial value
            length: '500px',  // rail extended to afford all values

            // construction-time event subscription
            after : {
                valueChange: Y.bind( updateInput, xInput )
            }
        }).render( ".horiz_slider" ) // render returns the Slider
    )                               // set( "data", ... ) returns the Node
    .on( "keyup", updateSlider );  

	// Pass the input as the 'this' object inside updateInput
	//xSlider.after( "valueChange", updateInput, xInput );
	//xInput.on( "keyup", updateSlider );
    
	// Render the Slider next to the input
	//xSlider.render('.horiz_slider');
});
} 

function initJQSlider() {
	 $(function() {
	$( "#jqslider" ).slider({ min: 0,
		                      max: 1000,
		                      value: 100,
		                      slide: function( event, ui ) {

 										$("#horiz_value").val(ui.value);
		                      		  }   
		                   });
	});
}

function knobSymbolRedraw(v) {
	initd3();         
    var file = getPlotDataPath()+"?num="+v+";model=symbol;symbol="+selectedSymbolName+";id="+projectId;
    initGneGraph(file);
}

function symbolRedraw() {
	//alert(selectedSymbolName);
	initd3();         
	//initGneGraph( "data/visant_symbol_" + "paM1" + ".json");
	
	var num = document.getElementById("horiz_value").value;
    		
    var file = getPlotDataPath()+"?num="+num+";model=symbol;symbol="+selectedSymbolName+";id="+projectId;
    initGneGraph(file);

}

var mousePos;
window.onmousemove = handleMouseMove;

function handleMouseMove(event) {
        event = event || window.event; 
        mousePos = {
            x: event.clientX,
            y: event.clientY
        };
    }

function initNodeinfoWindowSize() {
	var s = 0;
	if((h-500) > 550)
       s=550;
    else
       s=h-500;   	  
	
	$("#nodeinfo").css("height", s + "px");
	$("#infowin").css("height", s + "px");
}

function getGeneValue(geneSymbol) {
  var arrayLength = geneList.length;
  for (var i = 0; i < arrayLength; i++) {
    var geneObj = geneList[i];
    if (geneObj.Symbol == geneSymbol) {
	return "<p>Z Score: " + geneObj.ownModuleMembershipZScore + "</p>";
    }
  }

  return null;
}

function setNodeInfoList(connectedNodes) {
	var s="";
	
	for(var i=0; i<connectedNodes.length;i++) {   
		//alert(sizeDatas[selectedSymbolName][connectedNodes[i]].n);
		//s = s +"<div class='nitem' n='"+  sizeDatas[selectedSymbolName][connectedNodes[i]].n  +"'>" + "<span class='nname'>" + connectedNodes[i] + "</span>" + "<div class='iiconsdiv'><div class='info_icon'></div><div class='figure_icon'></div></div></div>";
	
	if (hdinhd_striatum || hdinhd_cortex) {
		s = s +"<div class='nitem'>" + "<span class='nname'>" + connectedNodes[i] + "</span>" + getGeneValue(connectedNodes[i]) + "</div>";
	}
	else {
		    s = s +"<div class='nitem'>" + "<span class='nname'>" + connectedNodes[i] + "</span>" + "</div>";
	}
	}

	$("#nodeinfo").html(s);
	
	//$(".nitem").click(function() {
			//alert( $(this).attr("n") );
		//	setInfoWin($(this).attr("n"));
	//});
	
	$( ".nitem" ).hover(
		function() {
		//	$(this).children(".iiconsdiv").fadeIn();
		   // $(this).find(".iiconsdiv").fadeIn();
			$(this).addClass("nitem_hover");
		}, 
		function() {
		//	$(this).children(".iiconsdiv").hide();
		   // $(this).find(".iiconsdiv").hide();
			$(this).removeClass("nitem_hover");
		}
	);
	
	/*
	$(".info_icon").click(function() {
			
			setInfoWin($(this).parent().parent().attr("n"));
	});
	*/
	/*
	$(".figure_icon").click(function() {
			window.open( path + "nodeimage/Network/home/webuser/webappgclab/upload/dan/nodeimage/" +$(this).parent().parent().attr("n")+".jpeg");
	
	});
	*/
}

function setInfoWin(genename) {
	var url = path + "getNodeInfoPage" +"?id="+genename; 
	
	$.get(url,function(data){
       //alert(data);
       $("#infowin").html("<div id='ibackb'>&lsaquo;&lsaquo;</div>" + data);
	
				$( "#nodeinfo" ).hide( );
				$( "#infowin" ).toggle( "slide",200 );
				$( "#ibackb" ).click(function() {
			
					$( "#infowin" ).hide();
			
					$( "#nodeinfo" ).show( );
				});
       }
	);    
}

function initNodeinfoWindowOpenButton() {
	$("#infoContainerExpandBut").click(function() {
	 $( "#infoContainer" ).toggle( "slide",200 );
	 $("#infoContainerExpandBut").hide();
	}); 	
}

function initNodeinfoWindowCloseButton() {
	$("#hidebar").click(function() {
	 $( "#infoContainer" ).toggle( "slide",200 );
	 $("#infoContainerExpandBut").show();
	}); 
}

function getModelEdgeColor(mA,mB) {
	var a = [
	           [1,	0.66,	-0.81,	-0.44,	-0.1,	0.26,	-0.76,	0.39,	-0.56,	-0.46,	-0.64,	-0.63],
	           [0.66,	1,	-0.42,	-0.2,	0.44,	0.23,	-0.78,	0.81,	-0.65,	-0.57,	-0.96,	-0.56],
	           [-0.81,	-0.42,	1,	0.0067,	0.44,	-0.42,	0.73,	-0.08,	0.3,	0.65,	0.46,	0.32],
	           [-0.44,	-0.2,	0.0067,	1,	-0.27,	0.5,	0.17,	-0.31,	0.41,	-0.4,	0.058,	0.59],
	           [-0.1,	0.44,	0.44,	-0.27,	1,	-0.11,	-0.22,	0.79,	-0.32,	0.087,	-0.31,	-0.34],
	           [0.26,	0.23,	-0.42,	0.5,	-0.11,	1,	-0.42,	0.14,	-0.084,	-0.62,	-0.28,	0.0014],
	           [-0.76,	-0.78,	0.73,	0.17,	-0.22,	-0.42,	1,	-0.66,	0.44,	0.68,	0.73,	0.55],
	           [0.39,	0.81,	-0.08,	-0.31,	0.79,	0.14,	-0.66,	1,	-0.59,	-0.35,	-0.71,	-0.6],
	           [-0.56,	-0.65,	0.3,	0.41,	-0.32,	-0.084,	0.44,	-0.59,	1,	0.35,	0.52,	0.62],
	           [-0.46,	-0.57,	0.65,	-0.4,	0.087,	-0.62,	0.68,	-0.35,	0.35,	1,	0.67,	0.16],
	           [-0.64,	-0.96,	0.46,	0.058,	-0.31,	-0.28,	0.73,	-0.71,	0.52,	0.67,	1,	0.46],
	           [-0.63,	-0.56,	0.32,	0.59,	-0.34,	0.0014,	0.55,	-0.6,	0.62,	0.16,	0.46,	1]
			];
	
	var mlist = {"2":0,	"3":1,	"4":2,	"8":3,	"9":4,	"11":5,	"13":6,	"14":7, "15":8, "16":9, "17":10, "18":11};
	
	var mA = mA.replace("M","");
	var mB = mB.replace("M","");
	
	var iA = mlist[mA];
	var iB = mlist[mB];
	
	if(a[iA][iB]>0)
	  return "#F777BB"; 
	else
	  return "#0FCCF2";
}

function getASDColor(name) {
	var a = {"ARX":"","NCAPD2":"","PTBP1":"","VIM":"","POLQ":"","HMG20B":"","SRBD1":"","TEAD2":"","RFX2":"","ASAP3":"","FCGBP":"","CDC45":"","MCM4":"","H2AFV":"","MPDZ":"","PDLIM1":"","PTK7":"","HDAC1":"","TTF2":"","CNN3":"","PHF19":"","HSDL2":"","SORBS3":"","KIF18A":"","CAT":"","STIL":"","SDF2L1":"","TROAP":"","BRCA2":"","BNIP2":"","CMTM3":"","SLC16A3":"","RNPEPL1":"","IQGAP2":"","MKI67":"","MSI2":"","WASF2":"","TAGLN2":"","FBXO8":"","FABP5":"","ACAA2":"","BMP1":"","DAG1":"","CTDSP2":"","OPLAH":"","PTTG1IP":"","IQGAP3":"","HIST2H2AC":"","TMEM216":"","PLCD1":"","HIST1H1C":"","SVIL":"","ECI2":"","PNP":"","GPR56":"","CLIC1":"","RHBDD2":"","DNAH9":"","CAMK1G":"","ADAM22":"","ROS1":"","PTPRN":"","NPFFR2":"","ERLEC1":"","PTPN3":"","SNCB":"","IPCEF1":"","RIMS1":"","CADPS2":"","TESC":"","RAPGEF4":"","PITPNM3":"","SLC22A17":"","SYNGR1":"","CACNA1F":"","SYP":"","NDRG4":"","NOMO1":"","SYT17":"","CTSH":"","SLC17A7":"","TMEM59L":"","SCN1B":"","DNM1":"","KANK1":"","B9D1":"","CNTNAP1":"","DUSP3":"","GABRA4":"","CDH9":"","GABRG2":"","FHL2":"","EPAS1":"","KIF17":"","B4GALT6":"","CASC1":"","PPL":"","SRGN":"","KCNS1":"","SLC12A5":"","NAPB":"","SULT4A1":"","GFAP":"","ATP6V1E1":"","EFR3A":"","POPDC3":"","XAF1":"","MYH11":"","MICAL2":"","GLS2":"","RAB11FIP5":"","ENPP2":"","HADHB":"","ZNF365":"","STAT4":"","VAMP1":"","C1ORF222":"","SCN1A":"","UNC80":"","IQSEC1":"","C10ORF116":"","ITPR1":"","TDO2":"","TCTEX1D1":"","ADPRHL1":"","THY1":"","GRAMD3":"","NPTN":"","STEAP2":"","CABP1":"","VSNL1":"","ATP1A1":"","SCRG1":"","OXR1":"","GPR146":"","TPP1":"","IDH3A":"","TMEM130":"","SPRYD3":"","BSCL2":"","CPLX1":"","CDK5R2":"","CYP4F11":"","RCAN2":"","THEMIS":"","RAB37":"","C1QTNF1":"","PCSK1":"","RIMS2":"","CTNNA3":"","GRIN2A":"","TSPYL2":"","CEND1":"","METTL7A":"","SV2B":"","KCNIP4":"","MKL2":"","GABRD":"","FHIT":"","TPK1":"","ANXA6":"","SLC6A17":"","OGDHL":"","ST7":"","WDR54":"","CUL3":"","RPL18":"","NFYC":"","GSTP1":"","THOC5":"","ZMAT5":"","RPS19":"","DSE":"","CCNG1":"","SET":"","CPSF3L":"","EIF3G":"","TRAF7":"","NXT1":"","C20ORF111":"","RPS15A":"","RPS6":"","RPLP1":"","LRRC49":"","SEC11A":"","RPS2":"","RPL10":"","EIF4A1":"","DDB1":"","GPS1":"","CHD2":"","RPS27":"","PACS2":"","RPL14":"","NACA":"","SND1":"","ISY1":"","MGST1":"","KAL1":"","TYMP":"","TRAF3IP2":"","IFI35":"","ZC3HAV1":"","IFIH1":"","BST2":"","LGALS3":"","VAV3":"","FAM189A2":"","AGT":"","SP110":"","SLCO1C1":"","ALDH1L1":"","SLC39A12":"","EN2":"","ANGPTL4":"","TAP1":"","RAB31":"","AQP4":"","PARP14":"","IFITM1":"","CYP4F3":"","MT1X":"","MT1M":"","HLA-A":"","IRF9":"","MFRP":"","MTMR7":"","AGK":"","NUDCD3":"","ATP6V0A1":"","MYO16":"","SNAP91":"","NGEF":"","CACNB1":"","ATP2B3":"","LNX1":"","NSF":"","DLG3":"","SMAP2":"","EPB41L1":"","DDX24":"","ACOT7":"","EEF1A2":"","USP11":"","AP3B2":"","RAB2A":"","MTMR9":"","GPI":"","CLIP3":"","SLC1A1":"","FBXW7":"","MADD":"","ENO2":"","CAP2":"","GLS":"","ELOVL4":"","KLC1":"","NDFIP1":"","DLG4":"","SUCLA2":"","SCN2A":"","STXBP1":"","FAM8A1":"","ABI2":"","BBS7":"","UBR3":"","FAM134A":"","ATP6V1B2":"","PAK1":"","DLG2":"","EIF4E":"","RAB6B":"","RAB39B":"","HK1":"","SV2A":"","ATP13A2":"","AP2M1":"","SHANK2":"","CNST":"","BTRC":"","NDEL1":"","SCG5":"","OTUB1":"","LDB2":"","PRKCE":"","CLSTN1":"","C2CD2L":"","SEZ6L2":"","C12ORF68":"","PER1":"","NRXN1":"","ANKRD34A":"","RGS7":"","INPP5J":"","PARK2":"","CYP4X1":"","NKRF":"","ATL1":"","SLC9A6":"","SCAMP5":"","MAGEE1":"","DCTN1":"","PCDHA13":"","PI4KA":"","ABHD14A":"","ICA1":"","CYB561":"","ZMYND11":"","CDH10":"","CAMK2B":"","ST3GAL6":"","PFKP":"","ATP8B1":"","ACHE":"","KIAA0284":"","SGSM3":"","MCF2":"","ZC3H12B":"","FGF9":"","NCALD":"","PIK3CG":"","STX1A":"","EPHB6":"","GLIS3":"","USP46":"","HTATIP2":"","GALNTL4":"","PRMT8":"","SLC29A1":"","FOXP1":"","DNAJC27":"","SLC25A12":"","RAB7L1":"","APOL3":"","UNC13A":"","CALY":"","CYP2E1":"","SESN2":"","SYNE1":"","ACP2":"","DTNA":"","ACRV1":"","HTR1B":"","AGAP2":"","KIAA0513":"","PCDH10":"","RAB15":"","ATP1B1":"","EPHX1":"","ZNF385B":"","CNTN4":"","ANK2":"","NLGN4X":"","SNTG1":"","EBAG9":"","DOC2A":"","CACNA1C":"","NR3C2":"","INPP1":"","PTPRK":"","ABI3BP":"","ABCA5":"","FMN2":"","MAPK13":"","ATP2B2":"","C9ORF91":"","TPRG1L":"","NPM2":"","PPAPDC3":"","PTCHD1":"","SLITRK5":"","LRFN5":"","IGFBP6":"","CHRM1":"","FRMPD4":"","NPAS2":"","ABCG4":"","SNAPC5":"","PELI3":"","BAIAP2":"","LPCAT4":"","SCN4B":"","PGBD5":"","CAMK1D":"","CSMD1":"","FAM174B":"","C11ORF87":"","PION":"","EFCAB6":"","PTPRT":"","GRM7":"","CPNE4":"","ASB13":"","LAMB3":"","GYPE":"","DLGAP2":"","CHSY3":"","ITSN2":"","GPRASP1":"","VAMP2":"","CKMT1B":"","GPR162":"","SLC7A2":"","MPO":"","SLC6A13":"","EHD2":"","ZIC2":"","LAMC3":"","TNFRSF1A":"","TGFBR3":"","CYBRD1":"","MCAM":"","FXYD5":"","LAMB1":"","PLTP":"","MYL12A":"","TIMP1":"","EHD4":"","FCGRT":"","PLEKHA4":"","PCOLCE":"","ECM2":"","SLC6A4":"","CPZ":"","SLC15A3":"","COL12A1":"","TBX18":"","SEMA5A":"","PLSCR4":"","FN1":"","VAMP8":"","RDH10":"","CDKN1A":"","C3":"","RRAS":"","ZFP36":"","PODXL":"","CD68":"","RHBDF2":"","RARRES3":"","EMP1":"","HEY2":"","GNS":"","TMBIM1":"","TLN1":"","LRRC32":"","MYOF":"","IFITM3":"","EMP3":"","MOB3C":"","RBMS3":"","LPP":"","ATP10D":"","ADD3":"","SERPING1":"","ADAM33":"","GJA1":"","MR1":"","DAB2":"","ADAMTS1":"","SLC7A7":"","COLEC12":"","SHC1":"","ITGA5":"","CXCL16":"","DHRS3":"","DDR2":"","DISC1":"","TGFBR2":"","FBN1":"","B2M":"","RAB3IL1":"","SDC2":"","ADORA2B":"","CD14":"","TMEM51":"","LAMB2":"","MMRN2":"","ANO6":"","ZNF366":"","CDH5":"","NQO1":"","FAM89A":"","BGN":"","ANXA2":"","SRPR":"","OAF":"","PROS1":"","IFITM2":"","COL4A1":"","S100A16":"","ADA":"","LRP10":"","S100A10":"","TGM2":"","PSMB8":"","CEBPD":"","MLL5":"","BAZ1B":"","TRIO":"","MLL3":"","ARHGEF10L":"","ZNF638":"","CTTNBP2":"","SRCAP":"","BCORL1":"","ZNF213":"","CNOT3":"","DEPDC5":"","ZMYND8":"","ADNP":"","CORO2A":"","SMC3":"","RAI1":"","SLC38A1":"","KIAA0240":"","CNOT6":"","BIRC6":"","MLL":"","PHF3":"","MED13L":"","MYBBP1A":"","KDM6B":"","ARHGEF11":"","EPHB2":"","KRBA1":"","MEN1":"","UGGT1":"","RTF1":"","MBD1":"","LMTK3":"","POGZ":"","FLG":"","PPRC1":"","CABLES2":"","SETBP1":"","PITPNC1":"","WDR4":"","VPS39":"","KIAA1586":"","CHD3":"","TANC2":"","TSNARE1":"","DLK2":"","JMJD1C":"","CSRP2":"","MLXIP":"","UBE2O":"","ZBTB41":"","GPR139":"","ZNF594":"","SETD2":"","EP400":"","ZNF445":"","MTF1":"","TRRAP":"","PCDHB16":"","SLC25A29":"","ZNF860":"","TOPORS":"","SPTAN1":"","PHF2":"","ZNF311":"","TOP1":"","MBD5":"","TSSK2":"","ZNF585B":"","ITGB3":"","DVL2":"","SLC25A39":"","ARID1B":"","SEC61A1":"","DDX20":"","ANKS1A":"","GNAI3":"","NUP133":"","TCF3":"","IKBKG":"","GTF3C1":"","CAD":"","UIMC1":"","GCN1L1":"","RBM27":"","SUPT16H":"","EIF2C1":"","POLRMT":"","CRKL":"","DGCR14":"","SMCHD1":"","AXIN1":"","TSC2":"","HNRNPUL1":"","PLEKHA8":"","TRDMT1":"","AATF":"","ZNF451":"","CISH":"","MSH6":"","ALMS1":"","APH1A":"","STK11":"","RPN2":"","IRF2BPL":"","DNMT3A":"","BCL11A":"","GNA13":"","ZMYM2":"","XPO5":"","CNOT1":"","KIAA0182":"","CDK4":"","DHX9":"","ACTL6A":"","TBR1":"","FAM129B":"","LRRC1":"","TET1":"","SMARCC2":"","DCAF5":"","USP3":"","XPR1":"","MCL1":"","METTL14":"","PPIP5K2":"","TLK2":"","MCPH1":"","FEZF2":"","AUTS2":"","PPP1R15B":"","KIAA1967":"","NFIA":"","VANGL2":"","GATAD2A":"","AC011498.1":"","C2CD3":"","SF1":"","RFWD3":"","HNRNPF":"","PWWP2A":"","PPM1D":"","TSEN34":"","TNKS":"","SMARCC1":"","RUVBL1":"","SCRIB":"","EHMT1":"","CADM1":"","DCC":"","ZNF292":"","ZKSCAN5":"","ZNF813":"","DLL1":"","DCAF12":"","AP2S1":"","MAP4":"","NCKAP1":"","PKM2":"","SDHA":"","MAPK1":"","C14ORF129":"","DCAF11":"","CD99L2":"","CYB5B":"","STUB1":"","BCL7B":"","SOD2":"","ACTR1B":"","PPP1R7":"","SCP2":"","KLHDC3":"","PIN1":"","DNAJB9":"","GRSF1":"","YARS":"","SLC39A3":"","TAGLN3":"","SAR1B":"","PRDX3":"","FAM91A1":"","AK2":"","LTBP1":"","CSDA":"","NOTCH3":"","TTC38":"","FAT1":"","TRIP6":"","ITGA6":"","TBL1X":"","HSPB1":"","PLOD3":"","RAB34":"","ATP6V0E1":"","MAPKAPK3":"","CHST3":"","SOX9":"","PALLD":"","YAP1":"","TMX1":"","MSN":"","ITGB1":"","TCF7L1":"","PLOD2":"","NECAP2":"","FSTL1":"","ANXA5":"","GPR98":"","CDCA7L":"","SLC4A2":"","IKBIP":"","FAM111A":"","ANTXR1":"","EMX2":"","GNG5":"","YES1":"","OXTR":"","SOX2":"","SPATA13":"","ZFP36L1":"","FLNA":"","SLC2A10":"","GNAS":"","AARSD1":"","GORASP2":"","TM4SF19":"","TRAPPC9":"","PAFAH1B2":"","GAK":"","HEATR8":"","THAP7":"","GPX1":""};

    if(a.hasOwnProperty(name)) { 
    	if(selectedColor=="#FF0000")
    	  return "#FAC0F2";
    	else
    	 return "#FF0000";//"#FAC0F2";//"3px";//
    }
    else {  
    	  return selectedColor;//"0px";//
    } 
}

function initAboutB() {
	$("#aboutB").click(function() {
	 // $( "#aboutContainer" ).toggle( "slide", { direction: "right" },200 );
	 $( "#aboutContainer" ).toggle();
	}); 
}

function initSearchB() {
	$("#searchB").click(function() {
	 $( "#searchContainer" ).toggle( "slide", { direction: "right" },200 );
	 $("#searchtext").focus();
	}); 
	
	$("#searchtext").keyup(function(event){
    if(event.keyCode == 13){
        nodeSearch();
    }
    });
}

//String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

function nodeSearch() {
	//alert($("#searchtext").val());
	
	var key = $("#searchtext").val();
	
	var e = null;
	if($("#modelChart").is(":visible")) {
		e = $("#modelChart");
	}
	else {
		e = $("#geneChart");
	}
	
	d3.selectAll(".node").each(function( d,i ) {
	    d3.select(this).select("circle").classed("nodeFound",false);
	    
	    var text = d3.select(this).select("text").text();
	    
	    if(text.toLowerCase() == key.toLowerCase()) {
			//$(this).find("circle").addClass("nodeFound"); 

			 d3.select(this).select("circle").classed("nodeFound",true);
			
		}
	   // alert(d3.select(this).select("text").text());
	});
	
	/*
	$(e).find(".node").each(function( index ) {
		
		$(this).find("circle").removeClass("nodeFound");
		
		if($(this).find("text").html().toString().toLowerCase() == key.toLowerCase().toString()) {
			$(this).find("circle").addClass("nodeFound"); 
		}
	});
	*/
}
