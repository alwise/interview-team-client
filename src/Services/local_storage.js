/* eslint-disable import/no-anonymous-default-export */
var CryptoJS = require("crypto-js");
const secret = "datakeyencrptsecrete";
const crypt = {  
   
    encrypt : (data) => 
    data && CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString(),
   
    decrypt : (cipher) =>
    cipher && CryptoJS.AES.decrypt(cipher, secret).toString(CryptoJS.enc.Utf8)
  };

const keys = {
    token: "token",
    user: "xthrgdhhffkjdhj",
  }

export default {
  setUser: (user) => user && window.sessionStorage.setItem(keys?.user, crypt.encrypt(JSON.stringify(user))),

  getUser: () => JSON.parse(crypt.decrypt(window.sessionStorage.getItem(keys?.user))),

  clear:()=>window.sessionStorage.clear(),
  
  keys:keys



}