<template>
	<div id='filedrop'>
   <div class='header' style='text-align: center'><h3>File Drop</h3></div>
   <div id='drop' :class='{active: active, dropped: dropped}' class='container'>[Shp File]</div>
 </div>
</template>

<script>
import axios from '../modules/AJAX.js'
export default {
  name: 'filedrop',
  data() {
    return {
      active: false,
      dropped: false
    }
  },
  methods: {
    drop(cb) {
      let drop_el = document.getElementById('drop');

      drop_el.addEventListener('dragover', (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.active = true;
          evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        }, false);

      drop_el.addEventListener('dragleave', (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.active = false;
      }, false);

      drop_el.addEventListener('drop', (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.active = false;

        this.dropped = true;
        setTimeout(() => {
          this.dropped = false;
        }, 200)
        fileHandler(evt.dataTransfer.files, cb);
      })

        // :: FILE HANLDER --> PUT THIS LOGIC IN MAP EVENT LISTENER TO CONVEY TO MAP.VUE :: \\
        function fileHandler(files, cb) {
          // files is a FileList of File objects. List some properties.
          let output = [];
          let d = [];
          Object.keys(files).forEach(function(i, v) {
            var dataObject = {};
            if (window.FileReader) {
              // getText(files[i]);
              getFile(files[i]);
            } else {
              console.log("FILE READER NOT SUPPORTED IN THIS BROWSER")
            }

            function dataURItoBlob(dataURI) {
                // convert base64 to raw binary data held in a string
                var byteString = atob(dataURI.split(',')[1]);
                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                // write the bytes of the string to an ArrayBuffer
                var arrayBuffer = new ArrayBuffer(byteString.length);
                var _ia = new Uint8Array(arrayBuffer);
                for (var i = 0; i < byteString.length; i++) {
                  _ia[i] = byteString.charCodeAt(i);
                }
                var dataView = new DataView(arrayBuffer);
                var blob = new Blob([dataView], { type: mimeString });
                return blob;
              }

              function getFile(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = URLHandler;
              }

              function URLHandler(evt) {

                let blob = dataURItoBlob(evt.target.result);
                let form = new FormData();
                form.append('zipped', blob);

                dataObject.blob = dataURItoBlob(evt.target.result);
                dataObject.form = form;
                cb(dataObject);
              }


              function errorHandler(evt) {
                if (evt.target.error.name == "NotReadableError") {
                  console.log("Cannot read file!");
                }
              }
            });
        }
      }
    },
    mounted() {
      this.drop((file) => {
       let xhr = axios.ajax('/conversion/toGeoJson', {method: 'POST', data: file.form}).then((rsp)=>{
        this.$emit('file_drop', rsp);
        axios.comm.$emit('file_drop', rsp);
      })
     });
      window.addEventListener('dragover', function(evt) {
        evt.preventDefault();
      }, false);
      window.addEventListener('drop', function(evt) {
        evt.preventDefault();
      }, false);
    },
    beforeDestroy() {}
  }
  </script>

  <style lang="scss">
  #filedrop {
    width: 30%;
    height: 50px;
    margin-bottom: 10px;
    display: flex;
    margin-left: auto;
    background-color: rgb(230, 223, 207);
    border-radius: 3px;
    padding: 3px 3px 3px 3px;
  }

  #filedrop .header {
    width: 35%;
    color: #3f372c;
    text-align: center;
    margin: 4px 1px 1px 1px;
  }

  #filedrop .container {
    width: 65%;
    text-align: center;
    background-color: white;
    height: 100%;
    color: lightgrey;
    padding: 10px 7px 7px 7px;
    border-radius: 2px;
    margin-left: 5px;
    border: 2px dashed rgba(148, 79, 17, 0.4);

    &.active {
      border: 2px dashed #fb2c4f;
      background-color: #64ff73;
      color: #3f372c;
      transition: 0.5s ease;
    }

    &.dropped {
      border: 2px dashed #8806af;
      background-color: #f59b9b;
      color: #3f372c;
      transition: 0.2s ease;
    }
  }

  #filedrop .header h3 {
    margin: 4px 0 0 0;
    font-size: 20px;
  }

  @media screen and (max-width: 1400px) {
    #filedrop {
      width: 35%;
      & .header h3{
        margin: 7px 0 0 0;
        font-size: 18px;
      }
    }
  }

  @media screen and (max-width: 800px) {
    #content {
      margin: 0;
    }

    #filedrop {
      width: 35%;
      height: 40px;
      margin: 0;
      margin-left: auto;
      & .header {
        display: none;
      }
      & .container {
        width: 100%;
        padding: 2px;
      }
    }
  }
  </style>