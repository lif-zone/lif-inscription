import {str, TUf} from 'lif-kernel/util.js';

async function fetch_text(url){
  let req = await fetch(url);
  if (req.status!=200){
    console.error('failed fetch: '+url);
    return;
  }
  let text = await req.text();
  return text;
}
let T_fetch_text = TUf(fetch_text);

function run_html_text(html){
  document.open();
  document.write(html);
  document.close();
}

async function run_html(url){
  console.log('run_html start '+url);
  let html = await T_fetch_text(url);
  run_html_text(html);
  console.log('run_html complete');
}

function ask_id(){
  document.body.innerHTML =
    'no inscription in URL: /<inscription_id> or /preview/<inscription_id>';
}

async function start(){
  let p = location.pathname;
  let id;
  let v;
  if (v=str.starts(p, '/preview/'))
    id = v.rest;
  else if (v=str.starts(p, '/content/'))
    id = v.rest;
  else if (v=p.match(/^\/[0-9a-f]{64}i\d+$/))
    id = p.slice(1);
  if (!id)
    return ask_id();
  await run_html('/content/'+id);
}

start();
