export class Helper {
    static customFileName(req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      let uniqueSuffix = '';
      let length = 96;
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let index = 0; index < length; index++) {
        uniqueSuffix += characters.charAt((Math.floor(Math.random() * 
        charactersLength)))
      }
      let fileExtension = "";
      if(file.mimetype.indexOf("jpeg") > -1){
          fileExtension = "jpg"
      }else if(file.mimetype.indexOf("png") > -1){
          fileExtension = "png";
      }
      // const originalName = file.originalname.split(".")[0];
      // cb(null, originalName + '-' + uniqueSuffix + "." + fileExtension);
      cb(null, uniqueSuffix +"." +fileExtension);
    }
   
    static destinationPath(req, file, cb) {
      cb(null, './images/')
    }
  }