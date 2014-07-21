(function(window, document, Darkroom) {
    "use strict";
    Darkroom.plugins["expand"] = Darkroom.Plugin.extend({
        initialize: function InitDarkroomExpandPlugin() {
            var buttonGroup = this.darkroom.toolbar.createButtonGroup();
            this.expandButton = buttonGroup.createButton({
                image: "expand"
            });
            this.compressButton = buttonGroup.createButton({
                image: "compress",
                hide: true
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
            this.compressButton.hide(false);
            this.expandButton.hide(true);
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
            image.setWidth(canvas.getHeight());
            image.setHeight(canvas.getHeight() / ratio);
            canvas.centerObject(image);
            image.setCoords();
            canvas.renderAll();
            this.expandButton.hide(false);
            this.compressButton.hide(true);
            darkroom.dispatchEvent("image:change");
        }
    });
})(window, document, Darkroom);
