(function(window, document, Darkroom) {
    "use strict";
    Darkroom.plugins["expand"] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomExpandPlugin() {
            var image = this.darkroom.image;
            var portrait = this.portrait = !!(image.getWidth() <= image.getHeight());
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();
            this.expandButton = buttonGroup.createButton({
                image: "expand",
                hide: true
            });
            this.compressButton = buttonGroup.createButton({
                image: "compress",
                hide: false
            });
            this.expandButton.addEventListener("click", this.expand.bind(this));
            this.compressButton.addEventListener("click", this.compress.bind(this));
        },
        expand: function() {
            var _this = this;
            var darkroom = this.darkroom;
            var canvas = darkroom.canvas;
            var image = darkroom.image;

            var width, height;
            width = image.getWidth();
            height = image.getHeight();
            var ratio = width / height;
            image.setWidth(canvas.getHeight() * ratio / image.scaleX);
            image.setHeight(canvas.getHeight() / image.scaleY);
            canvas.centerObject(image);
            image.setCoords();
            canvas.renderAll();
            this.compressButton.hide(this.portrait);
            this.expandButton.hide(!this.portrait);
            darkroom.dispatchEvent("image:change");
        },
        compress: function() {
            var _this = this;
            var darkroom = this.darkroom;
            var canvas = darkroom.canvas;
            var image = darkroom.image;
            var width, height;
            width = image.getWidth();
            height = image.getHeight();
            var ratio = width / height;
            image.setWidth(canvas.getHeight() / image.scaleX);
            image.setHeight(canvas.getHeight() / ratio / image.scaleY);
            canvas.centerObject(image);
            image.setCoords();
            canvas.renderAll();
            this.expandButton.hide(this.portrait);
            this.compressButton.hide(!this.portrait);
            darkroom.dispatchEvent("image:change");
        }
    });
})(window, document, Darkroom);
