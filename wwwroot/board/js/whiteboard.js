var whiteboard = {
	permission: 0,
	canvas: null,
	ctx: null,
	drawcolor: "black",
	tool: "pen",
	thickness: 4,
	prevX: null,
	prevY: null,
	drawFlag: false,
	oldGCO: null,
	mouseover: false,
	lineCap: "round", //butt, square
	backgroundGrid: null,
	canvasElement: null,
	cursorContainer: null,
	imgContainer: null,
	svgContainer: null, //For draw prev
	mouseOverlay: null,
	ownCursor: null,
	drawBuffer: [],
	num: 1,
	wc: null,
	convasCount: board.pageCount + board.PdfPageCount,
	drawId: 0, //Used for undo function
	imgDragActive: false,
	latestActiveTextBoxId: false, //The id of the latest clicked Textbox (for font and color change)
	pressedKeys: {},
	settings: {
		whiteboardId: "0",
		username: board.username,
		sendFunction: null,
		canvasWidth: 1800,
		canvasHeight:1200,
		backgroundGridUrl: '/images/KtEBa2.png'
	},
	newConvas: function (i) {
		//var bgImage = '/files/board/b1/' + i + 'jpg';
		//	var bg = $('<div id="whiteboardBG'+i+'" style="position: absolute; left:0px; top:0; opacity: 0.2; background-image:url(' + bgImage + '); height: 100%; width: 100%;"></div>');
		var pdfElement = "";
		if (i > board.pageCount) pdfElement = "pdfElement";
		//var d = $('<canvas class="' + pdfElement + ' myBoardItem" id="whiteboardCanvas' + i + '" style="position: absolute;  left:0px; top:0;  cursor:crosshair;display:none" height="100%" width="100%" ></canvas>');
		var d = $('<canvas class="' + pdfElement + ' myBoardItem" id="whiteboardCanvas' + i + '" style="position: absolute;  left:0px; top:0;  cursor:crosshair;display:none" height="' + board.height + '" width="' + board.width + '" ></canvas>');
		var t = $('<div class="' + pdfElement + ' myBoardItem" id="mtc' + i + '" class="textcontainer' + i + '" style="position: absolute; left:0px; top:0; height: 100%; width: 100%; cursor:text;;display:none;overflow: hidden;"></div>');
		//this.textContainer=t;
		//	$(this.wc).append(bg);
		$(this.wc).append(d);
		$(this.wc).append(t);


	},
	addFirstConvas: function () {		 
		for (var i = 1; i <= this.convasCount; i++) {
			if(i===1)
			this.newConvas(i);
		}
		document.getElementById("whiteboardCanvas1").style.display = "block";
		this.activeConvas(1, 0);
	},

	activeConvas: function (k, b) {
		k = 1;
		//var k2 = k - board.pageCount;
		
		//if (k > board.pageCount) {
		//	var bgImage = '/files/board/' + board.meetID + '/pic/' + board.pdfOrder + '/' + k2 + '.jpg';
		//	document.getElementById("whiteboardBG").style.backgroundImage = "url(" + bgImage + ")";
			 
		//}
		//else document.getElementById("whiteboardBG").style.backgroundImage = "none";
			
		//for (var i = 1; i <= this.convasCount; i++) {
		//	if (i !== k) {
		//		document.getElementById("whiteboardCanvas" + i).style.display = "none";
				 
		//	}
		//}

		
		var d = document.getElementById("whiteboardCanvas" + k);
		d.style.display = "block";
		this.canvas = d;
		var svgns = "http://www.w3.org/2000/svg";
		this.ctx = this.canvas.getContext("2d");
		this.oldGCO = this.ctx.globalCompositeOperation;
		this.num = k;
		console.log("activ chang : " + k);
		this.activeTextcontiner(k);
		//	document.getElementById("boardTitle").innerText = "اسلاید " + k;
		//if (k <= board.pageCount) {
		//	for (j = 1; j <= board.pageCount; j++) {
		//		document.getElementById("toPage" + j).style.backgroundColor = "#f7f7f7";
		//	}
		//} else {
		//	for (j = board.pageCount+1; j <= this.convasCount; j++) {
		//		document.getElementById("toPage" + j).style.backgroundColor = "#f7f7f7";
		//	}
		//}
		
		//document.getElementById("toPage" + k).style.backgroundColor = "#e4e4e4";
	},
	activeTextcontiner: function (k) {
		var _this = this;
		//for (var i = 1; i <= this.convasCount; i++) {
		//	if (i !== k)

		//		document.getElementById("mtc" + i).style.display = "none";
		//}
		//console.log("activ textcontiner : " + k);
		var t = document.getElementById("mtc" + k);
		t.style.display = "block";
		this.textContainer = $(t);
		this.textContainer.on("mousemove touchmove", function (e) {
			e.preventDefault();
			if (this.imgDragActive || !$(e.target).hasClass("textcontainer")) {
				return;
			}

			var currX = (e.offsetX || e.pageX - $(e.target).offset().left);
			var currY = (e.offsetY || e.pageY - $(e.target).offset().top);
			this.sendFunction({ "t": "cursor", "event": "move", "d": [currX, currY], "username": this.settings.username });
		});
		this.textContainer.on("click", function (e) {
			currX = (e.offsetX || e.pageX - $(e.target).offset().left);
			currY = (e.offsetY || e.pageY - $(e.target).offset().top);
			var fontsize = whiteboard.thickness ;
			var txId = 'tx' + (+new Date());
			_this.sendFunction({ "t": "addTextBox", "d": [this.drawcolor, fontsize, currX, currY, txId] });
			_this.addTextBox(this.drawcolor, fontsize, currX, currY, txId, true);
		});
	},
	loadWhiteboard: function (whiteboardContainer, newSettings) {
	//	_this.settings.canvasHeight
		var svgns = "http://www.w3.org/2000/svg";
		var _this = this;
		for (var i in newSettings) {
			this.settings[i] = newSettings[i];
		}
		this.settings["username"] = this.settings["username"].replace(/[^0-9a-z]/gi, '');
		this.settings["whiteboardId"] = this.settings["whiteboardId"].replace(/[^0-9a-z]/gi, '');
		this.wc = whiteboardContainer;

		var startCoords = [];
		var svgLine = null;
		var svgRect = null;
		var svgCirle = null;
		var latestTouchCoods = null;
		//background grid (repeating image) and smallest screen indication
		_this.backgroundGrid = $('<div id="whiteboardBG" style="position: absolute; left:0px; top:0; opacity: 0.9;background-color: #e8e8eb; height: 100%; width: 100%;background-position: center;background-size: contain, cover;background-repeat: no-repeat;"></div>');
		//_this.backgroundGrid = $('<div style="position: absolute; left:0px; top:0; opacity: 0.2; background-color: #a0a6a4;; height: 100%; width: 100%;"></div>');
		// container for background images
		_this.imgContainer = $('<div style="position: absolute; left:0px; top:0; height: 100%; width: 100%;"></div>');
		// whiteboard canvas
		//_this.canvasElement1 = $('<canvas id="whiteboardCanvas1" style="position: absolute; height: 500px; width: 500px; left:0px; top:0; cursor:crosshair;"></canvas>');
		// _this.canvasElement2 = $('<canvas id="whiteboardCanvas2" style="position: absolute; left:0px; top:0; cursor:crosshair;display:none"></canvas>');
		// SVG container holding drawing or moving previews
		_this.svgContainer = $('<svg id="svgBoard" style="position: absolute; top:0px; left:0px;" width="' + board.width + '" height="' + board.height + '"></svg>');
		// drag and drop indicator, hidden by default
		_this.dropIndicator = $('<div style="position:absolute; height: 100%; width: 100%; border: 7px dashed gray; text-align: center; top: 0px; left: 0px; color: gray; font-size: 23em; display: none;"><i class="far fa-plus-square" aria-hidden="true"></i></div>')
		// container for other users cursors
		_this.cursorContainer = $('<div style="position: absolute; left:0px; top:0; height: 100%; width: 100%;"></div>');
		// container for texts by users
		//_this.textContainer = $('<div class="textcontainer" style="position: absolute; left:0px; top:0; height: 100%; width: 100%; cursor:text;"></div>');
		// mouse overlay for draw callbacks
		_this.mouseOverlay = $('<div style="cursor:none; position: absolute; left:0px; top:0; height: 100%; width: 100%;"></div>');

		$(whiteboardContainer).append(_this.backgroundGrid) 
			.append(_this.imgContainer)
			//.append(_this.canvasElement1)
			//.append(_this.canvasElement2)
			.append(_this.svgContainer)
			.append(_this.dropIndicator)
			.append(_this.cursorContainer)
			//.append(_this.textContainer)
			.append(_this.mouseOverlay);
		/* this.canvas = $("#whiteboardCanvas1")[0];
		this.canvas.height = _this.settings.canvasHeight;
		this.canvas.width = _this.settings.canvasWidth;
		this.ctx = this.canvas.getContext("2d");
		this.oldGCO = this.ctx.globalCompositeOperation; */
		this.addFirstConvas();
		//this.ffff();
	},
	PreparationBoard: function () {
		var svgns = "http://www.w3.org/2000/svg";
		var _this = this;
		$(_this.mouseOverlay).on("mousedown touchstart", function (e) {
			if (!whiteboard.permission) return;
			 
			//console.log("mousedown touchstart");
			//console.log(e);
			if (_this.imgDragActive) {
				return;
			}
			_this.drawFlag = true;
			_this.prevX = (e.offsetX || e.pageX - $(e.target).offset().left);
			_this.prevY = (e.offsetY || e.pageY - $(e.target).offset().top);
			if (!_this.prevX || !_this.prevY) {
				var touche = e.touches[0];
				_this.prevX = touche.clientX - $(_this.mouseOverlay).offset().left;
				_this.prevY = touche.clientY - $(_this.mouseOverlay).offset().top;
				var z = 1 / board.zoom;
				_this.prevX = _this.prevX * z;
				_this.prevY = _this.prevY * z;
				latestTouchCoods = [_this.prevX, _this.prevY];
			}

			if (_this.tool === "pen") {
				_this.drawPenLine(_this.prevX, _this.prevY, _this.prevX, _this.prevY, _this.drawcolor, _this.thickness);
				_this.sendFunction({ "t": _this.tool, "d": [_this.prevX, _this.prevY, _this.prevX, _this.prevY], "c": _this.drawcolor, "th": _this.thickness });
			} else if (_this.tool === "eraser") {
				_this.drawEraserLine(_this.prevX, _this.prevY, _this.prevX, _this.prevY, _this.thickness);
				_this.sendFunction({ "t": _this.tool, "d": [_this.prevX, _this.prevY, _this.prevX, _this.prevY], "th": _this.thickness });
			} else if (_this.tool === "line") {
				startCoords = [_this.prevX, _this.prevY];
				svgLine = document.createElementNS(svgns, 'line');
				svgLine.setAttribute('stroke', 'gray');
				svgLine.setAttribute('stroke-dasharray', '5, 5');
				svgLine.setAttribute('x1', _this.prevX);
				svgLine.setAttribute('y1', _this.prevY);
				svgLine.setAttribute('x2', _this.prevX + 1);
				svgLine.setAttribute('y2', _this.prevY + 1);
				_this.svgContainer.append(svgLine);
			} else if (_this.tool === "rect" || _this.tool === "recSelect") {
				_this.svgContainer.find("rect").remove();
				svgRect = document.createElementNS(svgns, 'rect');
				svgRect.setAttribute('stroke', 'gray');
				svgRect.setAttribute('stroke-dasharray', '5, 5');
				svgRect.setAttribute('style', 'fill-opacity:0.0;');
				svgRect.setAttribute('x', _this.prevX);
				svgRect.setAttribute('y', _this.prevY);
				svgRect.setAttribute('width', 0);
				svgRect.setAttribute('height', 0);
				_this.svgContainer.append(svgRect);
				startCoords = [_this.prevX, _this.prevY];
			} else if (_this.tool === "circle") {
				svgCirle = document.createElementNS(svgns, 'circle');
				svgCirle.setAttribute('stroke', 'gray');
				svgCirle.setAttribute('stroke-dasharray', '5, 5');
				svgCirle.setAttribute('style', 'fill-opacity:0.0;');
				svgCirle.setAttribute('cx', _this.prevX);
				svgCirle.setAttribute('cy', _this.prevY);
				svgCirle.setAttribute('r', 0);
				_this.svgContainer.append(svgCirle);
				startCoords = [_this.prevX, _this.prevY];
			}
		});
		
		// _this.textContainer.on("mousemove touchmove", function (e) {
		//	e.preventDefault();
		//	if (_this.imgDragActive || !$(e.target).hasClass("textcontainer")) {
		//		return;
		//	}

		//	var currX = (e.offsetX || e.pageX - $(e.target).offset().left);
		//	var currY = (e.offsetY || e.pageY - $(e.target).offset().top);
		//	_this.sendFunction({ "t": "cursor", "event": "move", "d": [currX, currY], "username": _this.settings.username });
		//}) 

		_this.mouseOverlay.on("mousemove touchmove", function (e) {
			if (!whiteboard.permission) return;
			e.preventDefault();
			if (_this.imgDragActive) {
				return;
			}
			var currX = (e.offsetX || e.pageX - $(e.target).offset().left);
			var currY = (e.offsetY || e.pageY - $(e.target).offset().top);
			window.requestAnimationFrame(function () {
				if ((!currX || !currY) && e.touches && e.touches[0]) {
					var touche = e.touches[0];
					currX = touche.clientX - $(_this.mouseOverlay).offset().left;
					currY = touche.clientY - $(_this.mouseOverlay).offset().top;
					var z = 1 / board.zoom;
					currX = currX * z;
					currY = currY * z;
					latestTouchCoods = [currX, currY];
				}

				if (_this.drawFlag) {
					if (_this.tool === "pen") {
						_this.drawPenLine(currX, currY, _this.prevX, _this.prevY, _this.drawcolor, _this.thickness);
						_this.sendFunction({ "t": _this.tool, "d": [currX, currY, _this.prevX, _this.prevY], "c": _this.drawcolor, "th": _this.thickness });
					} else if (_this.tool == "eraser") {
						_this.drawEraserLine(currX, currY, _this.prevX, _this.prevY, _this.thickness);
						_this.sendFunction({ "t": _this.tool, "d": [currX, currY, _this.prevX, _this.prevY], "th": _this.thickness });
					}
					_this.prevX = currX;
					_this.prevY = currY;
				}

				if (_this.tool === "eraser") {
					var left = currX - _this.thickness;
					var top = currY - _this.thickness;
					_this.ownCursor.css({ "top": top + "px", "left": left + "px" });
				} else if (_this.tool === "pen") {
					var left = currX - _this.thickness ;//gggggggggggggggggggggggggg
					var top = currY - _this.thickness ;
					_this.ownCursor.css({ "top": top + "px", "left": left + "px" });
				} else if (_this.tool === "line") {
					if (svgLine) {
						if (_this.pressedKeys.shift) {
							var angs = getRoundedAngles(currX, currY);
							currX = angs.x;
							currY = angs.y;
						}
						svgLine.setAttribute('x2', currX);
						svgLine.setAttribute('y2', currY);
					}
				} else if (_this.tool === "rect" || (_this.tool === "recSelect" && _this.drawFlag)) {
					if (svgRect) {
						var width = Math.abs(currX - startCoords[0]);
						var height = Math.abs(currY - startCoords[1]);
						if (_this.pressedKeys.shift) {
							height = width;
							var x = currX < startCoords[0] ? startCoords[0] - width : startCoords[0];
							var y = currY < startCoords[1] ? startCoords[1] - width : startCoords[1];
							svgRect.setAttribute('x', x);
							svgRect.setAttribute('y', y);
						} else {
							var x = currX < startCoords[0] ? currX : startCoords[0];
							var y = currY < startCoords[1] ? currY : startCoords[1];
							svgRect.setAttribute('x', x);
							svgRect.setAttribute('y', y);
						}

						svgRect.setAttribute('width', width);
						svgRect.setAttribute('height', height);
					}
				} else if (_this.tool === "circle") {
					var a = currX - startCoords[0];
					var b = currY - startCoords[1];
					var r = Math.sqrt(a * a + b * b);
					if (svgCirle) {
						svgCirle.setAttribute('r', r);
					}
				}
			});
			_this.sendFunction({ "t": "cursor", "event": "move", "d": [currX, currY], "username": _this.settings.username });
		});

		_this.mouseOverlay.on("mouseup touchend touchcancel", function (e) {
			if (!whiteboard.permission) return;
			if (_this.imgDragActive) {
				return;
			}
			_this.drawFlag = false;
			_this.drawId++;
			_this.ctx.globalCompositeOperation = _this.oldGCO;
			var currX = (e.offsetX || e.pageX - $(e.target).offset().left);
			var currY = (e.offsetY || e.pageY - $(e.target).offset().top);
			if ((!currX || !currY) && e.touches[0]) {
				currX = latestTouchCoods[0];
				currY = latestTouchCoods[1];
				//_this.sendFunction({ "t": "cursor", "event": "out", "username": _this.settings.username });kkkkkkkkkkkkkkkkkkkkkkkkkkkkk
			}

			if (_this.tool === "line") {
				if (_this.pressedKeys.shift) {
					var angs = getRoundedAngles(currX, currY);
					currX = angs.x;
					currY = angs.y;
				}
				_this.drawPenLine(currX, currY, startCoords[0], startCoords[1], _this.drawcolor, _this.thickness);
				_this.sendFunction({ "t": _this.tool, "d": [currX, currY, startCoords[0], startCoords[1]], "c": _this.drawcolor, "th": _this.thickness });
				_this.svgContainer.find("line").remove();
			} else if (_this.tool === "rect") {
				if (_this.pressedKeys.shift) {
					if ((currY - startCoords[1]) * (currX - startCoords[0]) > 0) {
						currY = startCoords[1] + (currX - startCoords[0]);
					} else {
						currY = startCoords[1] - (currX - startCoords[0]);
					}
				}
				_this.drawRec(startCoords[0], startCoords[1], currX, currY, _this.drawcolor, _this.thickness);
				_this.sendFunction({ "t": _this.tool, "d": [startCoords[0], startCoords[1], currX, currY], "c": _this.drawcolor, "th": _this.thickness });
				_this.svgContainer.find("rect").remove();
			} else if (_this.tool === "circle") {
				var a = currX - startCoords[0];
				var b = currY - startCoords[1];
				var r = Math.sqrt(a * a + b * b);
				_this.drawCircle(startCoords[0], startCoords[1], r, _this.drawcolor, _this.thickness);
				_this.sendFunction({ "t": _this.tool, "d": [startCoords[0], startCoords[1], r], "c": _this.drawcolor, "th": _this.thickness });
				_this.svgContainer.find("circle").remove();
			} else if (_this.tool === "recSelect") {
				_this.imgDragActive = true;
				if (_this.pressedKeys.shift) {
					if ((currY - startCoords[1]) * (currX - startCoords[0]) > 0) {
						currY = startCoords[1] + (currX - startCoords[0]);
					} else {
						currY = startCoords[1] - (currX - startCoords[0]);
					}
				}

				var width = Math.abs(startCoords[0] - currX);
				var height = Math.abs(startCoords[1] - currY);
				var left = startCoords[0] < currX ? startCoords[0] : currX;
				var top = startCoords[1] < currY ? startCoords[1] : currY;
				_this.mouseOverlay.css({ "cursor": "default" });
				var imgDiv = $('<div style="position:absolute; left:' + left + 'px; top:' + top + 'px; width:' + width + 'px; border: 2px dotted gray; overflow: hidden; height:' + height + 'px;" cursor:move;">' +
					'<canvas style="cursor:move; position:absolute; top:0px; left:0px;" width="' + width + '" height="' + height + '"/>' +
					'<div style="position:absolute; right:5px; top:3px;">' +
					'<button draw="1" style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="addToCanvasBtn btn btn-default">Drop</button> ' +
					'<button style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="xCanvasBtn btn btn-default">x</button>' +
					'</div>' +
					'</div>');
				var dragCanvas = $(imgDiv).find("canvas");
				var dragOutOverlay = $('<div class="dragOutOverlay" style="position:absolute; left:' + left + 'px; top:' + top + 'px; width:' + width + 'px; height:' + height + 'px; background:white;"></div>');
				_this.mouseOverlay.append(dragOutOverlay);
				_this.mouseOverlay.append(imgDiv);

				var destCanvasContext = dragCanvas[0].getContext('2d');
				destCanvasContext.drawImage(_this.canvas, left, top, width, height, 0, 0, width, height);
				imgDiv.find(".xCanvasBtn").click(function () {
					_this.imgDragActive = false;
					_this.refreshCursorAppearance();
					imgDiv.remove();
					dragOutOverlay.remove();
				});
				imgDiv.find(".addToCanvasBtn").click(function () {
					_this.imgDragActive = false;
					_this.refreshCursorAppearance();
					var p = imgDiv.position();
					var leftT = Math.round(p.left * 100) / 100;
					var topT = Math.round(p.top * 100) / 100;
					_this.drawId++;
					_this.sendFunction({ "t": _this.tool, "d": [left, top, leftT, topT, width, height] });
					_this.dragCanvasRectContent(left, top, leftT, topT, width, height);
					imgDiv.remove();
					dragOutOverlay.remove();
				});
				imgDiv.draggable();
				_this.svgContainer.find("rect").remove();
			}
		});

		_this.mouseOverlay.on("mouseout", function (e) {
			if (!whiteboard.permission) return;
			if (_this.imgDragActive) {
				return;
			}
			_this.drawFlag = false;
			_this.mouseover = false;
			_this.ctx.globalCompositeOperation = _this.oldGCO;
			_this.ownCursor.remove();
			_this.svgContainer.find("line").remove();
			_this.svgContainer.find("rect").remove();
			_this.svgContainer.find("circle").remove();
			//_this.sendFunction({ "t": "cursor", "event": "out" });
		});

		_this.mouseOverlay.on("mouseover", function (e) {
			if (!whiteboard.permission) return;
			if (_this.imgDragActive) {
				return;
			}
			if (!_this.mouseover) {
				var color = _this.drawcolor;
				var widthHeight = _this.thickness;
				if (_this.tool === "eraser") {
					color = "#00000000";
					widthHeight = widthHeight * 2;
				}
				if (_this.tool === "eraser" || _this.tool === "pen") {
					_this.ownCursor = $('<div id="ownCursor" style="background:' + color + '; border:1px solid gray; position:absolute; width:' + widthHeight + 'px; height:' + widthHeight + 'px; border-radius:50%;"></div>');
					_this.cursorContainer.append(_this.ownCursor);
				}
			}
			_this.mouseover = true;
		});

		//On textcontainer click (Add a new textbox)
		/* _this.textContainer.on("click", function (e) {
			currX = (e.offsetX || e.pageX - $(e.target).offset().left);
			currY = (e.offsetY || e.pageY - $(e.target).offset().top);
			var fontsize = _this.thickness * 0.5;
			var txId = 'tx' + (+new Date());
			_this.sendFunction({ "t": "addTextBox", "d": [_this.drawcolor, fontsize, currX, currY, txId] });
			_this.addTextBox(_this.drawcolor, fontsize, currX, currY, txId, true);
		}); */

		function getRoundedAngles(currX, currY) { //For drawing lines at 0,45,90° ....
			var x = currX - startCoords[0];
			var y = currY - startCoords[1];
			var angle = Math.atan2(x, y) * (180 / Math.PI);
			var angle45 = Math.round(angle / 45) * 45;
			if (angle45 % 90 == 0) {
				if (Math.abs(currX - startCoords[0]) > Math.abs(currY - startCoords[1])) {
					currY = startCoords[1]
				} else {
					currX = startCoords[0]
				}
			} else {
				if ((currY - startCoords[1]) * (currX - startCoords[0]) > 0) {
					currX = startCoords[0] + (currY - startCoords[1]);
				} else {
					currX = startCoords[0] - (currY - startCoords[1]);
				}
			}
			return { "x": currX, "y": currY };
		}
	},
	addConvas: function (whiteboardContainer) {
		document.getElementById("whiteboardCanvas" + this.num).style.display = "none";
		this.num++;
		console.log("ddddddd :" + this.num);
		var d = $('<canvas id="whiteboardCanvas' + this.num + '" style="position: absolute; left:0px; top:0; cursor:crosshair;"></canvas>');
		$(whiteboardContainer).append(d);
		var svgns = "http://www.w3.org/2000/svg";

		this.canvas = $("#whiteboardCanvas" + this.num)[0];
		this.canvas.height = board.height;
		this.canvas.width = board.width;
		this.ctx = this.canvas.getContext("2d");
		this.oldGCO = this.ctx.globalCompositeOperation;
	},
	preConvas: function (whiteboardContainer) {
		document.getElementById("whiteboardCanvas" + this.num).style.display = "none";
		this.num--;
		console.log("ddddddd :" + this.num);
		document.getElementById("whiteboardCanvas" + this.num).style.display = "block";
		var svgns = "http://www.w3.org/2000/svg";

		this.canvas = $("#whiteboardCanvas" + this.num)[0];
		//	this.canvas.height = this.settings.canvasHeight;
		//	this.canvas.width = this.settings.canvasWidth;
		this.ctx = this.canvas.getContext("2d");
		//	this.oldGCO = this.ctx.globalCompositeOperation;
	},
	nextConvas: function () {
		if (this.num >= 2) return;
		document.getElementById("whiteboardCanvas" + this.num).style.display = "none";
		this.num++
		console.log("nnn :" + this.num);
		document.getElementById("whiteboardCanvas" + this.num).style.display = "block";
		var svgns = "http://www.w3.org/2000/svg";

		this.canvas = $("#whiteboardCanvas" + this.num)[0];
		this.canvas.height = board.height;
		this.canvas.width = board.width;
		this.ctx = this.canvas.getContext("2d");
		this.oldGCO = this.ctx.globalCompositeOperation;
	},
	entfKeyAction: function () {
		var _this = this;
		$.each(_this.mouseOverlay.find(".dragOutOverlay"), function () {
			var width = $(this).width();
			var height = $(this).height();
			var p = $(this).position();
			var left = Math.round(p.left * 100) / 100;
			var top = Math.round(p.top * 100) / 100;
			_this.drawId++;
			_this.sendFunction({ "t": "eraseRec", "d": [left, top, width, height] });
			_this.eraseRec(left, top, width, height);
		});
		_this.mouseOverlay.find(".xCanvasBtn").click(); //Remove all current drops
	},
	escKeyAction: function () {
		var _this = this;
		if (!_this.drawFlag) {
			_this.svgContainer.empty();
		}
		_this.mouseOverlay.find(".xCanvasBtn").click(); //Remove all current drops
	},
	dragCanvasRectContent: function (xf, yf, xt, yt, width, height) {
		var tempCanvas = document.createElement('canvas');
		tempCanvas.width = width;
		tempCanvas.height = height;
		var tempCanvasContext = tempCanvas.getContext('2d');
		tempCanvasContext.drawImage(this.canvas, xf, yf, width, height, 0, 0, width, height);
		this.eraseRec(xf, yf, width, height);
		this.ctx.drawImage(tempCanvas, xt, yt);
	},
	eraseRec: function (fromX, fromY, width, height) {
		var _this = this;
		_this.ctx.beginPath();
		_this.ctx.rect(fromX, fromY, width, height);
		_this.ctx.fillStyle = "rgba(0,0,0,1)";
		_this.ctx.globalCompositeOperation = "destination-out";
		_this.ctx.fill();
		_this.ctx.closePath();
		_this.ctx.globalCompositeOperation = _this.oldGCO;
	},
	drawPenLine: function (fromX, fromY, toX, toY, color, thickness) {
		var _this = this;
		_this.ctx.beginPath();
		_this.ctx.moveTo(fromX, fromY);
		_this.ctx.lineTo(toX, toY);
		_this.ctx.strokeStyle = color;
		_this.ctx.lineWidth = thickness;
		_this.ctx.lineCap = _this.lineCap;
		_this.ctx.stroke();
		_this.ctx.closePath();
	},
	drawEraserLine: function (fromX, fromY, toX, toY, thickness) {
		var _this = this;
		_this.ctx.beginPath();
		_this.ctx.moveTo(fromX, fromY);
		_this.ctx.lineTo(toX, toY);
		_this.ctx.strokeStyle = "rgba(0,0,0,1)";
		_this.ctx.lineWidth = thickness * 2;
		_this.ctx.lineCap = _this.lineCap;
		_this.ctx.globalCompositeOperation = "destination-out";
		_this.ctx.stroke();
		_this.ctx.closePath();
		_this.ctx.globalCompositeOperation = _this.oldGCO;
	},
	drawRec: function (fromX, fromY, toX, toY, color, thickness) {
		var _this = this;
		toX = toX - fromX;
		toY = toY - fromY;
		_this.ctx.beginPath();
		_this.ctx.rect(fromX, fromY, toX, toY);
		_this.ctx.strokeStyle = color;
		_this.ctx.lineWidth = thickness;
		_this.ctx.lineCap = _this.lineCap;
		_this.ctx.stroke();
		_this.ctx.closePath();
	},
	drawCircle: function (fromX, fromY, radius, color, thickness) {
		var _this = this;
		_this.ctx.beginPath();
		_this.ctx.arc(fromX, fromY, radius, 0, 2 * Math.PI, false);
		_this.ctx.lineWidth = thickness;
		_this.ctx.strokeStyle = color;
		_this.ctx.stroke();
	},
	clearWhiteboard: function () {
		var _this = this;
		_this.canvas.height = _this.canvas.height;
		_this.imgContainer.empty();
		_this.textContainer.empty();
		_this.sendFunction({ "t": "clear" });
		_this.drawBuffer = [];
		_this.drawId = 0;
	},
	setStrokeThickness: function (thickness) {
		var _this = this;
		_this.thickness = thickness;

		if (_this.tool == "text" && _this.latestActiveTextBoxId) {
			_this.sendFunction({ "t": "setTextboxFontSize", "d": [_this.latestActiveTextBoxId, thickness] });
			_this.setTextboxFontSize(_this.latestActiveTextBoxId, thickness);
		}
	},
	addImgToCanvasByUrl: function (url) {
		var _this = this;
		var wasTextTool = false;
		if (_this.tool === "text") {
			wasTextTool = true;
			_this.setTool("mouse"); //Set to mouse tool while dropping to prevent errors
		}
		_this.imgDragActive = true;
		_this.mouseOverlay.css({ "cursor": "default" });
		var imgDiv = $('<div style="border: 2px dashed gray; position:absolute; left:200px; top:200px; min-width:160px; min-height:100px; cursor:move;">' +
			'<img style="width:100%; height:100%;" src="' + url + '">' +
			'<div style="position:absolute; right:5px; top:3px;">' +
			'<button draw="1" style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="addToCanvasBtn btn btn-default">Draw to canvas</button> ' +
			'<button draw="0" style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="addToCanvasBtn btn btn-default">Add to background</button> ' +
			'<button style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="xCanvasBtn btn btn-default">x</button>' +
			'</div>' +
			'<i style="position:absolute; bottom: -4px; right: 2px; font-size: 2em; color: gray; transform: rotate(-45deg);" class="fas fa-sort-down" aria-hidden="true"></i>' +
			'</div>');
		imgDiv.find(".xCanvasBtn").click(function () {
			_this.imgDragActive = false;
			_this.refreshCursorAppearance();
			imgDiv.remove();
			if (wasTextTool) {
				_this.setTool("text");
			}
		});
		imgDiv.find(".addToCanvasBtn").click(function () {
			var draw = $(this).attr("draw");
			_this.imgDragActive = false;
			_this.refreshCursorAppearance();
			var width = imgDiv.width();
			var height = imgDiv.height();
			var p = imgDiv.position();
			var left = Math.round(p.left * 100) / 100;
			var top = Math.round(p.top * 100) / 100;
			if (draw == "1") { //draw image to canvas
				_this.drawImgToCanvas(url, width, height, left, top);
			} else { //Add image to background
				_this.drawImgToBackground(url, width, height, left, top);
			}
			_this.sendFunction({ "t": "addImgBG", "draw": draw, "url": url, "d": [width, height, left, top] });
			_this.drawId++;
			imgDiv.remove();
			if (wasTextTool) {
				_this.setTool("text");
			}
		});
		_this.mouseOverlay.append(imgDiv);
		imgDiv.draggable();
		imgDiv.resizable();
	},
	drawImgToBackground: function (url, width, height, left, top) {
		this.imgContainer.append('<img crossorigin="anonymous" style="width:' + width + 'px; height:' + height + 'px; position:absolute; top:' + top + 'px; left:' + left + 'px;" src="' + url + '">')
	},
	addTextBox: function (textcolor, fontsize, left, top, txId, newLocalBox) {
		var _this = this;
		var textBox = $('<div id="' + txId + '" class="textBox" style=" position:absolute; top:' + top + 'px; left:' + left + 'px;">' +
			'<div contentEditable="true" spellcheck="false" class="textContent" style="outline: none; font-size:' + fontsize + 'em; color:' + textcolor + '; min-width:50px; min-height:50px;"></div>' +
			'<div title="remove textbox" class="removeIcon" style="position:absolute; cursor:pointer; top:-4px; right:2px;">x</div>' +
			'<div title="move textbox" class="moveIcon" style="position:absolute; cursor:move; top:1px; left:2px; font-size: 0.5em;"><i class="fas fa-expand-arrows-alt"></i></div>' +
			'</div>');
		_this.latestActiveTextBoxId = txId;
		textBox.click(function (e) {
			e.preventDefault();
			_this.latestActiveTextBoxId = txId;
			return false;
		})
		textBox.on("mousemove touchmove", function (e) {
			e.preventDefault();
			if (_this.imgDragActive) {
				return;
			}
			var textBoxPosition = textBox.position();
			var currX = (e.offsetX + textBoxPosition.left);
			var currY = (e.offsetY + textBoxPosition.top);
			if ($(e.target).hasClass("removeIcon")) {
				currX += textBox.width() - 4;
			}
			_this.sendFunction({ "t": "cursor", "event": "move", "d": [currX, currY], "username": _this.settings.username });
		})
		this.textContainer.append(textBox);
		textBox.draggable({
			handle: ".moveIcon",
			stop: function () {
				var textBoxPosition = textBox.position();
				var z = 1 / board.zoom;
				_this.sendFunction({
					t: "setTextboxPosition",
					d: [txId, textBoxPosition.top*z, textBoxPosition.left*z],
				});
			},
			drag: function () {
				var textBoxPosition = textBox.position();
				var z = 1 / board.zoom;
				_this.sendFunction({
					t: "setTextboxPosition",
					d: [txId, textBoxPosition.top*z, textBoxPosition.left*z],
				});
			},
		});
		//textBox.draggable({
		//	handle: ".moveIcon",
		//	stop: function () {
		//		var textBoxPosition = textBox.position();
		//		_this.sendFunction({ "t": "setTextboxPosition", "d": [txId, textBoxPosition.top, textBoxPosition.left] });
		//	},
		//	drag: function () {
		//		var textBoxPosition = textBox.position();
		//		_this.sendFunction({ "t": "setTextboxPosition", "d": [txId, textBoxPosition.top, textBoxPosition.left] });
		//	},
		//});
		textBox.find(".textContent").on("input", function () {
			var text = $(this).html();// btoa($(this).html()); //Get html and make encode base64
			_this.sendFunction({ "t": "setTextboxText", "d": [txId, text] });
		});
		textBox.find(".removeIcon").click(function (e) {
			$("#" + txId).remove();
			_this.sendFunction({ "t": "removeTextbox", "d": [txId] });
			e.preventDefault();
			return false;
		});
		if (newLocalBox) {
			textBox.find(".textContent").focus();
		}
		if (this.tool === "text") {
			textBox.addClass("active");
		}
	},
	setTextboxText: function (txId, text) {
		$("#" + txId).find(".textContent").html((text)); //Set decoded base64 as html
	},
	removeTextbox: function (txId) {
		$("#" + txId).remove();
	},
	setTextboxPosition: function (txId, top, left) {
		$("#" + txId).css({ "top": top + "px", "left": left + "px" });
	},
	setTextboxFontSize: function (txId, fontSize) {
		$("#" + txId).find(".textContent").css({ "font-size": fontSize + "em" });
	},
	setTextboxFontColor: function (txId, color) {
		$("#" + txId).find(".textContent").css({ "color": color });
	},
	drawImgToCanvas: function (url, width, height, left, top, doneCallback) {
		var _this = this;
		var img = document.createElement('img');
		img.onload = function () {
			_this.ctx.drawImage(img, left, top, width, height);
			if (doneCallback) {
				doneCallback();
			}
		}
		img.src = url;
	},
	undoWhiteboard: function (username) { //Not call this directly because you will get out of sync whit others...
		var _this = this;
		if (!username) {
			username = _this.settings.username;
		}
		for (var i = _this.drawBuffer.length - 1; i >= 0; i--) {
			if (_this.drawBuffer[i]["username"] == username) {
				var drawId = _this.drawBuffer[i]["drawId"];
				for (var i = _this.drawBuffer.length - 1; i >= 0; i--) {
					if (_this.drawBuffer[i]["drawId"] == drawId && _this.drawBuffer[i]["username"] == username) {
						_this.drawBuffer.splice(i, 1);
					}
				}
				break;
			}
		}
		_this.canvas.height = _this.canvas.height;
		_this.imgContainer.empty();
		_this.loadDataInSteps(_this.drawBuffer, false, function (stepData) {
			//Nothing to do
		});
	},
	undoWhiteboardClick: function () {
		this.sendFunction({ "t": "undo" });
		this.undoWhiteboard();
	},
	setTool: function (tool) {
		this.tool = tool;
		if (this.tool === "text") {
			$(".textBox").addClass("active");
			this.textContainer.appendTo($(whiteboardContainer)); //Bring textContainer to the front
		} else {
			$(".textBox").removeClass("active");
			this.mouseOverlay.appendTo($(whiteboardContainer));
		}
		this.refreshCursorAppearance();
		this.mouseOverlay.find(".xCanvasBtn").click();
		this.latestActiveTextBoxId = null;
	},
	setDrawColor: function (color) {
		var _this = this;
		_this.drawcolor = color;
		if (_this.tool == "text" && _this.latestActiveTextBoxId) {
			_this.sendFunction({ "t": "setTextboxFontColor", "d": [_this.latestActiveTextBoxId, color] });
			_this.setTextboxFontColor(_this.latestActiveTextBoxId, color);
		}
	},
	updateSmallestScreenResolution: function (width, height) {
		 
		this.backgroundGrid.empty();

		if (width < $(window).width() || height < $(window).height()) {
			this.backgroundGrid.append('<div style="position:absolute; left:0px; top:0px; border-right:3px dotted black; border-bottom:3px dotted black; width:' + width + 'px; height:' + height + 'px;"></div>');
			this.backgroundGrid.append('<div style="position:absolute; left:' + (width + 5) + 'px; top:0px;">smallest screen participating</div>');
		}
	},
	handleEventsAndData: function (content, isNewData, doneCallback) {
		//isNewData=true;
		var _this = this;

		var tool = content["t"];

		var num = content["num"];
		num = Number(num);
		var fileID = content["fileID"];
		fileID = Number(fileID);
		if (fileID != bboard.fileID || num != bboard.pageID) {
			bboard.activePage(fileID, num);
		}
		if (tool == 'setImage') {
			fileService.setImageParse(content);
			return;
		}
		var data = content["d"];
		var color = content["c"];
		var username = content["username"];
		var thickness = content["th"];
		
		//if (fileID != board.fileID) {
		//	fileService.activeFile(fileID);
		//}
		//if (number != this.num) {

		//	console.warn("change convasd to sss:" + number);
		//	this.activeConvas(number);
		//	console.warn("change convasd to :" + number);
		//}
		//	window.requestAnimationFrame(function () {
		if (tool === "line" || tool === "pen") {
			_this.drawPenLine(data[0], data[1], data[2], data[3], color, thickness);
		} else if (tool === "rect") {
			_this.drawRec(data[0], data[1], data[2], data[3], color, thickness);
		} else if (tool === "circle") {
			_this.drawCircle(data[0], data[1], data[2], color, thickness);
		} else if (tool === "eraser") {
			_this.drawEraserLine(data[0], data[1], data[2], data[3], thickness);
		} else if (tool === "eraseRec") {
			_this.eraseRec(data[0], data[1], data[2], data[3]);
		} else if (tool === "recSelect") {
			_this.dragCanvasRectContent(data[0], data[1], data[2], data[3], data[4], data[5]);
		} else if (tool === "addImgBG") {
			if (content["draw"] == "1") {
				_this.drawImgToCanvas(content["url"], data[0], data[1], data[2], data[3], doneCallback)
			} else {
				_this.drawImgToBackground(content["url"], data[0], data[1], data[2], data[3]);
			}
		} else if (tool === "addTextBox") {
			_this.addTextBox(data[0], data[1], data[2], data[3], data[4]);
		} else if (tool === "setTextboxText") {
			_this.setTextboxText(data[0], data[1]);
		} else if (tool === "removeTextbox") {
			_this.removeTextbox(data[0]);
		} else if (tool === "setTextboxPosition") {
			_this.setTextboxPosition(data[0], data[1], data[2]);
		} else if (tool === "setTextboxFontSize") {
			_this.setTextboxFontSize(data[0], data[1]);
		} else if (tool === "setTextboxFontColor") {
			_this.setTextboxFontColor(data[0], data[1]);
		} else if (tool === "clear") {
			_this.canvas.height = _this.canvas.height;
			_this.imgContainer.empty();
			_this.textContainer.empty();
			_this.drawBuffer = [];
			_this.drawId = 0;
		} else if (tool === "cursor" && _this.settings) {
			if (content["event"] === "move") {
				if (_this.cursorContainer.find("." + content["username"]).length >= 1) {
					_this.cursorContainer.find("." + content["username"]).css({ "left": data[0] + "px", "top": (data[1] - 15) + "px" });
				} else {
					_this.cursorContainer.append('<div style="font-size:0.8em; padding-left:2px; padding-right:2px; background:gray; color:white; border-radius:3px; position:absolute; left:' + data[0] + 'px; top:' + (data[1] - 151) + 'px;" class="userbadge ' + content["username"] + '">' +
						'<div style="width:4px; height:4px; background:gray; position:absolute; top:13px; left:-2px; border-radius:50%;"></div>' +
						content["username"] + '</div>');
				}
			} else {
				_this.cursorContainer.find("." + content["username"]).remove();
			}
		} else if (tool === "undo") {
			_this.undoWhiteboard(username);
		}
		//	});

		if (isNewData && ["line", "pen", "rect", "circle", "eraser", "addImgBG", "recSelect", "eraseRec", "addTextBox", "setTextboxText", "removeTextbox", "setTextboxPosition", "setTextboxFontSize", "setTextboxFontColor"].includes(tool)) {
			content["drawId"] = content["drawId"] ? content["drawId"] : _this.drawId;
			content["username"] = content["username"] ? content["username"] : _this.settings.username;
			//_this.drawBuffer.push(content);
		}
	},
	userLeftWhiteboard: function (username) {
		this.cursorContainer.find("." + username).remove();
	},
	refreshUserBadges: function () {
		this.cursorContainer.find(".userbadge").remove();
	},
	getImageDataBase64: function () {
		_this = this;
		var width = this.mouseOverlay.width();
		var height = this.mouseOverlay.height();
		var copyCanvas = document.createElement('canvas');
		copyCanvas.width = width;
		copyCanvas.height = height;
		var ctx = copyCanvas.getContext("2d");

		$.each(_this.imgContainer.find("img"), function () { //Draw Backgroundimages to the export canvas
			var width = $(this).width();
			var height = $(this).height();
			var p = $(this).position();
			var left = Math.round(p.left * 100) / 100;
			var top = Math.round(p.top * 100) / 100;
			ctx.drawImage(this, left, top, width, height);
		});

		var destCtx = copyCanvas.getContext('2d'); //Draw the maincanvas to the exportcanvas
		destCtx.drawImage(this.canvas, 0, 0);

		$.each($(".textBox"), function () { //Draw the text on top
			var textContainer = $(this)
			var textEl = $(this).find(".textContent");
			var text = textEl.text();
			var fontSize = textEl.css('font-size');
			var fontColor = textEl.css('color');
			var p = textContainer.position();
			var left = Math.round(p.left * 100) / 100;
			var top = Math.round(p.top * 100) / 100;
			top += 25; //Fix top position
			ctx.font = fontSize + " tahoma";
			ctx.fillStyle = fontColor;
			ctx.fillText(text, left, top);
		});

		var url = copyCanvas.toDataURL();
		return url;
	},
	getImageDataJson: function () {
		var sendObj = [];
		for (var i = 0; i < this.drawBuffer.length; i++) {
			sendObj.push(JSON.parse(JSON.stringify(this.drawBuffer[i])));
			delete sendObj[i]["username"];
			delete sendObj[i]["wid"];
			delete sendObj[i]["drawId"];
		}
		return JSON.stringify(sendObj);
	},
	loadData: function (content) {
		var _this = this;
		_this.loadDataInSteps(content, true, function (stepData) {
			if (stepData["username"] == _this.settings.username && _this.drawId < stepData["drawId"]) {
				_this.drawId = stepData["drawId"] + 1;
			}
		});
	},
	loadDataInSteps: function (content, isNewData, callAfterEveryStep) {
		var _this = this;
		var j = 0;
		function lData(index) {
			for (var i = index; i < content.length; i++) {
				if (content[i]["t"] === "addImgBG" && content[i]["draw"] == "1") {
					_this.handleEventsAndData(content[i], isNewData, function () {
						callAfterEveryStep(content[i], i);
						lData(i + 1);
					});
					break;
				} else {
					_this.handleEventsAndData(content[i], isNewData);
					callAfterEveryStep(content[i], i);
					//console.log(j++);
				}
			}
		}
		lData(0);
	},
	loadJsonData: function (content, doneCallback) {
		var _this = this;
		_this.loadDataInSteps(content, false, function (stepData, index) {
			_this.sendFunction(stepData);
			if (index >= content.length - 1) { //Done with all data
				_this.drawId++;
				if (doneCallback) {
					doneCallback();
				}
			}
		});
	},
	sendFunction: function (content) { //Sends every draw to server
		var _this = this;
		content["wid"] = _this.settings.whiteboardId;
		//content["width"] = board.width;
		//content["height"] = board.height;
		content["username"] = _this.settings.username;
		content["drawId"] = _this.drawId;
		var event = content["event"];
		if (event == 'move') {
			//console.log(content);
			return;
		}
		var tool = content["t"];
		if (_this.settings.sendFunction) {
			_this.settings.sendFunction(content);
		}
		if (["line", "pen", "rect", "circle", "eraser", "addImgBG", "recSelect", "eraseRec", "addTextBox", "setTextboxText", "removeTextbox", "setTextboxPosition", "setTextboxFontSize", "setTextboxFontColor"].includes(tool)) {
			_this.drawBuffer.push(content);
		}
	},
	refreshCursorAppearance: function () { //Set cursor depending on current active tool
		var _this = this;
		if (_this.tool === "pen" || _this.tool === "eraser") {
			_this.mouseOverlay.css({ "cursor": "none" });
		} else if (_this.tool === "mouse") {
			this.mouseOverlay.css({ "cursor": "default" });
		} else { //Line, Rec, Circle, Cutting
			_this.mouseOverlay.css({ "cursor": "crosshair" });
		}
	}
}