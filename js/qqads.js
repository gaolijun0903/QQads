(function(window, document, undefined) {
    function QQads(settings, callback) {
        this.cover = null;
        this.ctx = null;
//      this.wapperDiv = null;
//      this.innerpic = null;
        this.cHeight = 0;
        this.cWidth = 0;
		this.imgData = null;
        this.opt = {
        	wapperDiv:null,
        	innerpic:null,
            coverImg: '',
            radius: 1,
            callback: null
        };

        this.init(settings, callback);
    };
    
    function _calcArea(ctx, callback, ratio) {
        var pixels = ctx.getImageData(0, 0, this.cWidth, this.cHeight);
        var indexs = [];
        _forEach(pixels.data, function(item, i) {
            var pixel = pixels.data[i + 3];
            if (pixel === 0) {
                transPixels.push(i);
            }
        });

        if (transPixels.length / pixels.data.length > ratio) {
            callback && typeof callback === 'function' && callback();
        }
    }

    function _forEach(items, callback) {
        return Array.prototype.forEach.call(items, function(item, idx) {
            callback(item, idx);
        });
    }
    
    function _isCanvasSupported(){
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }
    
    QQads.prototype.createCanvas = function() {
        this.cover = document.createElement('canvas');
        this.cover.id = 'cover';
        this.cover.height = this.cHeight;
        this.cover.width = this.cWidth;
        this.ctx = this.cover.getContext('2d');
        
        var _this = this;
        var coverImg = new Image();
        coverImg.src = this.opt.coverImg;
        coverImg.onload = function() {
            _this.ctx.drawImage(coverImg, 0, 0, _this.cover.width, _this.cover.height);
            _this.imgData = _this.ctx.getImageData(0, 0, _this.cWidth, _this.cHeight);
        }
        this.opt.wapperDiv.appendChild(this.cover);
        this.opt.innerpic.style.opacity = 1;
    }
    //擦除像素
    QQads.prototype.clearCircle = function (centerX,centerY,radius){
    	this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
  	//恢复像素
    QQads.prototype.recoverCircle = function (centerX,centerY,radius){
    	this.ctx.putImageData(this.imgData,0,0);
    	this.clearCircle(centerX,centerY,radius)
    }
    
    QQads.prototype.init = function(settings, callback) {
        if(!_isCanvasSupported()){
            alert('对不起，当前浏览器不支持Canvas，无法使用本控件！');
            return;
        }
        var _this = this;
        _forEach(arguments, function(item) {
            if (typeof item === "object") {
                for (var k in item) {
                    if (k === 'callback' && typeof item[k] === 'function') {
                        _this.opt.callback = item[k].bind(_this);
                    } else {
                        k in _this.opt && (_this.opt[k] = item[k]);
                    }
                }
            } else if (typeof item === "function") {
                _this.opt.callback = item.bind(_this);
            }
        });
//      this.wapperDiv = document.getElementById('wapper');
//      this.innerpic = document.getElementById('innerpic');
        if (!this.opt.wapperDiv || !this.opt.innerpic) return;
        this.cHeight = this.opt.innerpic.clientHeight;
        this.cWidth = this.opt.innerpic.clientWidth;
        this.opt.innerpic.style.opacity = 0;
        this.createCanvas();
    };
    QQads.case = function(settings, callback) {
        return new QQads(settings, callback);
    };
    
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return QQads;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = QQads.case;
        module.exports.QQads = QQads;
    } else {
        window.QQads = QQads;
    }

})(window, document);