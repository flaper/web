function updateDropzoneHeader() {
  Dropzone.instances.forEach(function (instance) {
    instance.options.headers.Authorization = jwtToken();
  })
}
Dropzone.options.defaultDropzone = {
  dictDefaultMessage: "Загрузить картинки (перетащить или выбрать)",
  init: function () {
    this.on("addedfile", function (file) {
      //to keep headers up to date with currentUser
      updateDropzoneHeader();
    });
    this.on("success", function (file, response) {
      var el = this.element;
      var event = generateEvent('success', {image: response});
      el.dispatchEvent(event);
    });
  },
  headers: {
    Authorization: jwtToken()
  }
};
