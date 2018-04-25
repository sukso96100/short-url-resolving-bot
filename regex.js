const shorts = [
  /goo.gl\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /bit.ly\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /muz.so\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /naver.me\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /tinyurl.com\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /ow.ly\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /adf.ly\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /is.gd\/[0-9a-zA-Z $-_.+!*'(),]+/,
  /bit.do\/[0-9a-zA-Z $-_.+!*'(),]+/
]

exports.matchShorts = (msg)=>{
  for(let i=0; i<shorts.length; i++){
    let result = msg.match(shorts[i])
    if(result != null || result != undefined){
      return result[0];
    }
  }
  return undefined;
}
