// Generated by CoffeeScript 1.6.2
var $listings, listings, modal, ui,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ui = (function() {
  function ui() {
    this.linkclick = __bind(this.linkclick, this);
    this.interfaceClose = __bind(this.interfaceClose, this);
    this.interfaceOpen = __bind(this.interfaceOpen, this);    this.$navlink = $('#mainContent .listing');
    this.$viewArea = $('#viewContentWrapper');
    this.$mainArea = $('#mainContent');
    this.Transdur = 400;
    this.largeClass = 'span12';
    this.smallClass = 'span6';
    this.hidden = 'hidden';
    this.resizeWindows();
    this.detectResize();
    this.urls = new urls;
  }

  ui.prototype.interfaceOpen = function() {
    this.$mainArea.switchClass(this.largeClass, this.smallClass, this.Transdur);
    this.$viewArea.switchClass(this.hidden, this.smallClass, this.Transdur);
    return null;
  };

  ui.prototype.interfaceClose = function() {
    this.$mainArea.switchClass(this.smallClass, this.largeClass, this.Transdur);
    this.$viewArea.switchClass(this.smallClass, this.hidden, this.Transdur);
    return null;
  };

  ui.prototype.linkclick = function() {
    var selector, _this;

    selector = $('#mainContent a');
    _this = this;
    return selector.on('click', function(e) {
      var domain, link, title, url;

      e.preventDefault();
      if (e.which === 2) {
        return _this.newWindow($(this).attr('href'));
      } else {
        link = $(this).attr('href');
        title = $(this).val();
        domain = $(this).data('domain');
        url = urls(domain, link, title);
        console.log(url['title'] + "title");
        return new modal(url["title"], url.data);
      }
    });
  };

  ui.prototype.newWindow = function(link) {
    return window.open(link);
  };

  ui.prototype.resizeWindows = function() {
    var height, resizeheight;

    height = $(window).height();
    resizeheight = height - 120;
    return $("#mainContent , #viewContentWrapper").css('height', resizeheight + "px");
  };

  ui.prototype.detectResize = function() {
    return $(window).resize(this.resizeWindows);
  };

  return ui;

})();

listings = (function() {
  function listings() {
    this.ui = new ui;
    this.listingTemplate = "{{#data}} <li>\n<div class=\"listing {{clicked}}\" data-fullname=\"{{name}}\">\n	<div class=\"articleTitle\"><a href=\"{{url}}\" data-domain=\"{{domain}}\">{{title}}</a> <span class=\"domain\">({{domain}})</span></div>\n	<div class=\"details\">[<span class='upvotes'>{{ups}}</span>|<span class=\"downvotes\">{{downs}}</span>] posted x hrs ago by {{author}}\n	</div>\n</div> \n</li>{{/data}}";
    this.getListings("", "", "");
  }

  listings.prototype.getListings = function(sub, limit, after) {
    var url,
      _this = this;

    url = "/get/subreddit";
    if (sub !== "") {
      url = url + "/" + sub;
    }
    if (limit !== "") {
      url = url + "/" + limit;
    }
    if (after !== "") {
      url = url + "/" + after;
    }
    return $.getJSON(url, function(data) {
      var html;

      html = Mustache.to_html(_this.listingTemplate, data);
      $('#mainContent ul').append(html);
      return _this.ui.linkclick();
    });
  };

  return listings;

})();

$listings = new listings;

modal = (function() {
  function modal(title, data) {
    console.log("tests");
    console.log(title);
    this.selector = $("#modal");
    this.selector.find(' #ModalLabel').html(title);
    this.selector.find('#modalBody').html(data);
    this.show();
  }

  modal.prototype.show = function() {
    console.log("fire");
    return console.log(this.selector.modal('show'));
  };

  return modal;

})();
