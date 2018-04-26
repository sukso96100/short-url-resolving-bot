const shorts = [
  /(http:\/\/|https:\/\/)?goo.gl\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /(http:\/\/|https:\/\/)?bit.ly\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /(http:\/\/|https:\/\/)?muz.so\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /(http:\/\/|https:\/\/)?naver.me\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /(http:\/\/|https:\/\/)?tinyurl.com\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /(http:\/\/|https:\/\/)?ow.ly\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /(http:\/\/|https:\/\/)?adf.ly\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /(http:\/\/|https:\/\/)?is.gd\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /(http:\/\/|https:\/\/)?bit.do\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /(http:\/\/|https:\/\/)?youtu.be\/[0-9a-zA-Z $-_.+!*'(),]+/

]

exports.matchShorts = (msg)=>{
  console.log("Matching url:"+msg);
  for(let i=0; i<shorts.length; i++){
    let result = msg.match(shorts[i])
    if(result != null || result != undefined){
      return result[0].replace(">", "");
    }
  }
  return undefined;
}
